window.addEventListener(
    'DOMContentLoaded',
    function(){
        function $(he) {return document.querySelector(he)}

        let order = []
        words.forEach(function(w){
            order.push(w.name)
        })
        order = order.sort()
        let new_words = []
        order.forEach(function(p){
            let g = words.filter(w => w.name === p)
            new_words.push(g[0])
        })
        words = new_words
        
        function only(value, index, self) {
            return self.indexOf(value) === index;
        }
        let tags = []
        words.forEach(
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
                    <a class="item-ext" href="https://goo.gl/search/define:${i.name}" title="${i.name}">
                        <div class="info">
                            <div class="text">
                                <div class="title">${i.name}</div>
                            </div>
                        </div>
                        <div class="tags">${htmlTAGS}</div>
                        <div class="desc">${i.descrp.replaceAll("@","<br>")}</div>
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
                words.forEach(
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
                let txtc = card.textContent
                    .replace(/\n/g,'')
                    .replace(/á/g,'a')
                    .replace(/é/g,'e')
                    .replace(/í/g,'i')
                    .replace(/ó/g,'o')
                    .replace(/ú/g,'u')
                if (txtc.trim().toLowerCase().includes(key.toLowerCase())) {
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