module.exports = {
  port: 8080,
  hostname: 'localhost',
  root: process.cwd(),    
  env: 'develop',
  compress: ['.html', '.css', '.js'],
  cache: {
    expires: true,
    cacheControl: -1,
    lastModified: false,
    eTag: true
  }
}

// process.argv