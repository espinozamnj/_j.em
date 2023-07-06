function qS(strqS) {
    return document.querySelector(strqS)
}
HTMLElement.prototype.on = function(namesEvents = '', fn) {
  let ts = this
  if (namesEvents.trim() != '') {
    let objEvents = namesEvents.trim().split(',')
    objEvents.forEach(function(en) {
      ts.addEventListener(en, function(event) {
        fn(event)
      }, false)
    })
  }
}
HTMLElement.prototype.fe = function(qS) {
  return this.querySelector(qS)
}
window.addEventListener('load', function() {
  let textPreview = 'The quick brown fox jumps over the lazy.'
  let listFontsUse = []
  let iptMain = qS('#files')
  function createURLblob(archivo) {
    let blob = new Blob([archivo])
    let urlend = URL.createObjectURL(blob)
    return urlend
  }
  function fn2Previews(functionApply) {
    document.querySelectorAll('.font-preview').forEach(function(ipreview) {
      functionApply(ipreview)
    })
  }
  function resizePreviews() {
    fn2Previews(function(render) {
      render.style.height = '10px'
      render.style.height = render.scrollHeight + 'px'
    })
  }
  let msgCont = qS('.boxmsg')
  function checkPosYMsgBox() {
    // msgCont.style.top = (window.innerHeight - msgCont.offsetHeight) + 'px'
  }
  let btnCleanList = qS('.cleanlist')
  btnCleanList.on('click', function() {
    let listMsg = msgCont.children
    let icount = 0
    while (icount < listMsg.length) {
      listMsg[icount].click()
      icount++
    }
    btnCleanList.classList.add('none')
    setTimeout(function() {
      checkListVisibilityBtnClean()
    }, 4e2)
  })
  function checkListVisibilityBtnClean() {
    if (msgCont.querySelectorAll('.item-msg:not(.deleting)').length > 0) {
      btnCleanList.classList.remove('none')
    } else {
      btnCleanList.classList.add('none')
    }
  }
  function showMessage(text, colorType = 'green') {
    let bMsg = document.createElement('div')
    bMsg.classList.add('item-msg')
    bMsg.classList.add(colorType)
    let sMsg = document.createElement('span')
    let sbar = document.createElement('div')
    sbar.classList.add('bar')
    sMsg.innerHTML = text
    bMsg.appendChild(sMsg)
    bMsg.appendChild(sbar)
    function destroyMsg() {
      if (!!bMsg.parentElement) {
        bMsg.classList.remove('autodel')
        bMsg.classList.add('deleting')
        checkListVisibilityBtnClean()
        setTimeout(function() {
          if (!!bMsg.parentElement) {
            msgCont.removeChild(bMsg)
            checkPosYMsgBox()
          }
        }, 8e2)
      }
    }
    bMsg.on('click', function() {
      destroyMsg()
    })
    msgCont.appendChild(bMsg)
    bMsg.classList.add('append')
    let timeLife = 5 + 2.5 * (msgCont.childElementCount - 1)
    setTimeout(function() {
      bMsg.classList.remove('append')
      checkPosYMsgBox()
      setTimeout(function() {
        msgCont.scrollTo({
          top: msgCont.scrollHeight,
          behavior:'smooth'
        })
      }, 1e3)
      checkListVisibilityBtnClean()
      bMsg.fe('.bar').style.animationDuration = timeLife + 's'
      bMsg.classList.add('autodel')
      setTimeout(function() {
        destroyMsg()
      }, timeLife * 1e3)
    }, 4e2)
  }
  function createPreviewBlock(fontFile, format, title) {
    if (!listFontsUse.includes(title)) {
      let nb = document.createElement('div')
      nb.classList.add('div-preview')
      nb.innerHTML = /*html*/ `
      <div class="font-header">
        <div class="font-name"><b>${title}</b><span>${format}</span></div>
        <button class="font-download">
          <div class="list-files">
            <a>.WOFF2</a>
            <a>.WOFF</a>
            <a>.EOT</a>
            <a>.OTF</a>
            <a>.TTF</a>
          </div>
          <i class="fa-solid fa-file-arrow-down"></i>
          <span>Descargar</span>
        </button>
      </div>
      <textarea class="font-preview" placerholder="Text preview" spellcheck="false" style="font-family:'${title}',monospace"></textarea>
      <div class="bg-color"></div>
      `
      let localReader = new FileReader()
      localReader.onload = function(ev) {
        let localStyle = document.createElement('style')
        localStyle.innerText = `@font-face{font-family:'${title}';src:url('${ev.target.result}')}`
        nb.appendChild(localStyle)
      }
      let urlBlob = createURLblob(fontFile)
      nb.querySelectorAll('.list-files a').forEach(function(adown) {
        let formatRequire = adown.innerText.trim().toLowerCase().replace(/\./g, '')
        adown.setAttribute('href', urlBlob)
        adown.setAttribute('download', `${title}.${formatRequire}`)
      })
      localReader.readAsDataURL(fontFile)
      let bdownlist = nb.querySelector('.font-download')
      bdownlist.on('click', function() {
        document.querySelectorAll('.font-download').forEach(function(listMenu) {listMenu.classList.remove('open-ctxmenu')})
        bdownlist.classList.toggle('open-ctxmenu')
      })
      nb.on('mouseleave', function() {
        bdownlist.classList.remove('open-ctxmenu')
      })
      let txtEdit = nb.querySelector('.font-preview')
      txtEdit.value = textPreview
      txtEdit.on('input,change', function() {resizePreviews()})
      listFontsUse.push(title)
      return nb
    } else {
      showMessage(`La fuente: <pre>${title+format}</pre> ya fue abierta`, 'yellow')
      return false
    }
  }
  function findOrder(textBefore) {
    let gal = qS('.gallery')
    let gcs = gal.children
    let orderFind = 0
    for (let idx = 0; idx < gcs.length; idx++) {
      let nameFont = gal.children[idx].fe('.font-name').innerText.trim()
      let arrCompare = [nameFont, textBefore]
      if (arrCompare.sort()[0] == textBefore) {
        orderFind = idx
        break
      }
    }
    return orderFind
  }
  let lastUpdateFiles = new Date().getTime()
  function checkValidUpdate() {
    let interNewRequest = new Date().getTime()
    if (interNewRequest - lastUpdateFiles > 2e3) {
      lastUpdateFiles = interNewRequest
      return true
    } else {
      return false
    }
  }
  function interFonts(objFiles) {
    if (objFiles.length > 30) {
      showMessage(`No agregue más de 30 fuentes de un solo intento`, 'red')
      return false
    } 
    console.log(objFiles)
    showMessage(`Analizando: <b>${objFiles.length}</b> archivos`, 'blue')
    let gcol = qS('.gallery')
    let gReg = qS('.hist')
    let contEndOpenFiles = 0
    for (let ifonts = 0; ifonts < objFiles.length; ifonts++) {
      let ifont = objFiles[ifonts] 
      let extArry = ifont.name.match(/\.([^.]+)$/)
      if (extArry != null) {
        let fileFormat = extArry[0]
        let fileFormatlow = extArry[0].toLowerCase()
        let fileName = ifont.name.replace(fileFormat, '')
        if (fileFormatlow == '.ttf'
         || fileFormatlow == '.oft'
         || fileFormatlow == '.woff'
         || fileFormatlow == '.woff2') {
          let newBlocknewFont = createPreviewBlock(ifont, fileFormatlow, fileName)
          if (!!newBlocknewFont) {
            let pReg = document.createElement('div')
            pReg.classList.add('fontReg')
            pReg.innerText = ifont.name
            gReg.appendChild(pReg)
            if (gcol.childElementCount > 0)  {
              let iorder = findOrder(ifont.name)
              gcol.insertBefore(newBlocknewFont, gcol.children[iorder])
            } else {
              gcol.appendChild(newBlocknewFont)
            }
            qS('.size-list').innerText = listFontsUse.length
            contEndOpenFiles++
            setTimeout(function() {
              resizePreviews()
            }, 3e2)
          }
        } else {
          showMessage(`Error: <pre>${ifont.name}</pre> no es un archivo de fuentes`, 'red')
        }
      } else {
        showMessage(`Error: <pre>${ifont.name}</pre> no es un archivo compatible`, 'red')
      }
    }
    (function() {
      let items = Array.from(gcol.querySelectorAll('.div-preview'))
      items.sort(function(a, b) {
        let aName = a.fe('.font-name').innerText.trim().toUpperCase()
        let bName = b.fe('.font-name').innerText.trim().toUpperCase()
        if (aName < bName) {
          return -1
        }
        if (aName > bName) {
          return 1
        }
        return 0
      })
      for (let i = 0; i < items.length; i++) {
        gcol.appendChild(items[i])
      }
    })();
    (function() {
      let items = Array.from(gReg.querySelectorAll('.fontReg'))
      items.sort(function(a, b) {
        let aName = a.innerText.trim().toUpperCase()
        let bName = b.innerText.trim().toUpperCase()
        if (aName < bName) {
          return -1
        }
        if (aName > bName) {
          return 1
        }
        return 0
      })
      for (let i = 0; i < items.length; i++) {
        gReg.appendChild(items[i])
      }
    })()
    showMessage(`Se agregaron <b>${contEndOpenFiles}</b> fuentes de <b>${objFiles.length} archivos</b>`)
  }
  iptMain.on('change', function() {
    if (checkValidUpdate()) {
      interFonts(iptMain.files)
    }
  })
  let dropArea = qS('.file-drop-area')
  dropArea.on('dragover', function() {
    dropArea.classList.add('is-active')
  })
  dropArea.on('dragleave', function() {
    dropArea.classList.remove('is-active')
  })
  dropArea.on('drop', function(e) {
    dropArea.classList.remove('is-active')
    if (checkValidUpdate()) {
      interFonts(e.dataTransfer.files)
    }
  })
  let iptSize = qS('#range-size')
  iptSize.on('change,input', function() {
    qS('.size-i').innerText = iptSize.value
    qS('#sizecss').innerHTML = `.font-preview{font-size:${iptSize.value}px}`
    resizePreviews()
  })
  let iptText = qS('#iptText')
  iptText.value = textPreview
  iptText.on('change,input', function() {
    setTimeout(function() {
      fn2Previews(function(render) {
        render.value = iptText.value
        resizePreviews()
      })
    }, 1e2)
  })
  qS('.t2l').on('click', function() {
    fn2Previews(function(render) {
      render.value = render.value.toLowerCase()
    })
    resizePreviews()
  })
  qS('.t2u').on('click', function() {
    fn2Previews(function(render) {
      render.value = render.value.toUpperCase()
    })
    resizePreviews()
  })
  qS('.t2c').on('click', function() {
    fn2Previews(function(render) {
      let textMody = render.value
      textMody = textMody.toLowerCase()
      let words = textMody.split(' ')
      let nWords = words.map(iwrd => iwrd.charAt(0).toUpperCase() + iwrd.slice(1))
      let textCap = nWords.join(' ')
      render.value = textCap
    })
    resizePreviews()
  })
  qS('.head-hist').on('click', function() {
    qS('.hist-files').classList.toggle('open-list')
  })
  qS('#clean').on('click', function() {
    listFontsUse = []
    qS('.gallery').innerHTML = ''
    qS('.hist').innerHTML = ''
    qS('.size-list').innerText = '0'
  })
  qS('#togmin').on('click', function() {
    qS('.article').classList.toggle('list-view')
    resizePreviews()
  })
  qS('#tcolor').on('change,input',function(ev) {
    let ncolorprop = ev.target.value
    let cssEmt = qS('#colorscss')
    cssEmt.innerText = cssEmt.innerText.replace(/cola.[^;]+/, `cola:${ncolorprop}`)
  })
  qS('#bcolor').on('change,input',function(ev) {
    let ncolorprop = ev.target.value
    let cssEmt = qS('#colorscss')
    cssEmt.innerText = cssEmt.innerText.replace(/colb.[^;]+/, `colb:${ncolorprop}`)
  })
  window.addEventListener('click', function(ev) {
    if (!ev.target.closest('.font-download') && !ev.target.closest('.font-download')) {
      document.querySelectorAll('.font-download').forEach(
        function(listMenu) {
          listMenu.classList.remove('open-ctxmenu')
        }
      )
    }
  })
  window.addEventListener('resize', function() {
    resizePreviews()
    checkPosYMsgBox()
  })
})