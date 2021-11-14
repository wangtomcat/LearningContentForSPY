const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const ejs = require('ejs');
const conf = require('../config');
const MIME = require('../MIME');
const compress = require('../compress');
const range = require('../range');
const cache = require('../cache');


const templatePath = path.join(__dirname, '../template/folderTemplate.html');
const template = fs.readFileSync(templatePath).toString();

// 处理静态资源请求
module.exports = async (req, res, fullPath)=>{
  try {
    // 判断路径是文件还是文件夹
    const stats = await stat(fullPath);
    if(stats.isFile()){
      //是文件，读文件内容
      res.statusCode = 200;
      // 判断文件是否过期
      let stats = await stat(fullPath);
      const cacheResult = await cache(req, res, stats);
      console.log(2, cacheResult);
      if(cacheResult){
        res.statusCode = 304;
        res.end();
        return;
      }


      // 设置content-type
      MIME(req, res, fullPath);
      // 调用读取数据流的范围
      const {min: start, max: end} = await range(req, res, fullPath);
      // 压缩数据
      let rs = fs.createReadStream(fullPath, {
        start,
        end
      });
      rs = compress(req, res, fullPath, rs);
      rs.pipe(res);
      
    }else if(stats.isDirectory()){
      //是文件夹，读文件夹的子目录
      res.statusCode = 200;
      // 读文件夹的子目录
      let files = await readdir(fullPath);
      files = files.filter(item=>{
        return item !== '.DS_Store';
      });
      // 获得当前文件夹相对于开启服务的路径
      const currentPath = path.relative(conf.root, fullPath);
      // 渲染模版
      const result = ejs.render(template, {
        root: `/${currentPath}`,
        start: currentPath === '' ? '' : `/${currentPath}`,
        files
      });
      // 响应客户端
      res.setHeader('content-type', 'text/html; charset=utf-8');
      res.end(result);
    }
    
  } catch (error) {
    // 文件找不到的情况
    res.statusCode = 404;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    if(conf.env === 'product'){
      res.end('ENOENT: no such file or directory');
    }else if(conf.env === 'develop'){
      res.end(error.message);
      
    }
    console.log(error);
  }
}



