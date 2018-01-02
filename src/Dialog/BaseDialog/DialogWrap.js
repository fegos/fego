import React from 'react'
import Dialog from './Dialog'
import ContainerEnhance from './ContainerEnhance'
class DialogWrap extends React.Component {
	static defaultProps = {
		visible: false
	}
	static displayName = 'DialogWrap'
	shouldComponentUpdate({ visible }) {
		return !!(this.props.visible || visible);
	}

	// componentWillUnmount() {
	// 	if (this.props.visible) {
	// 		this.renderComponent({
	// 			afterClose: this.removeContainer,
	// 			onClose() {
	// 			},
	// 			visible: false,
	// 		});
	// 	} else {
	// 		this.removeContainer();
	// 	}
	// }

	getElement(part) {
		return this._component.getElement(part);
	}

	render() {
		return null
	}
}
export default ContainerEnhance(DialogWrap, {
	isVisible(instance) {
		return instance.props.visible;
	},
	autoDestroy: true,
	getComponent(instance, extra) {
		return (
			<Dialog
				{...instance.props}
				{...extra}
				key="dialog"
			/>
		);
	},
	getContainer(instance) {
		if (instance.props.getContainer) {
			return instance.props.getContainer();
		}
		const container = document.createElement('div');
		document.body.appendChild(container);
		return container;
	}
})