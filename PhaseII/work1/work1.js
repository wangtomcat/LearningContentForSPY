// 乘法表
for (var i = 1; i <= 9; i++) {
  var str = '';
  for (var j = 1; j <= i; j++) {
    str += j + '×' + i + '=' + i * j + '\t';
  }
  console.log(str);
}

// 正三角
for (var i = 1; i <= 10; i++) {
  var str = '';
  for (var j = 1; j <= i; j++) {
    str += '*' + '\t';
  }
  console.log(str);
}

// 倒三角
for (var i = 10; i > 0; i--) {
  var str = '';
  for (var j = 1; j <= i; j++) {
    str += '*' + '\t';
  }
  console.log(str);
}
