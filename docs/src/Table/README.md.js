webpackJsonp([5],{473:function(n,t){n.exports={content:["article",["h1","\u8868\u683c Table"],["h3","\u7ec4\u4ef6\u63cf\u8ff0"],["ul",["li",["p","\u7528\u4e8e\u5c55\u793a\u884c\u5217\u6570\u636e"]],["li",["p","\u53ef\u4ee5\u5bf9\u6570\u636e\u8fdb\u884c\u6392\u5e8f\u3001\u5206\u9875\u3001\u7b49\u64cd\u4f5c\uff0c\u4ee5\u65b9\u4fbf\u67e5\u770b\u8868\u683c\u6570\u636e"]],["li",["p","\u672c\u7ec4\u4ef6\u53ea\u9002\u7528\u4e8eweb\u7aef\uff0c\u79fb\u52a8\u7aef\u4e0d\u5efa\u8bae\u4f7f\u7528Table\u5c55\u793a\u6570\u636e"]]],["h3","\u793a\u4f8b\u4ee3\u7801"],["pre",{lang:"js",highlighted:'<span class="token operator">&lt;</span>Table columns<span class="token operator">=</span><span class="token punctuation">{</span>columns<span class="token punctuation">}</span> dataSource<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n<span class="token operator">&lt;</span>Table columns<span class="token operator">=</span><span class="token punctuation">{</span>columns2<span class="token punctuation">}</span> dataSource<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>dataSource<span class="token punctuation">}</span> loading<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>loading<span class="token punctuation">}</span> tfootData<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'asy\'</span><span class="token punctuation">,</span>\n  age<span class="token punctuation">:</span> <span class="token string">\'20\'</span><span class="token punctuation">,</span>\n  sex<span class="token punctuation">:</span> <span class="token string">\'female\'</span><span class="token punctuation">,</span>\n  company<span class="token punctuation">:</span> <span class="token string">\'fego\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">}</span> pagination<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n  total<span class="token punctuation">:</span> <span class="token number">13</span><span class="token punctuation">,</span>\n  page<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>page<span class="token punctuation">,</span>\n  showTotal<span class="token punctuation">:</span> <span class="token punctuation">(</span>total<span class="token punctuation">,</span> range<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token template-string"><span class="token string">`\u5171</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>total<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\u6761\u6570\u636e\uff0c\u663e\u793a</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>range<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>range<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">\u6761`</span></span>\n<span class="token punctuation">}</span><span class="token punctuation">}</span> onChange<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span>pagination<span class="token punctuation">,</span> sorter<span class="token punctuation">,</span> filters<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>'},["code","<Table columns={columns} dataSource={[]} />\n<Table columns={columns2} dataSource={this.state.dataSource} loading={this.state.loading} tfootData={{\n  name: 'asy',\n  age: '20',\n  sex: 'female',\n  company: 'fego'\n}} pagination={{\n  total: 13,\n  page: this.state.page,\n  showTotal: (total, range) => `\u5171${total}\u6761\u6570\u636e\uff0c\u663e\u793a${range[0]}-${range[1]}\u6761`\n}} onChange={(pagination, sorter, filters) => {}} />"]],["h2","API"],["h3","props\u5217\u8868"],["table",["thead",["tr",["th","\u5c5e\u6027"],["th","\u8bf4\u660e"],["th","\u7c7b\u578b"],["th","\u9ed8\u8ba4\u503c"]]],["tbody",["tr",["td","columns"],["td","\u8868\u683c\u5217\u7684\u914d\u7f6e\u63cf\u8ff0"],["td","array",["span","object"]],["td","[]"]],["tr",["td","dataSource"],["td","\u8868\u683c\u6570\u636e"],["td","array",["span","object"]],["td","[]"]],["tr",["td","showHeader"],["td","\u662f\u5426\u663e\u793a\u8868\u5934"],["td","bool"],["td","true"]],["tr",["td","tfootData"],["td","\u8868\u5c3e\u6570\u636e\uff0c\u53ef\u7528\u4e8e\u653e\u4e00\u4e9b\u5408\u8ba1\u7c7b\u6570\u636e"],["td","object"],["td"]],["tr",["td","title"],["td","\u5934\u90e8\u6807\u9898"],["td","function(){}"],["td"]],["tr",["td","footer"],["td","\u5c3e\u90e8\u6807\u9898"],["td","function(){}"],["td"]],["tr",["td","loading"],["td","\u662f\u5426\u52a0\u8f7d\u4e2d"],["td","bool"],["td","false"]],["tr",["td","pagination"],["td","\u5206\u9875\u5668"],["td","object/bool"],["td","false"]],["tr",["td","rowKey"],["td","\u8868\u683c\u884c key \u7684\u53d6\u503c, \u5f53\u662f\u51fd\u6570\u65f6\uff0c\u53c2\u6570\u4e3a record, index"],["td","string/function(record, index){}"],["td"]],["tr",["td","onChange"],["td","\u5206\u9875\u3001\u6392\u5e8f\u3001\u7b5b\u9009\u53d8\u5316\u65f6\u89e6\u53d1"],["td","function(pagination, sorter, filter){}"],["td"]],["tr",["td","rowClassName"],["td","\u8868\u683c\u884c\u7684\u7c7b\u540d"],["td","string"],["td"]],["tr",["td","rowSelection"],["td","\u5217\u8868\u9879\u662f\u5426\u53ef\u9009\u62e9"],["td","object"],["td","null"]],["tr",["td","emptyText"],["td","\u65e0\u6570\u636e\u65f6\u7684\u63d0\u793a\u6587\u6848"],["td","string"],["td","'Ops\u2026\u6682\u65e0\u6570\u636e'"]]]],["h3","columns"],["h3","props\u5217\u8868"],["table",["thead",["tr",["th","\u5c5e\u6027"],["th","\u8bf4\u660e"],["th","\u7c7b\u578b"],["th","\u9ed8\u8ba4\u503c"]]],["tbody",["tr",["td","title"],["td","\u5217\u5934\u663e\u793a\u6587\u5b57"],["td","string"],["td"]],["tr",["td","key"],["td","React \u9700\u8981\u7684 key\uff0c\u8bbe\u7f6e\u4e86\u552f\u4e00\u7684 dataIndex\uff0c\u53ef\u4ee5\u5ffd\u7565"],["td","string"],["td"]],["tr",["td","dataIndex"],["td","\u5217\u6570\u636e\u5728\u6570\u636e\u9879\u4e2d\u5bf9\u5e94\u7684 key"],["td","string"],["td"]],["tr",["td","render"],["td","\u6e32\u67d3\u51fd\u6570"],["td","function(text, record, index) {}"],["td"]],["tr",["td","className"],["td","\u5217\u7c7b"],["td","string"],["td"]],["tr",["td","sorter"],["td","\u6392\u5e8f\u51fd\u6570\uff0c\u672c\u5730\u6392\u5e8f:function(a, b){}\uff0c\u670d\u52a1\u7aef\u6392\u5e8f:true"],["td"],["td"]]]],["h3","pagination"],["ul",["li",["p","Pagination = false : \u4e0d\u663e\u793a\u5206\u9875\u6761\uff0c\u5c55\u793a\u5168\u90e8\u6570\u636e"]],["li",["p","Pagination = true : \u663e\u793a\u5206\u9875\u6761\uff0c\u540e\u53f0\u7ed9\u5168\u90e8\u6570\u636e\uff0c\u524d\u7aef\u8fdb\u884c\u5206\u9875"]],["li",["p","Pagination = object : \u663e\u793a\u5206\u9875\u6761\uff0c\u7531\u540e\u7aef\u5206\u9875"],["ul",["li",["p","\u65e0 page \u5c5e\u6027\uff1a\u4f7f\u7528\u975e\u53d7\u63a7\u5c5e\u6027 defaultPage"]],["li",["p","\u6709 page \u5c5e\u6027\uff1a\u4f7f\u7528\u53d7\u63a7\u5c5e\u6027 page, \u9700\u642d\u914d onChange \u4f7f\u7528"]],["li",["p","pageSize \u540c\u7406"]]]]],["h3","props\u5217\u8868"],["p","\u5177\u4f53\u89c1 Pagination \u7ec4\u4ef6"],["h3","rowSelection"],["h3","props\u5217\u8868"],["table",["thead",["tr",["th","\u5c5e\u6027"],["th","\u8bf4\u660e"],["th","\u7c7b\u578b"],["th","\u9ed8\u8ba4\u503c"]]],["tbody",["tr",["td","type"],["td","\u591a\u9009/\u5355\u9009"],["td","'checkbox' or 'radio'"],["td","'checkbox'"]],["tr",["td","selectedRowKeys"],["td","\u6307\u5b9a\u9009\u4e2d\u9879\u7684 key \u6570\u7ec4\uff0c\u9700\u8981\u548c onChange \u8fdb\u884c\u914d\u5408"],["td","array"],["td","[]"]],["tr",["td","onChange"],["td","\u9009\u4e2d\u9879\u53d1\u751f\u53d8\u5316\u7684\u65f6\u7684\u56de\u8c03"],["td","function(selectedRowKeys, selectedRows){}"],["td"]],["tr",["td","onSelect"],["td","\u9009\u62e9/\u53d6\u6d88\u9009\u62e9\u67d0\u5217\u7684\u56de\u8c03"],["td","function(selected, record, selectedRows){}"],["td"]],["tr",["td","onSelectAll"],["td","\u9009\u62e9/\u53d6\u6d88\u9009\u62e9\u6240\u6709\u5217\u7684\u56de\u8c03"],["td","function(selected, selectedRows, changedRows){}"],["td"]],["tr",["td","getCheckboxProps"],["td","\u9009\u62e9\u6846\u7684\u9ed8\u8ba4\u5c5e\u6027\u914d\u7f6e"],["td","function(record){}"],["td"]]]]],meta:{title:"Table",subTitle:"\u8868\u683c",filename:"src/Table/README.md"},toc:["ul",["li",["a",{className:"bisheng-toc-h1",href:"#\u8868\u683c-Table",title:"\u8868\u683c Table"},"\u8868\u683c Table"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u7ec4\u4ef6\u63cf\u8ff0",title:"\u7ec4\u4ef6\u63cf\u8ff0"},"\u7ec4\u4ef6\u63cf\u8ff0"]],["li",["a",{className:"bisheng-toc-h3",href:"#\u793a\u4f8b\u4ee3\u7801",title:"\u793a\u4f8b\u4ee3\u7801"},"\u793a\u4f8b\u4ee3\u7801"]],["li",["a",{className:"bisheng-toc-h2",href:"#API",title:"API"},"API"]],["li",["a",{className:"bisheng-toc-h3",href:"#props\u5217\u8868",title:"props\u5217\u8868"},"props\u5217\u8868"]],["li",["a",{className:"bisheng-toc-h3",href:"#columns",title:"columns"},"columns"]],["li",["a",{className:"bisheng-toc-h3",href:"#props\u5217\u8868",title:"props\u5217\u8868"},"props\u5217\u8868"]],["li",["a",{className:"bisheng-toc-h3",href:"#pagination",title:"pagination"},"pagination"]],["li",["a",{className:"bisheng-toc-h3",href:"#props\u5217\u8868",title:"props\u5217\u8868"},"props\u5217\u8868"]],["li",["a",{className:"bisheng-toc-h3",href:"#rowSelection",title:"rowSelection"},"rowSelection"]],["li",["a",{className:"bisheng-toc-h3",href:"#props\u5217\u8868",title:"props\u5217\u8868"},"props\u5217\u8868"]]]}}});