document.querySelector('.find').innerHTML = /*html*/`
<div data-out="false" class="con-search l-false">
  <form class="src-box">
    <input type="text" autocomplete="off" id="srh" spellcheck="false">
    <input type="submit" id="hid-sbt">
    <span class="i_s">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
    </span>
  </form>
  <div id="box-rst"><ul></ul></div>
</div>`
var _txt
let intervalWaiData = setInterval(function() {
  if (typeof(sss) && typeof(_tech) && typeof(dg_data) != 'undefined') {
    clearInterval(intervalWaiData)
    let autoInput = false
    let loadPAGEtime = new Date().getTime()
    function eS(element) {
      let _e = document.querySelector(element)
      return _e
    }
    setTimeout(function() { 
      if (!!eS('.load')) {
        let lad = eS('.load')
        lad.parentNode.removeChild(lad)
      }
    }, 5e2)
    let bki = 0,
      tchi = 0
      cij = eS('#jsn')
      _txt = sss
    if (typeof (__apps__) !== 'undefined') {
      let a = __apps__, l = a.length
      while (l--) {
        let u = {
          'url': a[l]['url'],
          'name': '' + a[l]['name'],
          'path': '/lib/Apps/J:EM'
        }
        // dir_project
        u['url'] = u['url'].replace('@', location.origin + '/_j.em/')
        u['url'] += '#fav=' + a[l]['fav']
        _txt.push(u)
      }
    }
    if (typeof (dg_data) !== 'undefined') {
      for (const gapp in dg_data['apps']) {
        let group = dg_data['apps'][gapp]
        for (const gitems in group['items']) {
          let ti = group['items'][gitems]
          let nI = {}
          if (ti.length == 3) {
            nI.name = ti[1] + '::' + ti[2]
          } else {
            nI.name = ti[1]
          }
          nI.url = ti[0]
          nI.path = '/lib/Design apps/' + group['title']
          _txt.push(nI)
        }
      }
    }
    while(bki < _bkl_.length) {
      let cj = _bkl_[bki]
      let comm_js = {
        name: cj.name,
        path: cj.path,
        url: cj.url
      }
      _txt.push(comm_js)
      bki++
    }
    while(tchi < _tech.length) {
      _txt.push(_tech[tchi])
      tchi++
    }
    cij.value = JSON.stringify(_txt)
    cij.addEventListener(
      'change',
      function() {
        let val = cij.value
        _txt = JSON.parse(val)
      }
    )
    let _stt = {}
    _stt.laST = false
    _stt.laST_t = false
    function w(href) {
      let u = href,
        r = /:\/\/(.[^/]+)/
        f = u.match(r)[1]
      return f
    }
    function tab(url, options) {
      if (((new Date().getTime()) - loadPAGEtime) > 2e3) {
        window.open(url, options, 'noreferrer')
      } else {
        setTimeout(function() {
          window.open(url, options, 'noreferrer')
        }, 2e3)
      }
    }
    let srh = eS('#srh'),
      lr = eS('.con-search')
    eS('.src-box').addEventListener('submit', function(e) {
      e.preventDefault()
      let bR = eS('#box-rst')
      bR = bR.children[0]
      let Srh = srh.value
      let isAdva = false
      let isCLI = false
      let cm = ''
    
      if (lr.getAttribute('data-out') == 'false') {
        if (Srh.startsWith('>')) {
          isCLI = true
        }
        if (Srh.endsWith('+')) {
          Srh = Srh.substring(0, Srh.length - 1)
          isAdva = true
        }
        let nA = [],
          Hf = {
          "e": bR.parentElement,
          "pB": 0.5,
          "hU": 2.4,
          "hB": 1,
          "mR": 6,
          "fH": 2.8,
          "tS": false,
        }
        function setHG(nb) {
          let vH = nb + Hf.fH
          vH = vH.toString() + 'rem'
          Hf.e.style.height = vH
        }
        if(Srh == '*') {
          bR.innerHTML = '<pre class="cmd">\
          \n:__ for url\
          \n/__ for folder\
          \n/_: for path exact\
          \n#__ for dir\
          \n>__ for command\
          \n::_ for tags\
          \n \
          \n:+  for all (hack)\
          \n \
          \n,__ for view searches\
          \n,,_ for all searches\
          \n__+ for show all\
          \n \
          \n.__ for bang search\
          \n.._ for ddg search\
          \n=__ for calc result\
          \n \
          \n__. for url open\
          \n$_. for path open\
          \n_.. for url gen\
          \n \
          \ncontext input: change mode\
          \ndbl icon: show paths\
          \ncontext icon: close list\
          </pre>'
          setHG(Hf.hU * 8)
          lr.className = 'con-search l-true'
        } else if (Srh !== '') {
          let src, firstR = 1
          if (Srh.endsWith('*')) {
            Srh = Srh.substring(0, Srh.length - 1)
            firstR += 1
          } else if (Srh.endsWith('-') && Srh.length > 1) {
            Srh = Srh.substring(0, Srh.length - 1)
            firstR += 2
          } else {
            Srh = Srh
          }
          src = Srh.substring(1, Srh.length)
          if (isCLI) {
            cm = Srh.substring(1, Srh.length)
          }
          _hidd = false
          if (Srh.endsWith('.') && !Srh.startsWith(':') && !Srh.startsWith(',')) {
            nA = [[]]
            _hidd = true
            src = Srh.substring(0, Srh.length - 1)
            if (src.startsWith('$')) {
              let apps = src.substring(1, src.length)
              apps = './../' + apps
              apps = apps.toLowerCase()
              if (firstR == 1) {
                tab(apps, '_top')
              } else {
                tab(apps, '_blank')
              }
            } else if (src.endsWith('.')) {
              _hidd = false
              let _url = src.substring(0, src.length - 1), _cn = [], _ch = {}, _durl
              if (_url.startsWith('http')) {
                _durl = _url
              } else {
                _durl = 'http://' + _url
              }
              _ch.name = w(_durl)
              _ch.path = 'generate URL'
              _ch.url = _durl
              _cn.push(_ch)
              nA = [_cn]
            } else {
              if (src.startsWith('http')) {
                if (firstR == 1) {
                  tab(src, '_top')
                } else {
                  tab(src, '_blank')
                }
              } else {
                if (firstR == 1) {
                  tab('http://' + src, '_top')
                } else {
                  tab('http://' + src, '_blank')
                }
              }
            }
          } else if (Srh.startsWith('.')) {
            _hidd = true
            nA = [[]]
            if (src.startsWith('.')) {
              if (firstR == 1) {
                tab('//duckduckgo.com/?q=' + encodeURIComponent(src.substring(1, src.length)) , '_top')
              } else {
                tab('//duckduckgo.com/?q=' + encodeURIComponent(src.substring(1, src.length)) , '_blank')
              }
            } else {
              if (firstR == 1) {
                tab('//duckduckgo.com/?q=!' + encodeURIComponent(src), '_top')
              } else {
                tab('//duckduckgo.com/?q=!' + encodeURIComponent(src), '_blank')
              }
            }
          } else if (Srh.startsWith('=')) {
            if (firstR == 1) {
              tab('//duckduckgo.com/?q=%3D' + encodeURIComponent(src), '_top')
            }
            else {
              tab('//duckduckgo.com/?q=%3D' + encodeURIComponent(src), '_blank')
            }
            _hidd = true
            nA = [[]]
          } else if (Srh.startsWith(':') && !Srh.startsWith('::')) {
            firstR += 1
            let results = _txt.filter(e => e.url.toString().toLowerCase().includes(src.toLowerCase()))
            nA = []
            nA.push(results)
          } else if (Srh.startsWith('::')) {
            let results = _txt.filter(e => e.name.toString().toLowerCase().includes('::'))
            results = results.filter(e => e.name.includes(Srh.slice(2)))
            nA = []
            nA.push(results)
          } else if (Srh.startsWith('#')) {
            firstR += 4
            let n_chd = [],
              d = dir(_txt),
              i = 0
            nA = []
            while (i < d.length) {
              let t = d[i],
                n_ = {}
              if (t.toLowerCase().includes(src.toLowerCase())) {
                n_.name = t.toUpperCase()
                n_.path = cnt(t, _txt)
                n_.url = '#' + t.toLocaleLowerCase()
                n_chd.push(n_)
              }
              i++
            }
            nA.push(n_chd)
          } else if (Srh.startsWith('/')) {
            firstR += 1
            let results
            if (Srh.endsWith(':')) {
              src = '/' + src.slice(0, -1)
              results = _txt.filter(e => e.path.toString().toLowerCase() == src.toLowerCase())
            } else {
              results = _txt.filter(e => e.path.toString().toLowerCase().includes(src.toLowerCase()))
            }
            nA = []
            nA.push(results)
          } else if (Srh.startsWith(',')) {
            let s_s = src.substring(src.search(',') + 1, src.length)
            src = src.substring(0, src.search((',')))
            let _ncs = JSON.parse(JSON.stringify(ss.searchs))
            let sear = _ncs.filter(e => e.path.toString().toLowerCase() == src.toLowerCase())
            nA = []
            if (sear.length == 1) {
              if (srh.value.endsWith('*')) {
                tab(sear[0]['url'].replaceAll('%s', s_s), '_blank')
              } else {
                tab(sear[0]['url'].replaceAll('%s', s_s), '_top')
              }
            } else {
              src = encodeURIComponent(src)
              let results = _ncs.filter(e => e.url.toString().toLowerCase().includes(src.toLowerCase()))
              let gi = 0
              while (gi < results.length) {
                let l = results[gi].url
                results[gi].url = l.replace('%s',encodeURIComponent(s_s))
                gi++
              }
              nA.push(results)
            }
            Hf.tS = true
          } else {
            firstR += 1
            String.prototype.icd = function(inclu) {
              return this.toString().toLowerCase().includes(inclu.toLowerCase())
            }
            let results = _txt.filter(e => e.name.icd(Srh) && !e.name.icd('::' + Srh))
            nA = []
            nA.push(results)
          }
          lastS = bR.innerHTML
          bR.innerHTML = ''
          let bks = nA[0]
          if (bks.length > 0 && !isCLI) {
            for (let b = 0; b < bks.length; b++) {
              if (b == Hf.mR && !isAdva) {
                break
              }
              let bk = bks[b],
                isCJS = true
        
              if (bk.url.startsWith('htt')) {
                isCJS = false
              }
              if (bk.url.includes('%s')) {
                bk.url = bk.url.replaceAll('%s', s_s)
              }
              let _l = document.createElement('li'),
                _i = document.createElement('i')
                _a = document.createElement('a')
                _o = document.createElement('ol')
                _pN = document.createElement('p')
                _pN_ = document.createElement('span')
                _pC = document.createElement('span')
                _pP = document.createElement('p')
              if (bk.url.indexOf(location.host) != -1 && bk.url.indexOf('#fav=') != -1) {
                _a.href = bk.url.split('#fav=')[0]
              } else {
                _a.href = bk.url
              }
              _pN_.classList.add('site')
              _pC.classList.add('tag')
              let haveTag = bk.name.includes('::')
              if (haveTag) {
                _pN_.innerText = bk.name.split('::')[0]
                let tags = bk.name.split('::')[1], tagsTxt = ''
                tags.split(',').forEach(function (tag) {
                  tagsTxt += tag + ' · '
                })
                tagsTxt = tagsTxt.slice(0, -3)
                _pC.setAttribute('data-tag', tagsTxt)
              } else {
                _pN_.innerText = bk.name
              }
              _o.innerText = '+'
              _o.addEventListener('mouseover',function() {
                _l.classList.add('v-pth')
              })
              _o.addEventListener('mouseleave',function() {
                _l.classList.remove('v-pth')
              })
              _o.addEventListener('click',function() {
                srh.value = bk.path + '+'
              })
              _pN.classList.add('name')
              if (isCJS) {
                if (bk.url.startsWith('#')) {
                  _i.innerText = '#'
                  _a.addEventListener(
                    'click',
                    function() {
                      srh.value = '/' + bk.name.toLowerCase() + '+'
                    }
                  )
                  _i.addEventListener(
                    'click',
                    function() {
                      srh.value = '/' + bk.name.toLowerCase() + '+'
                      setTimeout(
                        function() {
                          eS('.i_s').click()
                          setTimeout(
                            function() {
                              let gn = document.createElement('input')
                              gn.type = 'hidden'
                              gn.value = bk.name
                              gn.id = 'gnt'
                              document.body.appendChild(gn)
                              srh.value = '>f'
                              eS('.i_s').click()
                            }, 5e2
                          )
                        }, 1e2
                      )
                    }
                  )
                  _a.removeAttribute('href')
                } else {
                  _i.innerText = '>'
                  let _cjs = ''
                  if (bk.url.startsWith('data')) {
                    _cjs = bk.url
                  } else {
                    let complete_function = 'javascript:' + bk.url
                    _cjs = complete_function
                  }
                  _i.addEventListener('click',function() {
                    let _page = window.open(''),
                      _n = document.createElement('meta')
                      _h = document.createElement('a')
                      _c = document.createElement('input')
                      _d = document.createElement('div')
                      _e = document.createElement('textarea')
                      _p = document.createElement('a')
                      _s = document.createElement('script')
                    _n.name = 'viewport'
                    _n.content = 'width=device-width'
                    _page.document.head.appendChild(_n)
                    _d.classList.add('edit')
                    _d.innerHTML = '<style>*{font-family:monospace;font-size:0.95rem}.edit{margin-top:26px;padding:9px}textarea{width:100%;min-height:60px;resize:vertical;padding:12px;border:2px solid rgb(180,180,180);margin-bottom:18px;}input{border:2px solid rgb(111,111,111);padding:8px;max-width:150px;}</style>'
                    _d.appendChild(_e)
                    _s.innerHTML = 'document.title="' + bk.name + '"'
                    _h.innerText = bk.name
                    _e.setAttribute('spellcheck', 'false')
                    _e.value = _cjs
                    _c.type = 'number'
                    _c.setAttribute('min', '65')
                    _c.addEventListener(
                      'change',
                      function() {
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
                  _a.href = _cjs
                }
              } else {
                if (Hf.tS) {
                  _i.innerText = '@'
                } else {
                  // _i.innerText = '='
                  let _img = document.createElement('img')
                  if (bk.url.indexOf(location.host) != -1) {
                    _img.src = location.origin + '/_cdn_/favs/' + bk.url.split('#fav=')[1] + '.64.png'
                  } else {
                    _img.src = 'https://external-content.duckduckgo.com/ip3/' + w(bk.url) + '.ico'
                  }
                  _i.appendChild(_img)
                }
                _i.addEventListener('click', function() {
                  let only_path = bk.url.split('#fav=')[0]
                  tab(only_path, '_blank')
                })
              }
              _pP.setAttribute('data-val', bk.path)
              _pP.classList.add('path')
              _l.appendChild(_i)
              _l.appendChild(_a)
              _l.appendChild(_o)
              _pN.appendChild(_pN_)
              _a.appendChild(_pN)
              _a.appendChild(_pP)
              haveTag && _a.appendChild(_pC)
              bR.appendChild(_l)
              
              if (_a.hasAttribute('href')) {
                if (_a.getAttribute('href').startsWith('ht')) {
                  _a.setAttribute('target', '_top')
                  _a.setAttribute('rel', 'noopener noreferrer')
                }
              }
              if (b == 0 && firstR > 2 && (_a.href != '' || _i.innerText == '#')) {
                switch (firstR) {
                  case 3: 
                    if (bk.url.startsWith('#') == false) {
                      tab(bk.url, '_blank')
                    }
                    break
                  case 4:
                    if (self == top) {
                      location.replace(bk.url)
                    } else {
                      tab(bk.url, '_top')
                    }
                    break
                  case 5:
                    if (bks.length == 1) {
                      _a.click()
                      setTimeout(
                        function () {
                          eS('.i_s').click()
                        },
                        5e2
                      )
                    }
                    break
                  default:
                    break
                }
              }
            }
            Hf.hB = (bks.length * Hf.hU + Hf.pB)
            setHG(Hf.hB)
            if(!isAdva && bks.length > Hf.mR) {
              setHG(Hf.mR * Hf.hU + Hf.pB)
            }   
            bR.style.paddingBottom = '0px'
            if (isAdva && Hf.hB > 25) {
              setHG(25)
              bR.style.paddingBottom = Hf.pB + 'rem'
            }
          }
          else if (isCLI) {
            console.log('CLI>>' + cm)
            let _con = document.createElement('div')
            _con.classList.add('con')
            _log = _con
            let h_t = 25
            switch (cm) {
              case "w":
                bR.innerHTML = lastS
                setTimeout(function () {
                  bR.children[0].style.userSelect = 'text'
                }, 4e2)
                break
              case "all":
                setTimeout(function() {
                  shw(_txt)
                }, 250)  
                _log.classList.add('all')
                break
              case "convert":
                _log.innerHTML = '<xmp>' + JSON.stringify(convert(_txt), undefined, 2) + '</xmp>'
                _log.children[0].classList.add('cmd')
                break
              case "folder":
                let _pr = JSON.stringify(carp(_txt, false), undefined, 2)
                _log.innerHTML = '<pre>' + _pr + '</pre>'
                _log.children[0].classList.add('cmd')
                break
              case "tree":
                let _prf = JSON.stringify(carp(_txt, false), undefined, 4) 
                _prf = _prf
                  .replaceAll('    ','|  ') // six spaces to ident
                  .replaceAll('{\n','\n|  ') // new folder
                  .replaceAll(',\n','\n|  ') // new element
                  .replaceAll('{}','###') // end folder (close)
                  // .replaceAll('"','') // delete quotes
                  .replaceAll(' "',' |-[') // star folder name
                  .replaceAll('": ',' ]') // end folder name
                  .replaceAll(': \n','____\n') // end folder lines
                  .replaceAll('}\n',"|  |  \\___\n") // end folder lines
                  .replaceAll('\n|  |  ','\n') // remove lines until
                  .replaceAll('\n}','') // remove last close quote
                  .replaceAll('\n|','\n') // remove last close quote
                _log.innerHTML = '<pre>' + _prf + '</pre>'
                _log.children[0].classList.add('cmd')
                break
              case "search":
                setTimeout(function() {
                  shw(ss.searchs)
                }, 250)  
                _log.classList.add('all')
                break
              case "sh":
                _log.classList.add('cmd')
                ss.searchs.forEach(
                  function(a) {
                    // _log.innerHTML += '<p>' + a.path + ': ' + a.url + ' ' + a.name + '</p>'    
                    _log.innerHTML += '<p>' + a.path + '|' + a.name + ': ' + a.url + '</p>'    
                  }
                )
                break
              case "clear":
                bR.innerHTML = ''
                h_t = Hf.hU + 1
                break
              case "f":
                let cpy = window.open('')
                let _nB = document.createElement('div')
                _nB.setAttribute('id', 'box-rst')
                _nB.setAttribute('style', 'position:relative;height:100vh;background:rgb(230,230,230);padding-top:0px;z-index:4')
                let _nU = document.createElement('ul')
                _nU.innerHTML = lastS
                let sty = document.querySelectorAll('link')
                let u = document.location.origin + document.location.pathname
                let _nN = document.createElement('meta')
                let _nS = document.createElement('script')
                if (!!eS('#gnt')) {
                  let _gn = eS('#gnt')
                  _nS.innerHTML = 'document.title="' + _gn.value + '"'
                  setTimeout(function() {
                    _gn.parentElement.removeChild(_gn)
                  }, 300)
                }
                let w = 0
                while (w < sty.length) {
                  if (sty[w].getAttribute('rel') == 'stylesheet') {
                    let _s = document.createElement('link')
                    file = sty[w].getAttribute('href')
                    file = file.substring(2, file.length)
                    cpy.document.head.appendChild(_s)
                    _s.setAttribute('rel', 'stylesheet')
                    _s.setAttribute('href', u + file)
                  }
                  w++
                }
                _nN.name = 'viewport'
                _nN.content = 'width=device-width'
                cpy.document.head.appendChild(_nN)
                cpy.document.body.appendChild(_nB)
                cpy.document.body.appendChild(_nS)
                _nB.appendChild(_nU)
                _log.innerHTML = 'run new command'
                _con.classList.add('cmd')
                h_t = Hf.hU + 1
                break
              case "edit":
                let ed = cij.parentElement
                ed.classList.contains("view") ? ed.classList.remove("view") : ed.classList.add("view")
                break
              case "save":
                let tmp = document.createElement('div')
                tmp.classList.add('temp-items')
                tmp.style.display = 'none'
                tmp.innerHTML = lastS
                bR.appendChild(tmp)
                setTimeout(function() {
                  tmp.parentElement.removeChild(tmp)
                }, 4e3)
                let export_button = document.createElement('a')
                let html_code = ''
                let time = new Date().getTime() / 1000
                eS('.temp-items').childNodes.forEach(function(x) {
                  let a = x.children[1]
                  let name = a.children[0].innerText
                  let fav = favLetter(name[0].toUpperCase(), Math.floor(Math.random() * 359 + 0))
                  
                  html_code += `<DT><A HREF="${a.href}" ADD_DATE="${time}" ICON="${fav}">${name}</A>\n`
                })
                html_code = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\
                \n<!--This is an automatically generated file.\
                \n    It will be read and overwritten.\
                \n    Do Not Edit! -->\
                \n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\
                \n<Title>Bookmarks</Title>\
                \n<H1>import from panda</H1>\
                \n<DL><p>\n' + html_code + '\
                </DL><p><script>setTimeout(function(){let s=document.createElement("style");s.innerHTML="*{font-family:monospace}a{padding-left:23px;background-repeat:no-repeat;background-size:18px;line-height:24px;font-size:12px;height:18px;padding-top:2px;padding-bottom:2px;text-decoration:none}a:hover{text-decoration:underline;color:black;padding-left:28px}";document.head.appendChild(s);let list=document.querySelectorAll("a[icon]");for(let i=0;i<list.length;i++){let url=list[i].getAttribute("icon");list[i].style.backgroundImage="url(\'"+url+"\')";}},2e3)</script>'
                export_button.innerText = 'Save this bookmarks'
                export_button.classList.add('save_button')
                export_button.href = makeTextFile(html_code)
                export_button.download = 'bookmark_' + new Date().toLocaleString().replace(/[:|/]/g, '-').replace(/, /g, '_') + '.html'
                _log.appendChild(export_button)
                _log.classList.add('center_button')
                h_t = Hf.hU + 2
                break
              case "auto":
                autoInput = !autoInput
                _log.innerHTML = 'autocomplete input mode to <u>' + autoInput + '</u>'
                _con.classList.add('cmd')
                h_t = Hf.hU + 1
                break
              case "reload":
                localStorage.removeItem('last-version-links')
                setTimeout(function() {
                    location.replace(location.href)
                }, 5e2)
                break
              case "?":
                _log.innerText = '\
                all: show all marks\
                \nauto: toogle auto input event\
                \nreload: clean cache and reload\
                \nfolder: show all directories\
                \ntree: show directories with format\
                \nconvert: show all as tree\
                \nclear: empty box\
                \nsearch: show searhs engines\
                \nsave: generate export html marks\
                \nsh: show searhs minify\
                \nedit: open textarea editor\
                \nw: set as select user\
                \nf: open box in new page'
                _log.classList.add('cmd')
                h_t = 10
                break
              default:
                _log.innerText = '>? for commands'
                _con.classList.add('cmd')
                h_t = Hf.hU + 1
                break
            }
            bR.appendChild(_con)
            setHG(h_t)
          } else if (_hidd) {
            let s_ = srh.value
            if (s_.endsWith('.')) {
              bR.innerHTML = '<pre>' + s_.substring(0, s_.length - 1) + '</pre>'
            } else {
              bR.innerHTML = '<pre>!' + s_.substring(1, s_.length) + '</pre>'
            }
            setHG(Hf.hU)
          } else {
            bR.innerHTML = '<pre>No se han encontrado resultados</pre>'
            setHG(Hf.hU + 1)
          }
          lr.className = "con-search l-true"
        } else {
          srh.value = ''
          srh.placeholder = 'inserta valor o * para comandos'
          setTimeout(function() {
            srh.placeholder = 'Buscar'
          },
          1800)
        }
      } else {
        tab('//goo.gl/search/' + encodeURIComponent(Srh), '_top')
        // tab('//ddg.co/?q=' + encodeURIComponent(Srh) , '_top')
      }
    })
    
    srh.placeholder = 'Buscar'
    function cg_out() {
      let f = lr
      if (f.getAttribute('data-out') == 'true') {
        f.setAttribute('data-out', 'false')
      } else {
        f.setAttribute('data-out', 'true')
      }
    }
    window.document.addEventListener('keydown', function (ev) {
      ev = ev || window.event
      if (/*document.activeElement == document.body && */ev.shiftKey && ev.keyCode == 67) {
        if (!!eS('.f-close')) {
          eS('.f-close').click()
          srh.blur()
        }
        lr.classList.replace('l-true','l-false')
      }
      if (ev.ctrlKey && ev.keyCode == 32) {
        srh.click()
        srh.focus()
      }
      if (ev.keyCode == 20) {
        if (_stt.laST_t) {
          _stt.laST = !_stt.laST
        }
        else {
          _stt.laST_t = true
          setTimeout(function() {
            _stt.laST_t = false
          }, 8e2)
        }
        if (_stt.laST) {
          cg_out()
        }
      }
      if (ev.keyCode == 40 || ev.keyCode == 38) {
        let l = eS('#box-rst')
        l = l.children[0]
        if (!!eS('.hov')) {
          let e_ = eS('.hov'),
          n
          if (ev.keyCode == 40) {
            if (e_ !== l.lastElementChild) {
              n = e_.nextElementSibling
            } else {
              n = l.firstElementChild
            }
          } else {
            if (e_ !== l.firstElementChild) {
              n = e_.previousElementSibling
            } else {
              n = l.lastElementChild
            }
          }
          l.scrollTop = n.offsetTop - (n.offsetHeight * 1.3)
          n.classList.add('hov')
          e_.classList.remove('hov')
        } else {
          l.children[0].classList.add('hov')
        }
      }
      if (ev.keyCode == 13 && !!eS('.l-true') && !!eS('.hov')) {
        let _a = eS('.hov'),
        lk = _a.children[1].href,
        t = _a.children[0],
        _t = t.textContent
        if (ev.ctrlKey) {
          _t == ''
          ? tab(lk, '_blank')
          : t.click()
        } else {
          _t == ''
          ? tab(lk, '_top')
          : _t == '#'
          ? _a.children[1].click()
          : t.click()
        }
      }
    }, false)
    srh.addEventListener('contextmenu', cg_out)
    srh.addEventListener(
      'keydown',
      function(event) {
        e = event
        k = e.keyCode
        if (k == 190 && !!eS('.l-true') && !!eS('.hov')) {
          e.preventDefault()
          let _a, t
          _a =  eS('.hov')
          t = _a.children[2]
          t.click()
          srh.focus()
        }
        if (k != 40 && k != 38 && k != 17 && k != 13) {
          eS('.hov') && eS('.hov').classList.remove('hov')
        }
        if (k == 27) {
          e.target.blur()
          eS('.f-close').click()
          lr.classList.replace('l-true','l-false')
        }
      }
    )
    srh.addEventListener(
      'input',
      function(e) {
        if (lr.getAttribute('data-out') == 'false' && (e.target.value.startsWith('#') || autoInput)) {
          eS('#hid-sbt').click()
        }
      }
    )
    // srh.addEventListener('blur', function() {})
    eS('.i_s').addEventListener('contextmenu', function() {
      lr.className = 'con-search l-false'
    })
    eS('.i_s').addEventListener('click', function() {
      eS('#hid-sbt').click()
    })
    eS('.i_s').addEventListener('dblclick', function() {
      let ul = eS('#box-rst').children[0]
      if (ul.className == 'v-pth') {
        ul.className = ''
      } else {
        ul.className = 'v-pth'
      }
    })
    setTimeout(function() {
      let install_pwa_btn = document.createElement('a')
      install_pwa_btn.innerHTML = '<img src="./bookmaps/install-icon.svg">'
      install_pwa_btn.classList.add('pwa-install')
      install_pwa_btn.title = 'Install PWA'
      let na = eS('.nav')
      na && na.appendChild(install_pwa_btn)
    })
    let g_S = location.href.split('?')
    if (g_S.length > 1) {
      let v = g_S[1]
      if (v !== '') {
        if (v == 'start') {
          srh.click()
          srh.focus()
        } else if (v == '!' || v == '%21') {
          autoInput = true
        } else {
          if (v.endsWith('--')) {
            v = v.slice(0, -2)
          }
          if (v.startsWith('#') || v.startsWith('%23')) {
            v = v.replace(/-{1}/g,'')
          }
          v = decodeURIComponent(v)
          srh.value = v
          setTimeout(function() {
            eS('#hid-sbt').click()
          }, 2e2)
        }
      }
    }
  }
}, 1e3)

window.addEventListener('beforeinstallprompt', e => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return e.preventDefault()
  } else {
    let btn = document.querySelector('.pwa-install')
    btn.hidden = false
    btn.onclick = _ => e.prompt()
    return e.preventDefault()
  }
})