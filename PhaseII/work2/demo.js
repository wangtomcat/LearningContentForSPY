// 冒泡排序
// let arr = [12, 17, 9, 21, 3, 6, 25];
// for (var i = arr.length - 1; i >= 0; i--) {
//   for (var j = 0; j < i; j++) {
//     if (arr[i] < arr[j]) {
//       [arr[j], arr[i]] = [arr[i], arr[j]];
//     }
//   }
// }
// console.log(arr);

// 选择排序
let = [12, 17, 9, 21, 3, 6, 25];
let str;
for (var i = 0; i < Arr.length; i++) {
  for (var j = i + 1; j < arr.length; j++) {
    if (arr[i] > arr[j]) {
      str = arr[j];
      arr[j] = arr[i];
      arr[i] = str;
    }
  }
}

console.log(arr);
