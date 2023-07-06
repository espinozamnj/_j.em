let h = []
window.onload = function() {
    let csl =  qS('.con')
    function ce(html, where) {
        let e = document.createElement(html)
        where.appendChild(e)
        return e
    }
    let main = ce('div', csl)
    _txt.forEach(
        function(a){
            h.push(a.path)
        }
    )
    h = h.filter((v, i, a) => a.indexOf(v) === i)
    // h = h.sort()
    // console.log(h)
    h.forEach(function(carpet){
        let folder = ce('div', main)
        folder.classList.add('folder')
        let name = ce('div', folder)
        name.classList.add('title')
        name.innerHTML = carpet.match(/.+[\/]/)[0] + '<b>' + carpet.match(/[^\/]+$/)[0] + '</b>'
        let content = ce('div', folder)
        content.classList.add('hrefs')
        let pL = carpet.split('/').length
        folder.style.paddingLeft = (pL * 8)  - 2 + 'px'

        let re = _txt.filter(a=> a.path.toLocaleLowerCase() === carpet.toLocaleLowerCase())
        re.forEach(function(k){
            let href = ce('a', content)
            href.href = k.url
            href.innerText = k.name
            href.setAttribute('title', k.name)
        })
    })
}