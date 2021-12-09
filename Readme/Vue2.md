## 模板语法
```text
Vue实例(vue2)
每个Vue应用都是通过用Vue函数创建一个新的Vue实例开始的
语法: new vue({
  el:'#id'   绑定元素
  data:{},   相关属性
    methods:{},  相关方法
    watch:{},
    computed:{},  计算属性
  }
)

ii.插值
1.文本{{}},将数据解释为普通文本
例:<div>{{name}}</div>
  输出的内容为name对应的值
2.纯HTML  v-html，输出真正的html，可编译代码
例:<span v-html="name"></span>
  输出的内容为name对应的值

iii.指令
带有v-前缀的特殊属性
v-bind(缩写:)  动态绑定属性  例:v-bind:src='' / :src=''
v-if  动态创建/删除
v-show  动态显示/隐藏
v-on(缩写:@)  绑定事件  例:v-on:click / @click
v-for  遍历
v-model  双向绑定表单  添加给input则表示value值
```

## class与style绑定
```text
i.通过对象绑定
obj{
  aa:true,
  bb:false,
  cc:true
}
修改: obj.aa = false
bug:初始化之后添加的属性不会拦截
vue2解决方案: Vue.set(对象，属性，true)  例:Vue.set(obj,'dd',true)

ii.通过数组绑定
arr['aa','bb']
修改: arr.push('cc') / arr.splice(开始位置,删除个数)
```

## 条件渲染
```text
v-if 如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
     如果在运行时条件很少改变，使用 v-if 较好   
语法:v-if / v-else-if / v-else
template标签用于包裹元素,最终的渲染结果不包含 <template> 元素。

v-show 不管初始条件是什么，元素总是会被渲染，当条件为假时隐藏。
     如果需要非常频繁地切换，使用 v-show 较好
```

## 列表渲染
```text
遍历时in/of效果相同
key:跟踪每个节点的身份,从而复用和重新排序当前元素,每个元素的key值都要有且值是唯一的

数组更新检测
i.以下方法可以操作数组,可以检测变动,发生变动则可以被拦截
push()、pop()、shift()、unShift()、splice()、sort()、reverse()
ii.以下方法不会影响原数组,返回一个新数组,同时也不会被拦截
解决方案:新数组替换旧数组
filter()、concat() 和 slice(),map()
iii.替换数组元素不能被检测变动
例.vm.obj[0]='xxx'
解决方案:Vue.set(对象,属性,属性值)
        splice(开始位置,删除元素个数,替换元素)
```

## 事件处理
```text
1).事件监听--直接触发代码  例:@click='number++'
2).事件方法处理器--写函数名  例:@click='handleAdd'
3).内联处理器方法--执行函数表达式  例:@click='handleAdd($event,1,2)'
事件修饰符:.stop  阻止冒泡
         .prevent  阻止默认行为
         .capture  添加事件监听器时使用事件捕获模式
         .self  只有在e.target是自己的情况下触发函数
         .once  事件只会触发一次
         .passive  默认行为会立即触发,而不会等事件触发后执行
按键修饰符: 只有绑定在键盘事件中才会生效
          .enter
          .tab 
          .delete (捕获“删除”和“退格”键)
          .esc
          .space
          .up/.down/.left/.right 
          也可以通过全局keyCode值自定义按键修饰符  例:@keyUp.65
表单控件绑定:
基础语法:通过v-model在表单元素上创建双向数据绑定。根据元素类型自动选取正确的方法更新元素
        单个复选框  绑定逻辑值
        多个复选框  绑定同一个数组(搭配value)
        单选按钮  绑定静态字符串
修饰符:
       .lazy 在change事件后更新
       .number  将输入的值转为number类型
       .trim  过滤输入的首尾空白字符
```

## 计算属性
```text
computed  用于处理复杂的逻辑计算(防止模板过重，难以维护),调用时不加括号
data、methods、computed、watch区别:
data:定义状态,被拦截
方法:用于事件绑定,可以不用return,没有缓存
计算属性(重视结果):解决模板过重问题,必须有return,只求结果,有基于依赖的缓存,当依赖的值改变时会重新计算,同步执行
watch(重视过程):监听一个值的改变,不用返回值,支持异步同步
```

## 过滤器filter
```text
| 管道符  
用法:Vue.filter('name',()=>{})
```
