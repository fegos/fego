import React from 'react';

export default class LazyRenderBox extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  }
  render() {
    const {
      className, hiddenClassName, visible, ...rest
    } = this.props;
    let _className = className;
    if (!!hiddenClassName && !visible) {
      _className += ` ${hiddenClassName}`;
    }
    return <div className={_className} {...rest} />;
  }
}
