// console.log(yts.myplay)

for (const tree in yts) {
    let d_tit = document.createElement('div')
    d_tit.innerText = tree
    d_tit.addEventListener('click', function() {
        let l_lis = document.getElementById('lists').childNodes
        for (let i = 0; i < l_lis.length; i++) {
            let lis = l_lis[i]
            if (lis.getAttribute('data-fd') == tree) {
                lis.style.display = 'block'
            } else {
                lis.style.display = 'none'
            }
        }
    })
    document.getElementById('lt-name').appendChild(d_tit)
    const fold = yts[tree]
    let d_trr = document.createElement('div')
    d_trr.classList.add('d_trr')
    d_trr.setAttribute('data-fd', tree)
    d_trr.style.display = 'none'
    document.getElementById('lists').appendChild(d_trr)
    for (const canal in fold) {
        const tipo = fold[canal];
        let grup_type = document.createElement('div')
        grup_type.className = 'group-type'
        d_trr.appendChild(grup_type)
        let tt = document.createElement('div')
        tt.className = 'group-name'
        tt.innerText = tipo['folder']
        grup_type.appendChild(tt)
        let g_div = document.createElement('div')
        g_div.classList.add('group-list')
        grup_type.appendChild(g_div)
        for (const gchns in tipo['list']) {
            const ichn = tipo['list'][gchns];
            let a_chanel = document.createElement('p')
            a_chanel.innerText = ichn.name
            if (ichn.type == 'user') {
                a_chanel.addEventListener('click', function() {
                    menu.setAttribute('data-src', 'https://www.youtube.com/channel/' + ichn.url + '/')
                    if (document.getElementById('active').checked) {
                        let nw_v = 'https://www.youtube.com/channel/' + ichn.url + '/'
                        open(nw_v)
                    } else {
                        document.getElementById('emb').src =
                            'https://www.youtube.com/subscribe_embed?usegapi=1&channelid=' + ichn.url + '&layout=full&count=default'
                    }
                })
            } else {
                a_chanel.addEventListener('click', function() {
                    menu.setAttribute('data-src', 'https://www.youtube.com/playlist?list=PL' + ichn.url)
                    if (document.getElementById('active').checked) {
                        let nw_v = 'https://www.youtube.com/playlist?list=PL' + ichn.url
                        open(nw_v)
                    } else {
                        // document.getElementById('emb').src = 'https://www.youtube.com/embed/?list=PL' + ichn.url
                        loadPL(ichn.url)
                    }
                })
            }
            g_div.appendChild(a_chanel)
                // console.log(JSON.stringify(ichn))
        }
    }
}