// CREDITS
// http://showdownjs.com/
// https://sindresorhus.com/github-markdown-css/github-markdown-dark.css
/* ============================ */

window.addEventListener('load', function(){
    let style = document.createElement('style')
    style.innerHTML = ':root{--scroll:rgb(13,17,23)}body{margin:0;padding:26px 18px}textarea{display:none}body{overflow-x:hidden}body::-webkit-scrollbar{width:16px;height:18px}body::-webkit-scrollbar-track{background:var(--scroll)}body::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.2);border-radius:10px;border:4px solid transparent;background-clip:padding-box}body::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.4);border:4px solid transparent;background-clip:padding-box}body::-webkit-scrollbar-thumb:active{background:rgba(255,255,255,0.8);border:4px solid transparent;background-clip:padding-box}body::-webkit-scrollbar-button{background-color:var(--scroll)}body::-webkit-scrollbar-corner{background:var(--scroll)}body::-webkit-scrollbar-button:horizontal:increment{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEXM09b///8OmaLeAAAAAnRSTlP/AOW3MEoAAAAgSURBVHgBY2BEA+QLMGAIMGAIMGAIMBAUIGQoZU5HAwB+ZgDtGYq3fgAAAABJRU5ErkJggg==")}body::-webkit-scrollbar-button:horizontal:increment:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEWdtMT///8YSU3FAAAAAnRSTlP/AOW3MEoAAAAgSURBVHgBY2BEA+QLMGAIMGAIMGAIMBAUIGQoZU5HAwB+ZgDtGYq3fgAAAABJRU5ErkJggg==")}body::-webkit-scrollbar-button:horizontal:decrement{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEXM09b///8OmaLeAAAAAnRSTlP/AOW3MEoAAAAiSURBVHgBY2BEAxQJMKAJMKAJMKAJMOATgIkQMBTBooZfAH56AO2yINTrAAAAAElFTkSuQmCC")}body::-webkit-scrollbar-button:horizontal:decrement:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEWdtMT///8YSU3FAAAAAnRSTlP/AOW3MEoAAAAiSURBVHgBY2BEAxQJMKAJMKAJMKAJMOATgIkQMBTBooZfAH56AO2yINTrAAAAAElFTkSuQmCC")}body::-webkit-scrollbar-button:vertical:increment{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEXM09b///8OmaLeAAAAAnRSTlP/AOW3MEoAAAAfSURBVHgBY2BEA7QTYIAChAoYH6EFxkeYwQBj0MelAH3GAO2C9+AaAAAAAElFTkSuQmCC")}body::-webkit-scrollbar-button:vertical:increment:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEWdtMT///8YSU3FAAAAAnRSTlP/AOW3MEoAAAAfSURBVHgBY2BEA7QTYIAChAoYH6EFxkeYwQBj0MelAH3GAO2C9+AaAAAAAElFTkSuQmCC")}body::-webkit-scrollbar-button:vertical:decrement{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEXM09b///8OmaLeAAAAAnRSTlP/AOW3MEoAAAAgSURBVHgBY2BEAzQVYIAzYHwGGAvOZ4AyIXyECH1cCgB/GgDtpWTgqAAAAABJRU5ErkJggg==")}body::-webkit-scrollbar-button:vertical:decrement:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEWdtMT///8YSU3FAAAAAnRSTlP/AOW3MEoAAAAgSURBVHgBY2BEAzQVYIAzYHwGGAvOZ4AyIXyECH1cCgB/GgDtpWTgqAAAAABJRU5ErkJggg==")}'

    document.head.appendChild(style)

    let css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = 'markdown.css'
    document.head.appendChild(css)

    let convert = document.createElement('script')
    convert.src = 'markdown.js'
    document.head.appendChild(convert)

    document.body.classList.add('markdown-body')
    
    convert.addEventListener('load', function(){
        function $(e){
            return document.querySelector(e)
        }
        var converter = new showdown.Converter()
        var tx = $('textarea').value.replace(/\n/g,'\n').trim().replace(/<!--\n/g,'')
        let nd = document.createElement('div')
        nd.innerHTML = converter.makeHtml(tx)
        nd.classList.add('container')
        document.body.appendChild(nd)
    })
})