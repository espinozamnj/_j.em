let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

function _e(e){
    return document.querySelector(e)
}
let t_v = _e('textarea')

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  let voiceSelect = _e("#voices");
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
}

_e("#rate").addEventListener("input", () => {
  const rate = _e("#rate").value
  speech.rate = rate
  _e("#rate-label").innerHTML = rate
})

_e("#volume").addEventListener("input", () => {
  const volume = _e("#volume").value
  speech.volume = volume
  _e("#volume-label").innerHTML = volume
})

_e("#pitch").addEventListener("input", () => {
  const pitch = _e("#pitch").value
  speech.pitch = pitch
  _e("#pitch-label").innerHTML = pitch
})

_e("#voices").addEventListener("change", () => {
  speech.voice = voices[_e("#voices").value]
})

_e("#start").addEventListener("click", () => {
  speech.text = t_v.value
  window.speechSynthesis.speak(speech)
})

_e("#pause").addEventListener("click", () => {
  window.speechSynthesis.pause()
})

_e("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume()
})

_e("#cancel").addEventListener("click", () => {
  window.speechSynthesis.cancel()
})

var txo = ''
t_v.addEventListener(
    'select',
    function (){
        if (window.getSelection) {
            txo = window.getSelection().toString()
        } else if (document.selection) {
            txo = document.selection.createRange().text
        }
    }
)
t_v.addEventListener(
    'keydown',
    function(event) {
        // t_v == document.activeElement
        if (event.ctrlKey && event.keyCode == 13) {
          open('https://translate.google.com/?source=osdd#auto|auto|' + txo)
        }
        let val = t_v.value
        let _stt = {
          "palabras" : val.split(' ').length,
          "total" : val.length,
          "letras sin espacios" : (val.length - 2) - (val.match(/o/g)||[]).length,
          "párrafos" : val.split('\n').length
        }
        _e('.statics').innerHTML = ''
        for (const st in _stt) {
          let s_p = _stt[st],
          _d = document.createElement('div'),
          _p = document.createElement('p')
          _l = document.createElement('label')
          _p.innerText = st
          _l.innerText = s_p
          _d.appendChild(_p)
          _d.appendChild(_l)
          _e('.statics').appendChild(_d)
        }
        
    },
    false
)
t_v.addEventListener(
  'paste',
  function () {
    setTimeout(function () {
      t_v.dispatchEvent(new KeyboardEvent('keydown',{'key':'-'}))
    }, 500)
  }
)