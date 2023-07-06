window.addEventListener('load', function() {
    let $ = (qs) => {return this.document.querySelector(qs)}
    awakeA3Y($('.main'))
    let cursor_e = $('.cursor-outer')
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
    $('#fullscreen').addEventListener('dblclick', function() {
        if (document.fullscreenElement == null) {
            document.documentElement.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    })
    clock_exist = false
    $('.load-cont').addEventListener('dblclick', function() {
        if (!clock_exist) {
            $('.message').innerHTML = '<div id="clock"></div>'
            clock_exist = true
            clockA3Y($('#clock'), 1e4)
            $('.load-cont').addEventListener('contextmenu', function() {
                // dir_project
                location.href = '/a3y'
            })
        }
    })
    $('.--apks .-t-apk').classList.add('-s-c-hidd')
    
})