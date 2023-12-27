(function () {
    if (!document.contentType.includes('html')) {
        return false
    }
    if (window.import_bkls_start) {
        alert('CCTXMENU has already been executed')
        return false
    }
    function radr(fn) {
        if (document.readyState == 'interactive' || document.readyState == 'complete') {
            fn()
        } else {
            window.addEventListener('DOMContentLoaded', function () { fn() })
        }
    }
    radr(function() {
        let csp_cont = { ejs: true, css: true, fnt: true }
        if (typeof(trustedTypes) != 'undefined') {
            if (!trustedTypes.defaultPolicy) {
                window.trustedTypes.createPolicy('default', { createHTML: (string, sink) => string })
            }
        }
        function evalAfterCSP() {
            if (!window.import_bkls_start) {
                window.import_bkls_start = true
                window.__select = ''
                let ready_install_resources = !!window._bkl_ && !!window.icons_fa_bank
                function i(t, a, w) {
                    let i = 0
                    let n = document.createElement(t)
                    while (i < a.length) {
                        let t = a[i]
                        n.setAttribute(t[0], t[1])
                        i++
                    }
                    w.appendChild(n)
                    return n
                }
                function save() {
                    if (window.getSelection() != '') {
                        window.__select = window.getSelection()
                    }
                }
                window.addEventListener('click', function () { save() }, false)
                window.addEventListener('touchstart', function () { save() }, false)
                window.addEventListener('touchend', function () { save() }, false)
                window.addEventListener('mousedown', function () { save() }, false)
                window.addEventListener('mouseup', function () { save() }, false)

                let jso = location.host.includes('127')
                    ? '//127.0.0.1:5501'
                    : location.origin.includes('test')
                        ? '//locked.test/'
                        : '//espinozamnj.github.io/'
                let SR = document.createElement('div')
                SR.id = 'context-menu-addons'
                document.body.appendChild(SR)
                let SRO = SR.attachShadow({ mode: 'open' })
                // SRO = SR
                let sameTest = location.pathname.includes('_j.em/off/save/js')

                let fontMain = 'Raleway'
                if (csp_cont.css && csp_cont.fnt) {
                    function install_my_font() { WebFont.load({ google: { families: [fontMain] } }) }
                    if (typeof (WebFont) == 'object') {
                        install_my_font()
                    } else {
                        let ff = i('script', [['src', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js']], SRO)
                        ff.addEventListener('load', function () {
                            setTimeout(function () {
                                install_my_font()
                            }, 3e2)
                        })
                    }
                }

                let iconFA = function (c, w, s) { }
                let data_used_icons = []
                // dir_project
                if (sameTest) {
                    i('script', [['src', jso + '_j.em/off/save/js/all-fa.min.js']], SRO)
                    iconFA = function (name, where, size) {
                        let createIcon = setInterval(function () {
                            if (typeof (window.FontAwesome) == 'object') {
                                clearInterval(createIcon)
                                let svgend = ''
                                let td = i('div', [], document.body)
                                td.style.display = 'none'
                                i('i', [['class', name]], td)
                                setTimeout(function () {
                                    svgend = td.children[0].outerHTML
                                    let htmlELM = new DOMParser().parseFromString(svgend, 'text/xml')
                                    let svgElm = htmlELM.firstChild
                                    let toRemove = 'class|xmlns|focusable|role|data-fa-i2svg|aria-hidden|data-prefix|data-icon'
                                    toRemove.split('|').forEach(function (attr) {
                                        svgElm.hasAttribute(attr) && svgElm.removeAttribute(attr)
                                    })
                                    setTimeout(function() {
                                        data_used_icons.push({
                                            'name': name,
                                            'code': svgElm.outerHTML
                                        })
                                    }, 2e2)
                                    where.appendChild(svgElm)
                                    svgElm.style.height = size + 'px'
                                    document.body.removeChild(td)
                                }, 2e2)
                            }
                        }, 5e2)
                    }
                } else {
                    iconFA = function (classIconName, where, size) {
                        let getIcon = setInterval(function () {
                            if (typeof window.icons_fa_bank == 'object') {
                                clearInterval(getIcon)
                                let bank = window.icons_fa_bank
                                let result_icon = bank.filter(a => a.name == classIconName)
                                if (result_icon.length > 0) {
                                    where.innerHTML = result_icon[0]['code']
                                    where.firstChild.style.height = size + 'px'
                                }
                            }
                        }, 5e2)
                    }
                }
                function initMenu() {
                    function create(tag, clas, css, style, where) {
                        let sty = '.' + css + '{' + style + '}'
                        style == '' ? cssFull += '' : cssFull += sty
                        let g = document.createElement(tag)
                        clas.split(',').forEach(function (c) {
                            g.classList.add(c)
                        })
                        where.appendChild(g)
                        return g
                    }
                    let cssBod = /*css */`
    xyz{position:fixed;z-index:10000000;width:100%;height:100%;overflow:hidden;
    background:rgba(255,255,255,0.82);backdrop-filter:blur(18px) saturate(1.1) brightness(1.15);
    box-shadow:0px 2px 16px 2px rgba(0,0,0,0.26);border-width:1px;border-bottom-width:0px;
    border-style:solid;border-color:rgb(185,185,185);transform:translateY(205vh)}`
                    cssBod = cssBod.replaceAll('\n', '').replace('xyz{', '').slice(0, -1)
                    let ae = {}
                    ae.width = 260
                    ae.height = 600
                    let cssFull = /*css*/`
                        .--alt *,
                        .--alt * *,
                        .--alt * * *,
                        .--alt * * * * {
                            line-height: initial;
                            font-weight: initial;
                            letter-spacing: initial;
                            color: initial;
                            text-decoration: initial;
                            user-select: none;
                        }
                        .--tog {
                            position:fixed;z-index:2147483647;top:0;right:10px;padding:6px 14px;background:white;opacity:0.1;border-radius:0px 0px 8px 8px;min-height:16px;
                        }
                        .--tog:hover {
                           opacity: 0.89;
                        }
                        .--alt .view {
                            transform:translateY(0) !important;
                        }
                        .--alt .--bod {
                            max-width:${ae.width}px;
                            max-height:${ae.height}px;
                        }
                        .--bod .--bc::-webkit-scrollbar {
                            width: 14px;
                            background-color:transparent;
                        }
                        .--bod .--bc::-webkit-scrollbar-thumb {
                            background-clip: padding-box;
                            background-color: rgba(0,0,0,0.08);
                        }
                        .--bod .--bc.popup::-webkit-scrollbar-thumb {
                            border: 3px solid transparent;
                            border-radius: 10px;
                        }
                        .--bod .--bc:not(.popup)::-webkit-scrollbar-thumb {
                            border-left: 5px solid transparent;
                        }
                        .--bod .--bc::-webkit-scrollbar-thumb:hover {
                            background-color:rgba(0,0,0,0.15);
                        }
                        .--bod .--bc::-webkit-scrollbar-thumb:active {
                            background-color:rgba(0,0,0,0.25);
                        }
                        .--bod *:not(.--alt i) {
                            font-family:'${fontMain}', system-ui, sans-serif
                        }
                        .--alt .--cont:last-child {
                            margin-bottom:14px;
                        }
                        .--alt .--cont:not(.--alt .--cont:last-child)::after {
                            content:"";position:absolute;bottom:-4px;left:10px;right:10px;width:auto;border-radius:6px;height:2px;background:rgb(177,177,177)
                        }
                        .--alt .--item {
                            display:flex;align-items:center;text-decoration:none;cursor:pointer;padding:6px 9px;transition:all .3s;font-size:13px;text-align:start;
                        }
                        .--alt .--item:hover {
                            background: white;box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.66);
                        }
                        .--alt .--item:hover svg * {
                            fill: black !important;
                        }
                        .--alt .--item i,
                        .--alt .--item svg {
                            height: 13px;
                            width: 22px !important;
                            color: black !important;
                            text-align: center !important;
                            margin-right: 10px !important;
                        }
                        .--tog svg {
                            height: 14px;
                            width: 18px !important;
                            color: black !important;
                            text-align: center !important;
                            position: relative;
                            z-index: -1;
                        }
                        .--alt .--item svg path {
                            fill: rgb(75, 75, 75) !important;
                        }
                        .--alt .--item span {
                            flex: 1;
                            color: black;
                        }
                        .--alt .--bod .close-btn i svg path {
                            fill: #bb2b2b !important;
                        }
                        .--alt .--bod .close-btn span {
                            color: #bb2b2b !important;
                        }
                    `
                    ae.sr = SRO
                    ae.init = create('div', '--alt', '', '', SRO)
                    ae.body = create('div', '--bod', '--alt .--bod', cssBod, ae.init)
                    cssFull = cssFull.replaceAll('\n', '').replaceAll('    ', '').replaceAll('\t', '')
                    ae.toogle = create('div', '--tog', '', '', ae.init)
                    // ae.toogle.innerText = '::'
                    iconFA('fas fa-bars', ae.toogle, 14)

                    let mov = {}
                    mov.dragItem = ae.toogle
                    mov.dcb = SRO
                    mov.active = false
                    mov.currentX
                    mov.currentY
                    mov.initialX
                    mov.initialY
                    mov.xOffset = 0
                    mov.yOffset = 0
                    function dragStart(e) {
                        if (e.type === 'touchstart') {
                            mov.initialX = e.touches[0].clientX - mov.xOffset
                            mov.initialY = e.touches[0].clientY - mov.yOffset
                        } else {
                            mov.initialX = e.clientX - mov.xOffset
                            mov.initialY = e.clientY - mov.yOffset
                        }
                        if (e.target === mov.dragItem) {
                            mov.active = true
                            mov.dragItem.style.cursor = 'move'
                        }
                    }
                    function dragEnd() {
                        mov.initialX = mov.currentX
                        mov.initialY = mov.currentY
                        mov.active = false
                        mov.dragItem.style.cursor = 'grab'
                    }
                    function drag(e) {
                        if (mov.active) {
                            e.preventDefault()
                            mov.dragItem.style.cursor = 'grabbing'
                            if (e.type === 'touchmove') {
                                mov.currentX = e.touches[0].clientX - mov.initialX
                                mov.currentY = e.touches[0].clientY - mov.initialY
                            } else {
                                mov.currentX = e.clientX - mov.initialX
                                mov.currentY = e.clientY - mov.initialY
                            }
                            mov.xOffset = mov.currentX
                            mov.yOffset = mov.currentY
                            setTranslate(mov.currentX, 0, ae.toogle)
                        }
                    }
                    function setTranslate(xPos, yPos, el) {
                        el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
                    }
                    mov.dcb.addEventListener('touchstart', dragStart, false)
                    mov.dcb.addEventListener('touchend', dragEnd, false)
                    mov.dcb.addEventListener('touchmove', function(e) {drag(e)}, false)
                    mov.dcb.addEventListener('mousedown', dragStart, false)
                    mov.dcb.addEventListener('mouseup', dragEnd, false)
                    mov.dcb.addEventListener('mousemove', function(e) {drag(e)}, false)

                    let poX = 0, poY = 0
                    document.addEventListener('mousemove', function (event) {
                        poX = event.clientX
                        poY = event.clientY
                    })
                    function getScrollbarWidth() {
                        let scrollbarWidth
                        if (document.body.offsetHeight > window.innerHeight) {
                            const outer = document.createElement('div')
                            outer.style.visibility = 'hidden'
                            outer.style.overflow = 'scroll'
                            outer.style.msOverflowStyle = 'scrollbar'
                            document.body.appendChild(outer)
                            const inner = document.createElement('div')
                            outer.appendChild(inner)
                            scrollbarWidth = (outer.offsetWidth - inner.offsetWidth)
                            outer.parentNode.removeChild(outer)
                        } else {
                            scrollbarWidth = 0
                        }
                        return scrollbarWidth;
                    }
                    function alternateVisibleMenuToogle(position) {
                        let b = ae.body
                        if (position) {
                            let scrW = getScrollbarWidth()
                            b.firstChild.classList.add('popup')
                            let min_right = poX + ae.width + scrW > window.innerWidth
                            if (min_right) {
                                b.style.right = ((window.innerWidth - poX) - scrW) + 'px'
                                b.style.left = 'auto'
                            } else {
                                b.style.left = poX + 'px'
                                b.style.right = 'auto'
                            }
                            if (poY + ae.height > window.innerHeight) {
                                b.style.top = 'auto'
                                b.style.bottom = (window.innerHeight - poY) + 'px'
                            } else {
                                if (min_right) {
                                    b.style.top = poY - 8 + 'px'
                                } else {
                                    b.style.top = poY + 'px'
                                }
                                b.style.bottom = 'auto'
                            }
                            b.style.bottom = '10px'
                            b.style.transition = 'none'
                            b.style.borderRadius = '8px'
                        } else {
                            b.firstChild.classList.remove('popup')
                            b.style.transition = 'all 0.4s'
                            b.style.left = 'auto'
                            b.style.top = 'auto'
                            b.style.bottom = '0px'
                            b.style.right = '10px'
                            b.style.borderRadius = '11px 11px 0px 0px'
                        }
                        b.classList.toggle('view')
                        ae.b.scrollTo(0, 0)

                    }
                    ae.toogle.addEventListener('mouseenter', function () {
                        alternateVisibleMenuToogle(false)
                    })
                    ae.toogle.addEventListener('click', function () {
                        alternateVisibleMenuToogle(false)
                    })
                    window.addEventListener('contextmenu', function (e) {
                        if (e.altKey && SR.style.display == '') {
                            e.preventDefault()
                            alternateVisibleMenuToogle(true)
                        }
                    })
                    ae.b = create(
                        'div',
                        '--bc',
                        '--alt .--bc',
                        'height:100%;width:100%;display:flex;flex-direction:column;overflow-x:hidden;overflow-y:overlay',
                        ae.body
                    )
                    ae.i = {
                        a: create('div', '--cont', '--alt .--cont', 'position:relative;padding:6px 0px;margin-bottom:8px', ae.b),
                        b: create('div', '--cont', '', '', ae.b),
                        c: create('div', '--cont', '', '', ae.b),
                        d: create('div', '--cont', '', '', ae.b),
                        e: create('div', '--cont', '', '', ae.b),
                        f: create('div', '--cont', '', '', ae.b)
                    }
                    let buttonsMenu = [
                        ['preview', 'arrow-left', (function () { history.go(-1) }), ae.i.a],
                        ['next', 'arrow-right', (function () { history.go(1) }), ae.i.a],
                        ['share', 'share-alt', 'share', ae.i.a],
                        ['refresh', 'redo', (function () { location.href = location.href }), ae.i.a],
                        ['duplicate', 'clone', (function () { open(location.href, "_blank") }), ae.i.a],
                        ['index site', 'home', (function () { location.href = location.origin }), ae.i.a],
                        ['go parent', 'arrow-up', (function () { let f = location.href.split("/"), i = 0, p = ""; while (i < f.length - 2) { p += f[i] + "/"; i++ }; open(p, "_blank") }), ae.i.a],
                        ['search site', 'fabgoogle', 'search_web', ae.i.a],
                        ['zoom', 'search-plus', 'zoom', ae.i.b],
                        ['viewport', 'mobile-alt', 'viewport', ae.i.b],
                        ['reader', 'align-left', 'read', ae.i.b],
                        ['to speech', 'volume-up', 'voice', ae.i.b],
                        ['invert', 'moon', 'invert', ae.i.b],
                        ['dark mode', 'adjust', 'nigth mode', ae.i.b],
                        ['read', 'book-open', 'clean', ae.i.b],
                        ['print', 'print', 'print', ae.i.b],
                        ['delete items', 'eraser', 'deldom', ae.i.b],
                        ['edit page', 'backspace', 'contenteditable', ae.i.b],
                        ['go to top', 'arrow-circle-up', 'go top', ae.i.b],
                        ['go to bottom', 'arrow-circle-down', 'go bottom', ae.i.b],
                        ['translate', 'globe-africa', 'lang', ae.i.c],
                        ['google translate', 'language', 'gtr', ae.i.c],
                        ['yandex translate', 'fabyandex-international', 'ytr', ae.i.c],
                        ['definition', 'spell-check', 'mean', ae.i.c],
                        ['fullscreen', 'expand', 'full screen', ae.i.d],
                        ['console', 'terminal', 'ins', ae.i.d],
                        ['eval js', 'code', 'evaljs', ae.i.d],
                        ['show password', 'key', 'show passwords', ae.i.d],
                        ['window', 'window-restore', 'wid', ae.i.d],
                        ['QR URL', 'qrcode', 'get qr', ae.i.e],
                        ['saved', 'heart', 'savedio', ae.i.e],
                        ['telegram share', 'fabtelegram-plane', (function () { open("https://telegram.me/share/url?url=" + location.href, "_blank") }), ae.i.e],
                        ['copy to markdown', 'link', 'link', ae.i.e],
                        ['view as PDF', 'file-pdf', 'get pdf', ae.i.e],
                        ['resources', 'sitemap', 'resources', ae.i.e],
                        ['save images', 'file-image', 'save img', ae.i.e],
                        ['info site', 'info', 'site_info', ae.i.f],
                        ['addons', 'puzzle-piece', 'addons', ae.i.f],
                        ['bookmarks', 'external-link-alt', (function () { open(jso + "_j.em/off/save/", "_blank") }), ae.i.f],
                        ['close', 'circle-minus', (function () { SR.style.display = 'none' }), ae.i.f],
                    ]
                    buttonsMenu.forEach(function (bt) {
                        let info = {
                            'name': bt[0],
                            'icon': bt[1],
                        }
                        let b = document.createElement('a'),
                            ic = document.createElement('i'),
                            s = document.createElement('span'),
                            classIcon = ''
                        if (info.icon.includes('fab')) {
                            classIcon = 'fab ' + 'fa-' + info.icon.substring(3)
                        } else {
                            classIcon = 'fas ' + 'fa-' + info.icon
                        }
                        iconFA(classIcon, ic, 13)
                        if (typeof (bt[2]) == 'string') {
                            let res = _bkl_.filter(element => element.name.toString().toLowerCase() == bt[2].toLowerCase())
                            if (res.length > 0) {
                                info.exe = res[0]['fn']
                                info.origin = 'external'
                                info.real_name = res[0]['name']
                                info.fn_string = res[0]['url']
                            } else {
                                info.exe = function () {
                                    alert('this function does not exist')
                                }
                                info.origin = 'none'
                            }
                        } else {
                            info.exe = bt[2]
                            info.origin = 'same'
                            info.fn_string = _Fn2Str(bt[2])
                        }
                        b.addEventListener('click', function (e) {
                            e.preventDefault()
                            let method = 'isfn'
                            switch (method) {
                                case 'eval':
                                    eval(bt[4])
                                    break
                                case 'create':
                                    let script = document.createElement('script')
                                    script.type = 'text/javascript'
                                    script.innerHTML = bt[4]
                                    document.body.appendChild(script)
                                    setTimeout(function () {
                                        document.body.removeChild(script)
                                    }, 1e3)
                                    break
                                case 'newfn':
                                    let fn = new Function(bt[4])
                                    fn()
                                    break
                                case 'isfn':
                                    info.exe()
                                    break
                                default:
                                    break
                            }
                        })
                        b.addEventListener('contextmenu', function () {
                            let fragment_code = info.fn_string.substring(12, 90)
                            fragment_code = fragment_code.replace(/\}\)\(\)$/, '')
                            console.groupCollapsed('info script')
                            console.log(info)
                            console.log(fragment_code)
                            console.groupCollapsed('all script')
                            console.log(info.fn_string)
                            console.groupEnd()
                            console.groupEnd()
                        })
                        b.classList.add('--item')
                        s.innerText = info.name.substring(0, 1).toUpperCase() + info.name.slice(1)
                        b.appendChild(ic)
                        b.appendChild(s)
                        bt[3].appendChild(b)
                    })
                    let closeBtn = ae.b.lastElementChild.lastElementChild
                    closeBtn.classList.add('close-btn')
                    closeBtn.addEventListener('contextmenu', function() {
                        SR.parentNode.removeChild(SR)
                    })
                    console.log('%cCCTXMENU', 'font-size:16px;font-weight:bold')
                    if (sameTest) {
                        console.log('show icons bank:', data_used_icons)
                    }
                    ae.css = document.createElement('style')
                    ae.css.innerText = cssFull
                    try {
                        ae.init.appendChild(ae.css)
                    } catch (error) {
                        console.error('cctxmenu at set styles')
                        SR.style.display = 'none'
                    }
                }
                function showErrorCSP() {
                    let p = document.createElement('div')
                    document.body.appendChild(p)
                    p.innerText = 'CCTXmenu not allowed bt CSP'
                    p.addEventListener('click', function() {document.body.removeChild(p)})
                    try {
                        p.setAttribute('style', 'color:darkred;font-size:10px;padding-inline:12px;text-align:center;width:100%;position:fixed;bottom:14px;left:0;right:0;z-index:1000000')
                    } catch (e) {
                       console.warn('not allowed insert css')
                    }
                }
                function validCss() {
                    if (csp_cont.css) {
                        initMenu()
                    } else {
                        showErrorCSP()
                    }
                }
                if (!ready_install_resources) {
                    if (!csp_cont.ejs) {
                        console.warm("CCTXMENU can't load external sources")
                        showErrorCSP()
                    } else {
                        if (!window.icons_fa_bank) {
                            i('script', [['src', jso + '_j.em/off/save/js/icons-bank.js']], SRO)
                        }
                        if (!window._bkl_) {
                            let bk = i('script', [['src', jso + '_j.em/off/save/js/t-url.js']], SRO)
                            bk.addEventListener('load', function () {
                                validCss()
                            })
                        } else {
                            validCss()
                        }
                    }
                } else {
                    validCss()
                }
            } else {
                alert('CCTXMENU has already been executed')
            }
        }
        fetch(document.location.href).then(function (r) {
            let extSrcCSPValues = '*,http,https'
            function validSrc(arr, find) {
                return find.split(',').some(function(i) {return arr.includes(i)})
            }
            let d = r.headers.get('Content-Security-Policy')
            let e
            if (d) {
                let t_e = d.split(';').map(function (i) { return i.trim() })
                t_e = t_e.filter(function (i) { return i != '' })
                e = {}
                t_e.forEach(function (p) {
                    let t_a = p.replace('  ', ' ').split(' ')
                    let n = t_a[0]
                    let l = e[n] || []
                    let o = t_a.slice(1).map(function (t) {
                        let f = t.charAt(0)
                        if (f == '"' || f == "'") {
                            return ':' + t.slice(1, -1)
                        } else {
                            return t
                        }
                    })
                    l = l.concat(o)
                    e[n] = l
                })
                let csp = {
                    "e-js-e": e['script-src-elem'],
                    "e-js-s": e['script-src'],
                    "e-styl": e['style-src'],
                    "e-font": e['font-src']
                }
                csp['r-js-e'] = !csp['e-js-e'] ? true : validSrc(csp['e-js-e'], extSrcCSPValues + ',strict-dynamic')
                csp['r-js-s'] = !csp['e-js-s'] ? true : validSrc(csp['e-js-s'], extSrcCSPValues + ',strict-dynamic')
                csp['r-font'] = !csp['e-font'] ? true : validSrc(csp['e-font'], extSrcCSPValues + ',https://fonts.gstatic.com')
                csp['r-styl'] = !csp['e-styl'] ? true : validSrc(csp['e-styl'], extSrcCSPValues + ',:unsafe-inline')
                console.log(e)
                console.log(csp)
                csp_cont.ejs = csp['r-js-e'] || csp['r-js-s']
                csp_cont.css = csp['r-styl']
                csp_cont.fnt = csp['r-font']
            }
            evalAfterCSP()
        })
    })
})()