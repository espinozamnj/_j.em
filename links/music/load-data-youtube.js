var music_data = {
    links: [
        ['https://music.youtube.com/channel/UCSFMRGTyAcCHgE2Fp0xsD_A', 'YouTube Music'],
        ['https://www.youtube.com/channel/UCSFMRGTyAcCHgE2Fp0xsD_A', 'YouTube Channel'],
        ['../../youtu-be.html', 'YouTube Playlist'],
        ['//etoski.epizy.com/play/', 'Play! - Epizy'],
        ['https://www.deezer.com/es/profile/4377442542/', 'Nick - Deezer']
    ],
    lists: [],
    mode_next: 1,
    shuffle: false,
};
var player = []
var youtubeReady = false
function onYouTubeIframeAPIReady() {
    youtubeReady = true
}
function isActivePlayer() {
    return (typeof (player.i) !== 'undefined')
}
(function(){
    let p = document.getElementsByClassName('sjs')[0]
    let iframe_api = document.createElement('script')
    iframe_api.src = 'https://www.youtube.com/iframe_api'
    p.appendChild(iframe_api)
    let cop = __cDe(window.hash_app, '10182b30022813170b1805686116611f22651c103903267c683d16370215183f16646066382110')
    let URLinfo = 'https://youtube.googleapis.com/youtube/v3/playlists?channelId='
    URLinfo += 'UCSFMRGTyAcCHgE2Fp0xsD_A'
    URLinfo += '&part=snippet&maxResults=50&key='
    URLinfo += cop
    fetch(URLinfo).then((response) => {
        response.text().then((responseText) => {
            let data = JSON.parse(responseText)
            data.items.forEach((item) => {
                music_data.lists.push([
                    (item.id).slice(2),
                    item.snippet.title.split(' - ')[1].replace(' RARQZ', '')
                ])
            })
            let app_js = document.createElement('script')
            app_js.src = 'music-locked.js'
            p.appendChild(app_js)
        })
    }).catch(() => {
        document.write('error at fetch');
    })
})()