// ------ ubicar credenciales con doble url de deteccion
// gg.items.forEach(function(a){try{let g=a.login.uris;if(g.length>1){console.log(g)}}catch{console.log('no en:'+JSON.stringify(a))}})
// nuevo item individual


function newpass(svc, cat, usr, url, log, psw, not, key) {
    let ng = {
        "type": "web",
        "service": svc,
        "category": cat,
        "user": usr,
        "web": url,
        "auth": spy.do(log, key, true),
        "password": spy.do(psw, key, true),
        "note": spy.do(not, key, true)
    }
    console.log(JSON.stringify(ng))
}
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
function fexport(button, clck, text) {
    let fname, downA, codeNote
    fname = 'data-pa55.js'
    /* ***************************** */
    codeNote = text
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
        downA = document.querySelector(button)
    }
    downA.href = makeTextFile(codeNote)
    downA.download = fname

    /* ***************************** */
    clck ? downA.click() : console.log('click for download')
}
document.getElementById('but').addEventListener('click',function(){
    let rti = []
    let pasw = []
    let notauth = []
    gg.items.forEach(a => {
        rti.push(a)
        let pas = document.getElementById('pas').value
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
            };
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
    document.getElementById('ret').innerHTML = ''
    document.getElementById('ret').innerText = 'data_hash_encrypt_pa55_log_ = ' + JSON.stringify(ng, 0, 1)
    fexport('.down' , false, 'data_hash_encrypt_pa55_log_ = ' + JSON.stringify(ng))
})
document.getElementById('tog').addEventListener('click', function(){
    document.getElementById('ret').classList.toggle('color')
})