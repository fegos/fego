/**
 * 轮播组件
 * https://github.com/akiran/react-slick
 * demo: http://neostack.com/opensource/react-slick
 * @author esky
 */
import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import Icon from '../Icon'
// import './style/index.less'
// https://github.com/weblinc/media-match
import '../patch/matchMedia'
import SlickCarousel from 'react-slick'

const NavArrow = props => {
	const { prefixCls = 'ns-carousel-arrow', direction, onClick } = props
	return (
		<div
			className={`${prefixCls} ${prefixCls}-${direction}`}
			onClick={onClick}
		><Icon name='back' /></div>
	)
}
export default class Carousel extends React.Component {
	static defaultProps = {
		prefixCls: 'ns-carousel',
		dots: true,
		arrows: false,
	}
	constructor() {
		super();
		this.onWindowResized = debounce(this.onWindowResized, 500, {
			leading: false,
		});
	}

	componentDidMount() {
		const { autoplay } = this.props;
		autoplay && window.addEventListener('resize', this.onWindowResized);

	}

	componentWillUnmount() {
		const { autoplay } = this.props;
		if (autoplay) {
			window.removeEventListener('resize', this.onWindowResized);
			this.onWindowResized.cancel();
		}
	}

	onWindowResized = () => {
		const slick = this.slick;
		const { autoplay } = this.props;
		if (autoplay && slick && slick.innerSlider && slick.innerSlider.autoPlay) {
			slick.innerSlider.autoPlay();
		}
	}

	render() {
		let { prefixCls, vertical, ...rest } = this.props
		let className = prefixCls;
		if (vertical) className = `${prefixCls} ${prefixCls}-vertical`;

		return (
			<div className={className}>
				<SlickCarousel
					ref={el => this.slick = el}
					vertical={vertical}
					prevArrow={<NavArrow direction='prev' />}
					nextArrow={<NavArrow direction='next' />}
					{...rest} />
			</div>
		);
	}
}
