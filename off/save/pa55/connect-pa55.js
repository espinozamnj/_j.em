(function() {
  let box = document.querySelector('.console')
  let input = document.querySelector('.ipt')
  let stored = localStorage.getItem('link-pa55')

  if (stored) {
    input.value = '0:'
  } else {
    input.value = '00'
  }

  document.querySelector('#send').addEventListener('submit', function(e) {
    e.preventDefault()
    let val = input.value.toLowerCase().trim()

    if (val === '::') {
      localStorage.removeItem('link')
      box.innerHTML = '<span class="t-yellow">Forgot!</span>'
      setTimeout(() => location.href = location.pathname, 1000)
      return
    }

    if (val === '0:' && stored) {
      connect(stored, false)
    } else {
      let useForStorage = val
      let clean = val.replace(/^:|:$/g, '')
      location.hash = clean
      if ((val.startsWith(':') || val.endsWith(':')) && clean) {
        sessionStorage.setItem('_pendingStore', useForStorage)
      }
    }
  })

  let loc = location.hash.replace('#', '')
  if (loc && loc.split('-').length == 2) {
    let dm = loc.split('-')
    let base = `//${dm[0]}.test/public/apps/${dm[1]}/`
    if (location.host.includes('github')) {
      base = `//${dm[0]}.web.app/apps/${dm[1]}/`
    }
    connect(base, true)
  }

  function connect(base, tryStore) {
    let js = {
      tths: function() { return new Date().getTime() },
      cont: document.querySelector('.js'),
      strg: base,
      csjs: function() { return document.createElement('script') }
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
          if (tryStore) {
            let pending = sessionStorage.getItem('_pendingStore')
            if (pending) {
              localStorage.setItem('link', pending)
              sessionStorage.removeItem('_pendingStore')
            }
          }
          setTimeout(function() {
            if (!!window.initpa55) {
              box.innerHTML = ''
            } else {
              box.innerHTML = '<span class="t-red">Program not initialized</span>'
            }
          }, 2000)
        })
        js.cont.appendChild(japp)
      }, 1000)
    })
    js.cont.appendChild(dat)
  }

  window.addEventListener('hashchange', function() {
    location.reload()
  })
})()
