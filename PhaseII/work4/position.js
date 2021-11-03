function mouseUp(e, myBox) {
  var left = e.clientX - myBox.offsetWidth / 2;
  var top = e.clientY - myBox.offsetWidth / 2;
  if (left <= 0) {
    left = 0;
  } else if (left >= document.documentElement.clientWidth - myBox.offsetWidth) {
    left = document.documentElement.clientWidth - myBox.offsetWidth;
  }
  if (top <= 0) {
    top = 0;
  } else if (top >= document.documentElement.clientHeight - myBox.offsetWidth) {
    top = document.documentElement.clientHeight - myBox.offsetWidth;
  }
  myBox.style.left = left + 'px';
  myBox.style.top = top + 'px';
  position.push({
    X: left,
    Y: top,
  });
}
