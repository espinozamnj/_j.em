(function(){
    let home_page = location.origin + location.pathname
    if(!location.search.indexOf("?=") && location.search.split("?=")[1].split("&")[0]==""){
        open(home_page, '_top')
    }
    let info = json_data_serie,
        dd = document,
        dh = dd.head,
        db = dd.body,
        $$ = (e) => {return dd.querySelectorAll(e)},
        $ = (e) => {return $$(e)[0]},
        rm = (e) => {
            e.parentElement.removeChild(e)
        }
        ne = (tag, attrs = []) => {
            let a = document.createElement(tag)
            attrs.forEach(attr => {
                a.setAttribute(attr[0], attr[1])
            })
            return a
        }
    (() => {
        document.title = info.data_serie.serie + ' TV'
        $('#favicon').setAttribute('href', info.data_serie.favic)
        let css = ne('style')
        css.innerText = `:root{--pri:${info.data_serie.prima};--sec:${info.data_serie.secun};}`
        let colorBase = '#' + (
            info['data_serie']['prima']
                .replace(/(rgb\(|\)| )/g,'')
                .split(',')
                .map(function(x){
                    x = parseInt(x)
                        .toString(16)
                    return (x.length == 1)
                        ? '0' + x
                        : x
                })
                .join('')
        )
        let meta = ne('meta', ['name', 'theme-color'],['content', colorBase])
        dh.appendChild(css)
        dh.appendChild(meta)
    })()
    setTimeout(() => {
        rm($('#alert'))
        $('nav').setAttribute('data-autor', info['data_serie']['ath'])
        let app = ne('div', [['class', 'app']])
        db.appendChild(app)
        let pageHTML = /*html*/ `
        <header>
            <img id="menu-btn" class="menu" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNG1tIiBoZWlnaHQ9IjRtbSIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHN0eWxlPi5pe2ZpbGw6YmxhY2t9PC9zdHlsZT48cmVjdCBjbGFzcz0iaSIgeD0iMjAuMTciIHk9IjE3LjM5IiB3aWR0aD0iMzU1LjYiIGhlaWdodD0iNjcuNzMiIHJ4PSIyMy4xOSIgcnk9IjMzLjg2Ii8+PHJlY3QgY2xhc3M9ImkiIHg9IjIwLjE3IiB5PSIzMjEuMDYiIHdpZHRoPSIzNTUuNiIgaGVpZ2h0PSI2Ny43MyIgcng9IjIzLjE5IiByeT0iMzMuODYiLz48cmVjdCBjbGFzcz0iaSIgeD0iMjAuMTciIHk9IjE2OS4yMiIgd2lkdGg9IjM1NS42IiBoZWlnaHQ9IjY3LjczIiByeD0iMjMuMTkiIHJ5PSIzMy44NiIvPjwvc3ZnPg==">
            <p id="header">Inicio</p>
            <a target="_top" href="${home_page}">
                <img class="logo">
            </a>
        </header>
        <main>
            <aside>
            <div id="prox">
                <span>Anterior</span>
                <span>Descarga</span>
                <span>Siguiente</span>
            </div>
            </aside>
            <iframe allowfullscreen id="vid" src=""></iframe>
        </main>
        `
        app.innerHTML = pageHTML.replace(/(<!--.*?-->)|(<!--[\S\s]+?-->)|(<!--[\S\s]*?$)/gi, '')
        let menu = $('#menu-btn')
        var list = $('aside')
        menu.addEventListener('click', function() {
            if (list.classList.value == "show"){
                list.classList.remove("show")
                menu.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNG1tIiBoZWlnaHQ9IjRtbSIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHN0eWxlPi5pe2ZpbGw6YmxhY2t9PC9zdHlsZT48cmVjdCBjbGFzcz0iaSIgeD0iMjAuMTciIHk9IjE3LjM5IiB3aWR0aD0iMzU1LjYiIGhlaWdodD0iNjcuNzMiIHJ4PSIyMy4xOSIgcnk9IjMzLjg2Ii8+PHJlY3QgY2xhc3M9ImkiIHg9IjIwLjE3IiB5PSIzMjEuMDYiIHdpZHRoPSIzNTUuNiIgaGVpZ2h0PSI2Ny43MyIgcng9IjIzLjE5IiByeT0iMzMuODYiLz48cmVjdCBjbGFzcz0iaSIgeD0iMjAuMTciIHk9IjE2OS4yMiIgd2lkdGg9IjM1NS42IiBoZWlnaHQ9IjY3LjczIiByeD0iMjMuMTkiIHJ5PSIzMy44NiIvPjwvc3ZnPg=='
            }
            else {
                list.classList.add("show")
                menu.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNG1tIiBoZWlnaHQ9IjRtbSIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHN0eWxlPi5pe2ZpbGw6YmxhY2t9PC9zdHlsZT48cmVjdCBjbGFzcz0iaSIgdHJhbnNmb3JtPSJtYXRyaXgoLjkxMDUzIC0uOTEwNTMgLjk0Mjc2IC45NDI3NiAtMy4yODY3IDM1Ni40NSkiIHdpZHRoPSIzODkuNDYiIGhlaWdodD0iNTAuOCIgcng9IjI1LjQiIHJ5PSIyNS40Ii8+PHJlY3QgY2xhc3M9ImkiIHRyYW5zZm9ybT0ibWF0cml4KC0uOTEwNTMgLS45MTA1MyAtLjk0Mjc2IC45NDI3NiA0MDQuNDQgMzU2LjU1KSIgd2lkdGg9IjM4OS40NiIgaGVpZ2h0PSI1MC44IiByeD0iMjUuNCIgcnk9IjI1LjQiLz48L3N2Zz4='
            }
        })
        //Localizar temporadas
        let cap = info['caps']
        var totalcaps = cap.length
        var ultimaTemp = cap[totalcaps-1].tem
        var cont
        for (let i = 1; i <= ultimaTemp; i++) {
            cont = 0
            for (let j = 0; j < cap.length; j++) {
                if (cap[j].tem==i) {
                    cont++
                }
            }
        }
        //Lista de episodios
        for (let i = 1; i <= ultimaTemp; i++) {
            let b = ne('blockquote')
            b.className = 'min'
            let s = ne('span')
            s.innerText = info['data_serie']['tipo'] + ' ' + i
            s.addEventListener('click', function() {
                xpand(s)
            })
            b.appendChild(s)
            list.appendChild(b)
            for (let j = 0; j < cap.length; j++) {
                if (cap[j].tem == i) {
                    let e = cap[j]
                    let p = ne('p')
                    p.innerText = i + '.' + e['epi'] + ' ' + e['tit']
                    b.appendChild(p)
                }
            }
        }
        //Expandir temporada
        function xpand(h) {
            t = h.parentNode
            s = t.children[0].clientHeight + 'px'
            if(t.className == 'max'){
                t.classList.replace('max','min')
                t.style.height = s
            }
            else {
                t.classList.replace('min','max')
                lastChild = list.childElementCount - 1
                for (let i = 1; i <= lastChild; i++){
                    let g = list.children[i]
                    if (g == t){
                        hei = g.children[1].clientHeight * (g.childElementCount - 1 ) + g.children[0].clientHeight
                        g.style.height = hei + 'px'
                        g.classList.add("max")
                    }
                    else {
                        g.classList.replace('max','min')
                        g.style.height = s
                    }
                }
            }
            setTimeout(
                function(){
                    list.scrollTop = t.offsetTop - 8
                },
                1010
            )
        }
        //añadir vinculos
        let allc = $$('aside blockquote p')
        for (let i = 0; i < allc.length; i++) {
            const p = allc[i]
            p.addEventListener('click',function(){
                let t = this.innerText
                let dt = t.substring(0, t.indexOf('.'))
                let de = t.substring(t.indexOf('.') + 1, t.indexOf(' '))
                enviar(dt, de)
            })
        }
        //Opciones de episodio
        let prev = $('#prox').children[0]
        let down = $('#prox').children[1]
        let next = $('#prox').children[2]
        //Enviar datos
        function enviar(a,b){
            open('?='  +a + '&' + b, '_top')
        }
        function prox(c){
            index = viewnow + c
            a = cap[index].tem
            b = cap[index].epi
            enviar(a, b)
            viewnow = index
        }
        // Cambiar de episodio
        function ver(a, b){
            var existe = false
            for (var index = 0; index < cap.length; index++) {
                if (cap[index].tem == a && cap[index].epi == b) {
                    vid.setAttribute('src', cap[index].url)
                    $('#header').innerHTML = a + '.' + b + ' ' + cap[index].tit
                    document.title = info['data_serie']['serie']+', Temp. '+a+' Cap. '+b
                    down.addEventListener('click',function(){
                        open(vid.src,'blank')
                    });
                    viewnow = index
                    console.log('------------------' + '\n' + 'Index = ' + viewnow)
                    if (viewnow == 0){
                        prev.classList.add('disable')
                        prev.addEventListener('click', function(){
                            alert('No existe capitulo anterior, este es el primero')
                        })
                    } else {
                        prev.addEventListener('click', function(){
                            prox(-1)
                        })
                    }
                    if (viewnow + 1 == totalcaps) {
                        next.classList.add('disable')
                        next.addEventListener('click', function(){
                            alert('No existe capitulo siguiente, este es el último')
                        })
                    } else {
                        next.addEventListener('click', function(){
                            prox(1)
                        })
                    }
                    existe = true
                }
            }
            if (!existe) {
                vid.setAttribute('src','data:text/html,<style>*{font-family: monospace;font-size:1.2em;text-align:center;color:red}</style>No existe este episodio')
            }
        }
        //Obtener de capitulo
        function getParentFolder(url) {
            if (!url) url = window.location.href;
            url = url.lastIndexOf('/') == (url.length -1) ? url.substr(0,url.length-1) : url.substr(0,url.lastIndexOf('/'))
            return url.substr(url.lastIndexOf('/') + 1)
        }
        if (!!location.search.indexOf("?=")) {
            vid.setAttribute('src','../home.html')
            $('#prox').style.transform = 'translateY(100%)'
        }
        $('.logo').src = info['data_serie']['logot']
        $('.logo').addEventListener('load', function(){
            //Alto de blockquote
            setTimeout(function(){
                let lastChild = list.childElementCount - 1
                for (let i = 1; i <= lastChild; i++){
                    let m = list.children[i]
                    m.style.height = m.children[0].offsetHeight + 'px'
                }
            }, 8e2)
            //Remove nav
            rm($('nav'))
            //Abrir vid
            if (!location.search.indexOf("?=")) {
                let temsol = location.search.split("?=")[1].split("&")[0]
                let episol = location.search.split("&")[1].split("&")[0]
                ver(temsol, episol)
            }
        })
    }, 1e2)
})()