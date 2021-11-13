const {createGzip, createDeflate} = require('zlib');
const conf = require('../config');
const path = require('path');

module.exports = (req, res, fullPath, rs)=>{
  // 读取客户端可以压缩的格式有哪些
  const acceptEncoding = req.headers['accept-encoding'] || '';

  // 获得文件后缀
  const extname = path.extname(fullPath);
  // 判断是否是需要压缩的路径
  const item = conf.compress.find(item=>(extname === item));
  if(!item){
    //不压缩
    return rs;
  }
  else if(acceptEncoding.match(/\b(gzip)\b/)){
    // 压缩gzip
    res.setHeader('Content-Encoding', 'gzip');
    return rs.pipe(createGzip());
  }
  else if(acceptEncoding.match(/\b(deflate)\b/)){
    // 压缩delate
    res.setHeader('Content-Encoding', 'deflate');
    return rs.pipe(createDeflate());
  }
  else{
    // 客户端解析数据流不支持gzip或者deflate
    return rs;
  }
  
}



