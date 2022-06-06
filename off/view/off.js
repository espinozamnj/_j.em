var cf = {new: false};
(function(){
let tas = d('#uri')
function d(dom) {
    return document.querySelector(dom)
}
let fm = {
    title: 'Visualizador de medios || archivos',
    placehd: 'absolute or relative URL',
    default_url: 'cdn-fox-intro-000.mp4',
    options: [
        ['view image', '../vimg/?=%s', false],
        ['pdf view', '../pdf/#%s', false],
        ['pdf viewerjs', 'https://viewerjs.org/ViewerJS/#%s', false],
        ['pdf flow', 'https://flowpaper.com/flipbook/?pdf=%s', false],
        ['pdf moz', 'https://researchain.net/static/pdf/web/viewer.html?file=%s', false],
        ['video fembed', '../mp4/fembed.html?=%s', false],
        ['video jwplayer', '../mp4/jwplayer.html?=%s', false],
        ['video plyrio', '../mp4/playerio.html?=%s', false],
        ['video uqload', '../mp4/uqload.html?=%s', false],
        ['video fluid', '../mp4/fluidplayer.html?=%s', false],
        ['video tech', '../mp4/camta.html?=%s', false],
        ['only iframe', '%s', false],
        ['powerpoint', 'https://powerpoint.officeapps.live.com/op/embed.aspx?src=%s', false],
        ['view office', 'https://view.officeapps.live.com/op/view.aspx?src=%s', false],
        ['google viewer', 'https://drive.google.com/viewerng/viewer?url=%s', false],
        ['embed office', 'https://view.officeapps.live.com/op/embed.aspx?src=%s', false],
    ],
    sendE: '#sbmt',
    sendT: 'OPEN'
}

d('.tit').innerText = fm.title
tas.setAttribute('placeholder', fm.placehd)
tas.value = fm.default_url
d(fm.sendE).setAttribute('value', fm.sendT)

tas.addEventListener(
    'contextmenu',
    function(e) {
        e.target.value = ''
    }
)

function act(order){
    let e, i, c, cc
    e = d('[data-n="' + order + '"]')
    i = 0
    c = d('.opt')
    cc = c.childElementCount
    while (i < cc) {
        let ej = c.children[i]
        if (ej == e) {
            ej.className = 'on'
        } else {
            ej.className = 'off'
        }
        i++
    }
    cf.active = e
    cf.number = order
}

let _o = 0
let op = fm.options
while (_o < op.length) {
    let to, A = {}, n = _o + 1, o
    to = op[_o]
    
    if (n < 10) {
        o = '00' + n
    } else if (n < 100){
        o = '0' + n
    } else {
        o = n.toString()
    }
    A.a = document.createElement('a')
    A.c = document.createElement('span')
    A.t = document.createElement('div')
    A.a.classList.add('off')
    A.a.setAttribute('data-n', o)
    A.t.innerText = to[0]
    A.a.addEventListener('click', function(){act(o)})
    A.a.appendChild(A.c)
    A.a.appendChild(A.t)
    d('.opt').appendChild(A.a)
    _o++
}
function embResize(){
    let size, emb, calc, inH
    emb = d('.embed')
    size = emb.getAttribute('data-excs')
    size = Number(size)
    inH = window.innerHeight
    calc = inH + size
    d('#ifr').style.height = calc + 'px'
}

d(fm.sendE).addEventListener(
    'click',
    function(){
        if (typeof cf.active == 'undefined') {
            alert('Chosse a option')
        } else {
            let url, tod, fis, ifr, newtitle, ts
            url = tas.value = tas.value.trim()
            tod = cf.active.getAttribute('data-n')
            excess = d('#exc').value.trim()
            newtitle = d('#dtit').value.trim()
            cf.url = url
            cf.tit = newtitle
            cf.excs = excess
            document.title = newtitle
            tod = Number(tod)
            ts = fm['options'][tod - 1]
            fis = ts[1]
            ts[2] ? url = encodeURIComponent(url) : url = url
            fis = fis.replace('%s',url)
            sessionStorage.setItem('off-view', JSON.stringify(cf))
            ifr = d('#ifr')
            if (cf.new) {
                open(fis)
            } else {
                ifr.src = fis
                d('.embed').classList.replace('h', 'v')
                if(excess !== '') {
                    d('.embed').setAttribute('data-excs', excess)
                } else {
                    d('.embed').setAttribute('data-excs', '0')
                }
                embResize()
            }
        }
    }
)
d('.newopen').addEventListener(
    'click',
    function(){
        open(d('#ifr').src)
    }
)
d('.newopen').addEventListener(
    'contextmenu',
    function(e){
        let em = e.target
        em.parentNode.removeChild(em)
    }
)
cf.new ? d('#tab').value = 'NEW TAB' : d('#tab').value = 'THIS TAB'
d('#tab').addEventListener(
    'click',
    function(e){
        let _e = e.target, v = _e.value;        
        if (v == 'THIS TAB') {
            _e.value = 'NEW TAB'
        } else {
            _e.value = 'THIS TAB'
        }
        cf.new = !cf.new
    }
)
d('#rvry').addEventListener(
    'click',
    function(){
        let v = sessionStorage.getItem('off-view')
        if(v !== null){     
            let dd = JSON.parse(sessionStorage.getItem('off-view'))
            d('[data-n="' + dd.number + '"]').click()
            tas.value = dd.url
            cf.new = dd.new
            cf.new ? d('#tab').value = 'NEW TAB' : d('#tab').value = 'THIS TAB'
            d('#dtit').value = dd.tit
            d('#exc').value = dd.excs
        }
        else {
            let tur = tas.value
            tas.value = 'sessionStorage empty'
            setTimeout(function() {
                tas.value = tur
            }, 2000)
        }
    }
)

window.addEventListener(
    'resize',
    function(){
        embResize()
    }
)
})()