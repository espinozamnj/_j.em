document.getElementsByTagName('body')[0].classList.add('mn-sh')
let menuB = document.getElementById('menu')
menuB.addEventListener('click', function() {
    if (document.body.className == 'mn-hd') {
        document.body.classList.replace('mn-hd', 'mn-sh')
    } else {
        document.body.classList.replace('mn-sh', 'mn-hd')
    }
})
menuB.addEventListener('dblclick', function() {
    let du = menuB.getAttribute('data-src')
    if ("" != du) {
        open(du)
    }
})

Object.size = function(obj) {
    var size = 0,
        key
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++
    }
    return size
}

function infoChannel(id) {
    let cid = id,
        xhr = new XMLHttpRequest(),
        get = {
            'host': 'https://youtube.googleapis.com/youtube/v3/playlists?',
            'a': 'channelId=',
            'b': '&part=snippet',
            'c': '&maxResults=50',
            'd': '&key=' + __cDe(window.hash_app, '4b43706b5973484c50435e333a4d3a44793e474b62587d2733664d6c594e43644d3f3b3d637a4b')
        },
        url = get.host + get.a + cid + get.b + get.c + get.d
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText)
            // console.log(myArr)
            myArr['items'].forEach(function(playlist){
                let newPlaylist = {}
                newPlaylist['url'] = playlist.id.substring(2)
                // console.log(playlist.snippet.title)
                let name = playlist.snippet.title.split(' - ')[1]
                newPlaylist['name'] = name
                newPlaylist['type'] = 'list'
                let category = playlist.snippet.title.split(' - ')[0]
                let groupList = yts.myplay.filter(element => element.folder.toString().toLowerCase() == category.toLowerCase())
                if (groupList.length == 0) {
                    let newGroup = {
                        'folder': category,
                        'list': [
                            newPlaylist
                        ]
                    }
                    yts.myplay.push(newGroup)
                } else {
                    groupList[0]['list'].push(newPlaylist)
                }

            })
            setTimeout(function () {
                isListLoad++
                if (isListLoad == Object.size(channels)) {
                    let script = document.createElement('script')
                    script.src = 'social/app-youtube.js'
                    document.body.appendChild(script)
                }
            }, 5e2)
        }
    }
    xhr.open('GET', url, true)
    xhr.send()
}
let isListLoad = 0
for (const chan in channels) {
    infoChannel(channels[chan])
}