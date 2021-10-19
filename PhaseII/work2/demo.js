let arr = [12, 17, 9, 21, 3, 6, 25];
// 冒泡排序;
for (let i = 0; i < arr.length; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] > arr[j]) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}
console.log(arr);

// 插入排序
for (let i = 1; i < arr.length; i++) {
  let key = arr[i];
  let j = i - 1;
  while (j >= 0 && arr[j] > key) {
    arr[j + 1] = arr[j];
    j--;
  }
  arr[j + 1] = key;
}
console.log(arr);

// 选择排序;
let arr = [12, 17, 9, 21, 3, 6, 25];
for (var i = 0; i < arr.length; i++) {
  var key = i;
  for (var j = i + 1; j < arr.length; j++) {
    if (arr[j] < arr[key]) {
      key = j;
    }
  }
  [arr[i], arr[key]] = [arr[key], arr[i]];
}
console.log(arr);

// 快速排序

function quick(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var left = [];
  var right = [];
  var num = arr.splice(Math.floor(arr.length / 2), 1);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < num) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quick(left).concat(num, quick(right));
}
console.log(quick(arr));

// 桶排序
