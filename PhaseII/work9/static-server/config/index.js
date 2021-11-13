



let port = 8080;
let host = 'localhost';

process.argv.forEach(item=>{
  if(item.startsWith('--port=')){
    port = item.replace(/--port=/, '');
  }
  if(item.startsWith('--host=')){
    host = item.replace(/--host=/, '');
  }

})

module.exports = {
  port,
  hostname: host,
  root: process.cwd(),    
  env: 'develop',
  compress: ['.html', '.css', '.js'],
  cache: {
    expires: false,
    cacheControl: 0,
    lastModified: false,
    eTag: true
  }
}