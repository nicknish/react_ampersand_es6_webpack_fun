// use babel to rewrite Node's require, so we can use PublicPage
require('babel/register')
var getConfig = require('hjs-webpack')
var React = require('react')
var PublicPage = require('./src/pages/public')
var Layout = require('./src/layout')

module.exports = getConfig({
	in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  html: function(context) {
    // no JSX allowed here, let's write what JSX would render to
    const publicPage = React.renderToString(React.createElement(PublicPage))

    // pass in data, doesn't need to have data as long as it doesn't blow up
    const layoutPage = React.renderToString(React.createElement(Layout, {me: {}}))

    return {
      'index.html': context.defaultTemplate({html: publicPage}),
      '200.html': context.defaultTemplate({html: layoutPage})
    }
  }
})
