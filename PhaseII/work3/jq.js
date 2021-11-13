(function () {
  // 构造函数
  function Tab(tits, cons, showIndex) {
    this.tits = tits;
    this.cons = cons;
    this.prevIndex = showIndex;
  }

  // 设置类名的方法
  Tab.prototype.setClass = function (dom, oClass) {
    dom.className = oClass;
  };

  // 初始化
  Tab.prototype.init = function () {
    this.setClass(this.tits[this.prevIndex], "word");
    this.setClass(this.cons[this.prevIndex], "pic");
    // this.clickTab();
    return this; // 返回this实现链式操作 与上面的注释类似；但更灵活
  };

  // 添加事件
  Tab.prototype.clickTab = function () {
    var _this = this;
    for (var i = 0; i < this.tits.length; i++) {
      this.tits[i].index = i;
      this.tits[i].onclick = function () {
        // 去掉上次选中的样式
        _this.setClass(_this.tits[_this.prevIndex], "");
        _this.setClass(_this.cons[_this.prevIndex], "");

        // 给当前选中的元素添加样式
        _this.setClass(_this.tits[this.index], "word");
        _this.setClass(_this.cons[this.index], "pic");

        // 更新上次选中元素的下标
        _this.prevIndex = this.index;
      };
    }
  };

  // 返回一个初始化之后的实例对象
  function factory(tits, cons, showIndex) {
    return new Tab(tits, cons, showIndex).init();
  }

  // 对外公开接口
  window.$ = factory;
})();