import { Component } from 'react';
import { withRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
// 路由容器模块，用于输出匹配的子路由模块
class Router extends Component {
  constructor(props) {
    super(props);
    this.routes = props.routes;
    this.state = {
      route: props.initialRoute,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.match(nextProps.location);
    }
  }
  componentDidMount() {
    this.match(this.props.location);
  }
  // match = (location) => {
  //   let curRoute = matchRoutes(this.routes, location.pathname)
  //     .filter(route=>route.match.isExact)
  //     .map(route => route.route)[0]
  //   console.log(curRoute)
  //   if (curRoute) {
  //     if (curRoute.loader) {
  //       curRoute.loader(mod => {
  //         curRoute.component = mod.default ? mod.default : mod
  //         delete curRoute.loader
  //         this.setState({ route: curRoute })
  //       })
  //     } else {
  //       this.setState({ route: curRoute })
  //     }
  //   }
  // }
  match = (location) => {
    const curRoute = matchRoutes(this.routes, location.pathname)
      .filter(route => route.match.isExact)
      .map(route => route.route)[0];
    if (curRoute && curRoute.component) {
      if (this.isComp(curRoute.component)) {
        this.updateRoute(curRoute, location);
      } else {
        curRoute.component().then((mod) => {
          curRoute.component = mod.default ? mod.default : mod;
          this.updateRoute(curRoute, location);
        });
      }
    }
  }
  isComp(comp) {
    return comp && comp.prototype instanceof Component;
  }
  updateRoute = (curRoute, location) => {
    // let { getInitialProps, getSeoData } = curRoute.component
    // let { store } = this.props
    // Fetch.clear()
    // if (getInitialProps instanceof Function) {
    // 	location = Object.assign({}, location, { query: searchToQuery(location.search) })
    // 	getInitialProps(store.dispatch, store.getState(), location).then(res => {
    // 		res !== false && this.updateSeo(curRoute.component, store.getState())
    // 	}).catch(err => console.log(err))
    // }
    // this.updateSeo(curRoute.component, store.getState())
    this.setState({ route: curRoute });
  }
  render() {
    const { route } = this.state;
    return renderRoutes(route && this.isComp(route.component) ? [route] : []);
  }
}

export default withRouter(Router);
