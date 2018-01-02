export default [{ 
	path: '/',
	component: ()=> import('./index'),
	routes:[{
		path: '/Button',
		component: () => import('./Button')
	}, {
		path: '/Carousel',
		component: () => import('./Carousel')
	}, {
		path: '/Checkbox',
		component: () => import('./Checkbox')
	}, {
		path: '/Dialog',
		component: () => import('./Dialog')
	}, {
		path: '/Icon',
		component: () => import('./Icon')
	}, {
		path: '/Input',
		component: () => import('./Input')
	}, {
		path: '/List',
		component: () => import('./List')
	}, {
		path: '/Pagination',
		component: () => import('./Pagination')
	}, {
		path: '/Radio',
		component: () => import('./Radio')
	}]
}]