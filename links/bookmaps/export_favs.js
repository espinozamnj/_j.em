function hslToHex(h, s, l) {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r, c) {
  if (w < 2 * r) r = w / 2
  if (h < 2 * r) r = h / 2
  this.beginPath()
  this.moveTo(x + r, y)
  this.arcTo(x + w, y, x + w, y + h, r)
  this.arcTo(x + w, y + h, x, y + h, r)
  this.arcTo(x, y + h, x, y, r)
  this.arcTo(x, y, x + w, y, r)
  this.fillStyle = hslToHex(c, 32, 87)
  this.closePath()
  return this
}
function favLetter(letter, color){
  let base64 = ''
  let canvas = document.createElement("canvas")
  canvas.width = 32
  canvas.height = 32
  let ctx = canvas.getContext("2d")
  ctx.roundRect(0, 0, 32, 32, 6, color).fill()
  ctx.font = "28px Consolas"
  ctx.fillStyle = hslToHex(color, 32, 47)
  ctx.fillText(letter, 8, 25)
  base64 = canvas.toDataURL()
  return base64
}
function makeTextFile(text) {
  let textFile = null
  let fileTxt = new Blob([text],{type:'text/plain'})
  if (window.webkitURL != null) {
    textFile = window.webkitURL.createObjectURL(fileTxt)
  } else {
    textFile = window.URL.createObjectURL(fileTxt)
  }
  return textFile
}