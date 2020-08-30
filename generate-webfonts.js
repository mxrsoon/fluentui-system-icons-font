const path = require("path");
const fs = require("fs").promises;
const fsExtra = require("fs-extra");
const IconFontBuildr = require("icon-font-buildr");
const cssTemplate = require("./css-template.js");

const assetsDir = path.resolve(__dirname, "./fluentui-system-icons/assets");
const outputDir = path.resolve(__dirname, "./webfonts");
const fontsOutputDir = path.join(outputDir, "fonts");
const cssOutputDir = path.join(outputDir, "css");

const svgPrefix = "ic_fluent_";
const fontPrefix = "FluentIcons";

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function toSnakeCase(str) {
	return str.split(" ").join("_").toLowerCase();
}

async function getIconSets(assetsDir) {
	const assets = await fs.readdir(assetsDir, { withFileTypes: true });
	const iconSets = {};
	
	// For each icon in assets folder
	for (let icon of assets) {
		if (icon.isDirectory()) {
			// SVG files are located in the SVG subfolder
			const svgDir = path.join(assetsDir, icon.name, "SVG");
			const svgNames = await fs.readdir(svgDir);

			for (let svgName of svgNames) {
				if (svgName.startsWith(svgPrefix) && svgName.endsWith(".svg")) {
					const svgPath = path.join(svgDir, svgName);

					// Remove extension from file name
					svgName = svgName.split(".").slice(0, -1).join(".");

					// Split file name and get style and size from it
					const svgNameParts = svgName.split("_");
					const [size, style] = svgNameParts.slice(svgNameParts.length - 2);

					// If there's no icon set for this style, initialize it
					if (!(style in iconSets)) {
						iconSets[style] = {};
					}
					
					// If there's no icon set for this size, initialize it
					if (!(size in iconSets[style])) {
						iconSets[style][size] = [];
					}

					// Push icon data to the icon set
					iconSets[style][size].push({
						icon: toSnakeCase(icon.name),
						name: icon.name,
						ligatures: [toSnakeCase(icon.name)],
						sourceFile: svgPath
					});
				}
			}
		}
	}

	return iconSets;
}

async function buildIconFonts(iconSets) {
	await fsExtra.emptyDir(outputDir);
	await fsExtra.emptyDir(fontsOutputDir);
	await fsExtra.emptyDir(cssOutputDir);

	for (let style in iconSets) {
		for (let size in iconSets[style]) {
			const icons = iconSets[style][size];
			const fontName = `${fontPrefix} ${capitalizeFirstLetter(style)} ${size}`;

			// Build font for each icon set
			const builder = new IconFontBuildr({
				// IconFontBuildr requires the [icon] placeholder in source file names
				sources: icons.map(icon => icon.sourceFile.replace(icon.icon, "[icon]")),
				icons,
				output: {
					codepoints: false,
					ligatures: true,
					fonts: fontsOutputDir,
					fontName,
					formats: [
						"woff",
						"woff2"
					]
				}
			});

			await builder.build();

			const css = cssTemplate.createCSSForFont(fontName, style, size);
			await fs.writeFile(path.join(cssOutputDir, `fluent-icons-${style}-${size}.css`), css);
		}
	}
}

async function main() {
	const iconSets = await getIconSets(assetsDir);
	await buildIconFonts(iconSets);	
}

main();