# const-version
A tiny command line tool that extract `package.json` version and generate `export const VERSION='...'` file in ES6 syntax

[![Build Status](https://travis-ci.org/chrvadala/const-version.svg?branch=master)](https://travis-ci.org/chrvadala/const-version)

## Usage `package.json`

```
{
  "name": "yourproject",
  "version": "1.0.0",
  "scripts": {
    "version": "const-version ./package.json ./src/version.json && git add -A src/version.js"
  }
}
```

## Generated file
```
    // THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
    export const VERSION = '1.0.0';
```

## Why to use this and avoid `import {version} from './package.json'` ?
When you use some build tool like webpack, grunt, gulp,... if you do a direct `package.json` import you will include the content of this file into your bundle.
It's not usually good, because:
 - you might share some private data
 - you increase the size of your bundle

This tiny lib exists to avoid this.

## Changelog
- **v1.0** - First release

## Contributing
Your contributions (issues and pull request) are very appreciated!

## Author
- [chrvadala](https://github.com/chrvadala)

## License
MIT
