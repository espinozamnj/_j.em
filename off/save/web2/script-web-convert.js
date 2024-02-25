window.addEventListener('load', function() {
  let apik = new URL(location.href).searchParams.get('api')
  let $ = (e) => {return document.querySelector(e)}

  function isURL(url) {
    let regex = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/.*)?$', 'i')
    return regex.test(url)
  }
  function getDomain(url) {
    let rex = /:\/\/(.[^/]+)/
    let mtc = url.match(rex)
    let out = false
    if (mtc.length > 0) {
      out = mtc[1]
    }
    return out
  }
  HTMLElement.prototype.ade = function(tag){
    let n = document.createElement(tag)
    this.appendChild(n)
    return n
  }
  HTMLElement.prototype.clk = function(fn){
    this.addEventListener('click', function(){fn()})
  }
  function iptURL(val) {
    let inp = $('#url')
    if (typeof val == 'string') {
      inp.value = val
    } else {
      return inp.value
    }
  }
  let validURL = function() {
    return isURL(iptURL())
  }
  let out = $('.out')
  $('.go').addEventListener('submit', function(e) {
    e.preventDefault()
    let box = out.parentNode
    if (validURL()) {
      let site = {
        uri: iptURL()
      }
      site.dom = getDomain(site.uri)
      site.url = new URL(site.uri)
      console.log(site)
      out.innerHTML = ''
      let main = out.ade('div')
      main.classList.add('main');
      (function() {
        let list_get_favicon = 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=%d&size=64'
        let pic = main.ade('div')
        pic.classList.add('picture')
        pic.ade('img').src = list_get_favicon.replace('%d', site.url.origin)
        main.ade('p').innerText = site.dom
        if (1 == 1) {
          let getMIN = main.ade('div')
          getMIN.classList.add('gets')
          let getPDF = getMIN.ade('a')
          let getJPG = getMIN.ade('a')
          getPDF.innerText = 'PDF'
          getJPG.innerText = 'JPG'
          if (apik) {
            ([getPDF, getJPG]).forEach(function(save) {
              save.clk(function() {
                let dev = main.ade('div')
                dev.classList.add('response')
                dev.innerHTML = '<strong>Loading...</strong>'
                let acc = main.ade('div')
                acc.classList.add('thumbnail')
                let req = '', test = !true
                if (test) {
                  req = '/info.json'
                } else {
                  req = 'https://v2.convertapi.com/convert/web/to/%2?Secret=%k&Url=%s&StoreFile=true'
                  req = req.replace('%s', site.url).replace('%2', save.innerText.toLowerCase()).replace('%k', apik)
                }
                fetch(req).then(
                  function(response) {
                    response.text().then(function(recived) {
                      try {
                        let data = JSON.parse(recived)
                        let newdata = JSON.parse(recived)
                        let file = data['Files'][0]['Url']
                        if (file.startsWith('http')) {
                          let btn_acc = acc.ade('a')
                          btn_acc.classList.add('access')
                          btn_acc.href = file
                          btn_acc.target = '_blank'
                          btn_acc.innerText = save.innerText + ' file'
                        } else {
                          newdata['Files'][0]['Url'] = '...too large...'
                          let img = acc.ade('img')
                          img.src = "data:image/jpg;base64," + file
                        }
                        dev.innerHTML = ''
                        dev.innerHTML = JSON.stringify(newdata, null, 2)
                      } catch (error) {
                        dev.innerHTML = '<div class="error"><i class="fa-solid fa-bug"></i><span>ERROR: Fail parse JSON</span></div>'
                      }
                    })
                  }
                ).catch(function() {
                  dev.innerHTML = '<div class="error"><i class="fa-solid fa-circle-exclamation"></i><span>ERROR: Could not load JSON</span></div>'
                })
              })
            })
          } else {
            ([getPDF, getJPG]).forEach(function(save) {
              save.clk(function() {
                alert('Require API key as URL param')
              })
            })
          }
        }
      })()
      let child = out.ade('div')
      for (const enlaces in links) {
        let items = links[enlaces]
        let cont = child.ade('div')
        cont.classList.add('cont')
        let name = cont.ade('p')
        name.classList.add('name')
        name.ade('span').innerText = enlaces.toUpperCase()
        let btns = cont.ade('div')
        btns.classList.add('enlaces')
        items.forEach(function(enlace){
          let btn = btns.ade('a')
          let href = enlace['url']
          function enc(s) {
            return encodeURIComponent(s)
          }
          let ur = site.url
          href = href
            .replace('%Ns', ur.href)
            .replace('%Es', enc(ur.href))
            .replace('%Nd', ur.hostname)
            .replace('%Ed', enc(ur.hostname))
            .replace('%No', ur.origin)
            .replace('%Eo', enc(ur.origin))
            .replace('%Np', ur.origin + ur.pathname)
            .replace('%Ep', enc(ur.origin + ur.pathname))
          btn.href = href
          btn.ade('strong').innerText = enlace['name']
          btn.ade('span').innerText = enlace['service']

        })
      }
      box.classList.add('check')
      box.classList.remove('error')
    } else {
      box.classList.remove('check')
      box.classList.add('error')
    }
  })
  let links = {
    'pdf': [
      {'name': 'PDF', 'service': 'PrintFriendly', 'url': 'https://www.printfriendly.com/print/?source=site&url=%s'},  
    ],
    'images': [
      {'name':"Screenshot", "service": "Shot",'url':'https://mini.s-shot.ru/1366x890/800/jpeg/?%Es'},
      {'name':"Capture", "service": "Raindrop",'url':'https://rdl.ink/render/%Ep?mode=fillmax&fill=solid&width=224&ar=16:9&dpr=2'},
      {'name':"Thumbnail", "service": "Miniature",'url':'https://api.miniature.io/?url=%Nd'},
      {'name':"Shots", "service": "WordPress",'url':'https://s.wordpress.com/mshots/v1/%No'},
    ],
    'check': [
      {"name":"Validator", "service": "Html Checker","url":"https://validator.w3.org/nu/?doc=%Es"},
      {"name":"W3C", "service": "Link Checker","url":"https://validator.w3.org/checklink?uri=%Es&hide_type=all&depth=&check=Check"},
      {"name":"Check CSS", "service": "Jigsaw","url":"https://jigsaw.w3.org/css-validator/validator?uri=%Es&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=es"},
    ],
    'info': [
      {"name":"Split URL", "service": "Locked","url":"./../url/?url=%Es"},
      {'name':"Report of safe", "service": "Google",'url':'https://transparencyreport.google.com/safe-browsing/search?url=%Nd'},
      {'name':"MetaTags", "service": "HeyMeta",'url':'https://www.heymeta.com/url/%Ns'},
      {"name":"Reputation", "service": "TrustScam","url":"https://trustscam.es/%Nd"},
      {"name":"Reports", "service": "AdGuard","url":"https://reports.adguard.com/es/%Nd/report.html"},
    ]
  }
  let search = new URL(location.href).searchParams.get('url')
  if (search) {
    iptURL(search)
    setTimeout(function() {
      $('#gen').click()
    }, 2e2)
  }
})