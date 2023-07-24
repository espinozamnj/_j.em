window.addEventListener('load', function() {   
    function proccessPlayList(array, idx, totalPL) {
        let plCont = document.createElement('div')
        plCont.classList.add('playlist-container')
        plCont.innerHTML = `
        <div class="pl-head">
            <div class="btn-tog-size"><svg viewBox="0 90 320 512"><path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"/></svg></div>
            <div class="pl-title-cont">
            <div class="pl-title">${array.aname}</div>    
            </div>
            <div class="pl-list-info">Videos: ${array.list.length}, index: ${idx}/${totalPL}</div>
        </div>
        <div class="pl-body">
            <div class="pl-info-sub">
                <a class="pl-info-play" href="https://www.youtube.com/playlist?list=${array.urlPL}">View</a>
                <a class="pl-info-owner" href="${array.ownerURL}">${array.ownerName}</a>
                <div class="pl-info-count">${array.list.length}/${array.list.length + array.privateCount} (${array.privateCount})</div>
                <div class="pl-info-date">${new Date(array.timeBackup).toLocaleString()}</div>
                <a class="pl-load-thumbnails">Load images</a>
            </div>
            <div class="pl-list"></div>
        </div>
        `
        let loadImagesBtn = plCont.querySelector('.pl-load-thumbnails')
        loadImagesBtn.addEventListener('click', function() {
            plCont.querySelectorAll('.preload-image').forEach(function(divPreview) {
                divPreview.click()
            })
            loadImagesBtn.parentElement.removeChild(loadImagesBtn)
        })
        plCont.querySelector('.btn-tog-size').addEventListener('click', function() {
            let shead = plCont.children[0].clientHeight + 4
            if (Number(plCont.style.height.slice(0, -2)) == shead) {
                plCont.classList.add('large')
                plCont.style.height = shead + plCont.children[1].clientHeight + 6 + 'px'
            } else {
                plCont.classList.remove('large')
                plCont.style.height = shead + 'px'
            }
        })
        array.list.forEach(function(videoObj, idx) {
            // if (idx > 3) return
            plCont.querySelector('.pl-list').appendChild(proccessVideo(array.urlPL, videoObj, idx + 1, array.list.length))
        })
        document.querySelector('.main').appendChild(plCont)
        plCont.style.height = plCont.children[0].clientHeight + 4 + 'px'
    }
    function proccessVideo(urlPL, objVideo, idx, totalLength) {
        let vidCard = document.createElement('div')
        vidCard.classList.add('card-video')
        let imgSrc = objVideo.img == '' ? `https://i.ytimg.com/vi/${objVideo.url}/hqdefault.jpg` : objVideo.img
        vidCard.innerHTML = /*html*/`\
        <div class="order"><span>${idx}</span></div>
        <div class="thumbnail">
            <div class="img-vid-cont">
                <div class="preload-image" data-src="${imgSrc}">LOAD IMAGE</div>
            </div>
        </div>
        <div class="info">
            <div class="up">
                <a href="//www.youtube.com/watch?v=${objVideo.url}" class="vid-title">${objVideo.title}</a>
            </div>
            <div class="down">
                <div class="vid-duration">${objVideo.duration}</div>
                <a href="${objVideo.channel}" class="vid-author">${objVideo.author}</a>
                <a href="//www.youtube.com/watch?v=${objVideo.url}&list=${urlPL}" class="vid-vaspl">${idx}/${totalLength}</a>
            </div>
        </div>`
        let divImg = vidCard.querySelector('.preload-image')
        divImg.addEventListener('click', function() {
            if (divImg.childElementCount < 1) {
                divImg.innerHTML = ''
                let img = document.createElement('img')
                img.src = divImg.getAttribute('data-src')
                divImg.appendChild(img)
            }
        })
        return vidCard
    }

    function evalFile(file) {
        let reader = new FileReader()
        reader.onload = function (event) {
            let contents = event.target.result
            let fail = false
            let dataImport = []
            try {
                dataImport = JSON.parse(contents)
            } catch (error) {
                fail = true
                alert('Invalid JSON.')
            }
            if (!fail) {
                document.querySelector('.main').innerHTML = ''
                setTimeout(function() {
                    dataImport.forEach(function(list, idx) {
                        proccessPlayList(list, idx + 1, dataImport.length)
                    })
                }, 2e3)
            }
        }
        let fileExtension = file.name.split('.').pop().toLowerCase()
        if (fileExtension !== 'json' && fileExtension !== 'txt') {
            alert('Invalid file: Format must be .txt or .json')
        } else {
            reader.readAsText(file)
        }
    }
    
    function preventDefaultBehavior(event) {
        event.preventDefault()
        event.stopPropagation()
    }
    
    let dropArea = document.getElementById('drop-area')
    
    dropArea.addEventListener('dragenter', function(e) {preventDefaultBehavior(e); dropArea.classList.add('over')}, false)
    dropArea.addEventListener('dragleave', function(e) {preventDefaultBehavior(e); dropArea.classList.remove('over')}, false)
    dropArea.addEventListener('dragover', function(e) {preventDefaultBehavior(e); dropArea.classList.add('over')}, false)
    
    dropArea.addEventListener('drop', function (event) {
        preventDefaultBehavior(event)
        let files = event.dataTransfer.files
        if (files.length > 0) {
            evalFile(files[0])
        }
        dropArea.classList.remove('over')
    }, false)
    
    dropArea.addEventListener('click', function () {
        let fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.accept = '.json, .txt'
        fileInput.addEventListener('change', function (event) {
            let file = event.target.files[0]
            if (file) {
                evalFile(file)
            }
        })
        fileInput.click()
    })
})