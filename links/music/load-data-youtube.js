var music_data = {
    links: [
        ['//etoski.epizy.com/play/', 'Play! - Epizy'],
        ['https://music.youtube.com/channel/UCSFMRGTyAcCHgE2Fp0xsD_A', 'Yuotube Music'],
        ['https://www.youtube.com/channel/UCSFMRGTyAcCHgE2Fp0xsD_A', 'YouTube Channel'],
        ['../../youtu-be.html', 'YouTube Playlist'],
        ['https://www.deezer.com/es/profile/4377442542/', 'Nick - Deezer']
    ],
    lists: [
        ['gvFg6oN_aUlX_AqpkiajkTs1Pom_rpl3', 'favorite'],
        ['gvFg6oN_aUk604Ld1-IXWLtYZUSexDPM', 'all'],
        ['gvFg6oN_aUmvTH9O3VYzbIh9q0NlZcvT', 'russian'],
        ['gvFg6oN_aUmHhXHrVm-dyVXw_PFFoPTC', 'motivo'],
    ],
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
    
    let app_js = document.createElement('script')
    app_js.src = 'music-locked.js'
    p.appendChild(app_js)
})()