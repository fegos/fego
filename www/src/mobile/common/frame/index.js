import React from 'react';
import Footer from './Footer';
import Header from './Header';
import './index.less';

export default props => (
  <div className="app">
    <Header />
    <div id="main">
      {props.children}
    </div>
    <Footer />
  </div>
);
