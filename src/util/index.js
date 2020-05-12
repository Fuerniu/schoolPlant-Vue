// 生成大写字母  A的Unicode值为65
export const generateBig = () => {
  var str = []
  for (var i = 65; i < 91; i++) {
    str.push(
      { id: i - 65, name: String.fromCharCode(i) }
    )
  }
  return str
}
// 节流函数
export const throttle = function (fn, delay) {
  let timer = null

  return function () {
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn()
    }, delay)
  }
}
