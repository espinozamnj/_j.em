setTimeout(function () {
    let $ = (d) => {return document.querySelector(d)}
    function adjust() {
        let pl = $('.ak').offsetWidth - 18
        let pr = $('.hm').offsetWidth + 18
        if (pl + pr + 300 < window.innerWidth) {
            $('.ct').style.top = ''
            $('.ct').style.left = pl + 'px'
            $('.ct').style.right = pr + 'px'
            if (window.innerHeight > 660) {
                $('.ct').style.top = (window.innerHeight / 4 * 1) + 'px'
            }
        } else {
            $('.ct').style.top = 'calc(var(--bar) * 1 + 3px)'
            $('.ct').style.left = '0px'
            $('.ct').style.right = '0px'
        }
    }    
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
    for (let a = 0; a < ss.menu.length; a++) {
        let s = ss.menu[a],
            e = document.createElement('a')
        e.href = s[1]
        e.innerText = s[0]
        e.setAttribute('target', '_top')
        $('.men').appendChild(e)
    }
    function toggleMenu() {
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
    $('.hm').addEventListener('click', toggleMenu)
    
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
        if (e.code == 'KeyE' && document.activeElement != $('#srh')) {
            toggleMenu()
        }
    })
    $('#scripter').addEventListener(
        'contextmenu',
        function(target) {
            target.srcElement.classList.remove('view')
        }
    )
    adjust()
    window.onresize = function(){
        adjust()
    }
    delete window.ss
}, 1e3)