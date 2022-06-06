if (location.search == '?pwa') {
    location.href = './../links?start'
}
window.addEventListener('load', function (){
    let loc = window.location, app = __apps__
    
    let _s = document.createElement('div')
    _s.classList.add('status')
    document.body.appendChild(_s)
    function xw(href) {
        let u = href,
            r = /:\/\/(.[^/]+)/
            f = u.match(r)[1]
        return f
    }
    _h = loc.protocol + '//' + xw(loc.href) + '/'
    _s.addEventListener('click',function(ev){
        if (ev.target.textContent.includes('%')) {
            loc.replace(loc.origin + loc.pathname)
        } else {
            loc.replace(loc.origin + loc.pathname + '?s=#')
        }
    })
    
    let isInIframe = (parent !== window)
    let parentUrl = null
    if (isInIframe) {
        parentUrl = document.referrer
        // console.log('ll: ' + ll)
    } else {
        console.log('Welcome to init app')
    }
    
    let i = 0
    while (i < app.length) {
        let a, e, w, u, f, t, n, p, m
        a = app[i]
        e = document.createElement('a')
        m = document.createElement('span')
        p = document.createElement('img')
        t = document.createElement('span')
        w = document.querySelector('.list')
        n = a['name']
        // dir_project
        a['url'].startsWith('@') ? u = _h + '_j.em/' + a['url'].slice(1) : u = a['url']
        f = a['fav']
        e.classList.add('uri')
        m.classList.add('pic')
        t.classList.add('nam')
        p.src = '/_cdn_/favs/' + f + '.256.png'
        a.sec ? t.innerText = '# ' + n : t.innerText = n
        e.addEventListener(
            'click',
            function(event) {
                let ev = event
                ev.preventDefault()
                if (loc.href.includes('#')) {
                    window.open(u, '_blank')
                } else {
                    window.open(u, '_top')
                }
            }
        )
        e.href = '?noe'
        e.appendChild(m)
        m.appendChild(p)
        e.appendChild(t)
        w.appendChild(e)
        i++
    }
    
    if (loc.href.includes('#')) {
        _s.innerText = '%new tab'
    } else {
        _s.innerText = 'this tab'
    }
})