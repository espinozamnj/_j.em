(function() {
    let xw = 'https://espmnj.web.app/apps/links-lib/'
    let ssrc = [
        'https://espinozamnj.github.io/nihan/dg-data',
        '@app/all-apps',
        '@off/save/js/t-url',
        'finds',
        xw + 'book-txt',
        'tech',
        'export_favs',
        'app-map',
        'app-s-find',
        'app-link',
        location.origin + '/_cdn_/getlogin',
    ]
    function new_date() {
        return new Date().getTime()
    }
    fetch(xw + 'bks-version.json?' + new_date()).then(
        function (response) {
            response.text().then(function(query){
                let localData = 'last-version-links'
                let json = JSON.parse(query)
                let vsn = json['v']
                let require_reload = false
                if (localStorage[localData] == undefined || localStorage[localData] != vsn.toString()) {
                    localStorage[localData] = vsn
                    require_reload = true
                    setTimeout(function() {
                        let alrt = document.createElement('div')
                        alrt.innerText = 'cache update'
                        alrt.classList.add('cache-alert')
                        document.querySelector('.root').appendChild(alrt)
                        alrt.classList.add('alert-view')
                        setTimeout(function(){
                            alrt.parentElement.removeChild(alrt)
                        }, 3e3)
                    }, 1e3)
                }
                let s, js = typeof(rload) == 'undefined'
                if (js) {
                    s = document.getElementById('scripter')
                } else {
                    s = document.getElementsByClassName('list')[0]
                }
                for (let i = 0; i < ssrc.length; i++) {
                    let e, r = ssrc[i], sr
                    js ? e = document.createElement('script') : e = document.createElement('a')
                    // dir_project
                    r = r.replace('@', location.origin + '/_j.em/')
                    r.startsWith('http') ? sr = r + '.js' : sr = 'bookmaps/' + r + '.js'
                    require_reload ? sr = sr + '?' + new_date() : sr = sr
                    if (js) {
                        e.setAttribute('src', sr)
                    } else {
                        e.setAttribute('href', sr)
                        e.innerText = sr
                    }
                    s.appendChild(e)
                }
            })
        }
    ).catch(function(error) {
        console.log('fetch request failed:' + error.message);
    })
})()