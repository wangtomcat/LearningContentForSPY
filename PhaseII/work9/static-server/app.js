const http = require('http');
const url = require('url');
const path = require('path');
const qs = require('querystring');
const chalk = require('chalk');
const conf = require('./config');
const routes = require('./routes');

// 创建服务
const server = http.createServer();


// 监听客户端的请求
server.on('request', (req, res)=>{
  // 处理请求路径
  const {pathname} = url.parse(req.url);
  // 根据请求路径，获得静态资源所在系统中的绝对路径
  let fullPath = path.join(conf.root, pathname);
  fullPath = qs.unescape(fullPath);
  
  // 处理请求
  routes(req, res, fullPath);
  


})


// 启动服务监听
server.listen(conf.port, conf.hostname, (error)=>{
  if(error) throw error;
  const serverPath = `http://${conf.hostname}:${conf.port}`;
  console.log(`static server is listening: ${chalk.green(serverPath)}`);
})


