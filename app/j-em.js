if (location.search == '?pwa') {
    location.href = 'links?start'
}
if (location.search == '?exit_window') {
    window.close()
}
window.addEventListener('load', function(e) {
    let d_ = {
        c: [],
        ss: ''
    }
    d_.tm = new Date()
    function toD(nt) {
        let nm = Number(nt),
            ns
        nm < 10
            ? ns = "0" + nm.toString()
            : ns = nm.toString()
        return ns
    }
    let d = document.getElementsByClassName('bt')[0],
        c = document.getElementById('clock'),
        i = 0,
        nm = 10
    c.innerText += toD(d_.tm.getHours()) + ':' + toD(d_.tm.getMinutes()) + ':' + toD(d_.tm.getSeconds())
    function getVideoCardInfo() {
        const gl = document.createElement('canvas').getContext('webgl')
        if (!gl) {
            return {
                error: "no webgl",
            }
        }
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        return debugInfo ? {
            vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
            renderer:  gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
        } : {
            error: "no WEBGL_debug_renderer_info",
        }
    }
    while (i < nm + 2) {
        let b = document.createElement('a'),
            n = i
        b.className = 'btn-s'
        if (i < nm) {
            b.innerText = n
            b.addEventListener('click', function () {
                d_
                    .c
                    .push(n.toString())
            })
            if (i == 0) {
                b.addEventListener('dblclick',function () {
                    localStorage.removeItem('sett')
                    setTimeout(function(){
                        location.href = location.href
                    }, 8e2)
                })
            }
        } else if (i == nm) {
            b.innerText = 'cs'
            d_.ss = b
            b.addEventListener('click', function (et) {
                let _e = et.target
                if (_e.innerText == 'cs') {
                    _e.innerText = 'ss'
                } else {
                    _e.innerText = 'cs'
                }
            })
        } else {
            b.innerText = 'send'
            b.classList.add('log')
            b.addEventListener('click', function () {
                let s = '',
                _h_ = {}
                d_.c.forEach(function (j) {s += j})
                _h_.svs = true
                if (d_.ss.innerText.includes('c')) {
                    _h_.svs = false
                    sessionStorage.setItem('__app-log','')
                } else {
                    sessionStorage.setItem('__app-log','0')
                }
                _h_.guid = [
                    navigator.appVersion,
                    navigator.deviceMemory,
                    getVideoCardInfo()
                ]
                _h_.tempMarkDate = new Date(d_.tm).getTime() / 1000
                _h_.key = s
                console.log(_h_)
                localStorage.setItem('sett', __cEn('123456',JSON.stringify(_h_)))
                setTimeout(function(){
                    if (location.href.includes('?')) {
                        let to = location.search
                        to = to.substring(2, to.length)
                        to = __cDe('to', to)
                        let go = location.origin + to
                        location.href = go
                    } else {
                        // dir_project
                        location.href = location.origin + '/_j.em/app/'
                    }
                }, 5e2)
            })
        }
        d.appendChild(b)
        i += 1
    }
    setTimeout(function(){
        let bt = [
            ['#', function() {
                location.replace('./links')
            }],
            ['::', function() {
                location.replace('./off')
            }]
        ]
        bt.forEach((b) => {
          let a = document.getElementsByClassName('bt')[0].appendChild(document.createElement('a'))
          a.innerText = b[0]
          a.classList.add('btn-s')
          a.addEventListener('click', function() {
                b[1]()
            })
        })
        setTimeout(function() {
            let a = document.getElementsByClassName('bt')[0].appendChild(document.createElement('a'))
            let i = a.appendChild(document.createElement('input'))
            i.setAttribute('placeholder','#')
            i.setAttribute('type','password')
            a.classList.add('btn-s')
            i.classList.add('ipt-log')
            i.addEventListener('keydown',function(e) {
                if (e.which == 13) {
                    d_.c = i.value.split('')
                    setTimeout(function() {
                        document.getElementsByClassName('log')[0].click()
                    }, 2e2)
                }
            })
        }, 1)
    }, 1)
})