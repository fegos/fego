/**
 * vw方案
 * 降级补丁
 * https://github.com/rodneyrehm/viewport-units-buggyfill
 */
if (typeof window !== 'undefined') {
	require('viewport-units-buggyfill').init();
}