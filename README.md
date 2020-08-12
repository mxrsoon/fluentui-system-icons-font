# FluentUI System Icons Font

This repository contains icon fonts based on assets from the [microsoft/fluentui-system-icons](https://github.com/microsoft/fluentui-system-icons) repository and a script to generate them.

## Usage
### Embedding
You can embed the icons using jsDelivr. For example, to embed the `Regular 20` variant, just include a link tag like this:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wazybr/fluentui-system-icons-font/webfonts/css/fluent-icons-regular-20.css">
```

Afterwards, you can use the icons like this:
```html
<i class="fluent-icons-regular-20">add_circle</i>
```

To see a list of available icons, you can take a look at [this page](https://github.com/microsoft/fluentui-system-icons/blob/master/icons.md) on Microsoft's repository.

The naming scheme differs a little bit. For instance, the `ic_fluent_add_circle_20_regular` icon for Android, is called just `add_circle` here, if you are using the `Regular 20` web-font variant and class.


### Downloading the fonts

Alternatively, you can download the CSS and/or font files from the [webfonts](https://github.com/wazybr/fluentui-system-icons-font/releases) folder of this repository and embed them in your project using the best approach for the target platform.

### Building from source
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