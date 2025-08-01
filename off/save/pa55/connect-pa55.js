(function() {
  const box = document.querySelector('.console')
  const input = document.querySelector('.ipt')
  const stored = localStorage.getItem('link-pa55')

  input.value = stored ? '0:' : '00'

  document.querySelector('#send').addEventListener('submit', function(e) {
    e.preventDefault()
    const val = input.value.toLowerCase().trim()

    if (val === '::') {
      localStorage.removeItem('link-pa55')
      box.innerHTML = '<span class="t-yellow">Forgot!</span>'
      setTimeout(() => location.href = location.pathname, 1000)
      return
    }

    if (val === ':' && !('pa55_version' in window)) {
      if (stored && stored.split('-').length === 2) {
        const [sub, app] = stored.split('-')
        const domain = location.host.includes('github') ? `${sub}.web.app` : `${sub}.test`
        const base = `//${domain}/apps/${app}/`
        connect(base, false)
      }
      return
    }

    if (!('pa55_version' in window)) {
      const clean = val.replace(/^:|:$/g, '')
      if ((val.startsWith(':') || val.endsWith(':')) && clean) {
        sessionStorage.setItem('_pendingStore', clean)
      }
      location.hash = clean
    }
  })

  const hash = location.hash.replace('#', '')
  const link = hash || ''

  if (link.split('-').length === 2) {
    const [sub, app] = link.split('-')
    const domain = location.host.includes('github') ? `${sub}.web.app` : `${sub}.test`
    const base = `//${domain}/apps/${app}/`
    connect(base, !!hash)
  }

  function connect(base, tryStore) {
    const container = document.querySelector('.js')
    const timestamp = () => new Date().getTime()

    box.innerHTML = '<span class="t-yellow">Connecting data...</span>'
    const loadScript = (src, onLoad, onError) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = onLoad
      script.onerror = onError
      container.appendChild(script)
    }

    loadScript(base + 'data-pa55.js?' + timestamp(), () => {
      box.innerHTML = '<span class="t-yellow">Connecting program...</span>'
      setTimeout(() => {
        loadScript(base + 'app-pa55.js?' + timestamp(), () => {
          box.innerHTML = '<span class="t-green">Ready!</span>'
          if (tryStore) {
            const pending = sessionStorage.getItem('_pendingStore')
            if (pending) {
              localStorage.setItem('link-pa55', pending)
              sessionStorage.removeItem('_pendingStore')
            }
          }
          setTimeout(() => {
            box.innerHTML = window.initpa55 ? '' : '<span class="t-red">Program not initialized</span>'
          }, 2000)
        }, () => {
          box.innerHTML = '<span class="t-red">No program connect</span>'
        })
      }, 1000)
    }, () => {
      box.innerHTML = '<span class="t-red">No data connect</span>'
    })
  }

  window.addEventListener('hashchange', () => location.reload())
})()
