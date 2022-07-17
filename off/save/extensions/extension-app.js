/*
let crx = document.body.children[0].shadowRoot
  .querySelector("cr-view-manager")
  .querySelector("extensions-item-list")
  .shadowRoot.querySelector("#container")
  .querySelector(".items-container")
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
    function $(he) {return document.querySelector(he)}

    function only(value, index, self) {
      return self.indexOf(value) === index;
    }
    
    for (const tag in tags_crx){
      let group = tags_crx[tag]
      group.forEach(
        function(n){
        let id = n.split('::')[1]
        let it = data_crx.filter(e => e.url == id)[0]
        if (it['tags'] == undefined){
          it.tags = []
        }
        it.tags.push(tag)
      }
    )
    }
    let tags = []
    data_crx.forEach(
      function(i){
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
        let card = /*html*/ `
          <a class="item-ext" href="https://chrome.google.com/webstore/detail/${i.url}" title="${i.name}">
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
          </a>
        `
        $('.result').innerHTML += card
      }
    )
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