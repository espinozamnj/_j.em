(function () {
  function $$(q) { return document.querySelectorAll(q) }
  function $(q) { return $$(q)[0] }
  let savedText = ''

  let dom = {
    in: $('#textarea1'),
    out: $('#textarea2'),
    iptRe: $('#input1'),
    iptNS: $('#input2'),
    btnO2In: $('#editarSalidaButton'),
    btnRplc: $('#reemplazarButton'),
    btnFind: $('#buscarButton'),
    btnCopy: $('#copiarButton'),
    btnRstr: $('#restaurarButton'),
    btnSpck: $('#altspellcheck'),
    divOutS: $('#output'),
    divOutC: $('#ocurrence-count'),
  }
  dom.btnO2In.addEventListener('click', editOut)
  dom.btnRplc.addEventListener('click', replaceIn)
  dom.btnFind.addEventListener('click', showMatches)
  dom.btnCopy.addEventListener('click', copyOut)
  dom.btnRstr.addEventListener('click', restoreText)
  dom.btnSpck.addEventListener('click', altSpellcheck)

  function animateError() {
    dom.iptRe.classList.add('error')
    setTimeout(function () {
      dom.iptRe.classList.remove('error')
      dom.iptRe.focus()
    }, 1500)
  }
  function editOut() {
    dom.in.value = dom.out.value
    dom.divOutS.textContent = ''
  }

  function replaceIn() {
    const textIn = dom.in.value
    const rVal = dom.iptRe.value
    const rFgs = getFlagsFromCheckboxes()
    try {
      let regex = new RegExp(rVal, rFgs)
      let strReplace = dom.iptNS.value.replace(/\\n/g, '\n').replace(/\\t/g, '\t')
      let result = textIn.replace(regex, strReplace)
      dom.out.value = result
      savedText = textIn
      let matches = result.match(new RegExp(rVal, 'g'))
      let matchesLen = matches ? matches.length : 0
      dom.divOutS.innerHTML = result
      dom.divOutC.textContent = `Cantidad de ocurrencias: ${matchesLen}`
    } catch (error) {
      alert('No es una expresión válida')
      animateError()
      console.log(error)
    }
  }
  function textContent2span(elemento) {
    let nodosHijos = elemento.childNodes
    for (let i = 0; i < nodosHijos.length; i++) {
      let nodo = nodosHijos[i]
      if (nodo.nodeType === Node.TEXT_NODE) {
        let span = document.createElement('span')
        span.textContent = nodo.textContent
        elemento.replaceChild(span, nodo)
      } else if (nodo.nodeType === Node.ELEMENT_NODE && 1 == 0) {
        textContent2span(nodo)
      }
    }
  }

  function showMatches() {
    const textIn = dom.in.value
    const rVal = dom.iptRe.value
    const rFgs = getFlagsFromCheckboxes()
    try {
      let regex = new RegExp(rVal, rFgs)
      let result = textIn.replace(regex, match => `<span class="occurrence">${match}</span>`)
      result = result.replace(/\n/g, '<span class="escape">\\n\n</span>').replace(/\t/g, '<span class="escape">\\t	</span>')
      dom.divOutS.innerHTML = result
      let matches = result.match(/<span class="occurrence">/g)
      let matchesLen = matches ? matches.length : 0
      textContent2span(dom.divOutS)
      dom.divOutC.textContent = `Cantidad de ocurrencias: ${matchesLen}`
    } catch (error) {
      alert('No es una expresión válida')
      animateError()
      console.log(error)
    }
  }

  function copyOut() {
    dom.out.select()
    navigator.clipboard.writeText(dom.out.value)
  }

  function restoreText() {
    dom.in.value = savedText
    dom.divOutS.textContent = ''
    dom.divOutC.textContent = ''
  }

  function getFlagsFromCheckboxes() {
    let flags = []
    if ($('#flag_g').checked) flags.push('g')
    if ($('#flag_i').checked) flags.push('i')
    if ($('#flag_m').checked) flags.push('m')
    return flags.join('')
  }
  function altSpellcheck() {
    $$('textarea').forEach(function (ta) {
      ta.spellcheck = !ta.spellcheck
    })
  }
})()