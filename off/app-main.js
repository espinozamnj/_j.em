window.addEventListener(
    'load',
    function() {
        let $$ = (t) => {return document.querySelectorAll(t)}
        let $ = (t) => {return $$(t)[0]}

        $('#close_session').addEventListener('click', function() {
            localStorage.removeItem('sett')
            setTimeout(function(){
                location.href = location.origin + '/' + location.pathname.split('/')[1] + '/'
            }, 3e2)
        })
        $('#open_new_tab').addEventListener('click', function() {
            let ed = $$('.this-embed')
            if (ed.length > 0) {
                open(ed[0].src)
            }
        })

        __apps__.forEach(function(a){
            if (a.name.toLocaleLowerCase() !== 'main') {
                let e, w, u, f, t, n, p, m
                e = document.createElement('div')
                m = document.createElement('span')
                p = document.createElement('img')
                t = document.createElement('span')
                w = document.querySelector('.apps')
                n = a['name']
                // dir_project
                a['url'].startsWith('@') ? u = location.origin + '/_j.em/' + a['url'].slice(1) : u = a['url']
                f = a['fav']
                e.classList.add('uri')
                m.classList.add('pic')
                t.classList.add('nam')
                p.src = '/_cdn_/favs/' + f + '.64.png'
                e.title = n
                t.innerText = n
                e.addEventListener(
                    'click',
                    function() {
                        let r = Math.random().toString(16).substring(2, 16);
                        let f = document.createElement('iframe')
                        f.src = u
                        f.id = r
                        f.classList.add('this-embed')
                        $('.embed').appendChild(f)
                        let b = document.createElement('div')
                        b.classList.add('change-button')
                        b.classList.add('open_now')
                        b.setAttribute('data-frame', r)
                        b.addEventListener('contextmenu', function() {
                            b.parentElement.removeChild(b)
                            $('.embed').removeChild(f)
                            setTimeout(function() {
                                $('.list-app').children[0].click()
                            }, 5e2)
                        })
                        let i = document.createElement('img')
                        i.src = p.src
                        let s = document.createElement('span')
                        s.innerText = n
                        b.appendChild(i)
                        b.appendChild(s)
                        $('.list-app').childNodes.forEach(function(a){
                            if (a.nodeType != 3) {
                                a.classList.remove('open_now')
                            }
                        })
                        $('#init').style.display = 'none'
                        $('.list-app').appendChild(b)
                    }
                )
                e.appendChild(m)
                m.appendChild(p)
                e.appendChild(t)
                w.appendChild(e)
            }
        })
        setTimeout(function() {
            let i = 0
            while (i < 10) {
                let d = document.createElement('div')
                d.classList.add('uri')
                d.classList.add('empty')
                $('.apps').appendChild(d)
                i++
            }
        }, 1e3)
        $('.panel-apps').addEventListener(
            'click',
            function(e) {
                let et = e.target
                let gid = ''
                let ch_btn
                while(et.parentNode && et.parentNode.nodeName.toLowerCase() != 'body') {
                    if (et.hasAttribute('data-frame')) {
                        ch_btn = et
                        gid = et.getAttribute('data-frame')
                        break
                    }
                    et = et.parentNode
                }
                if (gid != '') {
                    $$('.embed > *').forEach(function(i) {
                        if (i.hasAttribute('id') && i.id == gid) {
                            i.style.display = ''
                            i.classList.add('this-embed')
                        } else {
                            i.style.display = 'none'
                            i.classList.remove('this-embed')
                        }
                    })
                    $$('.list-app > *').forEach(function(i) {
                        if (i == ch_btn) {
                            i.classList.add('open_now')
                        } else {
                            i.classList.remove('open_now')
                        }
                    })
                }
            }
        )
        $('.panel-apps').addEventListener(
            'dblclick',
            function(e) {
                let et = e.target
                let gid = ''
                let ch_btn
                while(et.parentNode && et.parentNode.nodeName.toLowerCase() != 'body') {
                    if (et.hasAttribute('data-frame')) {
                        ch_btn = et
                        gid = et.getAttribute('data-frame')
                        break
                    }
                    et = et.parentNode
                }
                if (gid != '') {
                    $$('.embed > *').forEach(function(i) {
                        if (i.hasAttribute('id') && i.id == gid) {
                            let last_src = i.src
                            i.src = 'about:blank'
                            setTimeout(function() {
                                i.src = last_src
                            }, 1e3)
                        }
                    })
                }
            }
        )
        $('.toggle').addEventListener('click', function(){$('.main').classList.toggle('view-min')})

        let mov = {}
        mov.dragItem = $('.toggle')
        mov.draggbing = $('.toggle')
        mov.dcb = document.body
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
                mov.dragItem.style.cursor = 'grab'
                mov.dragItem.style.transition = 'all 0s'
            }
        }
        function dragEnd(e) {
            mov.initialX = mov.currentX
            mov.initialY = mov.currentY
            mov.active = false
            mov.dragItem.style.cursor = 'pointer'
            mov.dragItem.style.transition = 'all 0.2s'
        }
        function drag(e) {
            if (mov.active) {
                e.preventDefault()
                mov.dragItem.style.cursor = 'grabbing'
                mov.dragItem.style.transition = 'all 0s'
                if (e.type === 'touchmove') {
                    mov.currentX = e.touches[0].clientX - mov.initialX
                    mov.currentY = e.touches[0].clientY - mov.initialY
                } else {
                    mov.currentX = e.clientX - mov.initialX
                    mov.currentY = e.clientY - mov.initialY
                }
                mov.xOffset = mov.currentX
                mov.yOffset = mov.currentY
                setTranslate(0, mov.currentY, mov.draggbing)
            }
        }
        function setTranslate(xPos, yPos, el) {
            el.style.transform =
                'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
        }
        mov.dcb.addEventListener('touchstart', dragStart, false)
        mov.dcb.addEventListener('touchend', dragEnd, false)
        mov.dcb.addEventListener('touchmove', drag, false)
        mov.dcb.addEventListener('mousedown', dragStart, false)
        mov.dcb.addEventListener('mouseup', dragEnd, false)
        mov.dcb.addEventListener('mousemove', drag, false)
    }
)