const {createGzip, createDeflate} = require('zlib');
const conf = require('../config');
const path = require('path');

module.exports = (req, res, fullPath, rs)=>{
  // 读取客户端可以压缩的格式有哪些
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const result = acceptEncoding.match(/\b(gzip|deflate)\b/);

  // 获得文件后缀
  const extname = path.extname(fullPath);
  const item = conf.compress.find(item=>(extname === item));
  if(!result || !item){
    //不压缩
    console.log(fullPath, '不压缩');
    return rs;
  }
  return rs;

  // else if(acceptEncoding.match(/\b(gzip)\b/)){
  //   // 压缩gzip
  //   res.setHeader('Content-Encoding', 'gzip');
  //   return rs.pipe(createGzip());
  // }
  // else if(acceptEncoding.match(/\b(deflate)\b/)){
  //   // 压缩delate
  //   res.setHeader('Content-Encoding', 'deflate');
  //   return rs.pipe(createDeflate());
  // }
  
}



