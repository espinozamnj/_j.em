if (location.search == '?pwa') {
    location.href = 'links?start'
}
if (location.search == '?exit_window') {
    window.close()
}
window.addEventListener('load', function() {
    let d_ = {
        c: [],
        ss: '',
        exp: ''
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
                d_.c.push(n.toString())
            })
        } else if (i == nm) {
            b.innerText = '+'
            b.addEventListener('click', function () {
                let ot = document.getElementById('opts')
                if (ot.classList.contains('visible')) {
                    ot.classList.remove('visible')
                    b.innerText = '+'
                } else {
                    ot.classList.add('visible')
                    b.innerText = '-'
                }
            })
        } else {
            b.innerText = '='
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
                let mod_userAgent = navigator.userAgent.replace(/\whrome\/\d[^ ]+/,'chromeXXX')
                _h_.guid = [
                    mod_userAgent,
                    navigator.deviceMemory,
                    getVideoCardInfo()
                ]
                _h_.tempMarkDate = new Date(d_.tm).getTime() / 1000
                _h_.expired = d_.exp
                _h_.key = s
                console.log(_h_)
                localStorage.setItem('sett', __cEn('123456', JSON.stringify(_h_)))
                setTimeout(function() {
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
    let others = document.createElement('div')
    others.classList.add('bt')
    others.id = 'opts'
    setTimeout(function() {
        let bt = [
            ['cs', function(emt) {
                let exp = others.children[1].children[0]
                if (emt.innerText == 'cs') {
                    emt.innerText = 'ss'
                    exp.value = '30'
                } else {
                    emt.innerText = 'cs'
                    exp.value = '10m'
                }
                d_.exp = exp.value
            }],
            ['input,<,text,exp', function (event) {
                setTimeout(function() {
                    d_.exp = event.target.value
                }, 1e2)
            }],
            ['x', function() {
                localStorage.removeItem('sett')
                setTimeout(function(){
                    location.href = location.href
                }, 8e2)
            }],
            ['#', function() {
                location.replace('./links')
            }],
            ['::', function() {
                location.replace('./off')
            }],
            ['input,#,password', function (event) {
                if (event.code == 'Enter') {
                    d_.c = event.target.value.split('')
                    setTimeout(function() {
                        document.getElementsByClassName('log')[0].click()
                    }, 2e2)
                }
            }],
        ]
        bt.forEach((b) => {
            if (b[0].includes('input,')) {
                let a = others.appendChild(document.createElement('a'))
                let i = a.appendChild(document.createElement('input'))
                let pro = b[0].split(',')
                i.setAttribute('placeholder', pro[1])
                i.setAttribute('type', pro[2])
                a.className = 'btn-s ipt'
                pro.length == 4 && (i.id = pro[3])
                i.classList.add('ipt-log')
                i.addEventListener('keydown',function(e) {
                    b[1](e)
                })
            } else {
                let a = others.appendChild(document.createElement('a'))
                a.innerText = b[0]
                a.classList.add('btn-s')
                a.addEventListener('click', function() {
                    b[1](a)
                })
            }
        })
        d_.ss = others.firstChild
    }, 1)
    d.parentElement.appendChild(others)
    let errorLogin = sessionStorage.getItem('error-login')
    if (errorLogin) {
        let err = document.createElement('div')
        err.className = 'error-log'
        err.innerText = errorLogin
        document.body.appendChild(err)
    }
})