function $(element) {
	return document.querySelector(element)
}

function altoIframe() {
	if ($("#vid").className == 'ver') {
		let altodeiframe = $("#vid > iframe:nth-child(1)").offsetWidth / 16 * 9
		console.log(altodeiframe)
		$("#vid").setAttribute('style', 'grid-auto-rows:' + altodeiframe + 'px')
	}
}

function g() {
	document.title = "Imágenes de la tarea"
	$('#gal').setAttribute("class", "ver")
	$('#enl').setAttribute("class", "oculto")
	$('#vid').setAttribute("class", "oculto")
}

function e() {
	document.title = "Enlaces de la tarea"
	$('#gal').setAttribute("class", "oculto")
	$('#enl').setAttribute("class", "ver")
	$('#vid').setAttribute("class", "oculto")
}

function v() {
	document.title = "Videos de la tarea"
	$('#gal').setAttribute("class", "oculto")
	$('#enl').setAttribute("class", "oculto")
	$('#vid').setAttribute("class", "ver")
}

$("#buton-g").addEventListener('click', function () {
	g()
})
$("#buton-e").addEventListener('click', function () {
	e()
})
$("#buton-v").addEventListener('click', function () {
	v()
	altoIframe()
})
window.onresize = altoIframe


function guardarCache() {
	var cache = $("#all").innerHTML
	sessionStorage.setItem("tareasCache", cache)
}

function borrarCache() {
	sessionStorage.removeItem("tareasCache")
	alert("Caché eliminada")
}

function buscarnuevoItem() {
	if ($("#gal").className == "ver") {
		$("#enlace").classList.remove('data')
		$("#video").classList.remove('data')
		$("#imagen").classList.add('data')
		sendItem("gal")
	} else if ($("#enl").className == "ver") {
		$("#enlace").classList.add('data')
		$("#video").classList.remove('data')
		$("#imagen").classList.remove('data')
		sendItem("enl")
	} else if ($("#vid").className == "ver") {
		$("#enlace").classList.remove('data')
		$("#video").classList.add('data')
		$("#imagen").classList.remove('data')
		sendItem("vid")
	}
	$("aside").classList.add('show')
}

function sendItem(a) {
	if (a == "enl") {
		$("#add").setAttribute('onclick', 'addEnlace()')
	} else if (a == "gal") {
		$("#add").setAttribute('onclick', 'addGal()')
	} else if (a == "vid") {
		$("#add").setAttribute('onclick', 'addVideo()')
	}
}

function addEnlace() {
	href = ""
	tag = ""
	if ($("#enlace > div:nth-child(4)").innerHTML == "" || $("#enlace > div:nth-child(2)").innerHTML == "") {
		alert("Complete todos los campos")
	} else {
		href = $("#enlace > div:nth-child(4)").textContent
		tag = $("#enlace > div:nth-child(2)").textContent
		goo = "https://www.google.com/s2/favicons?domain=" + href
		back = " style='background-image: url(" + goo + ")'"
		$("#enl").innerHTML += '<a href="' + href + '"' + back + '>' + tag + '</a>'
		$("aside").classList.remove('show')
	}
	guardarCache()
}

function addGal() {
	entradaGal = $("#imagen > div")
	link = ""
	if (entradaGal.childElementCount == 0 && entradaGal.innerHTML != "") {
		link = entradaGal.innerHTML
		$("#gal").innerHTML += '<img ondblclick="ifr(this)" src="' + link + '">'
		derR()
		$("aside").classList.remove('show')
	} else if (entradaGal.innerHTML == "") {
		alert("Complete el campo")
	} else if (entradaGal.childElementCount == 1) {
		link = $("#imagen > div > img").src
		$("#gal").innerHTML += '<img ondblclick="ifr(this)" src="' + link + '">'
		derR()
		$("aside").classList.remove('show')
	} else if (entradaGal.childElementCount > 1) {
		alert("coloque una sola imagen")
	}
	guardarCache()
}

function addVideo() {
	if ($("#video > div").innerHTML == "") {
		alert("Escriba el enlace")
	} else {
		url = ""
		url = $("#video > div").innerHTML
		$("#vid").innerHTML += '<iframe src="https://www.youtube.com/embed/' + url + '" allowfullscreen></iframe>'
		$("aside").classList.remove('show')
	}
	guardarCache()
}


function ifr(x) {
	let variable = x.getAttribute('src')
	open('ifr.html?=' + variable)
}

var butAddItem = $("#addItem")
butAddItem.addEventListener('click', function () {
	buscarnuevoItem()
})
$("#cerrar").addEventListener('click', function () {
	$("aside").classList.remove('show')
})


function izqM() {
	$("#gal").scrollLeft -= 40
}

function izqR() {
	$("#gal").scrollLeft = 0
}

function derM() {
	$("#gal").scrollLeft += 40
}

function derR() {
	$("#gal").scrollLeft = $("#gal").scrollWidth
}

//escribir txt
(function () {
	var textFile = null,
		makeTextFile = function (text) {
			var data = new Blob([text], {
				type: 'text/plain'
			})

			if (textFile !== null) {
				window.URL.revokeObjectURL(textFile)
			}
			textFile = window.URL.createObjectURL(data)
			return textFile
		}


	var create = $('#export')
	var data = new Date()
	var file = data.getFullYear() + "-" + data.getMonth() + 1 + "-" + data.getDate() + "." + data.getHours() + "." + data.getMinutes()
	textbox = $('#all')

	create.addEventListener('click', function () {
		var link = $('#downloadlink')
		link.href = makeTextFile(textbox.innerHTML)
		link.download = file + ".txt"
		// link.click()
		openForm(1)
	}, false)
})()
//leer txt
var openFile = function (event) {
	var input = event.target

	var reader = new FileReader()
	reader.onload = function () {
		var text = reader.result
		var node = $('#all')
		node.innerHTML = text
	}
	reader.readAsText(input.files[0])
}

//formulario de entrad ay salida
function closeForm() {
	$("form").setAttribute('class', "")
}

function openForm(a) {
	$("form").classList.add('active')
	if (a == 1) {
		$("#downloadlink").style.display = ""
		$("form > input").style.display = "none"
	} else if (a == 2) {
		$("#downloadlink").style.display = "none"
		$("form > input").style.display = ""
	}
}

$("#import").addEventListener('click', function () {
	openForm(2)
})

if (!!sessionStorage.getItem("tareasCache")) {
	$("#all").innerHTML = sessionStorage.getItem("tareasCache")
	console.log("se cargó la sessionStorage")
} else {
	console.log("No existe la sessionStorage")
}

$("#clean").onclick = borrarCache