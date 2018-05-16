# URL 工具集 #
---
url操作相关静态函数集合，默认扩展到命名空间 window.URL 上，同时支持 amd 方式输出。

## URL.para2Obj(urlPara) ##
urlPara中的参数串转换成参数对象

## URL.getPara ##
获取指定url字符串中某个参数的值。

##### URL.getPara( [url,] para )
- url 可选，默认是 document.URL
- para 必选，指定要获取参数的key，如果para === true，则返回所有参数的描述对象

## URL.getHash ##
获取指定url字符串的hash（#号之后的内容）值中某个参数的值。更丰富的hash操作可见 `fe/storage/hash` 组件。

##### URL.getHash( [url,] para )

- url 可选，默认是 document.URL
- para 必选，指定要获取参数的key，如果para === true，则返回所有参数的描述对象

## URL.removePara ##
从指定的url字符串中删除某个（或某些）参数，返回一个新的url字符串。

##### URL.removePara( [url,] paras )

- url 可选，默认是 document.URL
- paras 必选，指定要删除的参数，或参数数组，比如 比如 "id" 或 ["name","id"]，如果 paras === true，则删除url中所有的参数

## URL.addPara ##
将指定的参数追加到指定的url中，返回一个新的url字符串。

##### URL.addPara( [url,] para [,removeSamePara] )
- url 可选，默认是 document.URL
- para 必选，要追加到url中的参数字符串或对象，比如 "id=2&name=test"，或者 {id:2,name:"test"}
- removeSamePara 可选，添加参数之前是否先移除同名的参数，默认false

## URL.getInfo( [url] ) ##
分析指定url中的详细信息，返回一个类似 location对象的描述对象。

##### URL.getInfo( [url] )
- url 可选，默认是 document.URL

返回的的对象类似下面这个：

	{
		href: "http://tools.com:8031/test/path/file.html?id=2#name=test",
        origin: "http://tools.com",
        protocol: "http:",
        username: "",
        password: "",
        host: "tools.com",
        hostname: "tools.com",
        port: "8031",
        pathname: "/test/path/file.html",
        search: "?id=2",
        hash: "#name=test"
	}

## URL.getFullPath ##
将指定的url转化为绝对路径，并可以指定参考路径。

##### URL.getFullPath( url [,basePath] )
- url 必选，要处理和转化的url地址
- basePath 可选，要参考的url地址，默认是当前页面 document.URL

url可以是以下格式：
	
	//已经是完整路径的地址
	"http://xxx.com/"
	"//xxx.com/yyy"

	//相对路径地址
	"/start/from/root/xxx"
	"start/from/basePath/yyy"
