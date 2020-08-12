# FluentUI System Icons Font

This repository contains icon fonts based on assets from the [microsoft/fluentui-system-icons](https://github.com/microsoft/fluentui-system-icons) repository and a script to generate them.

## Usage

You can download the font files from the [releases](https://github.com/wazybr/fluentui-system-icons-font/releases) page of this repository and embed them in your project using the best approach for the target platform.

If you want to generate the font files by yourself, clone this repository, go to it's directory, and initialize it's submodules with the following git command:
```
git submodule update --init
```

Also, you need to download the script's dependencies by executing:
```
npm install
```

Before running the script, you may want to update the assets:
```
cd fluentui-system-icons
git pull
```

Then go back to the script directory:
```
cd ..
```

From now on, you can run the script using Node.js by typing:
```
node .
```

It may take a while to generate all font files, but when it's done, they will be located at the `webfonts` folder.