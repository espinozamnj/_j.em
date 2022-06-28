var tag = document.createElement('script')

tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player
var youtubeReady = false
function onYouTubeIframeAPIReady() {
    youtubeReady = true
}

function loadPL(idPL) {
    if (youtubeReady) {
        document.getElementsByTagName('main')[0].innerHTML = '<div id="player"></div>'
        player = new YT.Player('player', {
            height: window.innerHeight,
            width: window.innerWidth,
            // videoId: 'M7lc1UVf-VE',
            suggestedQuality: 'default',
            playerVars: {
                listType: 'playlist',
                list: 'PL' + idPL,
                'autohide': 0,
                'cc_load_policy': 0,
                'color': 'white',
                'autoplay': 0,
                'fs': 1,
                'hl': 'es',
                'controls': 1,
                'disablekb': 0,
                'iv_load_policy': 3,
                'modestbranding': 0,
                'rel': 0,
                'showinfo': 0,
                'start': 1
            },
            events: {
                // 'onReady': onPlayerReady,
                // 'onStateChange': onPlayerStateChange
            }
        })
    }
}