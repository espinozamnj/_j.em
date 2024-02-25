(function() {
  let da = '623b786c6d715d76747870773b233b7776\
6d7c347f706b6a6d377f706b7c7b786a7c786969377a76\
743b353b696b76737c7a6d507d3b233b77766d7c347f70\
6b6a6d3b353b6a6d766b787e7c5b6c7a727c6d3b233b77\
766d7c347f706b6a6d377869696a69766d377a76743b35\
3b747c6a6a787e70777e4a7c777d7c6b507d3b233b2a2d\
2f212b2a2e212b2020203b353b786969507d3b233b2823\
2a2d2f212b2a2e212b202020236e7c7b232a21282f297f\
2b2b2e7d2a2e7d2021782c287820282b3b64'
  let dA = JSON.parse(__cDe('cari', da))
  dA.apiKey = temp_key
  delete window.temp_key
  const app = firebase.initializeApp(dA)
  let fireCloudStore = firebase.firestore()
  let logUserPass = 'userlogcari'
  let d = document
  var cl = function(obj2print) {
    console.log(obj2print)
  }
  let main = {
    e: {
      "lastOver": []
    },
    i: {},
    d: {},
    bt: {},
    f: {}
  }
  let $$ = (where = d, query) => {return where.querySelectorAll(query)}
  let $ = (where, query) => {return $$(where, query)[0]}
  let $$_ = (where, query, fn) => {
    let itemsDom = $$(where, query)
    let fnValid = (typeof fn == 'function') ? true : false
    let i = 0
    let z = itemsDom.length
    while (i < z) {
      let thsItem = itemsDom[i]
      if (fnValid) {
        fn(thsItem)
      } else {
        cl(thsItem)
      }
      i++
    }
  }
  $(d, '.root').classList.remove('loading-dom')
  HTMLElement.prototype.oclck = function(fn) {
    this.addEventListener('click', function() {fn()}, false)
  }
  HTMLElement.prototype.rmDom = function() {
    this.parentNode.removeChild(this)
  }
  main.f.cne = function(tag = '', attrs = {}, intext = '') {
    let newDomEmt = d.createElement((tag == '' ? 'div' : tag))
    for (let attr in attrs) {
      if (Object.hasOwnProperty.call(attrs, attr)) {
        let attrv = attrs[attr]
        newDomEmt.setAttribute(attr, attrv)
      }
    }
    if (intext != '') {
      newDomEmt.innerText = intext
    }
    return newDomEmt
  }
  main.f.styleNumbVal = function(emt, prop) {
    return Number(getComputedStyle(emt)[prop].replace(/[a-zA-Z]/g,''))
  }
  main.f.closeAlert = function(iAlert, forceExit = false) {
    if (iAlert.parentElement != null) {
      let waitOut = main.f.styleNumbVal(iAlert, 'transitionDuration')
      iAlert.classList.remove('msgboxIn')
      let timeForClose = (waitOut * 1e2) + 1e2
      if (forceExit) {
        timeForClose = 3e2
        iAlert.classList.add('outForce')
      }
      setTimeout(function() {
        if (iAlert.parentElement != null) {
          iAlert.rmDom()
        }
      }, timeForClose)
    }
  }
  main.f.newAlert = function(where = '', color = '', msg = '', icon = '', duration = '') {
    let cwhere = where
    if (typeof where != 'object') {
      cwhere = d.body
    }
    let lastAlert = $(cwhere, '.alert')
    let timeForWait = 0
    if (!!lastAlert) {
      main.f.closeAlert(lastAlert, true)
      timeForWait = 3e2
    }
    setTimeout(function() {
      let ccolor = color == '' ? 'green' : color
      let nwAlert = main.f.cne('div', {'class': 'alert ' + ccolor})
      nwAlert.innerHTML = /*html*/ `<i class="fa-solid ${icon}"></i><span class="alertmsg">${msg}</span>`
      cwhere.appendChild(nwAlert)
      nwAlert.oclck(function() {
        main.f.closeAlert(nwAlert)
      })
      setTimeout(function() {
        nwAlert.classList.add('msgboxIn')
      }, 1e2)
      let cduration = 0
      if (duration != 'ever') {
        if (duration == '') {
          cduration = 3e3
        } else {
          cduration = duration
        }
        setTimeout(function() {
          main.f.closeAlert(nwAlert)
        }, cduration)
      }
    }, timeForWait)
  }
  main.f.dark = function(emt) {
    emt.classList.add('dim-cont')
    main.d.lastOver = main.f.cne('', {'class': 'over-shadow'})
    emt.appendChild(main.d.lastOver)
    setTimeout(function() {
      main.d.lastOver.classList.add('fopcty')
    }, 10)
  }
  main.f.deleteLastOver = function() {
    let lastDim = main.d.lastOver
    if (!!lastDim) {
      lastDim.classList.remove('fopcty')
      setTimeout(function() {
        let prnt = lastDim.parentNode
        lastDim.rmDom()
        prnt.classList.remove('dim-cont')
      }, 5e2)
    }
    main.d.lastOver = null
  }
  main.f.gval = function(idIpt) {
    return $(d, '#' + idIpt).value
  }
  main.f.gPass = function() {
    return [main.f.gval('pss_user'), main.f.gval('pss_pswd')]
  }
  let loginRequest = 0
  let db = fireCloudStore.collection('cari-chat')
  function loginApp(dataUserArray) {
    if (loginRequest == 0 || dataUserArray.length == 2) {
      loginRequest = 1
      $(d, '.form-login').classList.add('loading')
      let correctAuth = false
      let userLocLog = dataUserArray
      var userDBName = db.doc(userLocLog[0])
      userDBName.get().then((doc) => {
        if (doc.exists) {
          let passCheckFront = __cEn(userLocLog[1], 'correct')
          let userDOC = doc.data()
          let localDOC = {
            'chats': userDOC['chats'],
            'dataUsage': userDOC['dataUsage']
          }
          if (userDOC['checkVal'] != passCheckFront) {
            loginRequest = 0
            main.f.newAlert($(d, '.welcome'), 'red', 'Contraseña incorrecta', 'fa-triangle-exclamation')
          } else {
            correctAuth = true
            main.f.gval('pss_user').value = ''
            main.f.gval('pss_pswd').value = ''
            localStorage.setItem('userlogcari', __cEn('', JSON.stringify(userLocLog)))
            main.d.ssk = __cDe(userLocLog[1], userDOC['apikeyc'])
            main.f.newAlert($(d, '.welcome'), 'green', 'Autenticacion exitosa', 'fa-circle-check')
            fetch('cari-dom.html?' + (new Date().getTime())).then(function(raw) {
              raw.text().then(function(htmlTpt) {
                setTimeout(function() {
                  loginRequest = 0
                }, 5e2)
                let tempAlltpt = main.f.cne('')
                tempAlltpt.innerHTML = htmlTpt
                let components = tempAlltpt.children
                let i = 0, z = components.length
                while (i < z) {
                  let tcomp = components[i]
                  let parseHTML = tcomp.innerHTML.replace(/(\n +)|(\n)/g, '')
                  main.bt[tcomp.getAttribute('component')] = parseHTML
                  i++
                }
                main.d.recentChatRequest = 4
                main.e['contChat'] = $(d, '.chat-cont')
                main.e['setvars'] = $(d, '.setvars')
                main.e['contVars'] = $(d, '.options-vars')
                main.e['msgTxt'] = $(d, '#msg-user')
                main.e['chatScroll'] = $(d, '.msg-cont-scr')
                main.e['btnMoveScroll'] = $(d, '#chatScrolled')
                $(d, '.more-options-show-msg').oclck(function() {
                  $(d, '.link-more').classList.toggle('enable')
                })
                main.f.numberAtMessages = function() {
                  let idNum2Msg = 0
                  $$_(d, '.chat-item', function(item2Numb) {
                    idNum2Msg++
                    $(item2Numb, '.index-msg').innerText = idNum2Msg
                  })
                }
                main.f.SyncAnimation = function(nowStatus = '') {
                  $(d, '.status-sync').setAttribute('data-status', nowStatus)
                }
                main.f.updateChatBase = function() {
                  main.f.numberAtMessages()
                  main.f.SyncAnimation('progress')
                  return userDBName.update({
                    chats: localDOC['chats']
                  })
                  .then(() => {
                    main.d.SyncError = false
                    main.f.SyncAnimation('ready')
                  })
                  .catch((error) => {
                    main.d.SyncError = true
                    main.f.SyncAnimation('error')
                    main.f.newAlert(main.e.contChat, 'yellow', 'No se pudo sincronizar, intente nuevamente', 'fa-hand')
                    console.error('firebase update error', error)
                  })
                }
                main.f.rdmStr = function(size) {
                  let result = ''
                  let bas = 'ABCDEF0123456789'
                  let bz = bas.length
                  while (size--) {
                    result += bas.charAt(Math.floor(Math.random() * bz))
                  }
                  return result
                }
                main.f.idmsgis = function(objcht, idquery) {
                  return objcht['idmsg'] == idquery
                }
                main.f.getChatFromId = function(id2find) {
                  return localDOC.chats.filter(function(cht){return main.f.idmsgis(cht, id2find)})
                }
                main.f.getOrderChat = function(idQuery = ''){
                  let order = null
                  let iCount = 0
                  let sizeChatBase = localDOC.chats.length
                  while (iCount < sizeChatBase) {
                    if (localDOC.chats[iCount]['idmsg'] == idQuery) {
                      order = iCount
                      iCount = sizeChatBase
                    }
                    iCount++
                  }
                  return order
                }
                main.f.nwIdMsg = function() {
                  let newid = ''
                  let reqNewId = true
                  while (reqNewId) {
                    newid = main.f.rdmStr(8)
                    if (main.f.getChatFromId(newid).length == 0) {
                      reqNewId = false
                    }
                  }
                  return newid
                }
                main.f.deleteMsg = function(id2deleteMsg = '') {
                  let idel = $(d, '[data-id-msg="' + id2deleteMsg + '"]')
                  if (!idel) {
                    main.f.newAlert(main.e.contChat, 'red', 'Mensaje con encontrado', 'fa-triangle-exclamation')
                  } else {
                    let prtMsg = idel.parentNode.parentNode
                    prtMsg.classList.add('deleting-cont')
                    setTimeout(function() {
                      prtMsg.classList.add('deleting')
                      setTimeout(function() {
                        let newChatsBase = []
                        localDOC.chats.forEach(function(bChat) {
                          if (bChat['idmsg'] != id2deleteMsg) {
                            newChatsBase.push(bChat)
                          }
                        })
                        localDOC.chats = newChatsBase
                        main.f.updateChatBase()
                        prtMsg.rmDom()
                        main.f.GetSetFilterTags()
                      }, 4e2)
                    }, 3e2)
                  }
                }
                main.f.editTags = function(id2EditTags = '', lastTags = []) {
                  if (id2EditTags.length > 0) {
                    main.d.lastPendIdTags = id2EditTags
                    main.f.dark($(d, '.article'))
                    lastTags.forEach(function(iLastTag) {
                      main.f.addPreviewTag(iLastTag)
                    })
                    $(d, '.cont-edit-tags').classList.add('editing')
                    $(d, '.tag-entry input').removeAttribute('disabled')
                  }
                }
                main.f.closePanelTags = function() {
                  main.d.lastPendIdTags = ''
                  $(d, '.tags-cont').innerHTML = ''
                  $(d, '.add-tag').value = ''
                  setTimeout(function() {
                    main.f.deleteLastOver()
                    $(d, '.cont-edit-tags').classList.remove('editing')
                    $(d, '.tag-entry input').setAttribute('disabled', '')
                    main.f.GetSetFilterTags()
                  }, 3e2)
                }
                main.f.sumHeight = function(objEmt) {
                  let resultHeight = 0
                  objEmt.forEach(function(iEmt) {
                    resultHeight += iEmt.offsetHeight
                  })
                  return resultHeight
                }
                main.f.minSizeMsg = function(domEmt, starting = false) {
                  domEmt.classList.add('minimize')
                  let nwHeight = main.f.sumHeight([domEmt.children[0]])
                  nwHeight += main.f.styleNumbVal(domEmt, 'paddingTop') * 2
                  domEmt.style.height = nwHeight + 'px'
                  $(domEmt, '.c-sett').classList.remove('view')
                  if (starting) {
                    domEmt.classList.add('mov')
                  }
                }
                main.f.maxSizeMsg = function(domEmt) {
                  domEmt.classList.remove('minimize')
                  let nwHeight = main.f.sumHeight([
                    domEmt.children[0], domEmt.children[1]
                  ])
                  nwHeight += main.f.styleNumbVal(domEmt, 'paddingTop')
                  nwHeight += main.f.styleNumbVal(domEmt, 'paddingBottom')
                  nwHeight += main.f.styleNumbVal(domEmt.children[0], 'marginBottom')
                  domEmt.style.height = nwHeight + 'px'
                }
                main.f.getNewTags = function() {
                  let arrayNewTags = []
                  $$_(d, '.tags-cont .i-tag-edit', function(itag) {
                    let tagValue = itag.innerText
                    if (!arrayNewTags.includes(tagValue)) {
                      arrayNewTags.push(tagValue)
                    }
                  })
                  return arrayNewTags
                }
                main.f.addPreviewTag = function(textTag) {
                  let ptags = $(d, '.tags-cont')
                  if (!ptags.innerText.split('\n').includes(textTag)) {
                    let itag = main.f.cne('', {'class': 'i-tag-edit'})
                    itag.innerHTML = main.bt['ipreviewtag']
                    $(itag, 'span').innerText = textTag
                    $(itag, 'i').oclck(function() {
                      itag.rmDom()
                    })
                    ptags.appendChild(itag)
                  }
                }
                main.f.toogleSizeMsg = function(domEmt, same =  false, starting = false) {
                  if (domEmt.classList.contains('chat-item')) {
                    let requireInvert = domEmt.classList.contains('minimize')
                    if (same) {
                      requireInvert = !requireInvert
                    }
                    if (requireInvert) {
                      main.f.maxSizeMsg(domEmt)
                    } else {
                      main.f.minSizeMsg(domEmt, starting)
                    }
                  }
                }
                $(d, '.status-sync').oclck(function() {
                  if (main.d.SyncError) {
                    main.f.updateChatBase()
                  } else {
                    main.f.newAlert(main.e.contChat, 'blue', 'Todo correcto', 'fa-check')
                  }
                })
                $(d, '.update-tags').oclck(function() {
                  let pend = main.d.lastPendIdTags
                  if (pend != '') {
                    let tagsChanges = main.f.getNewTags()
                    let orderEdit = main.f.getOrderChat(pend)
                    if (!!orderEdit) {
                      let contTags = $(d, '[data-id-msg="' + pend + '"]')
                      contTags = contTags.parentNode
                      contTags = $(contTags, '.c-tags')
                      main.f.appendViewTags(contTags, tagsChanges)
                      localDOC.chats[orderEdit]['about']['tags'] = tagsChanges
                      main.f.updateChatBase()
                    }
                    setTimeout(function() {
                      main.f.closePanelTags()
                    }, 5e2)
                  } else {
                    main.f.newAlert(main.e.contChat, 'red', 'Error al actualizar etiquetas', 'fa-triangle-exclamation')
                    main.f.closePanelTags()
                  }
                })
                $(d, '.cancel-tags').oclck(function() {
                  main.f.closePanelTags()
                })
                $(d, '#btn-collaps').oclck(function() {
                  $$_(d, '.chat-item', function(femt) {
                    main.f.minSizeMsg(femt)
                  })
                })
                $(d, '#btn-expand').oclck(function() {
                  $$_(d, '.chat-item', function(femt) {
                    main.f.maxSizeMsg(femt)
                  })
                })
                $(d, '#btn-exit').oclck(function() {
                  localStorage.removeItem(logUserPass)
                  location.replace(location.href)
                })
                main.f.addTagFromInput = function() {
                  let iptTag = $(d, '.add-tag')
                  let ac_nw_tag = iptTag.value
                  ac_nw_tag = ac_nw_tag.replace(/(\.|,| |#|@)/g, '')
                  ac_nw_tag = ac_nw_tag.trim()
                  if (ac_nw_tag != '') {
                    main.f.addPreviewTag(ac_nw_tag)
                  }
                  iptTag.value = ''
                }
                $(d, '.add-tag-btn').oclck(function() {
                  main.f.addTagFromInput()
                })
                $(d, '.add-tag').addEventListener('input', function(evt) {
                  let lkey = evt.data
                  if (lkey == ' ' || lkey == ',') {
                    main.f.addTagFromInput()
                  }
                })
                $(d, '.add-tag').addEventListener('keydown', function(evt) {
                  if (evt.code == 'Enter') {
                    main.f.addTagFromInput()
                  }
                })
                main.f.appendViewTags = function(parent2Tags, lastTags2Show) {
                  parent2Tags.innerHTML = ''
                  if (lastTags2Show.length > 0) {
                    lastTags2Show.forEach(function(textTag) {
                      parent2Tags.appendChild(main.f.cne('', {'class': 'i-text-tag'}, textTag))
                    })
                  } else {
                    parent2Tags.appendChild(main.f.cne('', {'class': 'i-tag-empty'}, 'Sin etiquetas'))
                  }
                }
                main.f.filterOneTags = function () {
                  main.d.tagsBase = {}
                  localDOC.chats.forEach(function (chtObj) {
                    let listTagsItem = chtObj['about']['tags']
                    if (listTagsItem.length > 0) {
                      listTagsItem.forEach(function (eTag) {
                        if (!main.d.tagsBase[eTag]) {
                          main.d.tagsBase[eTag] = 0
                        }
                        main.d.tagsBase[eTag]++ 
                      })
                    } else {
                      if (!main.d.tagsBase['@SinEtiqueta']) {
                        main.d.tagsBase['@SinEtiqueta'] = 0
                      }
                      main.d.tagsBase['@SinEtiqueta']++
                    }
                  })
                }
                main.f.showMessages = function() {}
                main.f.filterViewByTags = function() {
                  if (main.d.tagsFilterShow.length == 0) {
                    $(d, '.msg-cont-scr').classList.remove('tgsfilteron')
                  } else {
                    $(d, '.msg-cont-scr').classList.add('tgsfilteron')
                  }
                  $$_(d, '.list-msg > *', function(msgDOMI) {
                    let containTag = false
                    if (main.d.tagsFilterShow.length == 0) {
                      containTag = true
                    } else {
                      if (!!$(msgDOMI, '.i-tag-empty')) {
                        if (main.d.tagsFilterShow.includes('@SinEtiqueta')) {
                          containTag = true
                        }
                      } else {
                        $$_(msgDOMI, '.i-text-tag', function(itg) {
                          if (!containTag) {
                            if (main.d.tagsFilterShow.includes(itg.innerText)) {
                              containTag = true
                            }
                          }
                        })
                      }
                    }
                    if (!containTag) {
                      msgDOMI.classList.add('tagNE')
                    } else {
                      msgDOMI.classList.remove('tagNE')
                      msgDOMI.classList.add('mov')
                      main.f.toogleSizeMsg(msgDOMI, true, true)
                    }
                  })
                  if (main.d.tagsFilterShow.length == 0) {
                    main.f.showMessages()
                  }
                }
                main.f.setPanelTagsFilter = function() {
                  let contTagsButtons = $(d, '.panel-left .cont-all-tags')
                  contTagsButtons.innerHTML = ''
                  let btnNullTag = null
                  let aTags = main.d.tagsBase
                  for (const tagAsProperty in aTags) {
                    if (Object.hasOwnProperty.call(aTags, tagAsProperty)) {
                      let tagValueAsCount = aTags[tagAsProperty]
                      let tagButton = main.f.cne('div', {'class': 'btn-tag'})
                      tagButton.innerHTML = main.bt['btn-tag-filter']
                      $(tagButton, '.tag-value').innerText = tagAsProperty
                      if (tagAsProperty == '@SinEtiqueta') {
                        btnNullTag = tagButton
                      }
                      $(tagButton, '.count-use-tag').innerText = tagValueAsCount
                      tagButton.oclck(function () {
                        if (tagButton.classList.contains('on')) {
                          tagButton.classList.remove('on')
                          let idx2del = main.d.tagsFilterShow.indexOf(tagAsProperty)
                          if (idx2del > -1) {
                            main.d.tagsFilterShow.splice(idx2del, 1)
                          }
                        } else {
                          tagButton.classList.add('on')
                          main.d.tagsFilterShow.push(tagAsProperty)
                        }
                        main.f.filterViewByTags()
                      })
                      if (main.d.tagsFilterShow.includes(tagAsProperty)) {
                        tagButton.classList.add('on')
                      }
                      contTagsButtons.appendChild(tagButton)
                    }
                  }
                  if (!!btnNullTag) {
                    btnNullTag.parentNode.appendChild(btnNullTag)
                  }
                }
                main.f.cleanNowTagsFilter = function() {
                  let icheckTag = 0
                  let lastList = main.d.tagsFilterShow
                  let newListTagsCorrect = []
                  let lgthListTag = lastList.length
                  while (icheckTag < lgthListTag) {
                    let valueTestTag = lastList[icheckTag]
                    if (!!main.d.tagsBase[valueTestTag]) {
                      newListTagsCorrect.push(valueTestTag)
                    } else {
                    }
                    icheckTag++
                  }
                  main.d.tagsFilterShow = newListTagsCorrect
                }
                main.f.GetSetFilterTags = function() {
                  main.f.filterOneTags()
                  if (!main.d.tagsFilterShow) {
                    main.d.tagsFilterShow = []
                  }
                  main.f.cleanNowTagsFilter()
                  main.f.setPanelTagsFilter()
                  main.f.filterViewByTags()
                }
                main.f.countWords = function(text2Count) {
                  return text2Count
                    .replace(/\n/g, ' ')
                    .replace(/  /g, ' ')
                    .match(/ /g).length + 1
                }
                main.f.ms2time = function(ms) {
                  function frmtW0(size, numbr) {
                    let zrsLeft = '', half = size - String(numbr).length
                    if (half < 0) {
                      return String(numbr)
                    } else {
                      while (half--) (zrsLeft+=0)
                      return zrsLeft + String(numbr)
                    }
                  }
                  let tms = frmtW0(3, Number(String(ms).slice(-3)))
                  let tmn = Math.floor((ms/1000/60) << 0)
                  let tsc = frmtW0(2,Math.floor((ms/1000) % 60))
                  return tmn + ':' + tsc + '.' + tms
                }
                main.f.blockMsgPending = function(idPend, msgPend, modelUse) {
                  let domMsgPend = main.f.cne('', {'class': 'wait-response', 'data-id-wait': idPend})
                  domMsgPend.innerHTML = /*html*/ `<div class="response-loading"><div class="user-question">${msgPend}</div><div class="response-bot"><i class="fa-solid fa-robot"></i><span>${modelUse}</span><div class="msg-loading"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div></div></div>`
                  return domMsgPend
                }
                main.f.escapeHtml = function(strCode) {
                  var map = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                  };
                  return strCode.replace(/[&<>"']/g, function(m) {return map[m]})
                }
                main.f.createMessage = function(objMsg = 0) {
                  let dataMSG = objMsg
                  if (dataMSG == 0) {
                    dataMSG = {
                      'idmsg': main.f.rdmStr(8),
                      'question': 'Pregunta del usuario no definida',
                      'answer': 'Modelo de respuesta del servidor',
                      'about': {
                        'tags': ['python', 'desarrollo'],
                        'cost': 6,
                        'tkns_t': 404
                      }
                    }
                  }
                  let timeDurationWait = 0
                  timeDurationWait = dataMSG['about']['timeClientGet'] - dataMSG['about']['timeClientGen']
                  let blockMsg = main.f.cne('', {'class': 'chat-item'})
                  let tptBlockUse = main.bt['blockmsg']
                  tptBlockUse = tptBlockUse
                    .replace('@botl', dataMSG['about']['nameBot'])
                    .replace('@tkst', dataMSG['about']['tkns_t'])
                    .replace('@prce', dataMSG['about']['costE'])
                    .replace('@size', dataMSG['about']['sizeT'])
                    .replace('@word', dataMSG['about']['sizeW'])
                    .replace('@time', main.f.ms2time(timeDurationWait))
                  blockMsg.innerHTML = tptBlockUse
                  $(blockMsg, '.btn-details').oclck(function() {
                    if (!blockMsg.classList.contains('minimize')) {
                      $(blockMsg, '.c-sett').classList.toggle('view')
                    }
                  })
                  $(blockMsg, '.act-copy').oclck(function() {
                    navigator.clipboard.writeText(dataMSG['answer'])
                    main.f.newAlert(main.e.contChat, 'blue', 'Copiado al portapapeles', 'fa-clipboard')
                  })
                  $(blockMsg, '.act-edit').oclck(function() {
                    $(d, '#msg-user').value = $(blockMsg, '.c-text-send').innerText
                  })
                  $(blockMsg, '.act-resize').oclck(function() {
                    main.f.toogleSizeMsg(blockMsg)
                  })
                  $(blockMsg, '.act-info').oclck(function() {
                    cl(dataMSG)
                  })
                  $(blockMsg, '.act-del').oclck(function() {
                    main.f.deleteMsg(dataMSG['idmsg'])
                  })
                  let cTags = $(blockMsg, '.c-tags')
                  $(blockMsg, '.act-tags').oclck(function() {
                    if (!blockMsg.classList.contains('minimize')) {
                      let listNowTag = []
                      $$_(cTags, '.i-text-tag', function(dTag) {
                        listNowTag.push(dTag.innerText)
                      })
                      main.f.editTags(dataMSG['idmsg'], listNowTag)
                    }
                  })
                  main.f.appendViewTags(cTags, dataMSG['about']['tags'])
                  $(blockMsg, '.c-sett').setAttribute('data-id-msg', dataMSG['idmsg'])
                  $(blockMsg, '.c-text-send').innerText = dataMSG['question']
                  let trimAnswer = dataMSG['answer'].replace(/^\n+/, '')
                  $(blockMsg, '.c-resp').innerHTML = main.f.escapeHtml(trimAnswer)
                  return blockMsg
                }
                main.d.modelsAvailable = [
                  {
                    'model': 'text-davinci-003',
                    'nameBot': 'Davinci',
                    'pricePK': 0.02,
                  },
                  {
                    'model': 'text-curie-001',
                    'nameBot': 'Curie',
                    'pricePK': 0.002,
                  },
                  {
                    'model': 'text-babbage-001',
                    'nameBot': 'Babbage',
                    'pricePK': 0.0005,
                  },
                  {
                    'model': 'text-ada-001',
                    'nameBot': 'Ada',
                    'pricePK': 0.0004,
                  },
                ]
                let arrayBotsList = []
                main.d.modelsAvailable.forEach(function(baseModelObj) {
                  arrayBotsList.push([baseModelObj['model'], baseModelObj['nameBot']])
                })
                main.d.filterFetchDef = [
                  {
                    "sett_prop": "model",
                    "textLabel": "Modelo",
                    "tagMethod": "select",
                    "fieldFilter": {"list": arrayBotsList},
                    "defValue": arrayBotsList[0][0],
                  },
                  {
                    "sett_prop": "temperature",
                    "textLabel": "Creatividad",
                    "tagMethod": "input-range",
                    "fieldFilter": {"min": 0, "max": 1, "step": 0.1},
                    "defValue": 1,
                  },
                  {
                    "sett_prop": "max_tokens",
                    "textLabel": "Máximo de tokens",
                    "tagMethod": "input-range",
                    "fieldFilter": {"min": 0, "max": 2000, "step": 100},
                    "defValue": 300,
                  },
                  {
                    "sett_prop": "top_p",
                    "textLabel": "Común y seguro",
                    "tagMethod": "input-range",
                    "fieldFilter": {"min": 0, "max": 1, "step": 0.1},
                    "defValue": 0,
                  },
                  {
                    "disabled": "generate more text is most cost",
                    "sett_prop": "best_of",
                    "textLabel": "",
                    "tagMethod": "input-range",
                    "fieldFilter": {"min": 0, "max": 1, "step": 0.1},
                    "defValue": 0,
                  },
                  {
                    "sett_prop": "frequency_penalty",
                    "textLabel": "Nuevas ideas",
                    "tagMethod": "input-range",
                    "fieldFilter": {"min": 0, "max": 1, "step": 0.1},
                    "defValue": 0,
                  },
                  {
                    "sett_prop": "presence_penalty",
                    "textLabel": "Nuevas palabras",
                    "tagMethod": "input-range",
                    "fieldFilter": {"min": 0, "max": 1, "step": 0.1},
                    "defValue": 0,
                  },
                ]
                main.d.filter2Fetch = {}
                main.d.filterFetchDef.forEach(function(fieldObj) {
                  let fDat = fieldObj
                  if (!fieldObj['disabled']) {
                    main.d.filter2Fetch[fDat['sett_prop']] = fDat['defValue']
                    let fieldParmId = 'parm-' + fDat['sett_prop']
                    let fLabE = main.f.cne('label', {'for' : fieldParmId})
                    let fTxtE = main.f.cne('span', {'class': 'mean', 'title': fDat['textLabel']}, fDat['textLabel'])
                    let fBoxR = main.f.cne('div', {'class': 'ipt-dat'})
                    let fIndC = null
                    fLabE.appendChild(fTxtE)
                    fLabE.appendChild(fBoxR)
                    let attrs = {
                      'id': fieldParmId
                    }
                    let fType = fDat['tagMethod']
                    if (fType.includes('-')) {
                      fDat['tagName'] = fType.split('-')[0]
                      attrs = fDat['fieldFilter']
                      attrs['type'] = fType.split('-')[1]
                      attrs['class'] = 'it-' + fType.split('-')[1]
                      attrs['placeholder'] = fDat['defValue']
                      fIndC = main.f.cne('div', {'class': 'outPrvw'}, fDat['defValue'].toString())
                    } else {
                      fDat['tagName'] = fType
                    }
                    let fieldE = main.f.cne(fDat['tagName'], attrs)
                    if (fType == 'select') {
                      fDat['fieldFilter']['list'].forEach(function(opt) {
                        let txtValueOption = !opt[1] ? '' : opt[1]
                        fieldE.appendChild(main.f.cne(
                          'option', {'value': opt[0]}, txtValueOption
                        ))
                      })
                    }
                    fieldE.value = fDat['defValue']
                    fieldE.addEventListener('input', function () {
                      let nVal = fieldE.value
                      if (!!fIndC) {
                        fIndC.innerText = nVal
                        nVal = Number(nVal)
                      }
                      main.d.filter2Fetch[fDat['sett_prop']] = nVal
                    })
                    fBoxR.appendChild(fieldE)
                    if (!!fIndC) {
                      fBoxR.appendChild(fIndC)
                    }
                    main.e.contVars.appendChild(fLabE)
                  }
                })
                $(d, '#tsetvars').oclck(function() {
                  let svars = main.e.setvars
                  if (!svars.classList.contains('show')) {
                    main.f.dark($(d, '.msg-cont-rel'))
                    svars.classList.add('show')
                  }
                })
                $(d, '#close-sett-vars').oclck(function() {
                  main.e.setvars.classList.remove('show')
                  main.f.deleteLastOver()
                })
                $$_(d, '.panel-slide', function(femt) {
                  $(femt, '.pcont-header .btn-close').oclck(function() {
                    main.f.deleteLastOver()
                    femt.classList.remove('open-panel')
                  })
                })
                main.f.checkCloseVars = function() {
                  if (main.e.setvars.classList.contains('show')) {
                    $(d, '#close-sett-vars').click()
                  }
                }
                main.f.preOpenPanel = function() {
                  main.f.checkCloseVars()
                  main.f.dark($(d, '.article'))
                }
                $(d, '.article .op-left').oclck(function() {
                  main.f.preOpenPanel()
                  $(d, '.panel-left').classList.add('open-panel')
                })
                $(d, '.article .op-right').oclck(function() {
                  main.f.preOpenPanel()
                  $(d, '.panel-right').classList.add('open-panel')
                })
                main.f.GetSetFilterTags()
                window.addEventListener('resize', function() {
                  $$_(d, '.chat-item', function(femt) {
                    main.f.toogleSizeMsg(femt, true)
                  })
                })
                main.e.msgTxt.addEventListener('blur', function() {
                  main.e.msgTxt.setAttribute('style', '')
                  main.e.msgTxt.removeAttribute('style')
                })
                main.e.chatScroll.addEventListener('scroll', function() {
                  let emtScroll = main.e.chatScroll
                  if (emtScroll.scrollHeight - emtScroll.offsetHeight == emtScroll.scrollTop) {
                    main.e.btnMoveScroll.classList.add('toUp')
                  } else {             
                    main.e.btnMoveScroll.classList.remove('toUp')
                  }
                })
                main.e.btnMoveScroll.oclck(function() {
                  if (main.e.btnMoveScroll.classList.contains('toUp')) {
                    main.e.chatScroll.scrollTo({
                      top: 0,
                      behavior:'smooth'
                    })
                  } else {
                    main.e.chatScroll.scrollTo({
                      top: main.e.chatScroll.scrollHeight,
                      behavior:'smooth'
                    })
                  }
                })
                main.f.showMessages = function(option = 'z') {
                  let recentDef = main.d.recentChatRequest
                  let prntList = $(d, '.list-msg')
                  let chdItms = prntList.children
                  let chdSize = chdItms.length
                  let runfrmA = 0
                  let runfrmZ = chdSize - 1
                  let lastDis = chdSize
                  switch (option) {
                    case 'a':
                      while(runfrmZ--) {
                        if (lastDis == chdSize) {
                          if (chdItms[runfrmZ].classList.contains('hidd')) {
                            lastDis = runfrmZ
                          }
                        }
                        if (lastDis - recentDef < runfrmZ) {
                          chdItms[runfrmZ].classList.remove('hidd')
                          main.f.toogleSizeMsg(chdItms[runfrmZ], true)
                        }
                      }
                      break
                    case 'z':
                      while (runfrmA < chdSize) {
                        if (runfrmA >= chdSize - recentDef) {
                          chdItms[runfrmA].classList.remove('hidd')
                          main.f.toogleSizeMsg(chdItms[runfrmA], true)
                        } else {
                          chdItms[runfrmA].classList.add('hidd')
                        }
                        runfrmA++
                      }
                      break
                    case 'az':
                      while (runfrmZ--) {
                        chdItms[runfrmZ].classList.remove('hidd')
                        main.f.toogleSizeMsg(chdItms[runfrmZ], true)
                      }
                      break
                    default:
                      break;
                  }
                  let msgAct = $$(prntList, '.chat-item:not(.hidd)').length
                  let msgDis = $$(prntList, '.chat-item.hidd').length
                  $(d, '#count-views').innerText = `${msgAct} de ${chdSize}`
                  let msgBefore = recentDef > msgDis ? msgDis : recentDef
                  $(d, '#show-more-def').innerText = 'Cargar ' + msgBefore + ' recientes'
                  main.e.chatScroll.scrollTop = 0
                }
                $(d, '#show-more-def').oclck(function() {main.f.showMessages('a')})
                $(d, '#show-all').oclck(function() {main.f.showMessages('az')})
                $(d, '#show-last').oclck(function() {main.f.showMessages()})
                $(d, '#show-numbers').oclck(function() {
                    $(d, '.list-msg').classList.toggle('withidx')
                })
                $(d, '#sendq').oclck(function() {
                  main.f.checkCloseVars()
                  let msgIpt = main.e.msgTxt.value
                  msgIpt = msgIpt.trim()
                  if (msgIpt != '') {
                    let initFetch = new Date().getTime()
                    let ftcHead = new Headers({
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${main.d.ssk}`,
                    })
                    let recFromD = main.d.filter2Fetch
                    recFromD['prompt'] = msgIpt
                    let ftcBody = JSON.stringify(recFromD)
                    let id2NewRequest = main.f.nwIdMsg()
                    main.e.msgTxt.value = ''
                    let ChatGen = {}
                    let modelUse = main.d.modelsAvailable.filter(function(bot) {
                      return bot['model'] == recFromD['model']
                    })
                    if (modelUse.length == 0) {
                      modelUse = modelUse = {
                        'nameBot': 'ND',
                        'pricePK': 0
                      }
                    } else {
                      modelUse = modelUse[0]
                    }
                    let pendingLock = main.f.blockMsgPending(id2NewRequest, msgIpt, modelUse['nameBot'])
                    $(d, '.list-msg').appendChild(pendingLock)
                    fetch('https://api.openai.com/v1/completions', {
                      method: "POST",
                      headers: ftcHead,
                      body: ftcBody
                    })
                    .then(response => response.json())
                    .then(dataGetChat => {
                      if (!!dataGetChat['error']) {
                        cl(dataGetChat)
                        main.f.newAlert(main.e.contChat, 'red', 'Error de respuesta', 'fa-triangle-exclamation')
                      } else {
                        let costEnd = (dataGetChat['usage']['total_tokens'] / 1000) * modelUse['pricePK']
                        costEnd = Math.round(costEnd * 1e7) / 1e7
                        let endAnswer = dataGetChat['choices'][0]['text']
                        ChatGen = {
                          'idmsg': id2NewRequest,
                          'idChat': dataGetChat['id'],
                          'question': msgIpt,
                          'answer': endAnswer,
                          'about': {
                            'tags': [],
                            'timeClientGen': initFetch,
                            'timeServerGen': dataGetChat['created'],
                            'timeClientGet': new Date().getTime(),
                            'model': dataGetChat['model'],
                            'nameBot': modelUse['nameBot'],
                            'priceGen': modelUse['pricePK'],
                            'service': dataGetChat['object'],
                            'tkns_q': dataGetChat['usage']['prompt_tokens'],
                            'tkns_a': dataGetChat['usage']['completion_tokens'],
                            'tkns_t': dataGetChat['usage']['total_tokens'],
                            'costE': costEnd,
                            'sizeW': main.f.countWords(endAnswer),
                            'sizeT': endAnswer.length
                          }
                        }
                        localDOC.chats.push(ChatGen)
                        let newBlockMsg = main.f.createMessage(ChatGen)
                        let pendSpace = $(d, '[data-id-wait="' + id2NewRequest + '"]')
                        if (!!pendSpace) {
                          pendSpace.parentNode.insertBefore(newBlockMsg, pendSpace)
                          pendSpace.rmDom()
                        } else {
                          $(d, '.list-msg').appendChild(newBlockMsg)
                        }
                        main.f.maxSizeMsg(newBlockMsg)
                        setTimeout(function() {
                          newBlockMsg.classList.add('mov')
                        }, 1e6)
                        main.f.updateChatBase()
                        cl([dataGetChat, ChatGen])
                      }
                    })
                    .catch(error => {
                      main.f.newAlert(main.e.contChat, 'red', 'Error de solicitud', 'fa-bug')
                      console.error(error)
                    })
                  }
                })
                main.f.forceUpdate = function(obj) {
                  localDOC.chats.push(obj)
                  main.f.updateChatBase()
                }
                localDOC.chats.forEach(function(localChatObj) {
                  let recMsgBlock = main.f.createMessage(localChatObj)
                  $(d, '.list-msg').appendChild(recMsgBlock)
                  main.f.minSizeMsg(recMsgBlock, true)
                })
                main.f.numberAtMessages()
                main.f.SyncAnimation('ready')
                main.e.chatScroll.scrollTop = main.e.chatScroll.scrollHeight
                main.f.showMessages()
                setTimeout(function() {
                  $(d, '.welcome').classList.add('close')
                }, 1e3)
                main.ld = localDOC
                window['sss'] = main
              })
            })
          }
        } else {
          loginRequest = 0
          main.f.newAlert($(d, '.welcome'), 'red', 'Usuario no encontrado', 'fa-triangle-exclamation')
        }
        if (!correctAuth) {
          $(d, '.form-login').classList.remove('loading')
        }
      })
    }
  }
  $(d, '#login').oclck(function() {
    loginApp(main.f.gPass())
  })
  $(d, '#pss_pswd').addEventListener('keydown', function(evt) {
    if (evt.code == 'Enter') {
      setTimeout(function() {
        loginApp(main.f.gPass())
      }, 5e2)
    }
  })
  $(d, '#newuser').oclck(function() {
    $(d, '.float-form ').classList.remove('opening')
    $(d, '.modal-register').style.display = 'flex'
    $(d, '.modal-register').classList.add('open-modal')
    setTimeout(function() {
      $(d, '.float-form ').classList.add('opening')
      let logSUP = $(d, '.logTryReffer')
      logSUP.classList.remove('visibleLog')
      logSUP.innerText = ''
    }, 2e2)
  })
  let iswaitPendSignUp = function() {
    let formDom = $(d, '.nu-btn')
    return formDom.classList.contains('next-mode') &&
      !formDom.classList.contains('next-mode-log')
  }
  function closeModalSignUp() {
    usePendSignUp = false
    if (!iswaitPendSignUp()) {
      $(d, '.float-form ').classList.remove('opening')
      setTimeout(function() {
        $(d, '.modal-register').classList.remove('open-modal')
      }, 4e2)
      setTimeout(function() {
        $(d, '.modal-register').style.display = ''
        $(d, '.nu-btn').className = 'nu-btn'
        $$(d, '.nuipt').forEach(function(a) {
          a.value = ''
        })
      }, 6e2)
    }
  }
  $(d, '.exit-register').oclck(function() {closeModalSignUp()})
  $(d, '.next-register').oclck(function() {closeModalSignUp()})
  $(d, '.save-register').oclck(function() {
    if (!iswaitPendSignUp()) {
      $(d, '.nu-btn').classList.add('next-mode')
      let nu = {}
      $$(d, '.nuipt').forEach(function(a) {
        nu[a.id.slice(2)] = a.value
      })
      if (nu.akey.startsWith('::')) {
        nu.akey = __cDe('cari', nu.akey.slice(2))
      }
      let cnuv = __cEn('nu', nu.name)
      let logSUP = $(d, '.logTryReffer')
      logSUP.classList.remove('visibleLog')
      logSUP.innerText = ''
  
      function showLogNU(green, messageLog) {
        logSUP.setAttribute('color', (green ? 'green' : 'red'))
        logSUP.innerText = messageLog
      }
      setTimeout(function() {
        logSUP.classList.add('visibleLog')
        if (cnuv.slice(0, 2) + cnuv.slice(-2) == nu.rfrr) {
          showLogNU(true, 'Código correcto, verificando usuario...')
  
          readDBUserName = db.doc(nu.name)
          readDBUserName.get().then((doc) => {
            if (doc.exists) {
              showLogNU(false, 'El nombre usuario ya existe, use otro.')
              $(d, '.nu-btn').classList.remove('next-mode')
            } else {
              showLogNU(true, 'Creando cuenta...')
              db.doc(nu.name).set({
                checkVal: __cEn(nu.pass, 'correct'),
                apikeyc: __cEn(nu.pass, nu.akey),
                chats: [],
                dataUsage: {
                  cost: 0,
                  sizeCharts: 0,
                  sizeWords: 0,
                  tokens: 0
                }
              })
              .then(() => {
                $(d, '#pss_user').value = nu.name
                $(d, '#pss_pswd').value = ''
                showLogNU(true, '¡Cuenta creada! Inicie sesión')
                $(d, '.nu-btn').classList.add('next-mode-log')
              })
              .catch(() => {
                showLogNU(false, 'Error al crear cuenta. Intente más tarde.')
                $(d, '.nu-btn').classList.remove('next-mode')
              })
            }
          })
        } else {
          showLogNU(false, 'Código de invitación inválido')
          $(d, '.nu-btn').classList.remove('next-mode')
        }
      }, 1e3)
    }
  })
  if (!!localStorage[logUserPass]) {
    let dLocSavedEnc = __cDe('', localStorage[logUserPass])
    try {
      let dLocSaved = JSON.parse(dLocSavedEnc)
      loginApp(dLocSaved)
    } catch (error) {
      localStorage.removeItem(logUserPass)
    }
  }
  if (!!navigator.userAgentData) {
    if (navigator.userAgentData.mobile) {
      $(d, '.article').classList.add('mobile')
    }
  }
})()