(function() {
    if (location.host.includes('youtube.com') || location.host.includes('youtube-nocookie.com')) {
        let main = {}
        function main_yt() {
            let base_url = [
                ["yembed", function() {
                    function $(e) {
                        return document.querySelector(e)
                    }
                    if (!$('#player-full-bleed-container video')) {
                        $('.ytp-size-button.ytp-button').click()
                    }
                    let _by = $('body')
                    if (_by.className.includes('yt-emb')) {
                        _by.classList.remove('yt-emb')
                    } else {
                        _by.classList.add('yt-emb')
                    }
                    if (!$('#yt-css-ebd')) {
                        let di = document.createElement('div')
                        di.id = 'yt-css-ebd'
                        let _cyt = document.createElement('style')
                        _cyt.innerText = 'body.yt-emb::-webkit-scrollbar{width:1px !important}body.yt-emb::-webkit-scrollbar-thumb{border-radius:0 !important;border:none !important}.yt-emb [role=banner]{opacity:0 !important;transition:all 0.6s}.yt-emb [role=banner]:hover{opacity:1 !important}.yt-emb #page-manager{margin-top:0 !important}[theater-requested_] #full-bleed-container,[theater-requested_] #player-container,[theater-requested_] #player-full-bleed-container{height:100vh !important;max-height:100vh !important;min-height:100vh !important}.yt-emb .ytp-chrome-bottom{transition:all 0.25s cubic-bezier(0.0,0.0,0.2,1) !important;opacity:0.2 !important}.yt-emb .ytp-chrome-bottom.hdd{transform:translateY(100%) !important}.yt-emb .ytp-chrome-bottom.vdd{transform:none !important}.ytp-popup.ytp-contextmenu{background:rgba(0,0,0,0.37);border-radius:8px;backdrop-filter:blur(2px)}#masthead{background:#00000087 !important;backdrop-filter:blur(3px) saturate(1.35) brightness(1.35) !important}.ytd-searchbox{background:rgb(0,0,0,0.66) !important}#masthead *{background-color:transparent !important}'
                        di.appendChild(_cyt)
                        _by.appendChild(di)
                        $('.ytp-volume-area').addEventListener('dblclick', function() {
                            let v = $('video')
                            let c = document.createElement('canvas')
                            let radio = v.videoWidth / v.videoHeight
                            let w = v.videoWidth
                            let h = parseInt(w / radio, 10)
                            let context = c.getContext('2d')
                            c.width = w
                            c.height = h
                            context.fillRect(0, 0, w, h)
                            context.drawImage(v, 0, 0, w, h)
                            let t = window.open('')
                            t.document.body.appendChild(c)
                        })
                        document.addEventListener('keydown', function(e) {
                            if (e.code == 'KeyY' && e.ctrlKey) {
                                let yb = $('.ytp-chrome-bottom')
                                if (yb.className.includes('hdd')) {
                                    yb.classList.remove('hdd')
                                    yb.classList.add('vdd')
                                } else {
                                    yb.classList.remove('vdd')
                                    yb.classList.add('hdd')
                                }
                            }
                        })
                    }
                }],
                ["deturl", "https://deturl.com/?url=@url"],
                ["offmp3", "https://offmp3.com/process?url=@url"],
                ["9xbuddy", "https://9xbuddy.in/process?url=@url"],
                ["yout", "https://yout.com/video/@id"],
                ["nsfw", "https://www.nsfwyoutube.com/watch?v=@id"],
                ["offmp3", "https://offmp3.com/process?url=@url"],
                ["myvid", "https://myvid.download/?url=@url"],
                ["yt2mp3", "https://www.yt2mp3.ws/?url=@url"],
                ["savefrom", "https://es.ssyoutube.com/#url=@url"],
                ["yts5", "https://www.youtube5s.com/watch?v=@id"],
                ["flv2mp3", "https://www.flv2mp3.by/es67/?url=@url"],
                ["embed", "https://www.youtube.com/embed/@id"],
                ["yt-hd", "https://img.youtube.com/vi/@id/maxresdefault.jpg"],
                ["yt-hq", "https://img.youtube.com/vi/@id/hqdefault.jpg"],
                ["song", "https://song.link/y/@id"],
                ["song-a", "https://song.link/y/@id?auto"],
            ]        
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
                        min_width: '100px',
                        height: '300px',
                        width: '140px',
                        max_height: '200px',
                        max_width: '220px',
                    },
                    class: {
                        inset: '--video-yt-controls',
                        basis: '',
                        aside: '--bod',
                        head: '--hdoc',
                        body: '--bdoc',
                    },
                },
                e: {}
            }
            main.settg.styles_default = `
                .${main.settg.class.aside}{
                    position: fixed;
                    z-index: 1000000;
                    top: auto;
                    left: auto;
                    right: 200px;
                    bottom: calc(-300px + 24px);
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
                    backdrop-filter: blur(2px) saturate(1) brightness(1);
                    resize: both;
                }
                .${main.settg.class.head}{
                    width: 100%;height:24px;
                    background: rgba(0, 0, 0, 0.7);
                }
                .${main.settg.class.body}{
                    width: 100%;flex:1;
                    background: rgba(255, 255, 255, 0.4);
                    display: flex;
                    overflow-y: scroll;
                    overflow-x: hidden;
                    position: absolute;
                    height: calc(${main.settg.size.height} - 24px);
                    box-sizing: border-box;
                }
                .--moving {
                    height:22px;position:absolute;top:0;left:25%;right:25%;width:auto;z-index:1;
                }
                .--moving::before {
                    content:'';position:absolute;top:11px;border-radius:6px;background:rgba(255,255,255,0.36);height:4px;left:5%;z-index:1;right:5%;
                }
                .--moving:hover::before{background: rgba(255,255,255,0.8)}
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
                .---main {
                    padding: 8px;
                }
                .--youtube-app {
                    color: black;
                    display: block;
                    font-size: 15px;
                    padding: 8px 12px;
                    text-decoration: none;
                    transtion: all 0.3s;
                    border-radius: 5px;
                    user-select: none;
                    cursor: pointer;
                }
                .--youtube-app:hover {
                    background: rgba(255, 255, 255, 0.3)
                }
            `
            main.inset = create('div', [['class', main.settg.class.inset]], document.body)
            main.basis = create('div', [['class', main.settg.class.basis]], main.inset)
            main.style = create('style', [], main.basis)
            main.aside = create('div', [['class', main.settg.class.aside]], main.inset)
            main.dhead = create('div', [['class', main.settg.class.head]], main.aside)
            
            main.aside.style.display = ''
            console.log('PANEL ADDONS YOUTUBE ---')
            let SR = document.createElement('div')
            SR.id = 'yt-addon'
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
    
            me.e.main = create('div', [['class','---main']], me.b)
            
            me.e.main.appendChild(main.dbcss)
            base_url.forEach(function(bt){
                if (!bt[0].startsWith('@')) {
                    let btn = create('a', [['class', '--youtube-app']], me.e.main)
                    btn.addEventListener('click', function() {
                        let cm = bt[1]
                        if (typeof cm == 'function') {
                            cm()
                        } else {
                            if (cm.startsWith('http')) {
                                let l = location
                                let ls = l.search
                                let id = ''
                                if (ls.indexOf('v=') != -1) {
                                    id = ls.split('v=')[1].split('&')[0]
                                } else if (l.pathname.indexOf('/embed/') != -1) {
                                    id = location.pathname.split('/')[2]
                                } else {
                                    id = '5BZLz21ZS_Y#_error_get_video_id'
                                }
                                let url = 'https://www.youtube.com/watch?v=' + id
                                open(cm.replace('@id', id).replace('@url', url))
                            }
                        }
                    })
                    btn.innerText = bt[0]
                }
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
            mov.dcb.addEventListener('touchmove', drag, false)
            mov.dcb.addEventListener('mousedown', dragStart, false)
            mov.dcb.addEventListener('mouseup', dragEnd, false)
            mov.dcb.addEventListener('mousemove', drag, false)
            mov.dragItem.addEventListener('contextmenu', function(e) {
                e.preventDefault()
                main.aside.style.display = 'none'
            })
        }
        main_yt()
        function verify_watch() {
            if (location.href.includes('watch')) {
                main.inset.style.opacity = ''
            } else {
                main.inset.style.opacity = '0'
            }
        }
        verify_watch()
        window.addEventListener('yt-page-data-updated', function() {
            verify_watch()
        })
    } else {
        alert('This site is not YouTube')
    }
})()