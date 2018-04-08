const Home = './template/Home';
const Component = './template/Component';

module.exports = {
  lazyLoad: true,
  pick: {
    components(markdownData) {
      const { filename, title, subTitle } = markdownData.meta;
      if (!/^src\/[A-Z]/.test(filename)) return false;
      return {
        filename,
        title,
        subTitle,
      };
    },
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc',
    'bisheng-plugin-react',
  ],
  routes: [{
    path: '/',
    component: './template/layout',
    indexRoute: {
      dataPath: '/components',
      component: Home,
    },
    childRoutes: [{
      path: '/components/:children',
      component: Component,
    }],
  }],
};
