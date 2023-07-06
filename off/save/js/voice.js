(function () {
    function create(tag, attr, where) {
        let i = 0
        n = document.createElement(tag)
        while (i < attr.length) {
          let t = attr[i]
          n.setAttribute(t[0], t[1])
          i++
        }
        where.appendChild(n)
        return n
    }

    main = {
        settg: {
            size: {
                min_height: '300px',
                min_width: '300px',
                height: '300px',
                width: '500px',
                max_height: '200px',
                max_width: '600px',
            },
            class: {
                this: 'reader',
                inset: '--reader-controls',
                basis: '',
                aside: '--bod',
                head: '--hdoc',
                body: '--bdoc',
            },
        },
        e: {}
    }
    main.settg.styles_default = `
        .${main.settg.class.inset} .${main.settg.class.aside}{
            position: fixed;
            z-index: 1000000;
            top: 65px;
            left: 15px;
            bottom: 15px;
            width: 200px;
            max-height: ${main.settg.size.max_height};
            max-width: ${main.settg.size.max_height};
            min-height: ${main.settg.size.min_height};
            min-width: ${main.settg.size.min_width};
            z-index: 2147483647;
            border: none;
            box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.58);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            backdrop-filter: blur(2px) saturate(1) brightness(1);
            resize: none;
        }
        .${main.settg.class.inset} .${main.settg.class.head}{
            width: 100%;
            height:24px;
            background: rgba(0, 0, 0, 0.7);
        }
        .${main.settg.class.body}{
            width: 100%;
            flex:1;
            background: rgba(255, 255, 255, 0.4);
            display: flex;
            overflow-y: scroll;
            overflow-x: hidden;
            position: absolute;
            height: calc(${main.settg.size.height} - 24px);
            box-sizing: border-box;
        }
        .${main.settg.class.inset} .--moving {
            height:22px;position:absolute;top:0;left:25%;right:25%;width:auto;z-index:1;
        }
        .${main.settg.class.inset} .--moving::before {
            content:'';position:absolute;top:11px;border-radius:6px;background:rgba(255,255,255,0.36);height:4px;left:5%;z-index:1;right:5%;
        }
        .${main.settg.class.inset} .--moving:hover::before{background: rgba(255,255,255,0.8)}
        .${main.settg.class.body}::-webkit-scrollbar{width:8px;}
        .${main.settg.class.body}::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.25);border-radius:0px;}
    `,
    main.settg.styles_custom = `
        .${main.settg.class.aside}{
            flex-wrap: wrap;
            align-content: flex-start;
            overflow-y: hidden !important;
            user-select: none;
        }
        .${main.settg.class.aside} * {
            user-select: none;
            font-family: system-ui, sans-serif;
            box-sizing: border-box;
        }
        .${main.settg.class.body}{
            padding: 8px 12px;
            flex-direction: column;
        }
        #voices {
            padding: 8px 12px;
            border: 3px solid rgb(20, 85, 20);
            outline: none !important;
            width: 100%;
        }
        #voices:focus {
            outline: none !important;
        }
        .customize {
            margin-top: 12px;
        }
        .customize .tit {
            margin-bottom: 4px;
            font-size: 15px;
        }
        .customize .rang {
            display: flex;
            margin-bottom: 12px;
            align-items: center;
        }
        .customize .rang span {
            width: 2rem;
            margin-left: 0.5rem;
            font-size: 12px;
        }
        input[type=range] {
            -webkit-appearance: none;
            width: auto;
            flex: 1;
            height: 10px;
            background-color: rgb(93, 126, 42);
            outline: none;
            transition: all 0.2s;
            width: 100%;
            margin: 0;
        }
        input[type=range]:hover {
            background-color: rgb(139, 170, 91);
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 16px;
            background-color: rgb(44, 173, 202);
            cursor: pointer;
            border: 1px solid var(--back);
            transition: all 0.25s
        }
        input[type=range]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            border: none;
        }
        .botom {
            display: flex;
            align-items: center;
            justify-content: stretch;
        }
        .ctrls {
            margin-top: 22px;
            display: flex;
            flex-direction: column;
        }
        .ctrls button {
            cursor: pointer;
            background-color: rgb(31, 94, 57);
            color: white;
            padding: 8px 12px;
            border-radius: 3px;
            margin-bottom: 9px;
            border: none;
            font-size: 13px;
        }
        .ctrls button:hover {
            color: black;
            background-color: rgb(62, 184, 62);
        }
    `
    main.inset = create('div', [['class', main.settg.class.inset]], document.body)
    main.basis = create('div', [['class', main.settg.class.basis]], main.inset)
    main.style = create('style', [], main.basis)
    main.aside = create('div', [['class', main.settg.class.aside]], main.inset)
    main.dhead = create('div', [['class', main.settg.class.head]], main.aside)
    
    let SR = document.createElement('div')
    SR.id = 'reader-addon'
    main.aside.appendChild(SR)
    var SRO = SR.attachShadow({mode: 'open'})

    main.dbody = create('div', [['class', main.settg.class.body]], SRO)
    main._css_ = main.settg.styles_default + '\n' + main.settg.styles_custom
    main.dbcss = main.style.cloneNode(true)
    var me = main.e
    me.b = main.dbody

    me.moving = create('div', [['class','--moving']], main.dhead)

    main.style.innerText = main._css_.replaceAll('\n','').replaceAll(': ',':').replaceAll('    ','').replaceAll('\t','')
    main.dbcss.innerText = main._css_.replaceAll('\n','').replaceAll(': ',':').replaceAll('    ','').replaceAll('\t','')
    main.aside.style.height = main.settg.size.height
    main.aside.style.width = main.settg.size.width

    // =============CUSTOM CONTENT============
    me.e = {}

    me.e.main = create('div', [['class','main']], me.b)
    
    me.e.main.appendChild(main.dbcss)
    me.e.voice = create('select', [['id','voices']], me.e.main)
    me.e.rang = create('div', [['class','customize']], me.b)
    me.e.ctrl = {}
    
    me.e.vol = create('div', [['class','tit']], me.e.rang)
    me.e.vol.innerText = 'Volumen'
    me.e.ctrl.vol_gr = create('div', [['class','rang']], me.e.rang)
    me.e.ctrl.vol_ip = create('input', [['type','range'],['min','0'],['max','1'],['value','1'],['step','0.05'],['id','volume']], me.e.ctrl.vol_gr)
    me.e.ctrl.vol_ix = create('span', [['id','volume-label']], me.e.ctrl.vol_gr)
    me.e.ctrl.vol_ix.innerText = '1'
    
    me.e.rat = create('div', [['class','tit']], me.e.rang)
    me.e.rat.innerText = 'Speed'
    me.e.ctrl.rat_gr = create('div', [['class','rang']], me.e.rang)
    me.e.ctrl.rat_ip = create('input', [['type','range'],['min','0.1'],['max','2.5'],['value','1'],['step','0.1'],['id','speed']], me.e.ctrl.rat_gr)
    me.e.ctrl.rat_ix = create('span', [['id','rate-label']], me.e.ctrl.rat_gr)
    me.e.ctrl.rat_ix.innerText = '1'

    me.e.ton = create('div', [['class','tit']], me.e.rang)
    me.e.ton.innerText = 'Tone'
    me.e.ctrl.ton_gr = create('div', [['class','rang']], me.e.rang)
    me.e.ctrl.ton_ip = create('input', [['type','range'],['min','0'],['max','2'],['value','1'],['step','0.1'],['id','pitch']], me.e.ctrl.ton_gr)
    me.e.ctrl.ton_ix = create('span', [['id','pitch-label']], me.e.ctrl.ton_gr)
    me.e.ctrl.ton_ix.innerText = '1'

    me.e.butt = create('div', [['class','ctrls']], me.b)
    me.e.bts = {}
    me.e.bts.play = create('button', [['id','start']], me.e.butt)
    me.e.bts.play.innerText = 'Start'
    me.e.bts.pause = create('button', [['id','pause']], me.e.butt)
    me.e.bts.pause.innerText = 'Pause'
    me.e.bts.resume = create('button', [['id','resume']], me.e.butt)
    me.e.bts.resume.innerText = 'Resume'
    me.e.bts.cancel = create('button', [['id','cancel']], me.e.butt)
    me.e.bts.cancel.innerText = 'Cancel'

    
    let speech = new SpeechSynthesisUtterance()
    speech.lang = "en"
    
    
    let voices = []
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices()
      speech.voice = voices[0]
      let voiceSelect = me.e.voice
      voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)))
    }
    
    me.e.ctrl.rat_ip.addEventListener("input", () => {
      const rate = me.e.ctrl.rat_ip.value
      speech.rate = rate
      me.e.ctrl.rat_ix.innerHTML = rate
    })
    
    me.e.ctrl.vol_ip.addEventListener("input", () => {
      const volume = me.e.ctrl.vol_ip.value
      speech.volume = volume
      me.e.ctrl.vol_ix.innerHTML = volume
    })
    
    me.e.ctrl.ton_ip.addEventListener("input", () => {
      const pitch = me.e.ctrl.ton_ip.value
      speech.pitch = pitch
      me.e.ctrl.ton_ix.innerHTML = pitch
    })
    
    me.e.voice.addEventListener("change", () => {
      speech.voice = voices[me.e.voice.value]
    })
    
    
    me.e.bts.pause.addEventListener("click", () => {
      window.speechSynthesis.pause()
    })
    
    me.e.bts.resume.addEventListener("click", () => {
      window.speechSynthesis.resume()
    })
    
    me.e.bts.cancel.addEventListener("click", () => {
      window.speechSynthesis.cancel()
    })
    
    var txo = ''
    function save (){
        if (window.getSelection) {
            txo = window.getSelection().toString()
        } else if (document.selection) {
            txo = document.selection.createRange().text
        }
    }
    window.addEventListener('click', function(){save()}, false)
    window.addEventListener('touchstart', function(){save()}, false)
    window.addEventListener('touchend', function(){save()}, false)
    window.addEventListener('mousedown', function(){save()}, false)
    window.addEventListener('mouseup', function(){save()}, false)
    
    me.e.bts.play.addEventListener("click", () => {
        speech.text = txo
        window.speechSynthesis.speak(speech)
    })
    // =======================================
    
    let mov = {}
    mov.dragItem = me.moving
    mov.draggbing = main.aside
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
            setTranslate(mov.currentX, mov.currentY, mov.draggbing)
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
})()