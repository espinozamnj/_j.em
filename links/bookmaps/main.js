window.addEventListener('load', function () {
    let csl =  qS('.con')
    qS("#all").addEventListener('click', function() {
        if (csl.innerHTML !== '') {
            csl.innerHTML = ''
        }
        shw(_txt)
    })
    qS("#cvt").addEventListener('click', function() {
        if (csl.innerHTML !== '') {
            csl.innerHTML = ''
        }
        csl.innerHTML = '<xmp>' + JSON.stringify(convert(_txt), undefined, 2) + '</xmp>'
    })
    qS("#cls").addEventListener('click', function() {
        csl.innerHTML = ''
    })
    qS("#cln").addEventListener('click', function() {
        let val = qS('#jsn').value
        // val = val.replace(/\s/g, "")
        val = val.replace(/\t/g,"")
    qS('#jsn').value = val
    })
    qS("#exp").addEventListener('click', function() {
        if (csl.innerHTML !== '') {
            csl.innerHTML = ''
        }
        let _pr = JSON.stringify(carp(_txt, false), undefined, 2)
        csl.innerHTML = '<pre>' + _pr + '</pre>'
    })
    qS("#ttr").addEventListener('click', function() {
        if (qS('#wnd').className == "visible") {
            qS('#wnd').className = ""
        } else {
            qS('#wnd').className = "visible"
        }
    })
})