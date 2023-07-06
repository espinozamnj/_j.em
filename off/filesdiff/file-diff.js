(function() {
  window.method = null
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
    document.body.on('dragover,drop', function(e) {
      e.preventDefault()
      return false
    })
    function createBlockAnalize(fileAutoAnalize = 0) {
      let divMain = document.createElement('div')
      divMain.classList.add('fileAnalyze')
      let HTMLblock = /*html*/ `
<div class="file-drop-area">
  <div class="float">
    <div class="index"></div>
  </div>
  <div class="delete"></div>
  <span class="fake-btn">ESCOGER ARCHIVO</span>
  <span class="file-msg">o suelta uno aquí</span>
  <input type="file">
</div>
<div class="resumeFile">
  <div class="alert gray">Ingrese un archivo</div>
</div>
  `
      divMain.innerHTML = HTMLblock
      let input = divMain.fe('input')
      let dropzone = divMain.fe('.file-drop-area')
      let dropzonetext = divMain.fe('.file-msg')
      let resumeCont = divMain.querySelector('.resumeFile')
  
      if (1 == 1) {
        if(!window.FileReader) {
          dropzonetext.innerText = 'Su navegador no permite el análisis de archivos'
          input.setAttribute('disabled', '')
          return
        }
        var file
        function checkOneFile() {
          divMain.fe('.index').setAttribute('style', '')
          divMain.fe('.index').removeAttribute('style')
          divMain.fe('.index').innerHTML = ''
          if ((typeof file == 'undefined' || file.type == "" || file.size == 0) && !file.name.includes('.')) {
            let msgErrorFolder = 'No se aceptan carpetas, texto o múltiples archivos'
            resumeCont.innerHTML =/*html*/ `<div class="alert red">${msgErrorFolder}</div>`
            dropzone.classList.remove('file-open')
          } else {
            dropzonetext.innerText = file.name
            resumeCont.innerHTML =/*html*/ `<div class="alert yellow">
              <div class="dot-flashing"></div>
              <div class="progress-back">
                <div class="progress"></div>
              </div>
            </div>`
            execute()
          }
        }
        function tryProgress(intProgress) {
          let divPrg = divMain.fe('.progress')
          if (!!divPrg) {
            divPrg.innerText = intProgress + '%'
            if (intProgress > 50) {
              divPrg.classList.add('left')
            }
            divMain.fe('.progress-back').style.width = intProgress + '%'
          }
        }
        var execute = function() {
          dropzone.classList.add('file-open')
          let reader = new FileReader()
          if (method.update) {
            var batch = 1024 * 1024 * 2
            var start = 0
            var total = 1000
            if (typeof(file) != 'undefined') {
              total = file.size
              var current = method
              reader.onload = function (event) {
                try {
                  current = current.update(event.target.result)
                  asyncUpdate()
                } catch(e) {
                  console.log(e)
                  resumeCont.innerHTML =/*html*/ `<div class="alert red">${e}</div>`
                }
              }
              var asyncUpdate = function () {
                if (start < total) {
                  tryProgress((start / total * 100).toFixed(2))
                  var end = Math.min(start + batch, total)
                  reader.readAsArrayBuffer(file.slice(start, end))
                  start = end
                } else {
                  let objInfo = {}
                  objInfo.size = (file.size.toString()).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  objInfo.hash = current.hex().replace(/\w{8}/g, "$& ")
                  objInfo.lastEdit = file.lastModifiedDate.toLocaleString()
                  resumeCont.innerHTML =/*html*/`<div class="result">\
                    <p><b>HASH (SHA256):</b><span class="p csfile">${objInfo.hash}</span></p>
                    <p><b>Tamaño:</b><span>${objInfo.size}</span></p>
                    <p><b>Última modificación:</b><span>${objInfo.lastEdit}</span></p>
                  </div>`
                }
              }
              asyncUpdate()
            }
          } else {
            console.log('hashing...')
            reader.onload = function (event) {
              try {
                console.log(method(event.target.result))
              } catch (e) {
                console.log(e)
              }
            }
            reader.readAsArrayBuffer(file)
          }
        }
        dropzone.on('dragover', function() {
          dropzone.classList.add('is-active')
        })
        dropzone.on('dragleave', function() {
          dropzone.classList.remove('is-active')
        })
        dropzone.on('drop', function(e) {
          dropzone.classList.remove('is-active')
          file = e.dataTransfer.files[0]
          checkOneFile()
        })
        input.on('change', function() {
          file = input.files[0]
          checkOneFile()
        })
        if (typeof fileAutoAnalize == 'object') {
          file = fileAutoAnalize
          checkOneFile()
        }
      }
      divMain.fe('.delete').on('click', function() {
        divMain.parentElement.removeChild(divMain)
      })
      return divMain
    }
    function addBlockAnlz(fileRecived) {
      qS('.rows-files').appendChild(createBlockAnalize(fileRecived))
    }
    countBlocks = 2
    while (countBlocks--) {
      addBlockAnlz()
    }
    if (1 == 1) {
      let areaMultiple = qS('.multipleFiles .file-drop-area')
      let inptMultiple = qS('.multipleFiles input')
      function appendAndAnalize(listFiles) {
        for (let i = 0; i < listFiles.length; i++) {
          addBlockAnlz(listFiles[i])
        }
      }
      areaMultiple.on('dragover', function() {
        areaMultiple.classList.add('is-active')
      })
      areaMultiple.on('dragleave', function() {
        areaMultiple.classList.remove('is-active')
      })
      areaMultiple.on('drop', function(e) {
        e.preventDefault()
        appendAndAnalize(e.dataTransfer.files)
      })
      inptMultiple.on('change', function() {
        appendAndAnalize(inptMultiple.files)        
      })
    }
    qS('#btn-add').on('click', function () {addBlockAnlz()})
    qS('#clean').on('click', function () {
      document.querySelectorAll('.fileAnalyze').forEach(function(ba) {
        ba.parentElement.removeChild(ba)
      })
      addBlockAnlz()
    })
    qS('#togmin').on('click', function() {
      qS('.rows-files').classList.toggle('min')
    })
    qS('#compare').on('click', function() {
      let arrayLetter = 'abcdefghijklmnopqrstuvwxyz'
      let arrayHashes = []
      let arrayUnique = []
      document.querySelectorAll('.csfile').forEach(function(csText) {
        let hashVal = csText.innerText
        let posInArray = arrayHashes.indexOf(hashVal)
        if (posInArray == -1) {
          arrayHashes.push(hashVal)
          arrayUnique.push(true)
        } else {
          arrayUnique[posInArray] = false
        }
      })
      document.querySelectorAll('.csfile').forEach(function(csText) {
        let hashValVer = csText.innerText
        let contFile = csText
        while (!contFile.classList.contains('fileAnalyze')) {
          contFile = contFile.parentElement
        }
        let index = arrayHashes.indexOf(hashValVer)
        let idx = contFile.fe('.index')
        let hueDeg = (360 / arrayHashes.length) * index
        let hslColor = `hsl(${hueDeg}deg, 80%, 35%)`
        idx.innerText = arrayLetter.charAt(index).toUpperCase()
        idx.innerText = index + 1
        if (arrayUnique[index]) {
          idx.style.borderWidth = '2px 0px 2px 2px'
          idx.style.borderStyle = 'solid'
          idx.style.borderColor = hslColor
          idx.style.color = hslColor
        } else {
          idx.style.backgroundColor = hslColor
        }
      })
    })
  })
})()