const path = require('path');

const map = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ttf': 'font/ttf',
  '.png': 'image/png',
  //........
}

module.exports = (req, res, fullPath)=>{
  // 取文件后缀
  const extname = path.extname(fullPath);  
  // 根据后缀获得content-type
  const type = map[extname] || 'text/plain';
  // 设置content-type
  res.setHeader('content-type', type);
}