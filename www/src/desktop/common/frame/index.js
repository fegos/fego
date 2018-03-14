
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './style/index.less';

const menus = [{
  link: '/ui/Button',
  title: 'Button',
  subTitle: '按钮',
}, {
  link: '/ui/Card',
  title: 'Card',
  subTitle: '卡片',
}, {
  link: '/ui/Carousel',
  title: 'Carousel',
  subTitle: '走马灯',
}, {
  link: '/ui/Checkbox',
  title: 'Checkbox',
  subTitle: '复选框',
}, {
  link: '/ui/Dialog',
  title: 'Dialog',
  subTitle: '对话框',
}, {
  link: '/ui/Form',
  title: 'Form',
  subTitle: '表单',
}, {
  link: '/ui/Icon',
  title: 'Icon',
  subTitle: '图标',
}, {
  link: '/ui/Input',
  title: 'Input',
  subTitle: '输入框',
}, {
  link: '/ui/Loading',
  title: 'Loading',
  subTitle: '加载中',
}, {
  link: '/ui/Pagination',
  title: 'Pagination',
  subTitle: '分页器',
}, {
  link: '/ui/Radio',
  title: 'Radio',
  subTitle: '单选框',
}, {
  link: '/ui/Select',
  title: '下拉框',
  subTitle: 'Select',
}, {
  link: '/ui/Table',
  title: '表格',
  subTitle: 'Table',
}];

function sort(menu1, menu2) {
  if (menu1.title < menu2.title) {
    return -1;
  } else if (menu1.title > menu2.title) {
    return 1;
  }
  return 0;
}

export default (props) => {
  const { pathname } = window.location;
  return (
    <div className="app">
      <Header />
      <div className="main">
        <ul>
          {
            menus.sort(sort).map(menu => (
              <li key={menu.link} className={pathname.indexOf(menu.link) >= 0 ? 'active' : ''}>
                <Link to={menu.link}>{menu.subTitle} {menu.title}</Link>
              </li>
            ))
          }
        </ul>
        <div className="page">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
};
