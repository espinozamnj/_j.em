(function(){
  let $$ = (e) => {return document.querySelectorAll(e)}
  let $ = (e) => {return $$(e)[0]}

  setTimeout(function(){
    let load = $('.loader')
    load.parentNode.removeChild(load)
  }, 1e3 / 8)

  music_data.links.forEach(function(link) {
    let a = document.createElement('a')
    a.target = '_blank'
    a.href = link[0]
    a.innerText = link[1]
    a.classList.add('link')
    $('.panels .links').appendChild(a)
  })
  function moveAuto () {
    if (music_data.mode_next == 1) {
      player.nextVideo()
    } else {
      player.previousVideo()
    }
  }
  music_data.lists.forEach(function(link) {
    let a = document.createElement('div')
    a.innerText = link[1]
    a.classList.add('play-list')
    a.addEventListener('click', function() {
      let embed = $('.yt-iframe'), id_element = 'player-yt'
      let emd = embed.parentNode
      embed.innerHTML = '<div id="' + id_element + '"></div>'
      player = new YT.Player(id_element, {
        height: emd.offsetHeight,
        width: emd.offsetWidth,
        host: 'https://www.youtube-nocookie.com',
        'suggestedQuality': 'small',
        'playerVars': {
          'listType': 'playlist',
          'list': 'PL' + link[0],
          'autoplay': 0,
          'iv_load_policy': 3,
          'cc_load_policy': 0,
          'fs': 1,
          'loop': true,
          'hl': 'es',
          'controls': 1,
          'color': 'white'
        },
        events: {
          'onReady': function () {
            $('[data-panel="playlist"').click()
            player.setPlaybackQuality = 'small'
            let ctr = $('.controls')
            ctr.classList.remove('disabled')
            setTimeout(function() {
              let large = player.getPlaylist().length
              let order = Math.floor(Math.random() * (large - 0 + 1) + 0)
              player.playVideoAt(order)
            }, 5e2)
          },
          'onError': function() {
            setTimeout(function() {
              moveAuto()
            }, 3e3)
          },
          'onStateChange':function () {
            let bg = $('.bg-image'), thumbnailURL = 'https://img.youtube.com/vi/@/0.jpg'
            thumbnailURL = thumbnailURL.replace('@', player.getVideoData()['video_id'])
            bg.style.backgroundImage = 'url("' + thumbnailURL + '")'
            setTimeout(function() {
              $('[data-action="volumen"]').value = Math.round(player.getVolume()) 
            }, 1e3)
            setTimeout(function(){
              if (player.getDuration() > 8 * 60) {
                moveAuto()
              }
            }, 2e3)
          }
        }
      })
    })
    $('.panels .playlist').appendChild(a)
  })
  function checkProperties() {
    if (isActivePlayer()) {
      if (player.i == null) {
        $('.bg-image').style.backgroundImage = ''
      } else {
        $('[data-action=volumen]').value = player.getVolume()
        if (player.getPlayerState() == 2) {
          $('[data-action=state]').classList.add('var')
        } else {
          $('[data-action=state]').classList.remove('var')
        }
      }
    }
  }
  $('.controls').addEventListener('mouseenter', function(){checkProperties()})
  $('[data-panel=controls]').parentElement.addEventListener('click', function(){checkProperties()})
  $$('.header .buttons a').forEach(function(button) {
    let panel = button.firstChild.getAttribute('data-panel'),
      classShow = 'show'
    button.addEventListener('click', function() {
      let panels = $('.panels').children, i = 0
      let last_exist = $$('.panels .'+ classShow + ':not(.' + panel + ')').length
      while (i < panels.length) {
        let child = panels[i]
        if (child.classList.contains(panel)) {
          function toggle(wait = false) {
            let fn = () => {
              child.classList.toggle(classShow)
            }
            if (wait) {
              setTimeout(function(){ fn() }, 400)
            } else {
              fn()
            }
          }
          last_exist > 0 ? toggle(true) : toggle()
        } else {
          child.classList.remove(classShow)
        }
        i++
      }
    })
  })
  
  let actions = [
    {
      evt: 'state', type: 'click',
      fnt: function(dom) {
        if (isActivePlayer()) {
          let state = player.getPlayerState()
          if (state == 1) {
            player.pauseVideo()
            dom.classList.add('var')
          } else {
            player.playVideo()
            dom.classList.remove('var')
          }
        }
      }
    },
    {
      evt: 'state', type: 'dblclick',
      fnt: function() {
        if (isActivePlayer()) {
          let ID_url = player.getVideoData()['video_id']
          open('https://song.link/y/' + ID_url)
        }
      }
    },
    {
      evt: 'prev', type: 'click',
      fnt: function() {
        if (isActivePlayer()) {
          player.previousVideo()
          music_data.mode_next = 0
        }
      }
    },
    {
      evt: 'next', type: 'click',
      fnt: function() {
        if (isActivePlayer()) {
          player.nextVideo()
          music_data.mode_next = 1
        }
      }
    },
    {
      evt: 'fullscreen', type: 'click',
      fnt: function(dom) {
        if (isActivePlayer()) {
          if (document.fullscreenElement == null) {
            document.documentElement.requestFullscreen()
            dom.classList.add('var')
          } else {
            document.exitFullscreen()
            dom.classList.remove('var')            
          }
        }
      }
    },
    {
      evt: 'random', type: 'click',
      fnt: function(dom) {
        if (isActivePlayer()) {
          if (music_data.shuffle) {
            player.setShuffle({'shufflePlaylist' : false})
            dom.classList.remove('var')
          } else {
            player.setShuffle({'shufflePlaylist' : true})
            dom.classList.add('var')
          }
          music_data.shuffle = !music_data.shuffle
        }
      }
    },
    {
      evt: 'reset', type: 'click',
      fnt: function() {
        if (isActivePlayer()) {
          player.seekTo(0)
        }
      }
    },
    {
      evt: 'open-link', type: 'click',
      fnt: function() {
        if (isActivePlayer()){
          let url = player.getVideoUrl()
          // open('https://www.youtube-nocookie.com/embed/' + )
          open(url)
        }
      }
    },
    {
      evt: 'muted', type: 'click',
      fnt: function(dom) {
        if (isActivePlayer()){
          let muted = player.isMuted()
          if (muted) {
            player.unMute()
            dom.classList.remove('var')
          } else {
            player.mute()
            dom.classList.add('var')
          }
        }
      }
    },
    {
      evt: 'volumen', type: 'input',
      fnt: function(dom) {
        if (isActivePlayer()){
          player.setVolume(dom.value)
        }
      }
    },
    {
      evt: 'stop', type: 'click',
      fnt: function() {
        if (isActivePlayer()){
          player.destroy()
        }
      }
    },
    {
      evt: 'close-controls', type: 'click',
      fnt: function() {
        $('[data-panel="controls"]').click()
      }
    },
  ]
  actions.forEach(function(action) {
    let query = '.controls [data-action="' + action.evt + '"]'
    let btn = $(query)
    btn.addEventListener(action.type, function(){
      action.fnt(btn)
    })
  })
  $('[data-panel="playlist"').click()
})()