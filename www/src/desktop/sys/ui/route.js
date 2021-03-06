export default [{
  path: '/ui',
  routes: [{
    path: '/ui/Button',
    component: () => import('./Button'),
  }, {
    path: '/ui/Input',
    component: () => import('./Input'),
  }, {
    path: '/ui/Select',
    component: () => import('./Select'),
  }, {
    path: '/ui/Checkbox',
    component: () => import('./Checkbox'),
  }, {
    path: '/ui/Radio',
    component: () => import('./Radio'),
  }, {
    path: '/ui/Form',
    component: () => import('./Form'),
  }, {
    path: '/ui/Dialog',
    component: () => import('./Dialog'),
  }, {
    path: '/ui/Carousel',
    component: () => import('./Carousel'),
  }, {
    path: '/ui/Table',
    component: () => import('./Table'),
  }, {
    path: '/ui/Pagination',
    component: () => import('./Pagination'),
  }, {
    path: '/ui/Loading',
    component: () => import('./Loading'),
  }, {
    path: '/ui/Card',
    component: () => import('./Card'),
  }, {
    path: '/ui/Icon',
    component: () => import('./Icon'),
  }],
}];
