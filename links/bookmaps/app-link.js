setTimeout(function () {
    let $ = (d) => {return document.querySelector(d)}
    function adjust(){
        let pl = $('.ak').offsetWidth - 18
        let pr = $('.hm').offsetWidth + 18
        if (pl + pr + 300 < window.innerWidth) {
            $('.ct').style.top = ''
            $('.ct').style.left = pl + 'px'
            $('.ct').style.right = pr + 'px'
            if (window.innerHeight > 680) {
                $('.ct').style.top = (window.innerHeight / 4 * 1) + 'px'
            }
        } else {
            $('.ct').style.top = 'calc(var(--bar) * 1 + 3px)'
            $('.ct').style.left = '0px'
            $('.ct').style.right = '0px'
        }
    }
    let isHidden = false, tiof = 0
    String.prototype.ct = function () {
        let s = this,
            n = Number(s)
        n < 10 ? s = '0' + s : s = s
        return s
    }
    let sh = function () {
        if (tiof === 10) {
            if (isHidden) {
                let p = $('.screen')
                p.className = 'screen -m'
            }
            tiof = 0
        } else {
            tiof += 1
        }
        let t = new Date
        $('#c_h').innerText = t.getHours().toString().ct()
        $('#c_m').innerText = t.getMinutes().toString().ct()
        $('#f_h').innerText = t.getHours().toString().ct()
        $('#f_m').innerText = t.getMinutes().toString().ct()
    }
    if (window.top == window.self) {
        setInterval(function(){sh()}, 3e4)
    }
    sh()
    window.addEventListener("visibilitychange", function() {
        document.visibilityState == 'hidden' ? isHidden = true : isHidden = false
    }, false);
    $('.root').classList.add('tr-f')
    $('.f-close').style.display = 'none'
    let i_ = 0
    while (i_ < ss.acc.length) {
        let i = ss.acc[i_],
            a = document.createElement('a')
        a.target = '_blank'
        a.href = i[1]
        a.innerText = i[0]
        a.classList.add('ak-a')
        $('.ak').appendChild(a)
        i_++
    }
    $('.toogle').addEventListener('click', function(e) {
        let p = e.target.parentNode
        p.className.includes('-o') ? p.classList.replace('-o', '-m') : p.classList.replace('-m', '-o')
    })
    for (let a = 0; a < ss.menu.length; a++) {
        let s = ss.menu[a],
            e = document.createElement('a')
        e.href = s[1]
        e.innerText = s[0]
        e.setAttribute('target', '_top')
        $('.men').appendChild(e)
    }
    ss.bar.forEach(function(a){
        let s = document.createElement('div')
        s.innerText = a[0]
        s.addEventListener('click', function(){
            open(a[1])
        })
        $('.href').appendChild(s)
    })
    function pan() {
        let nv = $('.nav'),
        hi = $('.hm')
        if (nv.className.includes('hi')) {
            nv.classList.replace('hi','vi')
            hi.classList.replace('hi','vi')
        } else {
            nv.classList.replace('vi','hi')
            hi.classList.replace('vi','hi')
        }
    }
    $('.pad').addEventListener('click', function(){
        let p = $('.screen')
        p.className.includes('-m') ? p.classList.remove('-m') : p.classList.add('-m')
    })
    $('.pad').addEventListener('contextmenu', function(){
        localStorage.removeItem('last-version-links')
        setTimeout(function(){
            location.replace(location.href)
        }, 5e2)
    })
    document.addEventListener('keydown', function (ev) {
        ev = ev || window.event
        if (ev.ctrlKey && ev.keyCode == 32) {
            $('.screen').classList.remove('-m')
        }
    })
    $('.hm').addEventListener('click', pan)
    
    $('#srh').addEventListener('click', function(){
        $('.f-close').style.display = 'block'
        setTimeout(function(){
            $('.root').classList.replace('tr-f', 'tr-t')
        }, 2e2)
    })
    $('#srh').addEventListener('keydown', function(event){
        if ($('.f-close').style.display == 'none') {
            event.target.click()
        }
    })
    $('.f-close').addEventListener('click', function(event){
        $('.con-search').className = "con-search l-false"
        $('.root').classList.replace('tr-t', 'tr-f')
        setTimeout(function(){
            event.target.style.display = 'none'
        }, 2e2)
    })
    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 69 && document.activeElement !== $('#srh')) {
            pan()
        }
    }, false);
    $('#scripter').addEventListener(
        'contextmenu',
        function(target, event) {
            target.srcElement.classList.remove('view')
        }
    )
    $('.mood').addEventListener('click', function(e) {
        let p = document.body, m = 'ngt'
        if (p.className.includes(m)) {
            p.classList.remove(m)
            localStorage.setItem('mood-ngt', 'false')
        } else {
            p.classList.add(m)
            localStorage.setItem('mood-ngt', 'true')
        }
    })
    let lsN = localStorage.getItem('mood-ngt')
    if (lsN == null) {
        localStorage.setItem('mood-ngt', 'false')
    } else {
        if (lsN == 'true') {
            $('.mood').click()
        } else {
            localStorage.setItem('mood-ngt', 'false')
        }
    }
    adjust()
    window.onresize = function(){
        adjust()
    }
}, 3e2)