## 类写法
```text
语法: var obj = {
  return {}
}
   Vue.createApp(obj).mount('#box')

生命周期:
beforeCreate
created  
beforeMount  
mounted 
beforeUpdate  
updated  
beforeUnmount 
unMounted 
```

## Composition API
```text
语法变更: 
setup内定义属性时需要先引入相关方法(ref,toRefs,reactive,computed,watch等)
import { ref } from 'vue';

Watch: watch(()=> obj.myText,()=>{console.log('aaa')})
computed: const computedAdd = computed(()=>{})
生命周期: onMounted(() => {});
引入router:  import { useRouter } from 'vue-router';
             setup(){
               const router = useRouter();  router === this.$router
             }

Setup
1).setup在beforeCreate,create之前创建,所以没有this
2).在setup函数中定义的变量和方法最后都需要return 否则无法在模板中使用
3).setup有两个参数,第一个是props,用于接收传递的属性对象,第二个参数是context,其包含{attrs,slots,emit}属性(emit === $emit)

reactive: 通常用来定义一些比较复杂的数据类型,传递的参数必须是一个对象或是一个数组
ref: 通常传递的参数为基本数据类型,返回一个响应式ref对象
toRefs: 将某个对象中的属性转化成响应式ref对象
生命周期: 因为setup是围绕着beforeCreate和created运行的,其他的生命周期函数都需要写在setup中运行
onBeforeMount
onMounted
onBeforeUpdate
onUpdated
onBeforeUnmount
onUnmounted

Provide / Inject
在vue3中可以通过Provide/Inject方法来实现父子通信

```