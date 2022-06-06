(function(){
    const k = data_hash_encrypt_pa55_log_
    var tg = [], set_pa = false, pppp = 'a'
    let rdd = Math.floor(Math.random() * (5 - 1)) + 1
    function $(item){return document.querySelector(item)}
    var ipt = $('.ipt')
    function only(value, index, self) {
        return self.indexOf(value) === index;
    }
    function ke55(n, ss) {
        let i = 0, tc = '', s = ''
        ss == undefined ? s = '*' : s = ss
        while (i < n) {
            tc += s
            i++
        }
        return tc
    }
    function cp(text) {
        let t = document.createElement('input')
        t.value = text
        document.body.appendChild(t)
        t.select()
        document.execCommand('copy')
        document.body.removeChild(t)
    }
    function selt(prop, value, from) {
        let w = from, l = w.length, i = 0, n = []
        while (i < l) {
            p = w[i][prop]
            if (prop == 'password' || prop == 'auth' || prop == 'note') {
                let dc = spy.do(p, pppp, false)
                dc.includes(value) && n.push(w[i])
            } else {
                p.includes(value) && n.push(w[i])
            }
            i++
        }
        return n
    }
    function print(where, what) {
        let _g = what, i = 0, l = _g.length, hw
        hw = el(where, 'div', [['class','ss-item']])
        while (i < l) {
            let z = {z:[]}
            z.nm = i
            z.m = el(hw, 'p', [])
            z.j = el(z.m, 'a', [['class','t-a'],['aria-n', i]])
            z.a = el(z.j, 'span', [['class','t-gray']], '[')
            z.b = el(z.j, 'span', [['class','t-w']], z.nm)
            z.j.addEventListener('click', function(){
                ipt.setAttribute('type', 'text')
                set_pa = false
                ipt.value = '_i ' + z.nm
                setTimeout(function(){
                    $('.sbt').click()
                }, 8e2)
            })
            z.c = el(z.j, 'span', [['class','t-gray']], ']')
            z.d = el(z.m, 'span', [['class','t-yellow']], ' ' + _g[i]['service'] + ' ')
            z.e = el(z.m, 'span', [['class','t-white']], '@' + _g[i]['user'])
            i++
        }
    }
    function trf(from, to) {
        let f = from, l = f.length, i = 0
        to = []
        while (i < l) {
            to.push(f[i])
            i++
        }
        return to
    }
    function el(where, what, attr, txt) {
        let w = where, i = 0
        n = document.createElement(what)
        txt != undefined && (n.innerText = txt)
        while (i < attr.length) {
            let t = attr[i]
            n.setAttribute(t[0], t[1])
            i++
        }
        w.appendChild(n)
        return n
    }
    var dic = [
        ['.t.', 'type'],
        ['.s.', 'service'],
        ['.c.', 'category'],
        ['.u.', 'user'],
        ['.w.', 'web'],
        ['.a.', 'auth'],
        ['.p.', 'password'],
        ['.n.', 'note'],
    ]
    String.prototype.rdic = function(){
        let s = this, i = 0, ll = dic.length
        while (i < ll){
            let d = dic[i]
            s = s.replaceAll(d[0],';' + d[1] + '=')
            i++
        }
        s.startsWith(";") && (s=s.slice(1))
        return s
    }
    var cmd = $('.console')
    $('.a_top').addEventListener('click', function(e){
        e.preventDefault()
    })
    $('.a_bot').addEventListener('click', function(e){
        e.preventDefault()
    })
    $('#send').addEventListener('submit', function(event){
        event.preventDefault()
        let i = 0, e = ipt.value, g = [], h = {}, c =  e.rdic()
      
        h.c = el(cmd, 'div', [['class','result']])
        h.t = el(h.c, 'div', [['class','entry t-cian']])
        h.m = el(h.c, 'div', [['class','con']])
        h.e = el(h.t, 'a', [['class', 'clone']])
        if (set_pa) {
            h.e.innerText = '..'
            h.e.innerText += ke55(e.length - 2, 'X')
        } else {
            h.e.innerText = e
        }
        h.e.addEventListener('click', function(evt){
            if (evt.target.innerText.startsWith('..')) {
                ipt.setAttribute('type', 'password')
                set_pa = true
            } else {
                ipt.setAttribute('type', 'text')
                set_pa = false
            }
            ipt.value = evt.target.innerText
        })
        h.z = {}
        if (c.includes('=')) {
            c = c.split(';')
            let l = c.length
            g = trf(k, g)
            while (i < l) {
                let s = c[i].split('=')
                console.log(s[0] + '=tiene que contener:' + s[1])
                let f = selt(s[0], s[1], g)
                g = trf(f, g)
                i++
            }
            tg = trf(g, tg)
            // console.log(tg)
          
            if (g.length == 0) {
                h.r = el(h.m, 'div', [['class','t-red']], 'No results found')
            } else {
                h.r = el(h.m, 'div', [['class','t-green']], g.length + ' results found')
                print(h.m, g)
            }
        } else if (set_pa) {
            pppp = e.substring(e.length - (rdd + 2), e.length - rdd) + e.substring(2, e.length - (rdd + 2))
            // 561234
            let l = ke55(pppp.length)
            h.r = el(h.m, 'div', [['class','t-yellow']], 'Password change to ' + l)
        } else {
            switch (e.slice(0, 2)) {
                case "..":
                    cp('\n .')
                    break
                case "cl":
                    if (e == 'clear') {
                        cmd.innerHTML = '<div class="result"><em>Console cleared</em></div>'
                    } else {
                        h.r = el(h.m, 'div', [['class','t-pre']])
                        h.r = el(h.r, 'span', [['class','t-red']], '!msg ')
                        h.r = el(h.r, 'em', [['class','t-yellow']], 'function invalid')
                    }
                    break
                case "on":
                    if (e == 'only') {
                        let i = 0, l = k.length, _n = {}
                        _n.type = [], _n.user = [], _n.category = []
                        while (i < l) {
                            _n.type.push(k[i]['type'])
                            _n.user.push(k[i]['user'])
                            _n.category.push(k[i]['category'])
                            i++
                        }
                        _n.type = _n.type.filter(only)
                        _n.user = _n.user.filter(only)
                        _n.category = _n.category.filter(only)
                        for (const d_ in _n) {
                            let dt = _n[d_], _i = 0
                            h.r = el(h.m, 'div', [['class', 'ss-item']])
                            h.rh = el(h.r, 'div', [['class', 't-green']], d_)
                            h.rb = el(h.r, 'div', [['class', 'ss-item d-flex']])
                            while (_i < dt.length) {
                                _d = dt[_i]
                                _ng = selt(d_, _d, k)
                                _t = _ng.length
                                h.ri = el(h.rb, 'div', [['class', 'i-flex']])
                                h.rn = el(h.ri, 'span', [['class', 't-w']], _d + ' ')
                                h.rc = el(h.ri, 'span', [['class', 't-gray']], _t)
                                _i++
                            }
                            for (let ii = 0; ii < 10; ii += 1) {
                                h.rin = el(h.rb, 'div', [['class', 'i-flex i-tr']], '...')
                            }
                        }
                    } else {
                        h.r = el(h.m, 'div', [['class','t-pre']])
                        h.r = el(h.r, 'span', [['class','t-red']], '!msg ')
                        h.r = el(h.r, 'em', [['class','t-yellow']], 'function invalid')
                    }
                    break
                case "cp":
                    if (tg.length == 0) {
                        h.r = el(h.m, 'div', [['class','t-red']], 'Data empty')
                    } else {
                        if (e.length !== 2) {
                            n = e.substring(3, e.length)
                            n = Number(n)
                        } else {
                            n = 0
                        }
                        if (tg[n] == undefined) {
                            h.r = el(h.m, 'div', [['class','t-red']], 'Invalid selection')
                        } else {
                            cp(spy.do(tg[n]['password'], pppp , false))
                            h.r = el(h.m, 'div', [['class','t-yellow']], 'Copied password')
                        }
                    }
                    break
                case "ca":
                    if (tg.length == 0) {
                        h.r = el(h.m, 'div', [['class','t-red']], 'Data empty')
                    } else {
                        if (e.length !== 2) {
                            n = e.substring(3, e.length)
                            n = Number(n)
                        } else {
                            n = 0
                        }
                        if (tg[n] == undefined) {
                            h.r = el(h.m, 'div', [['class','t-red']], 'Invalid selection')
                        } else {
                            cp(spy.do(tg[n]['auth'], pppp , false))
                            h.r = el(h.m, 'div', [['class','t-yellow']], 'Copied auth')
                        }
                    }
                    break
                case "_t":
                    h.r = el(h.m, 'div', [['class','t-yellow']], 'Results in array: ' + tg.length)
                    print(h.m, tg)
                    break
                case "_s":
                    if (tg.length == 0) {
                        h.r = el(h.m, 'div', [['class','t-red']], 'Data empty')
                    } else {
                        if (e.length !== 2) {
                            n = e.substring(3, e.length)
                            n = Number(n)
                        } else {
                            n = 0
                        }
                        if (tg[n] == undefined) {
                            h.r = el(h.m, 'div', [['class','t-red']], 'Invalid selection')
                        } else {
                            let ti = tg[n]
                            let _ts = ti['service']
                            _ts = _ts + ': '
                            h.r = el(h.m, 'div', [['class','t-yellow']], 'About login')
                            h.rb = el(h.m, 'div', [['class','ss-item']])
                            h.rs = el(h.rb, 'span', [['class','t-blue']], _ts)
                            h.ra = el(h.rb, 'span', [['class','t-w']], spy.do(ti['auth'], pppp , false) + ' - ')
                            h.rp = el(h.rb, 'span', [['class','t-gray t-pre']], ke55(ti['password'].length))
                            h.ra.addEventListener('dblclick', function(evt){
                                cp(spy.do(ti['auth'], pppp , false))
                            })
                            h.rp.addEventListener('mouseover', function(evt){
                                evt.target.innerText = spy.do(ti['password'], pppp , false)
                            })
                            h.rp.addEventListener('mouseleave', function(evt){
                                evt.target.innerText = ke55(spy.do(ti['password'], pppp , false).length)
                            })
                            h.rp.addEventListener('dblclick', function(evt){
                                cp(spy.do(ti['password'], pppp , false))
                            })
                        }
                    }
                    break
                case "_i":
                    if (tg.length == 0) {
                        h.r = el(h.m, 'div', [['class','t-red']], 'Data empty')
                    } else {
                        if (e.length !== 2) {
                            n = e.substring(3, e.length)
                            n = Number(n)
                        } else {
                            n = 0
                        }
                        if (tg[n] == undefined) {
                            h.r = el(h.m, 'div', [['class','t-red']], 'Invalid selection')
                        } else {
                            let ti = tg[n]
                            let _ts = ti['service']
                            _ts = _ts + ': '
                            h.r = el(h.m, 'div', [['class','t-yellow']], 'About login')
                            h.rb = el(h.m, 'div', [['class','ss-item d-box']])
                            for (const i in ti) {
                                h.rp = el(h.rb, 'div', [['class','d-flex']])
                                h.rba = el(h.rp, 'span', [['class','t-blue']], i)
                                h.rbb = el(h.rp, 'span', [['class','t-gray t-pre']], ': ')
                                if (i == 'web') {
                                    let url = ti[i].startsWith('http') ? ti[i] : '//' + ti[i]
                                    h.rbc = el(h.rp, 'a', [['class','t-cian t-a'],['rel', 'noreferrer nofollow'],['target','_blank'],['href', url]], ti[i])
                                } else if (i == 'password' || i == 'auth' || i == 'note') {
                                    h.rbc = el(h.rp, 'span', [['class','t-gray']], ke55(ti[i].length))
                                    h.rbc.addEventListener('mouseover', function(evt){
                                        evt.target.innerText = spy.do(ti[i], pppp , false)
                                    })
                                    h.rbc.addEventListener('mouseleave', function(evt){
                                        evt.target.innerText = ke55(ti[i].length)
                                    })
                                    h.rbc.addEventListener('dblclick', function(evt){
                                        cp(spy.do(ti[i], pppp , false))
                                    })
                                } else {
                                    h.rbc = el(h.rp, 'span', [['class','t-w']], ti[i])
                                }
                            }
                        }
                    }
                    break
                case "he":
                    if (e == 'help') {
                        let guide = '----|SEARCH AND FILTER||.t.|filter by "type"||.s.|filter by "service"||.c.|filter by "category"||.u.|filter by "user"||.w.|filter by "web"||.a.|filter by "auth"||.p.|filter by "password"||.n.|filter by "note"||----|COMMANDS||clear|Clean the console||cp N|copy password of N item||ca N|copy authUser of N item||_i N|show all info of N item||_s N|view credentials of N item||_t N|show this group select||only|view unique groups||..TX|set master password like TX||exit|close this site||help|show guide of help (this)'
                        h.r = el(h.m, 'div', [['class','t-yellow']], 'Show guide of help')
                        h.rb = el(h.m, 'div', [['class','ss-item']])
                        guide.split('||').forEach(function(a){
                            let b = a.split('|')
                            h.rbp = el(h.rb, 'div', [])
                            h.rbpa = el(h.rbp, 'a', [['class','t-blue t-left t-pre']], b[0])
                            h.rbpa.addEventListener('click', function(evt){
                                ipt.value = evt.target.innerText
                            })
                            if (b[0] == '----') {
                                h.rbpb = el(h.rbp, 'span', [['class','t-w']], b[1])
                                h.rbp.style.marginTop = '12px'
                                h.rbp.style.marginBottom = '8px'
                            } else {
                                h.rbpb = el(h.rbp, 'span', [['class','t-gray t-italic']], b[1])
                            }
                        })
                    } else {
                        h.r = el(h.m, 'div', [['class','t-pre']])
                        h.r = el(h.r, 'span', [['class','t-red']], '!msg ')
                        h.r = el(h.r, 'em', [['class','t-yellow']], 'function invalid')
                    }
                    break
                case "ex":
                    if (e == 'exit') {
                        h.r = el(h.m, 'div', [['class','t-red t-pre']], 'Redirect...')
                        h.r.innerText += '\n     /|\n    / |\n   /__|___\n  |       |\n  |       |\n  |       |  \\  Leaving ... \\\n  |       +\n  |       |\n  |_______| '
                        setTimeout(function(){
                            // dir_project
                            location.replace(location.origin + '/_j.em')
                        }, 2e3)
                    } else {
                        h.r = el(h.m, 'div', [['class','t-pre']])
                        h.r = el(h.r, 'span', [['class','t-red']], '!msg ')
                        h.r = el(h.r, 'em', [['class','t-yellow']], 'function invalid')
                    }
                    break
                default:
                    h.r = el(h.m, 'div', [['class','t-pre']])
                    h.r = el(h.r, 'span', [['class','t-red']], 'error: ')
                    h.r = el(h.r, 'em', [['class','t-yellow']], 'Function don\'t exist')
                    break
            }
        }
        cmd.scrollTop = cmd.scrollHeight - cmd.offsetHeight
    })
    $('.vlog').addEventListener('click', function(evt){
        evt.preventDefault()
        $('.float').classList.toggle('vi')
    })
    ipt.addEventListener('keydown', function(evt){
        let o = evt.target
        if (evt.which === 13) {
            $('.sbt').click()
        }
        if (o.value.startsWith('..')) {
            o.setAttribute('type', 'password')
            set_pa = true

        } else {
            o.setAttribute('type', 'text')
            set_pa = false
        }
    })
    ipt.setAttribute('placeholder', rdd)
    setTimeout(function(){
        ipt.value = '..' + ke55(1 - 1, '.')
        ipt.focus()
    }, 2e3)
})();