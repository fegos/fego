function IsMobile() {
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf('android') !== -1 || ua.indexOf('iphone') !== -1) {
    return true;
  }
  return false;
}

export default IsMobile();
// export default IsMobile;
