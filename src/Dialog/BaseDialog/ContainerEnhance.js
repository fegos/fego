import React from 'react';
import ReactDOM from 'react-dom';

function defaultGetContainer() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
}
export default (TarComponent, config) => {
  const {
    autoMount = true,
    autoDestroy = true,
    isVisible,
    getComponent,
    getContainer = defaultGetContainer,
  } = config;
  return class extends TarComponent {
    instance = null
    static displayName = 'ContainerEnhance'
    renderComponent(componentArg, ready) {
      const { instance } = this;
      if (!isVisible || instance._component || isVisible(instance)) {
        if (!instance._container) {
          instance._container = getContainer(instance);
        }
        let component;
        if (instance.getComponent) {
          component = instance.getComponent(componentArg);
        } else {
          component = getComponent(instance, componentArg);
        }
        ReactDOM.unstable_renderSubtreeIntoContainer(
          instance,
          component, instance._container,
          function callback() {
            instance._component = this;
            if (ready) {
              ready.call(this);
            }
          },
        );
      }
    }
    componentDidMount() {
      autoMount && this.renderComponent();
    }
    componentDidUpdate() {
      autoMount && this.renderComponent();
    }
    componentWillUnmount() {
      autoDestroy && this.removeContainer();
    }
    removeContainer() {
      const { instance } = this;
      if (instance._container) {
        const container = instance._container;
        ReactDOM.unmountComponentAtNode(container);
        container.parentNode.removeChild(container);
        instance._container = null;
      }
    }
    render() {
      return <TarComponent ref={(instance) => { this.instance = instance; }} {...this.props} />;
    }
  };
};
