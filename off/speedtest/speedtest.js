// var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg"; 
// var downloadSize = 4995374; //bytes
var imageAddr = "/_cdn_/big_image.jpg"
var downloadSize = 5412038 //bytes

function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg)
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i])
            }
        }
    }
    
    var oProgress = document.getElementById("progress")
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("")
        oProgress.innerHTML = actualHTML
    }
}

function InitiateSpeedDetection() {
    ShowProgressMessage("Descargando imagen, por favor espere...")
    window.setTimeout(MeasureConnectionSpeed, 1)
};    

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false)
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection)
}

function MeasureConnectionSpeed() {
    var startTime, endTime
    var download = new Image()
    download.onload = function () {
        endTime = (new Date()).getTime()
        showResults()
    }
    
    download.onerror = function (err, msg) {
        ShowProgressMessage("La imagen no se encuentra, o error de descarga")
    }
    
    startTime = (new Date()).getTime()
    var cacheBuster = "?nnn=" + startTime
    download.src = imageAddr + cacheBuster
    
    function showResults() {
        var duration = (endTime - startTime) / 1000
        var bitsLoaded = downloadSize * 8
        var speedBps = (bitsLoaded / duration).toFixed(2)
        var speedKbps = (speedBps / 1024).toFixed(2)
        var speedMbps = (speedKbps / 1024).toFixed(2)
        var speedbps = (speedBps * 8).toFixed(2)
        var speedkbps = (speedKbps * 8).toFixed(2)
        var speedmbps = (speedMbps * 8).toFixed(2)
        ShowProgressMessage([
            "Tu velocidad de conexión es:",
            "<p>" + speedBps + " Bps" + "</p>",
            "<p>" + speedKbps + " KBps" + "</p>",
            "<p>" + speedMbps + " MBps" + "</p>",
            "<p>" + "&nbsp" + "</p>",
            "<p>" + speedbps  + "bps" + "</p>",
            "<p>" + speedkbps + "Kbps" + "</p>",
            "<p>" + speedmbps + "Mbps" + "</p>"
        ]);
        document.getElementsByClassName("bar")[0].innerHTML = ""
    }
}