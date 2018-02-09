# vSearch

## Installation

Install in Google Chrome via the [Chrome Web Store](
https://chrome.google.com/webstore/detail/vsearch/elkpelajnmgfojgcfjpokaaeacdojkaj
)

## Development

### In-Browser Testing on local

1) Run `npm run build` to generate the `dist` folder.  
2) In chrome, navigate to [Extensions](chrome://extensions)
3) Enable "Developer Mode"
4) Click "Load unpacked extension..."
5) Select the `dist` folder that was just generated.
6) Execute a Google search in Chrome.  
    - vSearch should be visible.
7) Once you've made changes to the extension, **your changes won't 
be visible in the browser** until you click "Reload" on the
[Extensions](chrome://extensions) page

#### Unit Testing
- Run `npm run test` or `npm run testonce`

### Packaging for deployment
1) Make your changes and [test on local](#testing-on-local).
2) Update dist/manifest.json with a new version number.
3) Run `npm run zip` to generate `vSearch.zip` in the root dir
4) Send that zip file to [Jason Dahl](https://vendasta.slack.com/messages/D0UK95SF3/team/U0Q6MH06N/) 
for publishing. 