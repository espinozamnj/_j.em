//formulario de entrada y salida
function openForm(a) {
    q('.frm').classList.add('active')
    if (a == 1) {
        q('#downloadlink').style.display = ''
        q('.frm input').style.display = 'none'
    }
    else if (a == 2) {
        q('#downloadlink').style.display = 'none'
        q('.frm input').style.display = ''
    }
}
q('.closeForm').addEventListener('click', function(){
    q('.frm').classList.remove('active')
})


// change
q('.bte-change').addEventListener('click', function(){
    if (q('#editor section').className == 'v') {
        q('#editor main').classList.replace('h', 'v')
        q('#editor section').classList.replace('v', 'h')
    }
    else {
        q('#editor section').classList.replace('h', 'v')
        q('#editor main').classList.replace('v', 'h')
    }
})
//remover spans
q('.bte-rspans').addEventListener('click', function(){
    let man = document.querySelectorAll('#editor main *')
    man.forEach(function(v){
        let attr = v.attributes
        let i = 0
        while (i < attr.length) {
            let nattr = attr[i].name
            if (nattr != 'src') {
                v.removeAttribute(nattr)
            }
            i++
        }
        v.removeAttribute('style')
    })
    // window.location.replace(window.location)
})

q('#borrar').addEventListener(
    'click',
    function(){
        clearCache()
    }
)
q('#import').addEventListener(
    'click',
    function(){
        openForm(2)
    }
)
q('#save').addEventListener(
    'click',
    function(){
        openForm(1)
        fexport(true, '#downloadlink', false)
    }
)

//nota principal
q('#editor main').className = 'v'
q('#editor section').className = 'h'