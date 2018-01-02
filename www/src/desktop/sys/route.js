export default [{ 
	path: '/',
	exact: true,
	// component: require('./home').default
	component: ()=> import('./home')
},{
	path: '/ui',
	routes: require('./ui/route').default
},{
	path: '/test',
	routes: require('./test/route').default
}]
