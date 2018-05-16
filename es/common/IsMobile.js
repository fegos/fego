'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function IsMobile() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf('android') !== -1 || ua.indexOf('iphone') !== -1) {
    return true;
  }
  return false;
}

exports.default = IsMobile();
// export default IsMobile;