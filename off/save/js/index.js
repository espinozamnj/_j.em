(function() {
    if (!document.contentType.includes('html')) {
        return false
    }
    let domsForbidden = ['instagram.com']
    let stopInstallExternal = false
    domsForbidden.forEach(function(dom) {
        if (!stopInstallExternal && location.host.includes(dom)) {
            stopInstallExternal = true
        }
    })
    setTimeout(function() {
        let es = document.createElement('script')
        let d = new Date().getTime()
        es.crossOrigin = "Anonymous"
        document.head.appendChild(es)
        es.src = 'https://espinozamnj.github.io/_cdn_/glibs/get-test.js?' + d
        es.addEventListener('load', function() {
            stopInstallExternal = true
        })
        es.addEventListener('error', function(e) {
            stopInstallExternal = false
        })
    })
    if (!stopInstallExternal) {
        if (!window.trustedTypes.defaultPolicy) {
            window.trustedTypes.createPolicy('default', {createHTML: (string, sink) => string})
        }
    }
    if (typeof(window.import_bkls_start) == 'undefined') {
        window.import_bkls_start = true
        window.__select = ''
        let ready_install_resources = window['__ready-install-context'] == undefined ? false : true
        function save() {
            if(window.getSelection() != '') {
                window.__select = window.getSelection()
            }
        }
        window.addEventListener('click', function() {save()}, false)
        window.addEventListener('touchstart', function() {save()}, false)
        window.addEventListener('touchend', function() {save()}, false)
        window.addEventListener('mousedown', function() {save()}, false)
        window.addEventListener('mouseup', function() {save()}, false)

        var jso = ''
        let isTest = location.host.includes('127')
        if (isTest) {
            jso = '//127.0.0.1:5501/'
        } else {
            location.origin.includes('test') ? jso = 'https://locked.test/' : jso = 'https://espinozamnj.github.io/'
        }

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

        let SR = document.createElement('div')
        SR.id = 'context-menu-addons'
        if (document.contentType.includes('xml')) {
            console.warn('NO INSTALL PANEL.JS')
        } else {
            document.body.appendChild(SR)
        }
        var SRO = SR.attachShadow({mode: 'open'})
        // SRO = SR
        let fontMain = 'Raleway'
        setTimeout(function() {
            function install_my_font() {
                WebFont.load({
                    google: {
                        families: [fontMain]
                    }
                })
            }
            if (!stopInstallExternal) {
                if (typeof(WebFont) == 'object' || ready_install_resources) {
                    install_my_font()
                } else {
                    let ff = i('script',[['src', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js']], SRO)
                    ff.addEventListener('load', function() {
                        setTimeout(function() {
                            install_my_font()
                        }, 3e2)
                    })
                }
            }
        }, 1e3)
        let sameTest = location.pathname.includes('_j.em/off/save/js/') && true
        let data_used_icons = []
        let iconFA = function() {}
        // dir_project
        if (sameTest) {
            i('script',[['src', jso + '_j.em/off/save/js/all-fa.min.js']], SRO)
            iconFA = function(name, where) {
                let createIcon = setInterval(function() {
                    if (typeof(window.FontAwesome) == 'object') {
                        clearInterval(createIcon)
                        let svgend = ''
                        let td = i('div', [], document.body)
                        td.style.display = 'none'
                        i('i', [['class', name]], td)
                        setTimeout(function() {
                            svgend = td.children[0].outerHTML
                            let htmlELM = new DOMParser().parseFromString(svgend, 'text/xml')
                            let svgElm = htmlELM.firstChild
                            let toRemove = 'class|focusable|role|data-fa-i2svg|aria-hidden|data-prefix|data-icon'
                            toRemove.split('|').forEach(function(attr) {
                                svgElm.hasAttribute(attr) && svgElm.removeAttribute(attr)
                            })
                            data_used_icons.push({
                                'name': name,
                                'code': svgElm.outerHTML
                            })
                            where.appendChild(svgElm)
                            document.body.removeChild(td)
                        }, 2e2)
                    }
                }, 5e2)
            }
        } else {
            if (!ready_install_resources) {
                i('script',[['src', jso + '_j.em/off/save/js/icons-bank.js']], SRO)
            }
            iconFA = function(classIconName, where) {
                let getIcon = setInterval(function() {
                    if (typeof window.icons_fa_bank == 'object') {
                        clearInterval(getIcon)
                        let bank = window.icons_fa_bank
                        let result_icon = bank.filter(a => a.name == classIconName)
                        if (result_icon.length > 0) {
                            where.innerHTML = result_icon[0]['code']
                        }
                    }
                }, 5e2)
            }
        }
        function readBKL() {
            function create(tag, clas, css, style, where) {
                let sty = '.' +  css + '{' + style + '}'
                style == '' ? ae.css.innerText += '' : ae.css.innerText += sty
                let g = document.createElement(tag)
                clas.split(',').forEach(function(c) {
                    g.classList.add(c)
                })
                where.appendChild(g)
                return g
            }
            var ae = {}
            ae.width = 260
            ae.height = 600
            ae.css = document.createElement('style')
            ae.css.innerText = `
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
                    display:flex;align-items:center;text-decoration:none;cursor:pointer;padding:6px 9px;transition:all .3s;font-size:13px;
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
            `.replaceAll('\n','').replaceAll('    ','').replaceAll('\t','')
            ae.sr = SRO
            ae.init = create(
                'div',
                '--alt',
                '',
                '',
                SRO
            )
            ae.body = create(
                'div',
                '--bod',
                '--alt .--bod',
                'position:fixed;z-index:10000000;width:100%;height:100%;overflow:hidden;background:rgba(255,255,255,0.82);backdrop-filter:blur(18px) saturate(1.1) brightness(1.15);box-shadow:0px 2px 16px 2px rgba(0,0,0,0.26);border-width:1px;border-bottom-width:0px;border-style:solid;border-color:rgb(185,185,185);transform:translateY(205vh)',
                ae.init

            )
            try {
                ae.init.appendChild(ae.css)
            } catch (error) {
                ae.init.style.display = 'none'
            }
            ae.toogle = create('div', '--tog', '', '', ae.init)
            // ae.toogle.innerText = '::'
            iconFA('fas fa-bars', ae.toogle)

            var mov = {}
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
            function dragEnd(e) {
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
            mov.dcb.addEventListener('touchmove', drag, false)
            mov.dcb.addEventListener('mousedown', dragStart, false)
            mov.dcb.addEventListener('mouseup', dragEnd, false)
            mov.dcb.addEventListener('mousemove', drag, false)

            var poX = 0, poY = 0, lastKEY = 0
            document.addEventListener('mousemove', function(event) {
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
                        b.style.bottom =  (window.innerHeight - poY) + 'px'
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
            ae.toogle.addEventListener('mouseenter', function() {
                alternateVisibleMenuToogle(false)
            })
            ae.toogle.addEventListener('click', function() {
                alternateVisibleMenuToogle(false)
            })
            window.addEventListener('keydown', function(event) {
                lastKEY = event.keyCode
            })
            window.addEventListener('contextmenu', function(e) {
                if (lastKEY == 18 && SR.style.display == '') {
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

            button = [
                ['preview','arrow-left',(function() {history.go(-1)}), ae.i.a],
                ['next','arrow-right',(function() {history.go(1)}), ae.i.a],
                ['share','share-alt','share', ae.i.a],
                ['refresh','redo',(function() {location.href=location.href}), ae.i.a],
                ['duplicate','clone',(function() {open(location.href,"_blank")}), ae.i.a],
                ['index site','home',(function() {location.href=location.origin}), ae.i.a],
                ['go parent','arrow-up',(function() {let f=location.href.split("/"),i=0,p="";while(i<f.length-2){p+=f[i]+"/";i++};open(p,"_blank")}), ae.i.a],
                ['search site','fabgoogle','search_web', ae.i.a],
                ['zoom','search-plus','zoom', ae.i.b],
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
                ['telegram share', 'fabtelegram-plane', (function() {open("https://telegram.me/share/url?url="+location.href,"_blank")}), ae.i.e],
                ['copy to markdown', 'link', 'link', ae.i.e],
                ['view as PDF', 'file-pdf', 'get pdf', ae.i.e],
                ['resources', 'sitemap', 'resources', ae.i.e],
                ['save images', 'file-image', 'save img', ae.i.e],
                ['info site', 'info', 'site_info', ae.i.f],
                ['addons', 'puzzle-piece', 'addons', ae.i.f],
                ['bookmarks', 'external-link-alt', (function() {open(jso+"_j.em/off/save/","_blank")}), ae.i.f]
            ]

            button.forEach(function(bt) {
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
                iconFA(classIcon, ic)
                if (typeof(bt[2]) == 'string') {
                    let res = _bkl_.filter(element => element.name.toString().toLowerCase() == bt[2].toLowerCase())
                    if (res.length > 0) {
                        info.exe = res[0]['fn']
                        info.origin = 'external'
                        info.real_name = res[0]['name']
                        info.fn_string = res[0]['url']
                    } else {
                        info.exe = function() {
                            alert('this function does not exist')
                        }
                        info.origin = 'none'
                    }
                } else {
                    info.exe = bt[2]
                    info.origin = 'same'
                    info.fn_string = _Fn2Str(bt[2])
                }
                b.addEventListener('click', function(e) {
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
                            setTimeout(function() {
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
                b.addEventListener('contextmenu', function() {
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
            console.log('%cIMPORT ADDONS J:EM', 'font-size:16px;font-weight:bold')
            if (sameTest) {
                setTimeout(function () {
                    console.log('show icons bank:', data_used_icons)
                }, 3e3)
            }
        }
        let ad = document.createElement('script')
        if (typeof(_bkl_) == 'undefined') {
            ad.src = jso + '_j.em/off/save/js/t-url.js'
            SRO.appendChild(ad)
            ad.addEventListener('load', function() {readBKL()})
        } else {
            readBKL()
        }
    } else {
        console.error('BKLS ADDONS IS INSTALL')
    }
})()