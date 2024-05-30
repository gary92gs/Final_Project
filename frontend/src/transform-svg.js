const { transform } = require('@svgr/core');
const fs = require('fs');
const path = require('path');

const svgFilePath = path.resolve(__dirname, 'icon.svg'); // path to your SVG file
const jsFilePath = path.resolve(__dirname, 'Icon.js'); // path to save the React component

const svgCode = fs.readFileSync(svgFilePath, 'utf8');

const jsxCode = transform.sync(svgCode, {
  // SVGR options here
  icon: true,
  svgo: true,
  svgoConfig: {
    plugins: [
      { removeViewBox: false },
      { removeDimensions: true }
    ],
  },
});

fs.writeFileSync(jsFilePath, jsxCode);

console.log('SVG transformed to React component successfully.');
