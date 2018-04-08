const path = require('path');

module.exports = {
  port: 8003,
  source: {
    components: 'src',
  },
  output: './site/build/',
  theme: './site/theme/',
  themeConfig: {
    rootLink: '/',
    siteTitle: 'Fego 组件库',
    copyright: 'Fego',
    navigation: [],
  },
  htmlTemplate: path.join(__dirname, './theme/static/template.html'),
  devServerConfig: {},
  webpackConfig(config) {
    return config;
  },
  entryName: 'index',
  root: '/sites/fego/',
};
