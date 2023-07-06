var emb = function() {}
window.addEventListener('load',function(){
    function d(x){
        let i = document.getElementById(x)
        return i
    }
    emb = function(x) {
        //musica
        if (x == 'm') {
            document.title = 'MyMusic'
            d('mus').removeAttribute('panel')
            d('mus').removeAttribute('style')
            d('mus').style.zIndex = '10'
            d('fir').style.zIndex = '0'
            d('not').style.zIndex = '0'
            d('resizeDiv').style.zIndex = '0'
        }
        //notas
        else if (x == 'n') {
            document.title = 'MyNotes'
            d('fir').style.zIndex = '0'
            d('mus').style.zIndex = '0'
            d('not').style.zIndex = '10'
            d('resizeDiv').style.zIndex = '0'
        }
        //video
        else if (x == 'v') {
            document.title = 'MyVideo'
            // d('fir').style.zIndex = '0'
            // d('mus').style.zIndex = '0'
            // d('not').style.zIndex = '0'
            d('resizeDiv').style.zIndex = '11'
            d('resizeDiv').style.paddingTop = '15px'
        }
        else if (x == 'd') {
            document.title = 'MyPlan'
            d('fir').style.zIndex = '10'
            d('mus').style.zIndex = '0'
            d('not').style.zIndex = '0'
            d('resizeDiv').style.zIndex = '0'
        }
        //full video
        else if (x == 'f') {
            let dv = d('resizeDiv')
            if(dv.getAttribute('data-s') !== null){
                dv.style.cssText = dv.getAttribute('data-s')
                dv.removeAttribute('data-s')
                dv.style.paddingTop = '15px'
            }
            else {
                let s = dv.getAttribute('style')
                dv.setAttribute('data-s',s)
                dv.setAttribute('style','top:4vh;left:4vw;height:92vh;width:92vw;position:relative;z-index:12;padding-top:0;')
            }
        }
        //reset video
        else if (x=='r') {
            let v = d('vid')
            let s = v.src
            v.src = s
        }
        //musica panel
        else if (x == 'p') {
            //abrir
            if (d('mus').getAttribute('panel') == 'false' || d('mus').getAttribute('panel') == null ) {
                d('mus').style.width = '290px'
                d('nav').style.right = '290px'
                d('mus').style.zIndex = '11'
                d('mus').setAttribute('panel', 'true')
            }
            //cerrar
            else {
                d('mus').setAttribute('panel', 'false')
                d('nav').style.display = ''
                d('nav').style.right = ''
                d('mus').style.width = '290px'
                setTimeout(function(){
                    d('mus').style.zIndex = ''
                    d('mus').style.width = ''
                }, 400)
            }
        } else {}
    }
    document.querySelector('#mus').src = '../../links/music'
})