(function() {
    let surl = location.search
    if (!!surl && surl.length > 5) {
        let t = surl.substring(5, surl.length)
        e = {}
        u = decodeURIComponent(t)
        function webdomain(href) {
            let u = href,
                r = /:\/\/(.[^/]+)/
                f = u.match(r)[1]
            return f
        }
        document.getElementsByClassName('alert')[0].innerText = u
        document.getElementsByClassName('scan')[0].children[0].href = 'https://trustscam.es/' + webdomain(u)
        document.getElementsByClassName('scan')[0].children[0].innerText = 'TrustScam'
        e.d = document.createElement('div')
        e.d.classList.add('popup-url')
        e.t = document.createElement('div')
        e.c = document.createElement('textarea')
        e.b = document.createElement('div')
        e.be = document.createElement('button')
        e.bd = document.createElement('button')
        e.bc = document.createElement('button')
        e.b.classList.add('popup-buttons')
        e.c.innerText = u
        e.be.innerText = 'encode'
        e.bd.innerText = 'decode'
        e.bc.innerText = 'close'
        e.bc.addEventListener('click', function(event) {
            let gc = event.target.parentNode
            gc.parentNode.removeChild(gc)
        })
        e.bd.addEventListener('click', function(event) {
            e.c.value = decodeURIComponent(e.c.value)
        })
        e.be.addEventListener('click', function(event) {
            e.c.value = encodeURIComponent(e.c.value)
        })
        
        function nurl(text) {
            let gg = {}
            gg.d = document.createElement('div')
            gg.a = document.createElement('a')
            gg.i = document.createElement('input')
            gg.a.href = text
            gg.a.innerText = 'GO'
            gg.d.classList.add('-a-input')
            gg.a.setAttribute('target', '_blank')
            gg.i.setAttribute('type', 'text')
            gg.i.setAttribute('spellcheck', 'false')
            gg.i.value = text
            gg.d.appendChild(gg.a)
            gg.d.appendChild(gg.i)
            e.t.appendChild(gg.d)
        }
        nurl(u)
        nurl(decodeURIComponent(u))
        let gu = u.split('/'),
            i = 2
            console.log(gu)
        while (i < gu.length) {
            let o = 0
            let lar = ''
            while (o < i + 1) {
                lar += gu[o] + '/'
                o += 1
            }
            lar = lar.substring(0, lar.length - 1)
            nurl(lar)
            i += 1
        }
        if (u.startsWith('data')) {
            let ifr = document.createElement('iframe')
            ifr.classList.add('preview')
            ifr.src = u
            e.d.appendChild(ifr)
        }
        e.d.appendChild(e.t)
        e.d.appendChild(e.c)
        e.d.appendChild(e.b)
        e.b.appendChild(e.be)
        e.b.appendChild(e.bd)
        e.b.appendChild(e.bc)
        document.querySelector('.main').appendChild(e.d)
    } else {
        document.getElementsByClassName('alert')[0].innerText = 'url empty'
    }
})();