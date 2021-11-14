const fs = require('fs');
const {promisify} = require('util');
const stat = promisify(fs.stat);

module.exports = async (req, res, fullPath)=>{
  // range: bytes=100-50
  const {size} = await stat(fullPath);  //文件的字节总大小
  const range = req.headers['range'] || '';
  const sizes = range.match(/bytes=(\d*)-(\d*)/);
  console.log(range);
  
  if(!sizes){
    //没有设置range
    return {
      min: 0,
      max: size
    }
  }

  let min = Number(sizes[1] || 0);
  let max = Number(sizes[2] || size);
  // 控制最小值
  if(min < 0){
    min = 0;
  }
  // 控制最大值
  if(max > size){
    max = size;
  }
  // 不合理的范围取所有
  if(min > max){
    min = 0;
    max = size;
  }

  // 设置分段传输的头部
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Range', `bytes ${min}-${max}/${size}`);
  res.setHeader('Content-Length', max-min);

  return {
    min,
    max
  }
}



