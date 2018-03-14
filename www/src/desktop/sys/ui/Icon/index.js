import React, { Component } from 'react';
import { Icon } from 'fego';
import style from './index.less';

const icons = [
  'question-fill',
  'error',
  'info',
  'warning',
  'success',
  'home',
  'minus',
  'plus',
  'yes',
  'no',
];

export default class Page extends Component {
  state = {}
  render() {
    return (
      <div className={style.page}>
        <div className="section f-cb">
          {icons.map(icon => (
            <div className="item" key={icon}>
              <Icon name={icon} />
              <span className={style.name}>{icon}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
