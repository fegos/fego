'use strict';

/**
 * rem方案
 * https://github.com/amfe/article/issues/17
 * https://github.com/amfe/lib-flexible/blob/master/src/flexible.js
 * 通过Hack手段来根据设备的dpr值相应改变<meta>标签中viewport的值：
	<!-- dpr = 1-->
	<meta name="viewport" content="initial-scale=scale,maximum-scale=scale,minimum-scale=scale,user-scalable=no"> 
	<!-- dpr = 2-->
	<meta name="viewport" content="initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5,user-scalable=no">
	<!-- dpr = 3-->
	<meta name="viewport" content="initial-scale=0.3333333333,maximum-scale=0.3333333333,minimum-scale=0.3333333333,user-scalable=no">
	从而让页面达么缩放的效果，也变相的实现页面的适配功能。而其主要的思想有三点：

	1. 根据dpr的值来修改viewport实现1px的线
	2. 根据dpr的值来修改html的font-size，从而使用rem实现等比缩放
	3. 使用Hack手段用rem模拟vw特性
 */
if (typeof window !== 'undefined') {
    (function (win, lib) {
        var doc = win.document;
        var docEl = doc.documentElement;
        var metaEl = doc.querySelector('meta[name="viewport"]');
        var flexibleEl = doc.querySelector('meta[name="flexible"]');
        var dpr = 0;
        var scale = 0;
        var tid;
        var flexible = lib.flexible || (lib.flexible = {});

        if (metaEl) {
            console.warn('将根据已有的meta标签来设置缩放比例');
            var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
            if (match) {
                scale = parseFloat(match[1]);
                dpr = parseInt(1 / scale);
            }
        } else if (flexibleEl) {
            var content = flexibleEl.getAttribute('content');
            if (content) {
                var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
                var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
                if (initialDpr) {
                    dpr = parseFloat(initialDpr[1]);
                    scale = parseFloat((1 / dpr).toFixed(2));
                }
                if (maximumDpr) {
                    dpr = parseFloat(maximumDpr[1]);
                    scale = parseFloat((1 / dpr).toFixed(2));
                }
            }
        }

        if (!dpr && !scale) {
            var isAndroid = win.navigator.appVersion.match(/android/gi);
            var isIPhone = win.navigator.appVersion.match(/iphone/gi);
            var devicePixelRatio = win.devicePixelRatio;
            if (isIPhone) {
                // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
                if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                    dpr = 3;
                } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                    dpr = 2;
                } else {
                    dpr = 1;
                }
            } else {
                // 其他设备下，仍旧使用1倍的方案
                dpr = 1;
            }
            scale = 1 / dpr;
        }

        docEl.setAttribute('data-dpr', dpr);
        if (!metaEl) {
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
            if (docEl.firstElementChild) {
                docEl.firstElementChild.appendChild(metaEl);
            } else {
                var wrap = doc.createElement('div');
                wrap.appendChild(metaEl);
                doc.write(wrap.innerHTML);
            }
        }

        function refreshRem() {
            var width = docEl.getBoundingClientRect().width;
            if (width / dpr > 540) {
                width = 540 * dpr;
            }
            var rem = width / 10;
            docEl.style.fontSize = rem + 'px';
            flexible.rem = win.rem = rem;
        }

        win.addEventListener('resize', function () {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }, false);
        win.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        }, false);

        if (doc.readyState === 'complete') {
            doc.body.style.fontSize = 12 * dpr + 'px';
        } else {
            doc.addEventListener('DOMContentLoaded', function (e) {
                doc.body.style.fontSize = 12 * dpr + 'px';
            }, false);
        }

        refreshRem();

        flexible.dpr = win.dpr = dpr;
        flexible.refreshRem = refreshRem;
        flexible.rem2px = function (d) {
            var val = parseFloat(d) * this.rem;
            if (typeof d === 'string' && d.match(/rem$/)) {
                val += 'px';
            }
            return val;
        };
        flexible.px2rem = function (d) {
            var val = parseFloat(d) / this.rem;
            if (typeof d === 'string' && d.match(/px$/)) {
                val += 'rem';
            }
            return val;
        };
    })(window, window['lib'] || (window['lib'] = {}));
}