var extra = {}
var vid = document.getElementsByTagName('video')[0]
document.addEventListener(
"DOMContentLoaded",
function() {
    let $ = function(e) {return document.querySelector(e)},
        vd = $('video'),
        _exist = true // import video

    String.prototype.cvtTime = function() {
        let s = this.split(':'),
        result = ''
        function nif(n){
            let sl = s.length,
                or = sl - n
                nn = s[or]
                nn = Number(nn)
            return nn
        }
        let _a1 = nif(1) * 1
        let _a2 = nif(2) * 60 * 1
        if (s.length == 3) {
            let _a3 = nif(3) * 60 * 60 * 1
            result = _a3 + _a2 + _a1
        } else {
            result = _a2 + _a1
        }
        // console.log(s)
        // console.log(result)
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
        // console.log(this)
        // console.log(format)
        return format
    }
    function reqst(title, mnsg, val) {
        let inf = $('#info'),
            label = inf.children[0],
            tit = label.children[0],
            msg = label.children[1],
            vle = label.children[2]
        
        inf.className = ''
        inf.classList.add('show-p')
        if ('' != title) {
            tit.className = 'show-p'
            tit.innerText = title
            
        } else {
            tit.className = ''
        }
        if (mnsg != '') {
            msg.className = 'show-p'
            msg.innerText = mnsg
        } else {
            msg.className = ''
        }
        msg.innerText = mnsg
        if (val) {
            vle.className = 'show-p'
        } else {
            vle.className = ''
        }
        setTimeout(function(){
            inf.classList.add('view')
        }, 80)
        setTimeout(function(){
            inf.classList.replace('view','hidden')
        }, 28e2)
        setTimeout(function(){
            inf.classList.remove('show-p')
        }, 298e2)
    }
    setInterval(function() {
        s = function(tx) {
            $('.play').innerHTML = tx
        }
        if(_exist && !vd.paused) {
            s('<i class="bx bx-pause-circle">Pause</i>')
        } else {
            s('<i class="bx bx-play-circle">Play</i>')
        }
        let vol = parseInt(vd.volume * 100)
        let t = Math.round(vd.currentTime * 1)/1
        let m = t.toString()
        let r = vd.duration - vd.currentTime
        let rf = r.toString().cvtVal()
        $('.i-len-m').innerText = vd.duration.toString().cvtVal()
        $('.i-len-s').innerText = Math.round(vd.duration * 100) / 100
        $('.i-frm').innerText = (Math.round(vd.currentTime * 100) / 100).toFixed(2)
        $('.i-res-s').innerText = Math.round(r)
        $('.i-res-m').innerText = rf
        $('.i-min-s').innerText = m
        $('.i-min-m').innerText = m.cvtVal()
        $('.i-spd').innerText = (vd.playbackRate).toFixed(2)
        $('.i-vol').innerText = vol
        $('.i-mute').innerText = vd.muted
        $('.i-siz').innerText = vd.offsetHeight + 'x' + vd.offsetWidth
    }, 8e2)
    var addd = 0
    var add_ = 0
    var reverse = false
    // var fullsss = false
    setInterval(function() {
        if (reverse) {
            vd.currentTime -= 1 / 10
        }
        if (add_ < 4) {
            add_ = add_ + 1
            if (addd != 0) {
                vd.pause()
                vd.currentTime += addd
            }
        } else {
            add_ = 0
        }
    }, 1e2)
    $('.pane').addEventListener('click', function(){
        let mi = $('.main')
        mi.className.includes('p-close') ? mi.classList.replace('p-close', 'p-open') : mi.classList.replace('p-open', 'p-close')
    })
    $('.play').addEventListener('click', function(){
        addd = 0
        reverse = false
        if (vd.paused) {
            vd.play()
        } else {
            vd.pause()
        }
    })
    let boostRequire = location.search == '?boost'
    if (boostRequire) {
        var context, result
        function amplifyMedia(mediaElem, multiplier) {
            context = new(window.AudioContext || window.webkitAudioContext),
                result = {
                context: context,
                source: context.createMediaElementSource(mediaElem),
                gain: context.createGain(),
                media: mediaElem,
                amplify: function(multiplier) {
                    result.gain.gain.value = multiplier;
                },
                getAmpLevel: function() {
                    return result.gain.gain.value;
                }
                }
            result.source.connect(result.gain)
            result.gain.connect(context.destination)
            result.amplify(multiplier)
        }
        amplifyMedia(vd, 1)
        $('.bst').addEventListener('click', function(){
            if (_exist) {
                let s = prompt('volume booster', '1')
                s = Number(s)
                if (typeof(s) == 'number' && s > 0) {
                    result.amplify(s)
                }
            }
        })
    } else {
        $('.bst').addEventListener('click', function(){
            if (confirm('volume booster tab?')) {
                open('?boost', '_self')
            }
        })
    }
    $('.tim').addEventListener('click', function(){
        if (_exist) {
            let tim = prompt('add currentTime', '')
            if (isNaN(tim) && tim != '') {
                tim = Number(tim)
                vd.currentTime += tim
            }
        }
    })
    $('.set').addEventListener('click', function(){
        if (_exist) {
            let tim = prompt('set currentTime', '')
            if (isNaN(tim) && tim != '') {
                tim = tim.cvtTime()
                vd.currentTime = tim
            }
        }
    })
    $('.cct').addEventListener('click', function() {
        if (vd.hasAttribute("controls")) {
            vd.removeAttribute("controls")
        } else {
            vd.setAttribute("controls","controls")
        }
    })
    $('.prv').addEventListener('click', function(){
        _exist ? vd.currentTime -= 1/29 : _exist = _exist
    })
    $('.stp').addEventListener('click', function(){
        if(_exist) {
            vd.pause()
            vd.currentTime = 0
        }
    })
    $('.nt').addEventListener('click', function(){
        _exist ? vd.currentTime += 1/29 : _exist = _exist
    })
    $('.sped').addEventListener('click', function(){
        let s = prompt('Speed', '1')
        s = Number(s)
        if (typeof(s) == 'number' && s > 0) {
            vd.playbackRate = s
            localStorage.setItem('_h5_player_playback_rate_', s)
        }
    })
    $('.sav').addEventListener('click', function(){
        let can = document.createElement('canvas')
        let radio = vd.videoWidth / vd.videoHeight
        let w = vd.videoWidth
        let h = parseInt(w / radio, 10)
        let context = can.getContext('2d')
        can.width = w
        can.height = h
        context.fillRect(0, 0, w, h)
        can.addEventListener('click',function(){
            let n_img = document.createElement('img')
            n_img.src = this.toDataURL()
            let new_v = window.open('')
            new_v.document.body.appendChild(n_img)
        })
        context.drawImage(vd, 0, 0, w, h)
        $('.gal').appendChild(can)
    })
    document.addEventListener('keydown', function(e) {
        if (e.shiftKey && e.code == 'KeyS') {
            $('.sav').click()
        }
    })
    $('.vol').addEventListener('click',function(){
        if (_exist) {
            let tim = prompt('volumen', '1')
            isNaN(tim) && tim < 1.1 ? alert('set a number') : vd.volume = tim
        }    
    })
    $('.mud').addEventListener('click',function(){
        if (_exist) {
            vd.muted = !vd.muted
        }    
    })
    $('.wdt').addEventListener('click',function(){
        if (_exist) {
            let det = $('.details')
            let wdt = det.offsetWidth
            let tim = prompt('width of panel tools', wdt + '-' + window.innerWidth)
            isNaN(tim) ? alert('set a number') : $('.details').style.width = tim + 'px'
        }    
    })
    $('#file_vid').addEventListener(
        'change',
        function(){
            let file = this.files[0]
            let fileURL = window.URL.createObjectURL(file)
            vd.src = fileURL
            vd.load()
            _exist = true
        }
    )
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
        function changeVid(){   
            let file = inputElement.files[0]
            console.log(file)
            let fileURL = window.URL.createObjectURL(file)
            vd.src = fileURL
            vd.load()
            _exist = true
        }
        const dropZoneElement = inputElement.closest(".drop-zone");
      
        dropZoneElement.addEventListener("click", (e) => {
            inputElement.click()
        })
        inputElement.addEventListener("change", function(){
            changeVid()
        })
        dropZoneElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZoneElement.classList.add("drop-zone--over");
        })
        dropZoneElement.addEventListener("dragleave", (e) => {
            dropZoneElement.classList.remove("drop-zone--over")
        })
        dropZoneElement.addEventListener("dragend", (e) => {
            dropZoneElement.classList.remove("drop-zone--over")
        })
        dropZoneElement.addEventListener("drop", (e) => {
            e.preventDefault()
            if (e.dataTransfer.files.length) {
                inputElement.files = e.dataTransfer.files
                setTimeout(function(){
                    changeVid()
                }, 5e2)
                updateThumbnail(dropZoneElement, e.dataTransfer.files[0])
            }
            dropZoneElement.classList.remove("drop-zone--over")
        })
    })
    /**
     * Updates the thumbnail on a drop zone element.
     *
     * @param {HTMLElement} dropZoneElement
     * @param {File} file
     */
    function updateThumbnail(dropZoneElement, file) {
        let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb")
        // First time - remove the prompt
        if (dropZoneElement.querySelector(".drop-zone__prompt")) {
            dropZoneElement.querySelector(".drop-zone__prompt").remove()
        }
        // First time - there is no thumbnail element, so lets create it
        if (!thumbnailElement) {
            thumbnailElement = document.createElement("div")
            thumbnailElement.classList.add("drop-zone__thumb")
            dropZoneElement.appendChild(thumbnailElement)
        }
        thumbnailElement.dataset.label = file.name
        // Show thumbnail for image files
        if (file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                thumbnailElement.style.backgroundImage = `url('${reader.result}')`
            }
        } else {
            thumbnailElement.style.backgroundImage = null;
        }
    }
      
    $('.large').children[0].addEventListener('input', function(){
        let v = this.value,
            vw = window.innerWidth
            w = $('.wth')
        v = v * vw / 1000
        v = vw - v
        if (v  > vw - 100) {
            w.style.boxShadow = '0px 0px 5px 3px #e04b4b46'
        } else {
            w.style.boxShadow = '0px 0px 5px 3px #15151546'
            $('.details').style.width = v + 'px'
        }
        if (v == 0) {
            $('.main').classList.add('full')
        }
        if (v !== 0) {
            $('.main').classList.remove('full')
        }
    })
    $('#close-range').addEventListener('click', function(e){
        e.target.parentNode.classList.replace('v', 'h')
        $('.wth').removeAttribute('style')
    })
    $('.ftf').addEventListener('click',function(){
        if (!vd.paused) {$('.play').click()}
        addd = 0.034
    })
    $('.ftb').addEventListener('click',function(){
        addd = -0.034
    })
    $('.ftr').addEventListener('click',function(){
        vd.pause()
        reverse = !reverse
    })
    $('.fts').addEventListener('click',function(){
        if (!vd.paused) {$('.play').click()}
        addd = 0
    })
    $('.pic').addEventListener('click',function(){
        if (document.pictureInPictureElement == null) {
            vd.requestPictureInPicture()
        } else {
            document.exitPictureInPicture()
        }
    })
    $('.wth').addEventListener('click', function(e){
        $('.large').classList.replace('h', 'v')
        e.target.style.backgroundColor = 'white'
    })
    $('.fls').addEventListener('click', function(e){
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            document.exitFullscreen()    
        }
        // fullsss = !fullsss
    })
    $('.srco').addEventListener('click', function(e){
        open(vd.src)
    })
    $('.srcc').addEventListener('click', function(e){
        let scc = prompt('URL video','')
        if ('' != scc && null != scc && undefined != scc) {
            vd.src = scc
        }
    })

})