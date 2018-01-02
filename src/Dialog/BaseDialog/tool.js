let scrollBarCached;
export default {
	noop: function(){},
	getScroll: function (w, top) {
		let ret = w[`page${top ? 'Y' : 'X'}Offset`];
		const method = `scroll${top ? 'Top' : 'Left'}`;
		if (typeof ret !== 'number') {
			const d = w.document;
			ret = d.documentElement[method];
			if (typeof ret !== 'number') {
				ret = d.body[method];
			}
		}
		return ret;
	},
	getScrollBarSize: function (fresh) {
		if (fresh || scrollBarCached === undefined) {
			const inner = document.createElement('div');
			inner.style.width = '100%';
			inner.style.height = '200px';

			const outer = document.createElement('div');
			const outerStyle = outer.style;

			outerStyle.position = 'absolute';
			outerStyle.top = 0;
			outerStyle.left = 0;
			outerStyle.pointerEvents = 'none';
			outerStyle.visibility = 'hidden';
			outerStyle.width = '200px';
			outerStyle.height = '150px';
			outerStyle.overflow = 'hidden';

			outer.appendChild(inner);

			document.body.appendChild(outer);

			const widthContained = inner.offsetWidth;
			outer.style.overflow = 'scroll';
			let widthScroll = inner.offsetWidth;

			if (widthContained === widthScroll) {
				widthScroll = outer.clientWidth;
			}

			document.body.removeChild(outer);

			scrollBarCached = widthContained - widthScroll;
		}
		return scrollBarCached;
	},
	setTransformOrigin: function (node, value) {
		const style = node.style;
		['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix) => {
			style[`${prefix}TransformOrigin`] = value;
		});
		style[`transformOrigin`] = value;
	},
	offset: function (el) {
		const rect = el.getBoundingClientRect();
		const pos = {
			left: rect.left,
			top: rect.top,
		};
		const doc = el.ownerDocument;
		const w = doc.defaultView || doc.parentWindow;
		pos.left += getScroll(w);
		pos.top += getScroll(w, true);
		return pos;
	}
}