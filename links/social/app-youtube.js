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
            let a_chanel_name = document.createElement('span')
            let a_chanel_icon = document.createElement('a')
            a_chanel_icon.setAttribute('target', '_blank')
            a_chanel_name.innerText = ichn.name
            a_chanel_icon.innerHTML = '<svg height="1em" viewBox="0 0 512 512"><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>'
            a_chanel.appendChild(a_chanel_name)
            a_chanel.appendChild(a_chanel_icon)
            if (ichn.type == 'user') {
                let linkEnd = `https://www.youtube.com/channel/${ichn.url}`
                a_chanel_icon.href = linkEnd
                a_chanel_name.addEventListener('click', function() {
                    if (document.getElementById('active').checked) {
                        open(linkEnd)
                    } else {
                        document.getElementById('emb').src =
                            'https://www.youtube.com/subscribe_embed?usegapi=1&channelid=' + ichn.url + '&layout=full&count=default'
                    }
                })
            } else {
                let linkEnd = `https://www.youtube.com/playlist?list=PL${ichn.url}`
                a_chanel_icon.href = linkEnd
                a_chanel_name.addEventListener('click', function() {
                    if (document.getElementById('active').checked) {
                        open(linkEnd)
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