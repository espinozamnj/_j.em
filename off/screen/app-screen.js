window.addEventListener('load', function(e) {
    const videoElem = document.getElementById("video"),
        startElem = document.getElementById("start"),
        stopElem = document.getElementById("stop");
    video.addEventListener('contextmenu', function(e) {
        e.preventDefault()
        return false
    })
    var displayMediaOptions = {
        video: {
            cursor: "always"
        },
        audio: !1
    }
    async function startCapture() {
        try {
            videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions),
                dumpOptionsInfo()
        } catch (err) {
            console.error("Error: " + err)
        }
    }
    function stopCapture(evt) {
        let tracks;
        videoElem.srcObject.getTracks().forEach(track => track.stop()), videoElem.srcObject = null
    }
    function dumpOptionsInfo() {
        const videoTrack = videoElem.srcObject.getVideoTracks()[0]
        console.info("Track settings:"), console.info(JSON.stringify(videoTrack.getSettings(), null, 2)), console
            .info("Track constraints:"), console.info(JSON.stringify(videoTrack.getConstraints(), null, 2))
    }
    startElem.addEventListener('click', (function() {
            startCapture()
    }), !1)
    stopElem.addEventListener('click', (function() {
            stopCapture()
    }), !1)
    document.getElementById('pp').addEventListener('click', (function () {
        if(document.pictureInPictureElement){
            document.exitPictureInPicture()
        }
        else {
            document.querySelector('video').requestPictureInPicture()
        } 
    }))
    document.getElementById('ph').addEventListener('click', function () {
        let v_P = document.getElementById('scroll-canvas')
        if(v_P.style.height == ''){
            v_P.style.height = '300px'
            v_P.style.zIndex = '10'
        } else {
            v_P.style.height = ''
            v_P.style.zIndex = '1'
        }
    })
    function capture() {
        let container = document.getElementById('scroll-canvas')
        let maxvid = document.querySelector('video')
        let cont = document.createElement('div')
        cont.className = 'photo'
        let canvas = document.createElement('canvas')
        let exit_b = document.createElement('span')
        canvas.addEventListener('click',function(){
            let n_img = document.createElement('img')
            n_img.src = this.toDataURL()
            let new_v=window.open('')
            new_v.document.body.appendChild(n_img)
        })
        let radio = maxvid.videoWidth/maxvid.videoHeight
        let w = maxvid.videoWidth
        let h = parseInt(w/radio,10)
        let context = canvas.getContext('2d')
        canvas.width = w
        canvas.height = h
        context.fillRect(0,0,w,h)
        context.drawImage(maxvid,0,0,w,h)
        cont.appendChild(canvas)
        cont.appendChild(exit_b)
        if (w > 0) {
            container.appendChild(cont)
            exit_b.addEventListener('click', function() {
                canvas.setAttribute('style', 'overflow:hidden;transition:all 1s;transform:scale(0)')
                setTimeout(function(){
                    container.removeChild(cont)
                }, 1100)
            })
        }
    }
    document.getElementById("gi").addEventListener("click", function() {
        capture()
    })
    document.getElementById("cm").addEventListener("click", function() {
        document.body.classList.toggle('fullvideo')
    })
    window.addEventListener('resize',function(){
        let ha = document.getElementsByTagName("header")[0].clientHeight
        let hb = document.getElementById("scroll-canvas").clientHeight
        let hh =  window.innerHeight - (ha * 2 + hb)
        hh = Math.abs(hh)
        document.getElementsByClassName("max")[0].innerText = '#video{max-height:' + hh + 'px}'
    })
    window.addEventListener('keydown', function(e) {
        if (e.which == 83 && !e.ctrlKey && e.shiftKey) {
            capture()
        }
    })
})