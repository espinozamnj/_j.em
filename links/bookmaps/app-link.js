function adjust(){
    let pl = qS('.ak').offsetWidth - 18
    let pr = qS('.hm').offsetWidth + 18
    if (pl + pr + 300 < window.innerWidth) {
        qS('.ct').style.top = ''
        qS('.ct').style.left = pl + 'px'
        qS('.ct').style.right = pr + 'px'
        if (window.innerHeight > 680) {
            qS('.ct').style.top = (window.innerHeight / 4 * 1) + 'px'
        }
    } else {
        qS('.ct').style.top = 'calc(var(--bar) * 1 + 3px)'
        qS('.ct').style.left = '0px'
        qS('.ct').style.right = '0px'
    }
}
adjust()
setTimeout(function () {
    adjust()
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
                let p = qS('.screen')
                p.className = 'screen -m'
            }
            tiof = 0
        } else {
            tiof += 1
        }
        let t = new Date
        qS('#c_h').innerText = t.getHours().toString().ct()
        qS('#c_m').innerText = t.getMinutes().toString().ct()
        qS('#f_h').innerText = t.getHours().toString().ct()
        qS('#f_m').innerText = t.getMinutes().toString().ct()
    }
    if (window.top == window.self) {
        setInterval(function(){sh()}, 3e4)
    }
    sh()
    window.addEventListener("visibilitychange", function() {
        document.visibilityState == 'hidden' ? isHidden = true : isHidden = false
    }, false);
    qS('.root').classList.add('tr-f')
    qS('.f-close').style.display = 'none'
    let i_ = 0
    while (i_ < ss.acc.length) {
        let i = ss.acc[i_],
            a = document.createElement('a')
        a.target = '_blank'
        a.href = i[1]
        a.innerText = i[0]
        a.classList.add('ak-a')
        qS('.ak').appendChild(a)
        i_++
    }
    qS('.toogle').addEventListener('click', function(e) {
        let p = e.target.parentNode
        p.className.includes('-o') ? p.classList.replace('-o', '-m') : p.classList.replace('-m', '-o')
    })
    for (let a = 0; a < ss.menu.length; a++) {
        let s = ss.menu[a],
            e = document.createElement('a')
        e.href = s[1]
        e.innerText = s[0]
        e.setAttribute('target', '_top')
        qS('.men').appendChild(e)
    }
    ss.bar.forEach(function(a){
        let s = document.createElement('div')
        s.innerText = a[0]
        s.addEventListener('click', function(){
            open(a[1])
        })
        qS('.href').appendChild(s)
    })
    function pan() {
        let nv = qS('.nav'),
        hi = qS('.hm')
        if (nv.className.includes('hi')) {
            nv.classList.replace('hi','vi')
            hi.classList.replace('hi','vi')
        } else {
            nv.classList.replace('vi','hi')
            hi.classList.replace('vi','hi')
        }
    }
    qS('.pad').addEventListener('click', function(){
        let p = qS('.screen')
        p.className.includes('-m') ? p.classList.remove('-m') : p.classList.add('-m')
    })
    qS('.pad').addEventListener('contextmenu', function(){
        localStorage.removeItem('last-version-links')
        setTimeout(function(){
            location.replace(location.href)
        }, 5e2)
    })
    document.addEventListener('keydown', function (ev) {
        ev = ev || window.event
        if (ev.ctrlKey && ev.keyCode == 32) {
            qS('.screen').classList.remove('-m')
        }
    })
    qS('.hm').addEventListener('click', pan)
    
    qS('#srh').addEventListener('click', function(){
        qS('.f-close').style.display = 'block'
        setTimeout(function(){
            qS('.root').classList.replace('tr-f', 'tr-t')
        }, 2e2)
    })
    qS('#srh').addEventListener('keydown', function(event){
        if (qS('.f-close').style.display == 'none') {
            event.target.click()
        }
    })
    qS('.f-close').addEventListener('click', function(event){
        qS('.con-search').className = "con-search l-false"
        qS('.root').classList.replace('tr-t', 'tr-f')
        setTimeout(function(){
            event.target.style.display = 'none'
        }, 2e2)
    })
    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 69 && document.activeElement !== qS('#srh')) {
            pan()
        }
    }, false);
    qS('#scripter').addEventListener(
        'contextmenu',
        function(target, event) {
            target.srcElement.classList.remove('view')
        }
    )
    qS('.mood').addEventListener('click', function(e) {
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
            qS('.mood').click()
        } else {
            localStorage.setItem('mood-ngt', 'false')
        }
    }
}, 5e2)
setTimeout(function(){
    adjust()
}, 1e3)
window.onresize = function(){
    adjust()
}