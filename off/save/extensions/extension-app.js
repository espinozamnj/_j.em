/*
let crx = document.body.children[0].shadowRoot
  .querySelector("cr-view-manager")
  .querySelector("extensions-item-list")
  .shadowRoot.querySelector("#container")
  .querySelector("#no-search-results+.items-container")
  .querySelectorAll("extensions-item")
let gg = [];
crx.forEach(function (x) {
  let d = x.shadowRoot
  let i = {}
  i.src = d.querySelector("#icon").src
  i.name = d.querySelector("#name").innerText
  i.version = d.querySelector("#version").innerText.trim().replaceAll('\n','')
  i.descrp = d.querySelector("#description").innerText
  i.url = x.id
  gg.push(i)
})
console.log(gg)
// gg.forEach(function(x){open(`chrome://extension-icon/${x.url}/48/0`)})
// let n_d='';gg.forEach(function(x){n_d+=x.name+':::'+x.url+'\n'});console.log(n_d)
===================================
let _i = {}
let h = document.querySelector("extensions-manager").shadowRoot.querySelector("extensions-detail-view").shadowRoot.querySelector("#container .page-header")
_i.src = h.innerHTML.match(/"data[^"]+"/)[0].slice(1,-1)
_i.name = h.children[2].innerText.trim()
_i.url = document.URL.match(/=.+$/)[0].slice(1)
_i.version = h.parentElement.children[5].children[1].innerText.trim()
_i.descrp = h.parentElement.children[4].children[1].innerText.trim()
_i.url = document.URL.match(/=.+$/)[0].slice(1)
console.log(_i)
===================================
(function(){
  let re=''
  $$('.result a').forEach(a=>{
    if(a.style.display==''){
      re+='"'+a.querySelector('.title').innerText+'::'+a.href.match(/[^\/]+$/)[0]+'",\n'
    }
  })
  console.log(re)
})()
*/
window.addEventListener(
  'DOMContentLoaded',
  function(){
    function $(qs) {return document.querySelector(qs)}
    function only(value, index, self) {
      return self.indexOf(value) === index;
    }
    for (const tag in tags_crx) {
      let group = tags_crx[tag]
      group.forEach(function(n) {
        let id = n.split('::')[1]
        let it = data_crx.filter(e => e.url == id)[0]
        if (it['tags'] == undefined){
          it.tags = []
        }
        it.tags.push(tag)
      })
    }
    let tags = []
    data_crx.sort(function(a, b) {
      let nameA = a.name.toLowerCase()
      let nameB = b.name.toLowerCase()
      let comparison = 0
      if (nameA > nameB) {
        comparison = 1
      } else if (nameA < nameB) {
        comparison = -1
      }
      return comparison
    })
    data_crx.forEach(function(i) {
        let htmlTAGS = ''
        if (i.tags == undefined){
          i.tags = ['no_tags']
        }
        i.tags.forEach(
          function(tag) {
            tags.push(tag)
            htmlTAGS += /*html*/ `
              <span>#${tag}</span>
            `
          }
        )
        let card = document.createElement('a')
        card.classList.add('item-ext')
        card.href = 'https://chrome.google.com/webstore/detail/' + i.url
        card.title = i.name
        card.innerHTML = /*html*/ `
          <div class="info">
            <div class="logo">
              <img src="${i.src}">
            </div>
            <div class="text">
              <div class="title">${i.name}</div>
              <div class="version">${i.version}</div>
            </div>
          </div>
          <div class="tags">${htmlTAGS}</div>
          <div class="desc">${i.descrp}</div>
        `
        $('.result').appendChild(card)
        card.addEventListener('contextmenu', function(e) {
          if (e.shiftKey) {
            let dataID = i.name + '::' + i.url
            console.log(dataID)
            let ni = document.createElement('input')
            document.body.appendChild(ni)
            ni.value = '"' + dataID + '",'
            ni.select()
            ni.setSelectionRange(0, 99999)
            navigator.clipboard.writeText(ni.value)
            ni.parentNode.removeChild(ni)
          }
        })
    })
    tags = tags.filter(only)
    tags.forEach(
      function(tag) {
        // count
        let count = 0
        data_crx.forEach(
          function(i) {
            i.tags.forEach(
              function(t) {
                if (tag == t) {
                  count++
                }
              }
            )
          }
        )
        let d = {}
        d.d = document.createElement('div')
        d.i = document.createElement('span')
        d.t = document.createElement('span')
        d.c = document.createElement('span')
        d.i.innerText = '#'
        d.t.innerText = tag
        d.c.innerText = count
        d.d.className = 'i-tag'
        d.i.className = 'i-tag-hash'
        d.t.className = 'i-tag-title'
        d.c.className = 'i-tag-count'
        d.d.appendChild(d.i)
        d.d.appendChild(d.t)
        d.d.appendChild(d.c)
        d.d.addEventListener(
          'click',
          function () {
            $('#search').value = '#' + tag
            filter('#' + tag)
          }
        )
        $('.card-tag').appendChild(d.d)
      }
    )
    $('#search').addEventListener(
      'input',
      function(e){
        filter(e.target.value)
      }
    )
    window.addEventListener(
      'scroll',
      function() {
        if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
          $('.header').classList.add("min");
        }
        else {
          $('.header').classList.remove("min");
        }
      }
    )
    function filter(search) {
      let key = search,
        con = $('.result')
        lgt = con.childElementCount
        lag = 0
      while (lgt--) {
        let card = con.children[lgt]
        if (card.textContent.replace(/\n/g,'').trim().toLowerCase().includes(key.toLowerCase())) {
          card.style.display = ''
          lag++
        } else {
          card.style.display = 'none'
        }
      }
      con.setAttribute('data-large', lag)
    }
    filter('.')
  }
)