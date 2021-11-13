const conf = require('../config');
const fs = require('fs');
const {promisify} = require('util');
const stat = promisify(fs.stat);
const md5String = promisify(require('nodejs-md5').string.quiet);



// 设置缓存
const handleCache = async (req, res, stats)=>{

  const {lastModified, cacheControl, eTag, expires} = conf.cache;
  //设置最后的修改文件的时间，LastModified
  if(lastModified){
    // 设置最后的修改时间
    let {mtime} = stats;
    mtime = mtime.toUTCString();
    res.setHeader('Last-Modified', mtime);
  }

  // 设置expires
  if(expires){
    let time = new Date().getTime() + 600 * 1000;
    res.setHeader('expires',  new Date(time).toUTCString());
  }

  // 设置cacheControl的缓存时间
  if(cacheControl > 0){
    res.setHeader('Cache-Control', `max-age=${cacheControl}`);
  }

  // 设置eTag
  if(eTag){
    // 构建一个etag
    let {mtime} = stats;
    mtime = new Date(mtime).getTime() + '';
    let md5Result = await md5String(mtime);
    
    res.setHeader('ETag', md5Result);
  }

}


// 判断缓存是否过期
module.exports = async (req, res, fullPath)=>{
  // 设置请求
  await handleCache(req, res, fullPath);

  const {lastModified, eTag} = conf.cache;

  // 判断lastModified
  if(lastModified){
    //取得最新的修改时间
    const newTime = res.getHeader('Last-Modified');
    //取得客户端的修改时间
    const clientTime = req.headers['if-modified-since'];
    // 判断
    console.log(newTime, clientTime);
    if(newTime === clientTime){
      return true;
    }else{
      return false;
    }
  }

  // 判断etag
  if(eTag){
    // 取得最新的etag
    let newETag = res.getHeader('ETag');
    // 取得客户端的etag
    let clientETag = req.headers['if-none-match'];
    console.log(newETag, clientETag);
    // 判断
    if(newETag == clientETag){
      return true;
    }else{
      return false;
    }
  }



}


