var getContext = function() {
  var canvas = document.getElementById('canvas')
  canvas.width = 320
  canvas.height = 320
  var context = canvas.getContext('2d')
  context.textAlign = 'center'
  context.textBaseline = 'top'

  return context
}


var saveToLocal = function() {
  var canvas = document.getElementById('canvas')
  var dataURL = canvas.toDataURL()
  console.log(dataURL)
  var a = document.createElement('a');
  a.href = dataURL
  a.download = getText()
  a.click()
}

var render = function() {
  // まずはとりあえず描画します。
  var context = getContext()
  // resetCanvas()
  fillTextLine(context, getText(), 0, 0)
  // 描画した内容のピクセルデータを取得し、１件ずつ調べることで高さを取得します。
  var pixels = context.getImageData(0, 0, canvas.width, canvas.height)
  var data = pixels.data
  var textHeight = getLineHeight(context, getText())

  resetCanvas()
  fillTextLine(context, getText(), canvas.width / 2, (canvas.height - textHeight) / 2)
}

var getText = function () {
  var e = document.getElementById('text')
  return e.value
}

var resetCanvas = function() {
  // var canvas = document.getElementById('canvas')
  // var copy = document.createElement('canvas')
  // copy.id = 'canvas'
  // canvas.replaceWith(copy)

  var context = getContext()
  // context.fillStyle = "rgb(255, 255, 255)"
  // context.fillRect(0, 0, 320, 320)
  var color = document.getElementById('color')
  context.fillStyle = color.value
}

var getLineHeight = function(context, text) {
  var textList = text.split('\n')
  var height = 0
  textList.forEach(function(text, i) {
    context.font = canvas.width / text.length + "px Noto Sans Mono CJK Bold"
    height += context.measureText("あ").width
  })
  return height
}

var fillTextLine = function(context, text, x, y) {
  var textList = text.split('\n')
  var lineHeight = 0
  textList.forEach(function(text, i) {
    context.font = canvas.width / text.length + "px Noto Sans Mono CJK Bold"
    context.fillText(text, x, y + lineHeight)
    lineHeight += context.measureText("あ").width
  })
}

resetCanvas()