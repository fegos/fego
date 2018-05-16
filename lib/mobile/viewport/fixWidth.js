'use strict';

/**
 * 定宽方案
 * 例如：width=750
 * 视觉稿、页面宽度、viewport width 使用统一宽度，利用浏览器自身缩放完成适配。页面样式（包括图像元素）完全按照视觉稿的尺寸，使用定值单位 （px、em）即可完成。
 * 	对应 meta 标签写法 -- <meta name="viewport" content="target-densitydpi=device-dpi,width=750">
 *	该方法会提取 width 值，主动添加 scale 相关属性值。
 */
if (typeof window !== 'undefined') {
	(function (win, doc) {
		var metaEl = doc.querySelector('meta[name="viewport"]'),
		    metaCtt = metaEl ? metaEl.content : '',
		    matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
		    matchWidth = metaCtt.match(/width=([^,\s]+)/);
		if (!matchScale && matchWidth && matchWidth[1] != 'device-width') {
			// 定宽
			var width = parseInt(matchWidth[1]),
			    iw = win.innerWidth || width,
			    ow = win.outerWidth || iw,
			    sw = win.screen.width || iw,
			    saw = win.screen.availWidth || iw,
			    ih = win.innerHeight || width,
			    oh = win.outerHeight || ih,
			    ish = win.screen.height || ih,
			    sah = win.screen.availHeight || ih,
			    w = Math.min(iw, ow, sw, saw, ih, oh, ish, sah),
			    scale = w / width;

			if (scale < 1) {
				metaEl.content = metaCtt + ',' + fillScale(scale);
			}
		}
		function fillScale(scale) {
			return 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale;
		}
	})(window, document);
}