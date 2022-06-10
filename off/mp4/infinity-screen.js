window.addEventListener('load', function(){
    (function(){
        let cursor_e = document.getElementsByClassName('cursor-outer')[0]
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            cursor_e.classList.add('hidden')
        } else {
            if (1 == 2) {
                window.addEventListener('mousemove', function(event) {
                    cursor_e.style.left = event.clientX + 5 + "px"
                    cursor_e.style.top = event.clientY + 5 + "px"
                })
            } else {
                cursor_e.classList.add('hidden')
            }
        }
        document.getElementById('fullscreen').addEventListener('dblclick', function() {
            if (document.fullscreenElement == null) {
                document.documentElement.requestFullscreen()
            } else {
                document.exitFullscreen()
            }
        })
    })();
    let v = document.getElementsByTagName('video')[0]
    v.muted = true
    v.play()
    v.addEventListener('click', function(event) {
        event.preventDefault()
        setTimeout(function() {
            v.play()
        }, 5e2)
        if (v.hasAttribute('controls')) {
            v.removeAttribute('controls')
        } else {
            v.setAttribute('controls', '')
        }
    })
    v.addEventListener('dblclick', function() {
        document.fullscreenElement == v ? document.exitFullscreen() : v.requestFullscreen()
    })
})