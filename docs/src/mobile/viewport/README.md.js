webpackJsonp([4],{474:function(e,i){e.exports={content:["article",["h1","\u79fb\u52a8\u7aef\u5c4f\u5e55\u9002\u914d"],["p",["a",{title:null,href:"https://www.w3cplus.com/css/vw-for-layout.html"},"https://www.w3cplus.com/css/vw-for-layout.html"],"\n",["a",{title:null,href:"https://zhuanlan.zhihu.com/p/25216275"},"https://zhuanlan.zhihu.com/p/25216275"]],["h2","\u540d\u8bcd\u6982\u5ff5\uff1a"],["h3","\u8bbe\u5907\u50cf\u7d20\uff08Device Pixels\uff09\uff1a"],["p","\u8bbe\u5907\u5c4f\u5e55\u7684\u7269\u7406\u50cf\u7d20\uff0c\u5355\u4f4d\u662fpx\uff0c\u6bd4\u5982iPhone6\u7684750x1334px"],["h3","\u903b\u8f91\u50cf\u7d20\uff08CSS Pixels\uff09\uff1a"],["p","\u662fWeb\u7f16\u7a0b\u7684\u6982\u5ff5\uff0c\u6307\u7684\u662fCSS\u6837\u5f0f\u4ee3\u7801\u4e2d\u4f7f\u7528\u7684\u903b\u8f91\u50cf\u7d20"],["h3","\u50cf\u7d20\u5bc6\u5ea6\uff1a"],["p","\u4e5f\u53eb\u663e\u793a\u5bc6\u5ea6\u6216\u8005\u5c4f\u5e55\u5bc6\u5ea6\uff0c\u7f29\u5199\u4e3aDPI(Dots Per Inch)\u6216\u8005PPI(Pixel Per Inch)\u3002\u6bcf\u82f1\u5bf8\u70b9\u6570=\u5c4f\u5e55\u5bf9\u89d2\u7ebf\u7684\u50cf\u7d20 / \u5c4f\u5e55\u5bf9\u89d2\u7ebf\u7684\u5c3a\u5bf8\uff08inch\uff09"],["h3","DPR\uff1a"],["p","\u8bbe\u5907\u50cf\u7d20\u6bd4(devicePixelRatio)\u662f\u9ed8\u8ba4\u7f29\u653e\u4e3a100%\u7684\u60c5\u51b5\u4e0b\uff0c\u8bbe\u5907(\u7269\u7406)\u50cf\u7d20\u548c\u903b\u8f91(CSS)\u50cf\u7d20\u7684\u6bd4\u503c\n\u4ee5iphone5\u4e3a\u4f8b\uff0ciphone5\u7684\u903b\u8f91\u50cf\u7d20\u4e3a320px",["em","568px\uff0cDPR\u662f2\uff0c\u8bbe\u5907\u50cf\u7d20\u4e3a640px"],"1136px"],["h2","\u89c6\u53e3\uff08viewport\uff09\uff1a"],["h3","\u5e03\u5c40\u89c6\u53e3"],["h3","\u89c6\u89c9\u89c6\u53e3"],["h3","\u7406\u60f3\u89c6\u53e3\uff08width=device-width\uff09"],["h2","\u9002\u914d\u65b9\u6848"],["h3","vw\u65b9\u6848"],["p","\u4e3b\u6d41\u65b9\u6848"],["h3","\u7279\u70b9"],["ol",["li",["p","\u4f7f\u7528vw\u6765\u5b9e\u73b0\u9875\u9762\u7684\u9002\u914d\uff0c\u5e76\u4e14\u901a\u8fc7PostCSS\u7684\u63d2\u4ef6postcss-px-to-viewport\u628apx\u8f6c\u6362\u6210vw\u3002\u8fd9\u6837\u7684\u597d\u5904\u662f\uff0c\u6211\u4eec\u5728\u64b8\u7801\u7684\u65f6\u5019\uff0c\u4e0d\u9700\u8981\u8fdb\u884c\u4efb\u4f55\u7684\u8ba1\u7b97\uff0c\u4f60\u53ea\u9700\u8981\u6839\u636e\u8bbe\u8ba1\u56fe\u5199px\u5355\u4f4d"]],["li",["p","\u4e3a\u4e86\u66f4\u597d\u7684\u5b9e\u73b0\u957f\u5bbd\u6bd4\uff0c\u7279\u522b\u662f\u9488\u5bf9\u4e8eimg\u3001vedio\u548ciframe\u5143\u7d20\uff0c\u901a\u8fc7PostCSS\u63d2\u4ef6postcss-aspect-ratio-mini\u6765\u5b9e\u73b0\uff0c\u5728\u5b9e\u9645\u4f7f\u7528\u4e2d\uff0c\u53ea\u9700\u8981\u628a\u5bf9\u5e94\u7684\u5bbd\u548c\u9ad8\u5199\u8fdb\u53bb\u5373\u53ef"]],["li",["p","\u4e3a\u4e86\u89e3\u51b31px\u7684\u95ee\u9898\uff0c\u4f7f\u7528PostCSS\u63d2\u4ef6postcss-write-svg,\u81ea\u52a8\u751f\u6210border-image\u6216\u8005background-image\u7684\u56fe\u7247"]]],["pre",{lang:"js",highlighted:'<span class="token operator">&lt;</span>meta name<span class="token operator">=</span><span class="token string">"viewport"</span> content<span class="token operator">=</span><span class="token string">"width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"</span> <span class="token operator">/</span><span class="token operator">></span>'},["code",'<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />']],["h4","\u964d\u7ea7\u5904\u7406"],["p","2015\u5e74top30\u673a\u578b\u4e2d\u8fd8\u6709\u51e0\u6b3e\u673a\u578b\u662f\u4e0d\u652f\u6301vw\u7684\u9002\u914d\u65b9\u6848\u3002\u90a3\u4e48\u5982\u679c\u4e1a\u52a1\u9700\u8981\uff0c\u5e94\u8be5\u600e\u4e48\u5904\u7406\u5462\uff1f\u6709\u4e24\u79cd\u65b9\u5f0f\u53ef\u4ee5\u8fdb\u884c\u964d\u7ea7\u5904\u7406\uff1a"],["ul",["li",["p","CSS Houdini\uff1a\u901a\u8fc7CSS Houdini\u9488\u5bf9vw\u505a\u5904\u7406\uff0c\u8c03\u7528CSS Typed OM Level1 \u63d0\u4f9b\u7684CSSUnitValue API\u3002"]],["li",["p","CSS Polyfill\uff1a\u901a\u8fc7\u76f8\u5e94\u7684Polyfill\u505a\u76f8\u5e94\u7684\u5904\u7406\uff0c\u76ee\u524d\u9488\u5bf9\u4e8evw\u5355\u4f4d\u7684Polyfill\u4e3b\u8981\u6709\uff1avminpoly\u3001Viewport Units Buggyfill\u3001vunits.js\u548cModernizr\u3002\u4e2a\u4eba\u63a8\u8350\u91c7\u7528Viewport Units Buggyfill"]]],["h3","rem\u65b9\u6848"],["p","\u4f9d\u7167\u67d0\u7279\u5b9a\u5bbd\u5ea6\u8bbe\u5b9a rem \u503c\uff08\u5373 html \u7684 font-size\uff09\uff0c\u9875\u9762\u4efb\u4f55\u9700\u8981\u5f39\u6027\u9002\u914d\u7684\u5143\u7d20\uff0c\u5c3a\u5bf8\u5747\u6362\u7b97\u4e3a rem \u8fdb\u884c\u5e03\u5c40\uff1b\u5f53\u9875\u9762\u6e32\u67d3\u65f6\uff0c\u6839\u636e\u9875\u9762\u6709\u6548\u5bbd\u5ea6\u8fdb\u884c\u8ba1\u7b97\uff0c\u8c03\u6574 rem \u7684\u5927\u5c0f\uff0c\u52a8\u6001\u7f29\u653e\u4ee5\u8fbe\u5230\u9002\u914d\u7684\u6548\u679c\u3002\u5229\u7528\u8be5\u65b9\u6848\uff0c\u8fd8\u53ef\u4ee5\u6839\u636e devicePixelRatio \u8bbe\u5b9a initial-scale \u6765\u653e\u5927 viewport\uff0c\u4f7f\u9875\u9762\u6309\u7167\u7269\u7406\u50cf\u7d20\u6e32\u67d3\uff0c\u63d0\u5347\u6e05\u6670\u5ea6\u3002"],["h3","\u5b9a\u5bbd\u65b9\u6848"],["p","width=750\uff0c\u89c6\u89c9\u7a3f\u3001\u9875\u9762\u5bbd\u5ea6\u3001viewport width \u4f7f\u7528\u7edf\u4e00\u5bbd\u5ea6\uff0c\u5229\u7528\u6d4f\u89c8\u5668\u81ea\u8eab\u7f29\u653e\u5b8c\u6210\u9002\u914d\u3002\u9875\u9762\u6837\u5f0f\uff08\u5305\u62ec\u56fe\u50cf\u5143\u7d20\uff09\u5b8c\u5168\u6309\u7167\u89c6\u89c9\u7a3f\u7684\u5c3a\u5bf8\uff0c\u4f7f\u7528\u5b9a\u503c\u5355\u4f4d \uff08px\u3001em\uff09\u5373\u53ef\u5b8c\u6210\u3002"],["h3","\u5b9a\u9ad8\u65b9\u6848"],["p","width=device-width\uff0c\u76d2\u5b50css\u4f7f\u7528px\uff0c\u5927\u5c4f\u7a00\u677e\uff0c\u5c0f\u5c4f\u62e5\u6324"]],meta:{filename:"src/mobile/viewport/README.md"},toc:["ul",["li",["a",{className:"bisheng-toc-h1",href:"#\u79fb\u52a8\u7aef\u5c4f\u5e55\u9002\u914d",title:"\u79fb\u52a8\u7aef\u5c4f\u5e55\u9002\u914d"},"\u79fb\u52a8\u7aef\u5c4f\u5e55\u9002\u914d"]],["li",["a",{className:"bisheng-toc-h2",href:"#\u540d\u8bcd\u6982\u5ff5\uff1a",title:"\u540d\u8bcd\u6982\u5ff5\uff1a"},"\u540d\u8bcd\u6982\u5ff5\uff1a"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u8bbe\u5907\u50cf\u7d20\uff08Device-Pixels\uff09\uff1a",title:"\u8bbe\u5907\u50cf\u7d20\uff08Device Pixels\uff09\uff1a"},"\u8bbe\u5907\u50cf\u7d20\uff08Device Pixels\uff09\uff1a"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u903b\u8f91\u50cf\u7d20\uff08CSS-Pixels\uff09\uff1a",title:"\u903b\u8f91\u50cf\u7d20\uff08CSS Pixels\uff09\uff1a"},"\u903b\u8f91\u50cf\u7d20\uff08CSS Pixels\uff09\uff1a"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u50cf\u7d20\u5bc6\u5ea6\uff1a",title:"\u50cf\u7d20\u5bc6\u5ea6\uff1a"},"\u50cf\u7d20\u5bc6\u5ea6\uff1a"]],["li",["a",{className:"bisheng-toc-h3",href:"#DPR\uff1a",title:"DPR\uff1a"},"DPR\uff1a"]],["li",["a",{className:"bisheng-toc-h2",href:"#\u89c6\u53e3\uff08viewport\uff09\uff1a",title:"\u89c6\u53e3\uff08viewport\uff09\uff1a"},"\u89c6\u53e3\uff08viewport\uff09\uff1a"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u5e03\u5c40\u89c6\u53e3",title:"\u5e03\u5c40\u89c6\u53e3"},"\u5e03\u5c40\u89c6\u53e3"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u89c6\u89c9\u89c6\u53e3",title:"\u89c6\u89c9\u89c6\u53e3"},"\u89c6\u89c9\u89c6\u53e3"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u7406\u60f3\u89c6\u53e3\uff08width=device-width\uff09",title:"\u7406\u60f3\u89c6\u53e3\uff08width=device-width\uff09"},"\u7406\u60f3\u89c6\u53e3\uff08width=device-width\uff09"]],["li",["a",{className:"bisheng-toc-h2",href:"#\u9002\u914d\u65b9\u6848",title:"\u9002\u914d\u65b9\u6848"},"\u9002\u914d\u65b9\u6848"]],["li",["a",{className:"bisheng-toc-h3",href:"#vw\u65b9\u6848",title:"vw\u65b9\u6848"},"vw\u65b9\u6848"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u7279\u70b9",title:"\u7279\u70b9"},"\u7279\u70b9"]],["li",["a",{className:"bisheng-toc-h4",href:"#\u964d\u7ea7\u5904\u7406",title:"\u964d\u7ea7\u5904\u7406"},"\u964d\u7ea7\u5904\u7406"]],["li",["a",{className:"bisheng-toc-h3",href:"#rem\u65b9\u6848",title:"rem\u65b9\u6848"},"rem\u65b9\u6848"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u5b9a\u5bbd\u65b9\u6848",title:"\u5b9a\u5bbd\u65b9\u6848"},"\u5b9a\u5bbd\u65b9\u6848"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u5b9a\u9ad8\u65b9\u6848",title:"\u5b9a\u9ad8\u65b9\u6848"},"\u5b9a\u9ad8\u65b9\u6848"]]]}}});