import React, { Component } from 'react';
import { Link } from 'bisheng/router';
import Header from './Header';
import Footer from './Footer';
import '../../static/layout.less';

export default class Layout extends Component {
  sort(file1, file2) {
    // 主序 title，从序 subTitle
    if (file1.title < file2.title) return -1;
    else if (file1.title > file2.title) return 1;
    else if (file1.subTitle < file2.subTitle) return -1;
    else if (file1.subTitle > file2.subTitle) return 1;
    else return 0;
  }
  render() {
    const {
      themeConfig,
      location,
      children,
      picked,
    } = this.props;
    const { pathname } = location;
    return (
      <div className="wrap">
        <Header themeConfig={themeConfig} location={location} />

        <div id="main" className="f-cb">
          <div className="aside-line" />
          <aside id="aside" className="f-fl">
            <ul className="menu">
            {
              picked['components']
                .filter(file => file.title && file.subTitle)
                .sort(this.sort)
                .map((file) => {
                  if (file.title) {
                    const path = file.filename.replace(/src\//, 'components/').replace(/README\.md/, '');
                    console.log(path)
                    return (
                      <li key={file.title} className={pathname.indexOf(path) > -1 ? 'menu-item menu-item-active' : 'menu-item'}>
                        <Link className="component" to={path}>{`${file.title} ${file.subTitle}`}</Link>
                      </li>
                    );
                  }
                  return null;
                })
            }
            </ul>
          </aside>
          <section className="content">
            <div id="page">{children}</div>
          </section>
        </div>
        <Footer copyright={themeConfig.copyright} />
      </div>
    );
  }
}
