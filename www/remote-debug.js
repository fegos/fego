const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer({})

http.createServer(function(req, res) {
  proxy.web(req, res, { target: 'http://127.0.0.1:3300' });
}).listen(8888)

console.log('remote debug server started on 127.0.0.1:8888');
