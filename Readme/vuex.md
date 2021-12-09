## vue-x
```text
概念:用来储存一些共享的状态和方法
vuex组成部分:
state: 用来储存全局的状态
mutations:用来储存修改state中的状态的方法,支持同步
          外部组件通过this.$store.commit('方法名')来调用mutations中的方法
actions: 常用来储存调取接口的方法,然后通过调用mutations中的方法来修改state中的状态值支持异步,同步
         外部组件通过this.$store.dispatch('方法名',参数)来调用actions中的方法
modules

vuex 新写法
原理:将store中的状态和方法copy到当前组件内
组件内引入vuex方法
import {mapState,mapActions,mapMutations} from 'vuex'
export default{
  data(){
    return {
      ...mapState(['状态名'])
    }
  },
  methods:{
    ...mapActions(['方法名']),
    ...mapMutations(['方法名'])
  }
}

vuex持久化: vuex-persistedstate
原理:每次更新完数据后在本地储存相关数据
注:return内的数据才会被储存
使用方法: 在store中引入
import createPersistedState from 'vuex-persistedstate'
plugins:[createPersistedState({
  reducer:(state) => {
    return {
      cityName:'xxx',
      cityId:'10010',
    }
  }
})]
```