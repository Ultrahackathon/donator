module.exports = require('./make-webpack-config')({
  devtool: 'eval',
	hotComponents: true,
  debug: true,
  separateStylesheet: true
});
