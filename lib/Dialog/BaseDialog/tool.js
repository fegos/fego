'use strict';

exports.__esModule = true;
var scrollBarCached = void 0;
exports.default = {
  noop: function noop() {},
  getScroll: function getScroll(w, top) {
    var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
    var method = 'scroll' + (top ? 'Top' : 'Left');
    if (typeof ret !== 'number') {
      var d = w.document;
      ret = d.documentElement[method];
      if (typeof ret !== 'number') {
        ret = d.body[method];
      }
    }
    return ret;
  },
  getScrollBarSize: function getScrollBarSize(fresh) {
    if (fresh || scrollBarCached === undefined) {
      var inner = document.createElement('div');
      inner.style.width = '100%';
      inner.style.height = '200px';

      var outer = document.createElement('div');
      var outerStyle = outer.style;

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

      var widthContained = inner.offsetWidth;
      outer.style.overflow = 'scroll';
      var widthScroll = inner.offsetWidth;

      if (widthContained === widthScroll) {
        widthScroll = outer.clientWidth;
      }

      document.body.removeChild(outer);

      scrollBarCached = widthContained - widthScroll;
    }
    return scrollBarCached;
  },
  setTransformOrigin: function setTransformOrigin(node, value) {
    var style = node.style;

    ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
      style[prefix + 'TransformOrigin'] = value;
    });
    style.transformOrigin = value;
  },
  offset: function offset(el) {
    var rect = el.getBoundingClientRect();
    var pos = {
      left: rect.left,
      top: rect.top
    };
    var doc = el.ownerDocument;
    var w = doc.defaultView || doc.parentWindow;
    pos.left += getScroll(w);
    pos.top += getScroll(w, true);
    return pos;
  }
};