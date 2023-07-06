(function() {
  let loc = location.hash.replace('#', '')
  let box = document.querySelector('.console')
  if (loc != '' && loc.split('-').length == 2) {
    let dm = loc.split('-')
    let js = {
      tths: function() {return new Date().getTime()},
      cont: document.querySelector('.js'),
      strg: `//${dm[0]}.test/public/apps/${dm[1]}/`,
      csjs: function() {return document.createElement('script')}
    }
    if (location.host.includes('github')) {
      js.strg = `//${dm[0]}.web.app/apps/${dm[1]}/`
    }
    if (dm[0] == ('//')) {
      js.strg = dm[1]
    }

    box.innerHTML = '<span class="t-yellow">Connecting data...</span>'
    let dat = js.csjs()
    dat.setAttribute('src', js.strg + 'data-pa55.js?' + js.tths())
    
    dat.addEventListener('error', function() {
      box.innerHTML = '<span class="t-red">No data connect</span>'
    })
    dat.addEventListener('load', function() {
      box.innerHTML = '<span class="t-yellow">Connecting program...</span>'
      setTimeout(function() {
        let japp = js.csjs()
        japp.setAttribute('src', js.strg + 'app-pa55.js?' + js.tths())
        japp.addEventListener('error', function() {
          box.innerHTML = '<span class="t-red">No program connect</span>'
        })
        japp.addEventListener('load', function() {
          box.innerHTML = '<span class="t-green">Ready!</span>'
          setTimeout(function() {
            if (!!window.initpa55) {
              box.innerHTML = ''
            } else {
              box.innerHTML = '<span class="t-red">Program not initialized</span>'
            }
          }, 2e3)
        })
        js.cont.appendChild(japp)
      }, 1e3)
    })
    js.cont.appendChild(dat)
  } else {
    document.querySelector('.ipt').value = '00'
    document.querySelector('#send').addEventListener('submit', function(e) {
      e.preventDefault()
      location.hash = document.querySelector('.ipt').value
    })
  }
  window.addEventListener('hashchange', function() {
    location.reload()
  })
})()