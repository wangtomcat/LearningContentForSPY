## router
```text
原理:监听路径的改变,每次路径改变时将路径相应的组件创建出来并显示
1）hash路由 => location.hash 切换路径
              window.onHashChange 监听路径的切换
2）history路由 => history.pushState 切换路径
                 window.onPopState 监听路径的切换

重定向: redirect

声明式导航: <router-link :to="...">
旧写法:
<router-link to="/Films" tag="li" active-class="active">电影</router-link>
新写法:
<router-link to="/center" custom v-slot="{ navigate, isActive }">
  <div @click="navigate" :class="isActive ? 'active' : ''">我的</div>
</router-link>

嵌套式路由: 在需要嵌套的路由参数中使用children配置子组件路径

编程式导航: this.$router.push('path')
注: this.$router 获取整个router对象
    this.$route 获取当前页面的路由

动态路由: 使用:id来自标记一个子路径,通过this.$route.params来获取id的值

路由模式:  mode: 'history' & mode: 'hash'(默认,路径中带#)

路由懒加载: 将component 赋值为一个函数,返回值为import('path')
```