function createCSSForFont(fontName, style, size) {
	const classNames = [`.fluent-icons-${style}-${size}`];

	if (style === "regular") {
		classNames.push(`.fluent-icons-${size}`);
	}

return `@font-face {
	font-family: "${fontName}";
	font-style: normal;
	font-weight: 400;
	src: url("../fonts/${fontName}.woff2") format("woff2"),
		 url("../fonts/${fontName}.woff") format("woff");
}

${classNames.join(",\n")} {
	font-family: "${fontName}";
	font-weight: normal;
	font-style: normal;
	font-size: ${size}px;
	line-height: 1;
	letter-spacing: normal;
	text-transform: none;
	display: inline-block;
	white-space: nowrap;
	word-wrap: normal;
	direction: ltr;
	font-feature-settings: 'liga';
	-webkit-font-feature-settings: 'liga';
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}`;
}

module.exports = { createCSSForFont };