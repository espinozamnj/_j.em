function $(q) {
  return document.querySelector(q)
}
var Tea = {}
Tea.encrypt = function (plaintext, password) {
  if (plaintext.length == 0) return ('')
  var v = Tea.strToLongs(Utf8.encode(plaintext))
  if (v.length <= 1) v[1] = 0
  var k = Tea.strToLongs(Utf8.encode(password).slice(0, 16))
  var n = v.length
  var z = v[n - 1],
    y = v[0],
    delta = 0x9E3779B9
  var mx, e, q = Math.floor(6 + 52 / n),
    sum = 0
  while (q-- > 0) {
    sum += delta
    e = sum >>> 2 & 3
    for (var p = 0; p < n; p++) {
      y = v[(p + 1) % n]
      mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z)
      z = v[p] += mx
    }
  }
  var ciphertext = Tea.longsToStr(v)
  return Base64.encode(ciphertext)
}
Tea.decrypt = function (ciphertext, password) {
  if (ciphertext.length == 0) return ('')
  var v = Tea.strToLongs(Base64.decode(ciphertext))
  var k = Tea.strToLongs(Utf8.encode(password).slice(0, 16))
  var n = v.length
  var z = v[n - 1],
    y = v[0],
    delta = 0x9E3779B9
  var mx, e, q = Math.floor(6 + 52 / n),
    sum = q * delta
  while (sum != 0) {
    e = sum >>> 2 & 3
    for (var p = n - 1; p >= 0; p--) {
      z = v[p > 0 ? p - 1 : n - 1]
      mx = (z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4) ^ (sum ^ y) + (k[p & 3 ^ e] ^ z)
      y = v[p] -= mx
    }
    sum -= delta
  }
  var plaintext = Tea.longsToStr(v)
  plaintext = plaintext.replace(/\0+$/, '')
  return Utf8.decode(plaintext)
}
Tea.strToLongs = function (s) {
  var l = new Array(Math.ceil(s.length / 4))
  for (var i = 0; i < l.length; i++) {
    l[i] = s.charCodeAt(i * 4) + (s.charCodeAt(i * 4 + 1) << 8) + (s.charCodeAt(i * 4 + 2) << 16) + (s.charCodeAt(i * 4 + 3) << 24)
  }
  return l
}
Tea.longsToStr = function (l) {
  var a = new Array(l.length)
  for (var i = 0; i < l.length; i++) {
    a[i] = String.fromCharCode(l[i] & 0xFF, l[i] >>> 8 & 0xFF, l[i] >>> 16 & 0xFF, l[i] >>> 24 & 0xFF)
  }
  return a.join('')
}
var Base64 = {}
Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
Base64.encode = function (str, utf8encode) {
  utf8encode = (typeof utf8encode == 'undefined') ? false : utf8encode
  var o1, o2, o3, bits, h1, h2, h3, h4, e = [],
    pad = '',
    c, plain, coded
  var b64 = Base64.code
  plain = utf8encode ? Utf8.encode(str) : str
  c = plain.length % 3
  if (c > 0) {
    while (c++ < 3) {
      pad += '='
      plain += '\0'
    }
  }
  for (c = 0; c < plain.length; c += 3) {
    o1 = plain.charCodeAt(c)
    o2 = plain.charCodeAt(c + 1)
    o3 = plain.charCodeAt(c + 2)
    bits = o1 << 16 | o2 << 8 | o3
    h1 = bits >> 18 & 0x3f
    h2 = bits >> 12 & 0x3f
    h3 = bits >> 6 & 0x3f
    h4 = bits & 0x3f
    e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
  }
  coded = e.join('')
  coded = coded.slice(0, coded.length - pad.length) + pad
  return coded
}
Base64.decode = function (str, utf8decode) {
  utf8decode = (typeof utf8decode == 'undefined') ? false : utf8decode
  var o1, o2, o3, h1, h2, h3, h4, bits, d = [],
    plain, coded
  var b64 = Base64.code

  coded = utf8decode ? Utf8.decode(str) : str

  for (var c = 0; c < coded.length; c += 4) {
    h1 = b64.indexOf(coded.charAt(c))
    h2 = b64.indexOf(coded.charAt(c + 1))
    h3 = b64.indexOf(coded.charAt(c + 2))
    h4 = b64.indexOf(coded.charAt(c + 3))
    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4
    o1 = bits >>> 16 & 0xff
    o2 = bits >>> 8 & 0xff
    o3 = bits & 0xff
    d[c / 4] = String.fromCharCode(o1, o2, o3)
    if (h4 == 0x40) d[c / 4] = String.fromCharCode(o1, o2)
    if (h3 == 0x40) d[c / 4] = String.fromCharCode(o1)
  }
  plain = d.join('')
  return utf8decode ? Utf8.decode(plain) : plain
}

var Utf8 = {}
Utf8.encode = function (strUni) {
  var strUtf = strUni.replace(/[\u0080-\u07ff]/g,
    function (c) {
      var cc = c.charCodeAt(0)
      return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f)
    })
  strUtf = strUtf.replace(/[\u0800-\uffff]/g,
    function (c) {
      var cc = c.charCodeAt(0)
      return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F, 0x80 | cc & 0x3f)
    })
  return strUtf
}
Utf8.decode = function (strUtf) {
  var strUni = strUtf.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,
    function (c) {
      var cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | (c.charCodeAt(2) & 0x3f)
      return String.fromCharCode(cc)
    })
  strUni = strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,
    function (c) {
      var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f
      return String.fromCharCode(cc)
    })
  return strUni
};
(function() {
  var password = $('#password'),
    text = $('#text'),
    enc = $('#encrypt')
  text.addEventListener('blur', function() {
    enc.value = Tea.encrypt(text.value, password.value)
  })
  enc.addEventListener('blur', function() {
  text.value = Tea.decrypt(enc.value, password.value)
  })
})();

(function(){
  function generateId (len) {
    function dec2hex (dec) {
      return dec.toString(16).padStart(2, '0')
    }
    let arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }

  function makeid(length, num, car) {
    length == 0 ? length = 8 : length = length
    let c = {}
      c.car = '/+-%&$#@()[]*.,¡!¿?><=^ñ_|'
      c.abc = 'abcdefghijklmnopqrstuvwxyz'
      c.num = '0123456789'
      c.dic = c.abc + c.abc.toUpperCase()
      c.fin = ''

    if (num > 8) {
      num = 8
    }
    let i = 0
    while (i < num) {
      c.dic += c.num
      i++
    }
    if (car > 7) {
      car = 7
    }
    i = 0
    while (i < car) {
      c.dic += c.car
      i++
    }

    for (let k = 0; k < length; k ++) {
      c.fin += c.dic.charAt(Math.floor(Math.random() * c.dic.length))
    }
    return c.fin
  }
  $('#low').addEventListener('click', function(){
    $('#fin').value = $('#fin').value.toLowerCase()
  
  })
  $('#upp').addEventListener('click', function(){
    $('#fin').value = $('#fin').value.toUpperCase()
  
  })
  $('#gen').addEventListener('click', function(){
    $('#fin').value = makeid($('._l').value,$('._n').value,$('._s').value)
  })
  
  $('#gen').addEventListener('dblclick', function(){
    $('#fin').value = generateId($('._l').value)
  })
  $('._c').addEventListener('click', function(){
    v = $('#fin').value
    let temp = document.createElement('input')
    let b = document.body
    b.appendChild(temp)
    temp.value = v
    temp.select()
    temp.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(temp.value)
    b.removeChild(temp)
  })
}())