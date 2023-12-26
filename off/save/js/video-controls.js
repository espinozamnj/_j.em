(function () {
    var jso = ''
    location.origin.includes('test') ? jso = 'https://locked.test/' : jso = 'https://espinozamnj.github.io/'
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
    // dir_project
    let icons = create('script', [['src', jso + '_j.em/off/save/js/all-fa.min.js']], document.head)
    var import_icons_error = false
    icons.addEventListener('error', function(e) {
        import_icons_error = true
    })

    let main = {
        settg: {
            size: {
                min_height: '100px',
                min_width: '192px',
                height: '100px',
                width: '192px',
                max_height: '200px',
                max_width: '192px',
            },
            class: {
                inset: '--video-controls',
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
            width: ${main.settg.size.width};
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
            /*backdrop-filter: blur(2px) saturate(1) brightness(1);*/
            resize: vertical;
        }
        .${main.settg.class.inset} .${main.settg.class.head}{
            width: 100%;height:24px;
            background: rgba(0, 0, 0, 0.7);
        }
        .${main.settg.class.inset} .${main.settg.class.body}{
            width: 100%;flex:1;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            overflow-y: scroll;
            overflow-x: hidden;
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
            opacity: 0.1;
        }
        .${main.settg.class.aside}:hover{
            opacity: 1;
        }
        .${main.settg.class.body}{
            flex-wrap: wrap;
            align-content: flex-start;
            overflow-y: hidden !important;
        }
        .${main.settg.class.body} .alert{
            padding: 6px 8px;
            color: rgb(195, 14, 14);
            font-family: monospace !important;
        }
        .--btn-act {
            width: 20px;
            height: 20px;
            padding: 2px;
            border-radius: 2px;
            margin: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
        }
        .--btn-act,
        .--btn-act * {
            font-family: monospace !important;
        }
        .--btn-act:hover {
            background-color: rgba(255,255,255,0.6)
        }
        .--btn-act svg {
            height: inherit;
            width: inherit;
            color: white;
        }
        .--btn-act,
        .--btn-act svg path {
            color: rgba(255,255,255,0.3);
            fill: rgba(255,255,255,0.3);
        }
        .--btn-act:hover,
        .--btn-act:hover svg path {
            fill: rgba(0,0,0,0.9);
            color: rgba(0,0,0,0.9);
        }
    `
    main.inset = create('div', [['class', main.settg.class.inset]], document.body)
    main.basis = create('div', [['class', main.settg.class.basis]], main.inset)
    main.style = create('style', [], main.basis)
    main.aside = create('div', [['class', main.settg.class.aside]], main.inset)
    main.dhead = create('div', [['class', main.settg.class.head]], main.aside)
    main.dbody = create('div', [['class', main.settg.class.body]], main.aside)
    main._css_ = main.settg.styles_default + '\n' + main.settg.styles_custom

    var me = main.e
    me.b = main.dbody
    me.moving = create('div', [['class','--moving']], main.dhead)

    main.style.innerText = main._css_.replaceAll('\n','').replaceAll(': ',':').replaceAll('    ','').replaceAll('\t','')
    main.aside.style.height = main.settg.size.height
    main.aside.style.width = main.settg.size.width

    // =============CUSTOM CONTENT============
    function getVID() {
        let all = document.getElementsByTagName('video'),
            lg = all.length
            hv = []
            i = 0
            maxvid = 0
            maxh = 0
        while (i < lg) {
            let te = all[i]
            let thish = te.offsetHeight
            te.setAttribute('data-h', thish)
            hv.push(thish)
            i++
        }
        maxh = Math.max.apply(null, hv)
        while (i--) {
            if (all[i].getAttribute('data-h') == maxh) {
                maxvid = all[i]
                break
            }
        }
        return maxvid
    }
    String.prototype.cvtTime = function() {
        let s = this.split(':'),
        result = ''
        function ni(n){
            let sl = s.length,
                or = sl - n
                nn = s[or]
                nn = Number(nn)
            return nn
        }
        let _a1 = ni(1) * 1
        let _a2 = ni(2) * 60 * 1
        if (s.length == 3) {
            let _a3 = ni(3) * 60 * 60 * 1
            result = _a3 + _a2 + _a1
        } else {
            result = _a2 + _a1
        }
        return result
    }
    String.prototype.cvtVal = function() {
        function tt(n) {
            let rr
            n < 10 ? rr = "0" + n : rr = n.toString()
            return rr
        }
        let _sn = parseInt(this, 10)
        let _h   = Math.floor(_sn / 3600)
        let _m = Math.floor((_sn - (_h * 3600)) / 60)
        let _s = _sn - (_h * 3600) - (_m * 60)
        let format = tt(_h) + ':' + tt(_m) + ':' + tt(_s)
        return format
    }
    let actions = [
        ['download','download', function(){let an=document.createElement('a');document.body.appendChild(an);an.href=document.getElementsByTagName('video')[0].currentSrc;an.setAttribute('download','gaa.mp4');an.style.cssText='z-index:561561515;position:fixed;top:0;left:0;width:50px;height:50px;background:blue'}],
        ['volumen','volume-down', function(){if(typeof(setVolPage)=='function'){setVolPage()}else{function setVolPage(){let volPg=prompt('Volumen: 1-100',Math.floor(getVID().volume*100));if(volPg!=null||!Number(volPg)){volPg=Number(volPg);let qAll=document.querySelectorAll('audio,video');let o=0;while(o<qAll.length){qAll[o].volume=volPg/100;console.log(qAll[o]);o+=1}}};setVolPage()}}],
        ['time','',function(){getVID().currentTime=prompt('time','0:0').cvtTime()}],
        ['capture','image',function(){if(document.getElementById("mydivh")){let rm=document.getElementById("mydivh"),mydivp=rm.parentNode;mydivp.removeChild(document.getElementById("mydivh"))}let maxvid=getVID(),mydivh=document.createElement("div");document.body.appendChild(mydivh),mydivh.setAttribute("id","mydivh");let an=document.createElement("a");mydivh.appendChild(an),an.setAttribute("id","mylinkh");let can=document.createElement("canvas");an.appendChild(can),can.setAttribute("id","mycanvash");let cls=document.createElement("b");cls.innerText="x",mydivh.appendChild(cls);let stt=document.createElement("style");stt.innerText="#mydivh{cursor:pointer;height:60px;z-index:15000;position:fixed;top:6em;left:2.5em;animation:anf 1s 5s forwards}#mydivh:hover{opacity:1 !important}#mydivh:hover a{transform:scale(1.5);box-shadow:1px 2px 12px -2px #ffffffe6}#mydivh b{padding:1px;padding-bottom:4px;background:rgba(255,0,0,0.35);font-size:13px;position:absolute;top:0;left:0;transform:translate(-50%,-50%);border-radius:2px;z-index:5;width:19px;text-align:center;line-height:0.72;font-family:monospace !important;}#mylinkh{transition:.5s;transform-origin:top left;display:block;height:100%;border:1px solid white;box-shadow:1px 2px 4px 0px black;}#mylinkh canvas{height:100%}@keyframes anf{from{opacity:1}to{opacity:0.1}}",mydivh.appendChild(stt),cls.addEventListener("click",(function(){document.getElementById("mydivh").style.display="none"}));let canvas=document.getElementById("mycanvash"),radio=maxvid.videoWidth/maxvid.videoHeight,w=maxvid.videoWidth,h=parseInt(w/radio,10),context=canvas.getContext("2d");canvas.width=w,canvas.height=h,context.fillRect(0,0,w,h),context.drawImage(maxvid,0,0,w,h);let data=new Date,ano=data.getFullYear(),mes=data.getMonth()+1;mes=mes<10?"0"+mes:mes;let dia=data.getDate();dia=dia<10?"0"+dia:dia;let hora=data.getHours();hora=hora>12?hora-12:hora,hora=hora<10?"0"+hora:hora;let min=data.getMinutes();min=min<10?"0"+min:min;let sec=data.getSeconds();sec=sec<10?"0"+sec:sec;let name=ano+"-"+mes+"-"+dia+"_"+hora+"-"+min+"-"+sec;an=document.getElementById("mylinkh"),an.download=name+".png",an.title=name,an.href=canvas.toDataURL(),confirm("Desea ponerlo en pantalla completa?")?maxvid.requestFullscreen():confirm("Desea ponerlo en emergente?")&&maxvid.requestPictureInPicture()}],
        ['mute','volume-mute',function(){let qM=document.querySelectorAll('audio,video');let o=0;while(o<qM.length){let t=qM[o];t.muted=!t.muted;o++}}],
        ['before','backward',function(){getVID().currentTime-=5}],
        ['play','play',function(){let vd=getVID();if(getVID().paused){vd.play();me.b.children[6].innerHTML='r<i class="fas fa-pause"></i>'}else{vd.pause();me.b.children[6].innerHTML='p<i class="fas fa-play"></i>'}}],
        ['after','forward',function(){getVID().currentTime+=5}],
        ['fullscreen','expand',function(){document.head.parentElement.requestFullscreen()}],
        ['speed','tachometer-alt', function(){let s=prompt('speed','');s=Number(s);let qM=document.querySelectorAll('audio,video');if(typeof(s)=='number'&&s>0){let o=0;while(o<qM.length){let t=qM[o];console.log(t);t.playbackRate=s;o++}}}],
    ]
    if (document.getElementsByTagName('video').length == 0) {
        me.b.innerHTML = '<span class="alert">No video available</span>'
    } else {
        setTimeout(function(){
            actions.forEach(function(action){
                let btn = create('a', [['class','--btn-act'],['title',action[0]]], me.b)
                if (import_icons_error) {
                    btn.innerText = action[0][0]
                }
                if (action[1] != '') {
                    create('i', [['class','fas fa-' + action[1]]], btn)
                }
                btn.addEventListener('click', action[2], false)
                btn.addEventListener('contextmenu', function(){console.log(action[1])})
            })
            me.b.children[2].style.width = '84px'
            setInterval(function(){
                me.b.children[2].innerText = (getVID().currentTime).toString().cvtVal()
            }, 1e3)
        },5e2)
    }
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
            setTranslate(mov.currentX, mov.currentY, mov.draggbing)
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform =
            'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
    }
    mov.dcb.addEventListener('touchstart', dragStart, false)
    mov.dcb.addEventListener('touchend', dragEnd, false)
    mov.dcb.addEventListener('touchmove', function(e) {drag(e)}, false)
    mov.dcb.addEventListener('mousedown', dragStart, false)
    mov.dcb.addEventListener('mouseup', dragEnd, false)
    mov.dcb.addEventListener('mousemove', function(e) {drag(e)}, false)
})()