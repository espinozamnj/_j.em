console.log('entro')
function PulsarTecla(event) {
    tecla = event.keyCode;
    if (tecla == 13) {
        if (document.querySelector("#au").paused == true) {
            document.querySelector("#au").play();
        } else { document.querySelector("#au").pause(); }
    }
    if(tecla==74){document.querySelector("#au").playbackRate -= 0.1;}
    if(tecla==75){document.querySelector("#au").playbackRate = 1;}
    if(tecla==76){document.querySelector("#au").playbackRate += 0.1;}
    if(tecla==37){document.querySelector("#au").currentTime -= 3}
    if(tecla==39){document.querySelector("#au").currentTime += 3}
    if(tecla==96){document.querySelector("#au").currentTime = 0}
} window.onkeydown = PulsarTecla;
function get_selection() {
    var txo = '';
    if (window.getSelection) {
        txo = window.getSelection().toString();
    } else if (document.selection) {
        txo = document.selection.createRange().text;
    }
    document.getElementById("out").innerHTML = txo;
}

function func() {
    get_selection();
    leer();
}


document.getElementById("txt").onclick = func;


function leer() {
    var lag = document.getElementById('lang').value;
    var txo = txt = window.getSelection().toString();
    var href = "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q="+ txo +"&tl=" + lag;
    console.log(href);
    document.querySelector("#au").setAttribute("autoplay", "");
    document.querySelector("#au").setAttribute("src", href);
}

function speed() {
    var sp = document.getElementById('vel').value;
    document.querySelector("#au").playbackRate = sp;
    document.querySelector("#au").currentTime -= 3;
    document.querySelector("#au").play();
}