if (location.search == '?pwa') {
    location.href = './../links?start'
}
window.addEventListener('load', function (){
    let loc = window.location, app = __apps__
    
    function cte(tag) {
        return document.createElement(tag)
    }

    let _s = cte('div')
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
            open('#self', '_self')
        } else {
            open('#new', '_self')
        }
    })
    
    if (parent == window) {
        console.log('Welcome to init app')
    }
    let list = document.querySelector('.list')
    let i = 0
    while (i < app.length) {
        let a, e, w, u, f, t, n, p, m
        a = app[i]
        e = cte('a')
        m = cte('span')
        p = cte('img')
        t = cte('span')
        w = list
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
                if (loc.hash == '#new') {
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
    let add_fake_apps = 8
    while (add_fake_apps--) {
        let a = cte('a')
        a.className = 'uri hidden'
        list.appendChild(a)
    }
    (function(){
        let box = cte('div')
        box.className = 'find'
        let r = document.querySelector('.root')
        r.insertBefore(box, r.firstChild)
        let input = cte('input')
        input.setAttribute('type', 'text')
        input.setAttribute('autocomplete', 'off')
        input.setAttribute('spellcheck', 'false')
        input.setAttribute('placeholder', 'Buscar...')
        input.classList.add('search')
        box.appendChild(input)
        input.addEventListener('input', function(e) {
            let search = e.target.value
            search = search.toLowerCase().trim()
            let childs = list.children
            let z = childs.length
            let i = 0
            while (i < z) {
                let child = childs[i]
                let content = child.textContent.toLowerCase()
                if (content.includes(search)) {
                    child.style.display = ''
                } else {
                    if (!child.classList.contains('hidden')) {
                        child.style.display = 'none'
                    }
                }
                i++
            }
        })
    })()
    function verifyScroll() {
        let v_scroll = sessionStorage.getItem('scroll-app')
        if (!!v_scroll) {
            document.documentElement.scrollTop = Number(v_scroll)
        }
    }
    verifyScroll()
    window.addEventListener('scroll', function(){
        sessionStorage.setItem('scroll-app', document.documentElement.scrollTop)
    })
    function verifyHash() {
        if (loc.hash == '#new') {
            _s.innerText = '%new tab'
        } else {
            _s.innerText = 'this tab'
        }
    }
    window.addEventListener('hashchange', function (){
        verifyHash()
        verifyScroll()
    })
    verifyHash()
})