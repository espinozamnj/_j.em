function generateId (len) {
    function dec2hex (dec) {
        return dec.toString(16).padStart(2, "0")
    }
    let arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}


function makeid(length, num, car) {
    length == 0 ? length = 8 : length = length
    let c = {}
        c.car = '/+-%&$#@()[]*.,¡!¿?><=^ñ_|'
        c.abc = 'abcdefghijklmnopqrstuvwxyz'
        c.num = '0123456789'
        c.dic = c.abc + c.abc.toUpperCase()
        c.fin = ''

    if ( num > 8 ) {
        num = 8
    }
    let i = 0
    while (i < num) {
        c.dic += c.num
        i++
    }
    if (car > 7 ) {
        car = 7
    }
    i = 0
    while (i < car) {
        c.dic += c.car
        i++
    }

    for (let k = 0; k < length; k ++) {
        c.fin += c.dic.charAt(Math.floor(Math.random() * c.dic.length))
    }
    return c.fin
}

$('#low').click(function(){
    $('#fin').val($('#fin').val().toLowerCase())

})
$('#upp').click(function(){
    $('#fin').val($('#fin').val().toUpperCase())

})
$('#gen').click(function(){
    $('#fin').val(makeid($('._l').val(),$('._n').val(),$('._s').val()))
})

$('#gen').dblclick(function(){
    $('#fin').val(generateId($('._l').val()))
})
$('._c').click(function(){
    v = $('#fin').val()
    let $temp = $('<input>')
    $('body').append($temp)
    $temp.val(v).select()
    document.execCommand('copy')
    $temp.remove()
})