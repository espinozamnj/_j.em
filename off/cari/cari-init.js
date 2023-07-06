(function() {
  let gt = new Date().getTime()
  gt = '?' + gt
  let css = document.createElement('link')
  css.setAttribute('rel', 'stylesheet')
  css.setAttribute('href', 'cari-custom-app.css' + gt)
  document.head.appendChild(css)
  let errorServerE = document.querySelector('.errorinitmsg')
  let d2s = {
    method: 'POST',
    body: JSON.stringify({})
  }
  fetch(
    __cDe('cari', '716d6d696a2336367c6a697077\
766378747773377e706d716c7b377076366a78747c'))
    .then(function(r) { 
      r.text().then(function(t) {
        if (r.ok) {
          // window.temp_key = JSON.parse(t).key
          window.temp_key = __cDe(
            t.substring(200,220),
            '151d2e35072d1062633e0262660e6120653c3b630e121b38073d60032279651822161a793e1e0d'
          )
          let js = document.createElement('script')
          js.src = 'cari-app.js' + gt
          document.querySelector('.js').appendChild(js)
        } else {
          document.querySelector('.root').classList.add('noinit')
          document.querySelector('.root').classList.remove('loading-dom')
          errorServerE.innerText = 'Error al conectar con el servidor, intente nuevamente en unos minutos'
        }
      })
    }).catch(function(error) {
      document.querySelector('.root').classList.add('noinit')
      document.querySelector('.root').classList.remove('loading-dom')
      errorServerE.innerText = 'Error de conexión, intente más tarde'
      console.error(error)
    })
})()

/*
  outline: 4px solid #060b5383;
  z-index: 2;
  border-radius: 4px;  
  https://izitoast.marcelodolza.com/#Methods
  https://getbootstrap.com/docs/5.3/examples/modals/?
*/
/*
main.f.alertParmt = function(msgAlert) {
  return {
    position: 'topCenter',
    message: msgAlert,
    timeout: 5e3,
    transitionInMobile: 'bounceInLeft',
    transitionIn: 'bounceInLeft',
    transitionOutMobile: 'fadeInRight',
    transitionOut: 'fadeInRight'
  }
}
*/