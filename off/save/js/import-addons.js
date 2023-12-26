let _na = '---ext-js'
if (document.getElementsByClassName(_na).length == 0) {
    let SR = document.createElement('div')
    SR.id = 'i-addons'
    var SRO = SR.attachShadow({mode: 'open'})

    let fr = document.createElement('div'),
        fh = document.createElement('div'),
        fb = document.createElement('div'),
        clse = document.createElement('div'),
        mov = document.createElement('div')
    fh.classList.add('--h')
    fb.classList.add('--b')
    mov.classList.add('--m')
    mov.innerText = '==='
    clse.addEventListener('click', function () {
        fr.classList.toggle('--o')
    })
    clse.innerText = 'X'
    fr.classList.add(_na)
    fr.classList.add('--o')
    clse.classList.add('--c')
    let st = document.createElement('style'),
        _a = document.createElement('a')
    _a.id = 'aport--bks--'
    // dir_project
    _a.href = ___myDom + '_j.em/off/save/'
    _a.setAttribute('target', '_blank')
    st.innerHTML = `
        .${_na}{position:fixed;top:65px;left:15px;max-height:90vh;bottom:15px;width:200px;max-width:600px;max-height:600px;z-index:2147483647;border:0px solid white;box-shadow:0px 2px 8px 1px rgba(0,0,0,.58);border-radius:8px;display:flex;flex-direction:column;overflow:hidden;backdrop-filter:blur(8px) saturate(1.15) brightness(1.15);resize:both;}
        .${_na} .--c{color:white;font-size:15px;border-radius:0px;cursor:pointer;padding:4px 10px;font-family:monospace;background:rgba(99,99,99,.4);}
        .${_na} .--c:hover{background:rgb(203,41,86)}
        .${_na}.--o{max-height:23px;height:23px !important;resize:horizontal;}
        .${_na} * {user-select:none}
        .${_na} .--h{display:flex;align-items:stretch;background:rgba(255,255,255,.1);}
        .${_na} .--h > * {box-sizing:border-box;height:23px;line-height:1 !important;}
        .${_na} .--m{flex:1;display:flex;align-items:center;justify-content:center;cursor:pointer;display:flex;font-weight:bold;color:transparent;position:relative}
        .${_na} .--m::before{content:"";left:15px;right:15px;position:absolute;top:50%;height:3px;border-radius:8px;width:auto;background-color:rgb(190,190,190);transform:translateY(-50%);}
        .${_na} .--m:hover::before{background-color:rgb(130,130,130)}
        .${_na} #i-addons{flex:1;height:100%;display:flex;overflow:hidden}`
    let srs = document.createElement('style')
    srs.innerText = `
        .--b{background:rgba(0,0,0,.148);padding-left:8px;padding-bottom:8px;padding-right:1px;padding-top:14px;display:flex;flex-wrap:wrap;flex:1;overflow-x:hidden;overflow-y:scroll;align-content:start;}
        .butt{color:black;border:3px solid rgb(200,200,200);margin:4px;padding:2px 6px;flex:1;transition:all 0.18s;background-color:rgb(210,210,210);font-size:15px;font-family:sans-serif;white-space:nowrap;user-select:none;cursor:pointer;}
        .butt:hover{background-color:rgb(255,255,255);border:3px solid black;color:black;}
        .--b::-webkit-scrollbar{width:8px;}
        .--b::-webkit-scrollbar-thumb{background:rgba(40,40,40,0.25);border-radius:0px;}
        .butt.even{background:rgb(160,160,160)}#aport--bks--{color:white}
    `
    var __g = {}
    __g.dragItem = mov
    __g.dcb = document.body
    __g.active = false
    __g.currentX
    __g.currentY
    __g.initialX
    __g.initialY
    __g.xOffset = 0
    __g.yOffset = 0
    function dragStart(e) {
        if (e.type === 'touchstart') {
            __g.initialX = e.touches[0].clientX - __g.xOffset
            __g.initialY = e.touches[0].clientY - __g.yOffset
        } else {
            __g.initialX = e.clientX - __g.xOffset
            __g.initialY = e.clientY - __g.yOffset
        }
        if (e.target === __g.dragItem) {
            __g.active = true
            __g.dragItem.style.cursor = 'move'
        }
    }
    function dragEnd() {
        __g.initialX = __g.currentX
        __g.initialY = __g.currentY
        __g.active = false
        __g.dragItem.style.cursor = 'grab'
    }
    function drag(e) {
        if (__g.active) {
            e.preventDefault()
            __g.dragItem.style.cursor = 'grabbing'
            if (e.type === 'touchmove') {
                __g.currentX = e.touches[0].clientX - __g.initialX
                __g.currentY = e.touches[0].clientY - __g.initialY
            } else {
                __g.currentX = e.clientX - __g.initialX
                __g.currentY = e.clientY - __g.initialY
            }
            __g.xOffset = __g.currentX
            __g.yOffset = __g.currentY
            setTranslate(__g.currentX, __g.currentY, fr)
        }
    }
    function setTranslate(xPos, yPos, el) {
        el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
    }
    __g.dcb.addEventListener('touchstart', dragStart, false)
    __g.dcb.addEventListener('touchend', dragEnd, false)
    __g.dcb.addEventListener('touchmove', function(e) {drag(e)}, false)
    __g.dcb.addEventListener('mousedown', dragStart, false)
    __g.dcb.addEventListener('mouseup', dragEnd, false)
    __g.dcb.addEventListener('mousemove', function(e) {drag(e)}, false)
    fh.appendChild(st)
    fh.appendChild(clse)
    fh.appendChild(mov)
    _a.classList.add('butt')
    _a.innerText = '[JS]'
    fb.appendChild(_a)
    let _i = 0
    let carpet = _bkl_[0].path,
        s_odd = true
    while (_i < _bkl_.length) {
        let g = _bkl_[_i]
        let gu = g.url
        let a = document.createElement('button')
        a.innerText = g.name
        a.classList.add('butt')
        function tf() {
            eval(gu)
        }
        a.addEventListener('click', function () {
            tf()
        })
        a.addEventListener('contextmenu', function () {
            console.log(gu)
        })
        fb.appendChild(a)
        if (g.path != carpet) {
            carpet = g.path
            s_odd = !s_odd
        }
        if (s_odd) {
            a.classList.add('even')
        }
        fr.appendChild(fh)
        fr.appendChild(SR)
        fr.appendChild(SRO)
        SRO.appendChild(srs)
        SRO.appendChild(fb)
        document.body.appendChild(fr)
        _i += 1
    }
} else {
    alert('exist panel addons')
}
