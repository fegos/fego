import React, { Component } from 'react'
import { Carousel } from 'fego'

export default class Page extends Component {
	render() {
		return (
			<div>
				<Carousel {...{
					dots: true,
					arrows: true,
					infinite: true,
					speed: 500,
					slidesToShow: 2,
					slidesToScroll: 2,
					draggable: true
				}}>
					<div><h3>1</h3></div>
					<div><h3>2</h3></div>
					<div><h3>3</h3></div>
					<div><h3>4</h3></div>
					<div><h3>5</h3></div>
					<div><h3>6</h3></div>
				</Carousel>
			</div>
		)
	}
}