var tryCount = 0;
var minimalUserResponseInMiliseconds = 200;

function check() {
    console.clear();
    before = new Date().getTime();
    debugger;
    after = new Date().getTime();
    if (after - before > minimalUserResponseInMiliseconds) {
        document.write(" Dont open Developer Tools. ");
        self.location.replace(window.location.protocol + window.location.href.substring(window.location.protocol
            .length));
    } else {
        before = null;
        after = null;
        delete before;
        delete after;
    }
    setTimeout(check, 100);
}
check();
window.onload = function () {
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
    document.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            disabledEvent(e);
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            disabledEvent(e);
        }
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            disabledEvent(e);
        }
        if (e.ctrlKey && e.keyCode == 85) {
            disabledEvent(e);
        }
        if (event.keyCode == 123) {
            disabledEvent(e);
        }
    }, false);

    function disabledEvent(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
        e.preventDefault();
        return false;
    }
};


function isOnline(no,yes){
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
    xhr.onload = function(){
        if(yes instanceof Function){
            yes();
        }
    }
    xhr.onerror = function(){
        if(no instanceof Function){
            no();
        }
    }
    xhr.open("GET","anypage.php",true);
    xhr.send();
}

isOnline(
    function(){
        alert("Sorry, we currently do not have Internet access.");
    },
    function(){
        alert("Succesfully connected!");
    }
);

(function(){
	let img = new Image()
	let t = new Date().getTime()
	img.src = 'https://i.ibb.co/svjYnff/favicon-V2.png?' + t
	img.crossOrigin = true
	img.addEventListener('load', function(){
		console.log('conecction: TRUE')
	})
	img.addEventListener('error', function(e){
		console.log('conecction: FALSE')
		console.log(e)
	})
})()