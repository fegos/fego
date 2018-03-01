import React from 'react';
import classNames from 'classnames';
import ListItem from './ListItem.mob';

export default function List(props) {
  const { prefixCls = 'ns-list', className, style } = props;

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {props.children}
    </div>
  );
}

List.Item = ListItem;
