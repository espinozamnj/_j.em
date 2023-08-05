// ------ ubicar credenciales con doble url de deteccion
// gg.items.forEach(function(a){try{let g=a.login.uris;if(g.length>1){console.log(g)}}catch{console.log('no en:'+JSON.stringify(a))}})

let ng = []
var gen = {}
var xmlhttp = new XMLHttpRequest(), gg, url = "/bit.json"
xmlhttp.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200) {
        gg = JSON.parse(this.responseText)
    }
}
xmlhttp.open("GET", url, true)
xmlhttp.send()

function gi(id) {
    return document.getElementById(id)
}
gi('opf').addEventListener('click', function() {
    var input = document.createElement('input')
    input.type = 'file'
    input.accept = '.txt, .json'

    input.addEventListener('change', function (event) {
        var file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = function (event) {
            gi('string-data').value = event.target.result
        }
        reader.readAsText(file)
    })
    input.click()
})

function makeTextFile(text) {
    let textFile = null
    let fileTxt = new Blob([text], {type:'text/plain'})
    if (window.webkitURL != null) {
        textFile = window.webkitURL.createObjectURL(fileTxt)
    } else {
        textFile = window.URL.createObjectURL(fileTxt)
    }
    return textFile
}
function fexport(button, clck, string_data) {
    let downA = document.querySelector(button)
    downA.href = makeTextFile(string_data)
    downA.download = 'data-pa55.js'
    clck ? downA.click() : console.log('click for download')
}
gi('strings-import').addEventListener('click', function(){
    let txa = gi('string-data')
    let text = txa.value
    text = text.replace(/\s+#$/m, '')
    txa.value = text
    function isJson(str) {
        try {
            JSON.parse(str)
        } catch (e) {
            return false
        }
        return true
    }
    if (isJson(text)) {
        gg = JSON.parse(text)
    } else {
        alert('string is not JSON')
    }
})
gi('but').addEventListener('click',function(){
    let rti = []
    let pasw = []
    let notauth = []
    gg.items.forEach(a => {
        rti.push(a)
        let pas = gi('pas').value
        if (a['type'] == 1) {
            let n = {}
            let o = a['login']
            let i = a['name'].split(' - ')
            n.type = 'web'
            n.service = i[0]
            let rr = gg.folders.filter(e => e.id == a['folderId'])
            if (rr.length > 0) {
                n.category = rr[0]['name']
            } else {
                n.category = 'no carpet'
                console.log('without carpet')
                console.log(a)
            }
            if (i.length == 1) {
                n.user = 'notUser'
                console.log('without user')
                console.log(a)
            } else {
                n.user = i[1]
            }
            try {
                n.web = a.login.uris[0].uri
            } catch (error) {
                n.web = 'none'
            }
            n.auth = spy.do(o['username'], pas, true)
            n.password = spy.do(o['password'], pas, true)
            pasw.push(n.password)
            if (a['notes'] == null) {
                n.note = spy.do('none', pas, true)
            } else {
                n.note = spy.do(a['notes'].toString(), pas, true)
            }
            ng.push(n)
        } else {
            notauth.push(a)
        }
    })
    gen = {
        no_auth: notauth,
        data: rti,
        pass: pasw
    }
    console.log(gen)
    gi('ret').innerHTML = ''
    let result_encrypt = spy.do(JSON.stringify(ng), '', true)
    let timeBackup = new Date().toLocaleString()
    timeBackup = '//' + timeBackup + '\n'
    let content_data = timeBackup + 'data_hash_encrypt_pa55_log_ = ' + JSON.stringify(result_encrypt)
    // gi('ret').innerText = 'data_hash_encrypt_pa55_log_ = ' + JSON.stringify(ng, 0, 1)
    gi('ret').innerText = content_data
    fexport('.down' , false, content_data)
})
gi('tog').addEventListener('click', function(){
    gi('ret').classList.toggle('color')
    gi('string-data').classList.toggle('color')
})