function q(element) {
    return document.querySelector(element)
}
let st = note_sett
//guardar nota
var LocalNote = st.notelocal
var editor = q(st.edit)
var cache = localStorage.getItem(LocalNote)
if (cache) {
    editor.innerHTML = cache;
}
editor.addEventListener('keydown', function(e) {
    if (e.altKey && e.code == 'KeyL') {
        let text = editor.innerHTML
        let linkRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
        if (linkRegex.test(text)) {
            let container = document.createElement('span')
            container.innerHTML = text.replace(linkRegex, '<a href="$1">$1</a>')
            editor.innerHTML = container.innerHTML
        }
    }
})
editor.addEventListener('click', function(event) {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault()
      let anchor = event.target.closest('a')
      let url = anchor.getAttribute('href')
      window.open(url, '_blank')
    }
})
// autosave
editor.addEventListener('input', function(event) {
    let newValue = event.target.innerHTML
    if (cache != newValue) {
        cache = newValue
        localStorage.setItem(LocalNote, cache)
    }
})
// paste remove format
if (st.format) {
    editor.addEventListener("paste", function(evt) {
        if (!confirm('apply format?')) {
            evt.preventDefault();
            var text = evt.clipboardData.getData("text/plain")
            document.execCommand("insertHTML", false, text)
        }
    })
} else {
    editor.addEventListener("paste", function(evt) {
        let items = (evt.clipboardData || evt.originalEvent.clipboardData).items
        for (index in items) {
            var item = items[index]
        }
        if (item.kind !== 'file') {
            evt.preventDefault()
            var text = evt.clipboardData.getData("text/plain")
            document.execCommand("insertHTML", false, text)
        }
    })
}
//eliminar nota
function clearCache() {
    if (confirm('Clean this note, sure?')) {
        localStorage.removeItem(LocalNote)
    }
}
//escribir txt
function makeTextFile(text) {
    let textFile = null
    let fileTxt = new Blob(
        [text],
        {
            type:'text/plain'
        }
    )

    if (window.webkitURL != null) {
        textFile = window.webkitURL.createObjectURL(fileTxt)
    } else {
        textFile = window.URL.createObjectURL(fileTxt)
    }
    return textFile
}
function fexport(dat, button, clck) {
    let fname, downA, codeNote
    /* ***************************** */
    if (dat) {
        let tm = new Date()
        fname = tm.getFullYear() + '-' + (tm.getMonth() + 1) + '-' + tm.getDate() + '.' + tm.getHours() + '.' + tm.getMinutes()
        fname = fname + '_' + q('header').innerText
    } else {
        fname = 'file'
    }
    fname = fname + '.txt'
    /* ***************************** */
    codeNote = editor.innerHTML
    codeNote = codeNote.replaceAll('\n', '')
    codeNote = codeNote.replaceAll('    ', '')
    /* ***************************** */
    if (button == '') {
        downA = document.createElement('a')
        downA.innerHTML = 'Download File'
        downA.style.display = 'none'
        downA.addEventListener(
            'click',
            function(event){
                event.target.parentNode.removeChild(event.target)
            }
        )
        document.body.appendChild(downA)
    } else {
        downA = q(button)
    }
    downA.href = makeTextFile(codeNote)
    downA.download = fname

    /* ***************************** */
    clck ? downA.click() : console.log('click for download')


}

//leer txt
function openFile(event) {
    let ipt = event.target
    let reader = new FileReader()
    reader.onload = function () {
        let text = reader.result
        editor.innerHTML = text
    }
    reader.readAsText(ipt.files[0])
}
//imagen desde clipboard
document.onpaste = function (event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items
    // console.log(JSON.stringify(items))
    for (index in items) {
        var item = items[index]
        if (item.kind === 'file') {
            var blob = item.getAsFile()
            var reader = new FileReader()
            reader.onload = function (event) {
                //console.log(event.target.result)
            }
            reader.readAsDataURL(blob)
        }
    }
}