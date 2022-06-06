(function() {
    if (location.hash == '#new') {
        let d = location.href
        open(d.substring(0, d.length - 4))
    }
    let surl = location.search
    if (!!surl && surl.length > 5) {
        let soc = surl.substring(5, surl.length)
        soc = __cDe('app-soc', soc)
        console.log(soc)
        if (soc.includes('[[')) {
            soc = JSON.parse(soc)
            console.log(soc)
            let group = [],
                _d = document.createElement('div')
                __i = 0
            soc.net.forEach(
                function(d){
                    group.push(d[0])
                }
            )
            document.title = 'resource | ' + soc.url
            let nmm = document.createElement('a')
            nmm.classList.add('url-origin')
            nmm.href = soc.url
            nmm.innerText = soc.url
            let nmn = document.createElement('a')
            nmn.classList.add('url-origin')
            nmn.href = './../url/?url=' + encodeURIComponent(soc.url)
            nmn.innerText = './../url/?url=' + encodeURIComponent(soc.url)
            document.querySelector('.main').appendChild(nmm)
            document.querySelector('.main').appendChild(nmn)
            group = group.filter((v, i, a) => a.indexOf(v) === i)
            while (__i < group.length) {
                let e = group[__i],
                    c = document.createElement('div')
                _t = document.createElement('div')
                _c = document.createElement('div')
                c.classList.add('con')
                _t.innerText = e
                _c.classList.add('list')
                _c.classList.add('type-' + e.toUpperCase())
                c.appendChild(_t)
                _t.classList.add('head')
                c.appendChild(_c)
                _d.appendChild(c)
                __i += 1
            }
            document.querySelector('.main').appendChild(_d)
            for(let n = 0; n < soc.net.length; n++){
                let e = soc.net[n]
                    t = e[0]
                    s = e[1]
                    a = document.createElement("a")
                    c = document.getElementsByClassName("type-" + t)[0]
                a.innerText = s
                a.href = s
                c.appendChild(a)
            }
        } else {
            document.getElementsByClassName('alert')[0].innerText = 'json error'
        }
    } else {
        document.getElementsByClassName('alert')[0].innerText = 'url empty'
    } 
})();