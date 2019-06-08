# Fontify GitHub

## Installation
This isn't published yet.  See below.

## Development

### In-Browser Testing on local

1) Run `npm run build` to generate the `dist` folder.  
2) In chrome, navigate to [Extensions](chrome://extensions)
3) Enable "Developer Mode"
4) Click "Load unpacked extension..."
5) Select the `dist` folder that was just generated.
6) Once you've made changes to the extension, **your changes won't 
be visible in the browser** until you click "Reload" on the
[Extensions](chrome://extensions) page

#### Unit Testing
- Run `npm run test` or `npm run testonce`

### Packaging for deployment
1) Make your changes and [test on local](#testing-on-local).
2) Update dist/manifest.json with a new version number.
3) Run `npm run zip` to generate `fontify.zip` in the root dir
