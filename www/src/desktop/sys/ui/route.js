export default [{ 
	path: '/ui',
	routes:[{
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