export default [{ 
	path: '/ui',
	routes:[{
		path: '/ui/Button',
		component: () => import('./Button')
	}, {
		path: '/ui/Input',
		component: () => import('./Input')
	}, {
		path: '/ui/Dialog',
		component: () => import('./Dialog')
	}, {
		path: '/ui/Carousel',
		component: () => import('./Carousel')
	}, {
		path: '/ui/Table',
		component: () => import('./Table')
	}, {
		path: '/ui/Pagination',
		component: () => import('./Pagination')
	}]
}]