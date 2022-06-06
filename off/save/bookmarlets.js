window.addEventListener('DOMContentLoaded',function(){
    let ls = document.querySelector('.list'),
        edt = document.getElementsByClassName('up')[0]
        tx = document.querySelector('.edit')
        carpet = _bkl_[0].path
        s_odd = true
        _a = 0
        codex = ''
    document.querySelector('.close').addEventListener('click',function(){
        edt.setAttribute('data-v','off')
    })
    document.querySelector('.preline').addEventListener('click',function(){
        tx.classList.toggle('pre')
    })
    function nwe(where, what, attr, txt) {
        let _w = where, i = 0
        n = document.createElement(what)
        if (txt != '') {
            n.innerText = txt
        }
        if (attr != []) {
            while (i < attr.length) {
                let t = attr[i]
                n.setAttribute(t[0], t[1])
                i++
            }
        }
        _w.appendChild(n)
        return n
    }
    while (_a < _bkl_.length) {
        let s = _bkl_[_a]
        let f = {}
        let sjs = 'javascript:' + s.url
        f.o = _a < 10 ? '0' + _a : _a
        f.h = '// ' + s.name + '\n' + sjs + '\n\n//------------\n'
        codex += f.h
        f.t = nwe(ls, 'div', [['class','target']], '')
        f.i = nwe(f.t, 'div', [['class','link']], '')
        f.f = nwe(f.i, 'p' , [['class','string']], '')
        f.s = nwe(f.i, 'p' , [['class','more']], '')
        
        f.a = nwe(f.f, 'a', [['href', sjs]], s.name)
        f.p = nwe(f.s, 'span', [['class','i-path'],['data-ord',(f.o)]], s.path)
        f.fb = nwe(f.f, 'div' , [['class','btn']], '')
        f.sb = nwe(f.s, 'div' , [['class','btn']], '')
        f.c = nwe(f.fb, 'button', [], 'COPY')
        f.v = nwe(f.fb, 'button', [], 'FMT')
        f.r = nwe(f.sb, 'button', [['class','i-raw']], 'RAW')
        f.n = nwe(f.sb, 'button', [], 'NEW')
        
        if (s.path != carpet){
            carpet = s.path
            s_odd = !s_odd
        }
        (s_odd) ? f.t.classList.add('odd') : f.t.classList.add('even') 

        if (f.a.getAttribute('href').includes('%') || f.a.getAttribute('href').includes('\n')) {
            f.p.classList.add('alert')
        }

        f.c.addEventListener('click', function(){
            let aux = document.createElement('textarea')
            aux.value = sjs
            document.body.appendChild(aux)
            aux.select()
            document.execCommand('copy')
            document.body.removeChild(aux)
        })
        f.r.addEventListener('click',function(){
            tx.value = sjs
            edt.setAttribute('data-v','true')
        })
        f.v.addEventListener('click',function(et){
            // tx.value = et.target.parentNode.parentNode.children[0].getAttribute('href')
            opts = {}
            opts.indent_size = 2
            opts.space_in_empty_paren = true
            let codeFmt = js_beautify(s.url, opts)
            console.log(codeFmt)
            tx.value = codeFmt
            edt.setAttribute('data-v','true')
        })
        f.n.addEventListener('click',function(){
            let _page = window.open(''),
                _n = document.createElement('meta')                                        
                _h = document.createElement('a')
                _c = document.createElement('input')
                _d = document.createElement('div')
                _e = document.createElement('textarea')
                _p = document.createElement('a')
                _s = document.createElement('script')
                _cjs = sjs
            _n.name = 'viewport'
            _n.content = 'width=device-width'
            _page.document.head.appendChild(_n)
            _d.classList.add('edit')
            _d.innerHTML = '<style>*{font-family:monospace;font-size:0.95rem}.edit{margin-top:26px;padding:9px}textarea{width:100%;min-height:60px;resize:vertical;padding:12px;border:2px solid rgb(180,180,180);margin-bottom:18px;}input{border:2px solid rgb(111,111,111);padding:8px;max-width:150px;}</style>'
            _s.innerHTML = 'document.title="' + s.name + '"'
            _d.appendChild(_e)
            _h.innerText = s.name
            _e.setAttribute('spellcheck', 'false')
            _e.value = _cjs
            _c.type = 'number'
            _c.setAttribute('min', '65')
            _c.addEventListener(
                'change',
                function(){
                    _e.style.height = this.value + 'px'       
                }
            )
            _p.style.marginLeft = '6px'
            _p.href = 'https://jsonformatter.org/javascript-pretty-print'
            _p.innerText = 'JS EDITOR'
            _d.appendChild(_c)
            _d.appendChild(_s)
            _d.appendChild(_p)
            _page.document.body.appendChild(_h)
            _page.document.body.appendChild(_d)
            _h.href = _cjs
        
        })
        _a++
    }
    // console.log(codex)
})