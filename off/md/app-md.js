// CREDITS
// http://showdownjs.com/
// https://sindresorhus.com/github-markdown-css/github-markdown-dark.css
/* ============================ */

window.addEventListener('load', function() {
    let css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = 'markdown-light.css'
    document.head.appendChild(css)

    let convert = document.createElement('script')
    convert.src = 'markdown.js'
    document.head.appendChild(convert)

    document.body.classList.add('markdown-body')
    
    convert.addEventListener('load', function(){
        function $(qs) {
            return document.querySelector(qs)
        }
        
        let dropArea = $('#drop-area')
        let fileSelector = $('#file-selector')
        
        dropArea.addEventListener('dragover', function(event) {
            event.preventDefault()
            dropArea.classList.add('over')
        })
        dropArea.addEventListener('dragleave', function() {
            dropArea.classList.remove('over')
        })
        dropArea.addEventListener('drop', function(event) {
            event.preventDefault()
            dropArea.classList.remove('over')
            const files = event.dataTransfer.files
            handleFile(files[0])
        })
        fileSelector.addEventListener('change', function(event) {
            const files = event.target.files
            handleFile(files[0])
        })
        function handleFile(file) {
            if (!file) return;
            if (file.name.endsWith('.md') || file.name.endsWith('.txt')) {
                const reader = new FileReader()
                reader.onload = function(event) {
                    const contents = event.target.result
                    dropArea.remove()
                    let converter = new showdown.Converter({tables: true})
                    let tx = contents
                    tx = tx.replace(/\n/g, '\n').trim()
                    tx = tx.replace(/(\|*:-:\||\|*:-\||\|*:--\||\|*-:\||\|*--:\|)/g, '|---|')
                    tx = tx.replace(/---\|\|---/g, '---|---')
                    let contMD = document.createElement('div')
                    let contNM = document.createElement('div')
                    contNM.classList.add('name-file')
                    contNM.innerText = file.name
                    contMD.innerHTML = converter.makeHtml(tx)
                    contMD.classList.add('main-container-md')
                    contNM.addEventListener('click', function() {
                        let nt = prompt('New title', contNM.innerText)
                        nt = nt.trim()
                        if (nt != '') {
                            contNM.innerText = nt
                        } else {
                            contNM.remove()
                        }
                    })
                    contNM.addEventListener('contextmenu', function(e) {
                        e.preventDefault()
                        let b = document.body
                        if (b.classList.contains('mode-dark')) {
                            b.classList.remove('mode-dark')
                            css.href = 'markdown-light.css'
                        } else {
                            b.classList.add('mode-dark')
                            css.href = 'markdown-dark.css'
                        }
                    })
                    document.body.appendChild(contNM)
                    document.body.appendChild(contMD)
                }
                reader.readAsText(file)
            }
        }
    })
})