## fetch
```text
fetch是个promise对象
处理兼容性问题:https://github.com/camsong/fetch-ie8
注:fetch请求默认不带cookie,需要设置fetch(url,{credentials:'include'})
get请求
语法1(得到json对象):
fetch('路径')
    .then(res=>res.json())
    .then(res=>{console.log(res.data)})  
语法2(得到json字符串):
fetch('路径')
    .then(res=>res.json())
    .then(res=>{console.log(res.data)})  
post请求
语法1:
fetch('路径',{
  method:'post',
  headers:{
    'Content-Type':'application/x-www-from-urlenoded'
  },
  body:'name=xxx&age=18'
}).then(res=>res.json()).then(res=>{console.log(res)})
语法2:
fetch('路径',{
  method:'post',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    name:'xxx',
    age:18
  })
}).then(res=>res.json()).then(res=>{console.log(res)})
```

## axios
```text
axios 属于第三方，用之前需要先引入
get请求  语法:
axios.get('url').then(res=>{res.data.data})
post请求  语法:
axios.post('url','name=xxx&age=18')
axios.post('url',{name:'xxx',age:18})
```