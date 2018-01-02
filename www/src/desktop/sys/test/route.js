export default [{ 
	path: '/test',
	routes:[{
		path: '/test/Chunk',
		component: () => import('./Chunk')
	}]
}]