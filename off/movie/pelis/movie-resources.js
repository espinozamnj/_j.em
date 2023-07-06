(function(){
    function nd(where, what, attr) {
        let _w = where, i = 0
        n = document.createElement(what)
        while (i < attr.length) {
            let t = attr[i]
            n.setAttribute(t[0], t[1])
            _w.appendChild(n)
            i++
        }
        return n
    }
    let t, s, a, k, na
    t = new Date().getTime()
    t = '?' + t
    let sjs = nd(document.body, 'div', [['class', 'sjs']])
    na = nd(document.head, 'div', [['id', 'naps-jem']])
    na = nd(sjs, 'script', [['src', document.location.origin + '/_cdn_/rm-wbha.js']])
    k = nd(document.head, 'link', [['rel', 'stylesheet'], ['href', './../pelis/movie.css' + t]])
    a = nd(sjs, 'script', [['src', './base.js' + t ]])
    a.addEventListener('load', function(){
        s = nd(sjs, 'script', [['src', './../pelis/movie.min.js' + t ]])
    })
})()