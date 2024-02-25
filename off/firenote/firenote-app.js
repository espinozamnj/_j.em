window.addEventListener('load', function() {
  const app = firebase.initializeApp({
    apiKey: __cDe(window.hash_app, '4d45766d5f75483a3b665a3a3e5639783d64633b564a43605f65385b7a213d407a4e4221664655'),
    authDomain: __cDe(window.hash_app, '62637869216a657e7f78226a657e696e6d7f696d7c7c226f6361'),
    projectId: __cDe(window.hash_app, '62637869216a657e7f78'),
    storageBucket: __cDe(window.hash_app, '62637869216a657e7f78226d7c7c7f7c6378226f6361'),
    messagingSenderId: __cDe(window.hash_app, '3f383a343e3f3b343e353535'),
    appId: __cDe(window.hash_app, '3d363f383a343e3f3b343e353535367b696e363f343d3a3c6a3e3e3b683f3b6835346d393d6d353d3e')
  })
  const db = firebase.firestore()
  
  var $$ = (element) => {return document.querySelectorAll(element)}
  var $ = (element) => {return $$(element)[0]}
  var firedata = {
    last_note_id: '',
    changeNote: false,
    last_order_todo: [],
    links_boxes_max: {}
  }
  let ipt = {
    tit: $('#title'),
    txt: $('#input')
  }
  function ne(tag, where, css) {
    let te = document.createElement(tag)
    te.className = css
    where.appendChild(te)
    return te
  }
  ipt.txt.addEventListener('change', function() {
    firedata.changeNote = true
  })
  window.onbeforeunload = function() {
    if (firedata.changeNote) {
      alert('Save the changes')
      return "You have attempted to leave this page. Are you sure?";
    }
  }
  function show_note(doc) {
    firedata.last_note_id = doc
    let t_doc = db.collection("notes").doc(doc)
    t_doc.get().then((doc) => {
      if (doc.exists) {
        let dt = doc.data()
        if ($('.header').getAttribute('data-note-status') == 'true') {
          ipt.tit.value = dt.title
        }
        ipt.txt.value = dt.content
        $('.note').classList.remove('md')
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!")
      }
    }).catch((error) => {
      console.log("Error getting document:", error)
    })
  }
  $('#add-note').addEventListener('click', function() {
    db.collection("notes").add({
      title: "New note",
      favorite: false,
      content: "Start to typing..."
    })
    .then(function(doc) {
      console.log(doc)
      show_note(doc.id)
    })
    .catch((error) => {
      console.log("Error adding note:", error)
    })
  })
  function tip(text) {
    let t = $('#alert')
    t.innerText = text
    t.classList.remove('tip')
    t.classList.add('tip')
    setTimeout(function() {
      t.classList.remove('tip')
    }, 2e3)
  }

  $('#update-note').addEventListener('click', function() {
    var this_note_to_update = db.collection("notes").doc(firedata.last_note_id)
    return this_note_to_update.update({
      title: ipt.tit.value,
      content: ipt.txt.value
    })
    .then(() => {
      tip("Nota actualizada")
      firedata.changeNote = false
    })
    .catch((error) => {
      // The document probably doesn't exist.
      tip('No se pudo guardar')
      console.error("Error updating document: ", error)
    })
  })
  function getIdNote(nav_emt) {
    let id = ''
    while(nav_emt.parentNode && nav_emt.parentNode.nodeName.toLowerCase() != 'aside') {
      nav_emt = nav_emt.parentNode
      if (nav_emt.hasAttribute('data-note')) {
        id = nav_emt.getAttribute('data-note')
        break
      }
    }
    return id
  }
  var isFirstNote = {
    "val": false
  }
  db.collection("notes").onSnapshot((querySnapshot) => {
    let html = ''
    querySnapshot.forEach((doc) => {
      if (!isFirstNote.val) {
        isFirstNote.val = true
        isFirstNote.id = doc.id
        show_note(isFirstNote.id)
      }
      let dt = doc.data()
      let isfav = dt.favorite
      let t_html
      let first_line = dt.content.split('\n')[0]
      // console.log(`${doc.id} => ${doc.data()}`)
      let tmp_div = document.createElement('div')
      tmp_div.innerText = dt.content
      t_html = /*html*/ `
        <div class="note-card" data-note="${doc.id}">
          <a class="details">
            <div class="d-title">${dt.title}</div>
            <div class="d-text" title="${first_line}">${first_line}</div>
            <div class="d-all">${tmp_div.innerHTML}</div>
          </a>
          <div class="actions">
            <div class="act-icon ${isfav} fav-action">
              <i class='bx bx-star'></i>
              <i class='bx bxs-star'></i>
            </div>
            <div class="act-icon del-action">
              <i class='bx bx-trash'></i>
            </div>
          </div>
        </div>
      `
      isfav ? html = t_html + html : html += t_html
    })
    $('.notes-list').innerHTML = html
    $('.notes-list').querySelectorAll('.fav-action').forEach(function(s) {
      s.addEventListener('click', function() {
        let id = getIdNote(s)
        let last_status_favorite
        if (s.className.includes('true')) {
          last_status_favorite = true
        } else {
          last_status_favorite = false
        }
        var this_note_to_update = db.collection("notes").doc(id)  
        return this_note_to_update.update({
          favorite: !last_status_favorite
        })
      })
    })
    $('.notes-list').querySelectorAll('.del-action').forEach(function(s) {
      s.addEventListener('click', function() {
        let id = getIdNote(s)
        if (confirm('Are you sure you want to delete this note?')) {
          db.collection("notes").doc(id).delete()
          tip('Note deleted successfully')
        }
      })
    })
    $('.notes-list').querySelectorAll('.details').forEach(function(s) {
      s.addEventListener('click', function() {
        let id = getIdNote(s)
        show_note(id)
      })
    })
  })
  
  let urls_scroll = $('#cont-link')
  urls_scroll.addEventListener('scroll', function() {
    firedata['urlContScroll'] = urls_scroll.scrollTop
  })
  db.collection("links").onSnapshot((querySnapshot) => {
    let mn = $('#urls-cont')
    mn.classList.add('onestep')
    mn.innerHTML = ''
    querySnapshot.forEach((doc) => {
      if (!firedata.links_boxes_max[doc.id]) {
        firedata.links_boxes_max[doc.id] = false
      }
      let dt = doc.data()
      let card = ne('div', mn, 'card-link')
      if (dt.name.endsWith('_')) {
        mn.insertBefore(card, mn.firstChild)
      }
      let title = ne('div', card, 'name-card')
      let v_title = ne('input', title, 'submit-title')
      let expand_btn = ne('button', title, 'action-size')
      let v_add = ne('button', title, 'new-a-link')
      let v_open = ne('button', title, 'action-card')
      let v_del = ne('button', title, 'action-card')
      expand_btn.innerHTML = '<i class="bx bxs-chevron-down"></i>'
      v_add.innerHTML = '<i class="bx bx-bookmark-alt-plus"></i>'
      v_open.innerHTML = '<i class="bx bx-link-external"></i>'
      v_del.innerHTML = '<i class="bx bxs-trash-alt"></i>'
      v_open.addEventListener('click', function() {
        let all = dt.url.length, _i = 0
        let j = setInterval(function() {
          if (_i >= all) {
            clearInterval(j)
          } else {
            let link = dt.url[_i]
            link = link.replace('] (', '](').split('](')[1].slice(0, -1)
            open(link, '_blank')
            _i++
          }
        }, 5e2)
      })
      v_del.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this library?')) {
          db.collection("links").doc(doc.id).delete()
          tip('Library deleted successfully')
        }
      })
      v_add.addEventListener('click', function() {
        $('#title-link').value = dt.name
        $('#title-link').setAttribute('disabled', '')
        $('#title-link').setAttribute('data-id-coll', doc.id)
        $('.new-link').classList.remove('close')
      })
      v_title.setAttribute('autocomplete', 'off')
      v_title.setAttribute('spellcheck', 'false')
      v_title.value = dt.name
      v_title.addEventListener('blur', function(e) {
        let new_value = e.target.value
        if (new_value != dt.name) {
          let dlink = db.collection("links").doc(doc.id)
          return dlink.update({
            name: new_value
          })
          .then(() => {
            tip("Name update")
          })
          .catch((error) => {
            // The document probably doesn't exist.
            tip('No se pudo guardar')
            console.error("Error updating document: ", error)
          })

        }
      })
      let hrefs = ne('div', card, 'hrefs')
      dt.url.forEach(function(h) {
        let nhc = ne('div', hrefs, 'link')
        let nha = ne('a', nhc, 'a-link')
        let nhat = ne('p', nha, 'a-link-title')
        let nhau = ne('p', nha, 'a-link-url')
        let nhp = ne('a', nhc, 'a-clip')
        nhp.innerHTML = '<i class="bx bx-copy"></i>'
        nhp.addEventListener('click', function() {
          try {
            navigator.clipboard.writeText(h)
            tip('Copy to clipboard')
          } catch (e) {
            console.error(e)
            tip('Not copy')
          }
        })
        let nhd = ne('a', nhc, 'a-del')
        nhd.innerHTML = '<i class="bx bx-trash"></i>'
        nhd.addEventListener('click', function() {
          let a = dt.url
          let index = a.indexOf(h)
          if (index > -1) {
            a.splice(index, 1)
          }
          let dlink = db.collection("links").doc(doc.id)
          return dlink.update({
            url: a
          })
          .then(() => {
            tip("Actualizado")
          })
          .catch((error) => {
            // The document probably doesn't exist.
            tip('No se pudo guardar')
            console.error("Error updating document: ", error)
          })
        })
        let iT, iH
        h = h.replace('] (', '](')
        if (h.includes('](')) {
          iH = h.split('](')[1].replace(/^[\[|\(]|[\]|\)]$/g, '')
          iT = h.split('](')[0].replace(/^[\[|\(]|[\]|\)]$/g, '')
          nhat.style.backgroundImage = 'url("http://s2.googleusercontent.com/s2/favicons?domain=' + iH + '")'
        } else {
          // dir_project
          iH = location.origin + '/_j.em/off/save/url?url=' + h
          iT = '[No title item]'
        }
        nha.setAttribute('target', '_blank')
        nha.setAttribute('rel', 'noreferrer nofollow')
        nha.href = iH
        nhat.innerText = iT
        nhau.innerText = iH
      })
      function ghgt(semt) {
        return semt.offsetHeight
      }
      function set_size_max() {
        hrefs.removeAttribute('style')
        card.classList.remove('min')
        card.style.height = ghgt(title) + ghgt(hrefs) + 'px'
      }
      function min_card() {
        card.classList.add('min')
        card.style.height = ghgt(title) + 'px'
        firedata.links_boxes_max[doc.id] = false
        setTimeout(function() {
          if (card.classList.contains('min')) {
            hrefs.style.display = 'none'
          }
        }, 6e2)
      }
      expand_btn.addEventListener('click', function() {
        if (card.classList.contains('min')) {
          firedata.links_boxes_max[doc.id] = true
          set_size_max()
        } else {
          min_card()
        }
      })
      set_size_max()
      if (!firedata.links_boxes_max[doc.id]) {
        min_card()
      }
    })
    urls_scroll.scrollTop = firedata['urlContScroll']
    setTimeout(function() {
      mn.classList.remove('onestep')
    }, 6e2)
  })
  let blurForceToNewCreate = ''
  db.collection("todo").onSnapshot((querySnapshot) => {
    let tbt = $('.table-to-a')
    let frg = document.createDocumentFragment()
    let tb = ne('div', frg, 'table-to')
    function slist (target) {
      // let items = target.getElementsByClassName('to-list'), current = null
      let items = target.children, current = null
      for (let i of items) {
        let ic = i.firstChild
        ic.draggable = true
        ic.ondragstart = (ev) => {
          i.parentNode.classList.add('dragging')
          current = i;
          for (let it of items) {
            if (it.parentElement != current.parentElement) { it.classList.add('hint') }
          }
        }
        i.ondragenter = (ev) => {
          if (i != current) { i.classList.add('active') }
        }
        i.ondragleave = () => {
          i.classList.remove('active')
        }
        ic.ondragend = () => { for (let it of items) {
            it.classList.remove('hint')
            it.classList.remove('active')
        }}
        i.ondragover = (evt) => { evt.preventDefault() }
        i.ondrop = (evt) => {
          i.parentNode.classList.remove('dragging')
          evt.preventDefault()
          if (i != current) {
            let currentpos = 0, droppedpos = 0
            for (let it=0; it < items.length; it++) {
              if (current == items[it]) { currentpos = it }
              if (i == items[it]) { droppedpos = it }
            }
            if (currentpos < droppedpos) {
              i.parentNode.insertBefore(current, i.nextSibling)
            } else {
              i.parentNode.insertBefore(current, i)
            }
          }
          setTimeout(function() {
            let itm = target.children, st = 0, new_order = [], only_names = []
            while (st < itm.length) {
              let c = itm[st]
              let name_list = c.getElementsByClassName('to-submit-title')[0].value
              let d_order = {
                order: st,
                name: name_list
              }
              new_order.push(d_order)
              only_names.push(name_list)
              st++
            }
            var data_order = db.collection('todo-order').doc('order')
            return data_order.update({
              default: new_order
            })
            .then(() => {
              tip('New order saved')
              firedata.last_order_todo = only_names
            })
            .catch((error) => {
              console.error("Error updating document: ", error)
            })
          }, 0)
        }
      }
    }
    querySnapshot.forEach((doc) => {
      let dt = doc.data()
      let list = ne('div', tb, 'to-list')
      let drag = ne('div', list, 'to-drag')
      drag.innerHTML = '<div class="hidden-name">' + dt.name + '</div>'
      let title = ne('div', list, 'to-title')
      let v_title = ne('input', title, 'to-submit-title')
      let v_del = ne('button', title, 'action-to-del')
      v_del.innerHTML = '<i class="bx bxs-trash-alt"></i>'
      v_del.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this list?')) {
          db.collection("todo").doc(doc.id).delete()
          tip('List deleted successfully')
        }
      })
      v_title.setAttribute('autocomplete', 'off')
      v_title.setAttribute('spellcheck', 'false')
      v_title.value = dt.name
      v_title.addEventListener('change', function(e) {
        let dlink = db.collection("todo").doc(doc.id)
        return dlink.update({
          name: e.target.value
        })
        .then(() => {
          tip("Name update")
        })
        .catch((error) => {
          // The document probably doesn't exist.
          tip('No se pudo guardar')
          console.error("Error updating document: ", error)
        })
      })
      let task = ne('div', list, 'task')
      let ntk = ne('div', task, 'new-task')
      ntk.innerHTML = "<i class='bx bxs-plus-circle'></i><span>New task</span>"
      ntk.addEventListener('click', function() {
        let new_note = [{
          done: false,
          text: 'Write a new task...'
        }]
        new_note = new_note.concat(dt.list)
        let dlink = db.collection("todo").doc(doc.id)
        return dlink.update({
          list: new_note
        })
      })
      if (blurForceToNewCreate == dt.name) {
        ntk.click()
        blurForceToNewCreate = ''
      }
      let task_done = ne('div', list, 'task-done')
      let done_text = ne('div', task_done, 'done-tit')
      let complete_task = 0
      for (let idx = 0; idx < dt.list.length; idx++) {
        let h = dt.list[idx]
        let tbl = ne('div', task, 'to-do')
        let chk = ne('a', tbl, 'isdone')
        let to_t = ne('input', tbl, 'sub-todo-item')
        to_t.setAttribute('autocomplete', 'off')
        to_t.setAttribute('spellcheck', 'false')
        to_t.value = h.text
        if (h.text == 'Write a new task...') {
          setTimeout(function() {
            to_t.focus()
            to_t.select()
          }, 1e3)
        }
        if (h.done) {
          chk.innerHTML = "<i class='bx bx-check-circle'></i>"
          task_done.appendChild(tbl)
          complete_task++
          let del_task = ne('a', tbl, 'del-task')
          del_task.innerHTML = '<i class="bx bx-trash-alt"></i>'
          del_task.addEventListener('click', function() {
            let las_list = JSON.parse(JSON.stringify(dt.list))
            let new_list = []
            las_list.forEach(function(i) {
              if (JSON.stringify(i) !== JSON.stringify(h)) {
                new_list.push(i)
              }
            })
            let dtodo = db.collection("todo").doc(doc.id)
            return dtodo.update({
              list: new_list
            })
            .then(() => {
              tip("Item deleted")
            })
            .catch((error) => {
              // The document probably doesn't exist.
              tip('No se pudo actualizar')
              console.error("Error updating document: ", error)
            })
          })
        } else {
          chk.innerHTML = "<i class='bx bx-circle'></i>"
        }
        to_t.addEventListener('blur', function(evt) {
          let las_list = JSON.parse(JSON.stringify(dt.list))
          let new_list = []
          let last_value = ''
          las_list.forEach(function(i) {
            if (JSON.stringify(i) == JSON.stringify(h)) {
              last_value = i.text
              i.text = evt.target.value
            }
            new_list.push(i)
          })
          if (last_value !== evt.target.value) {
            let dtodo = db.collection("todo").doc(doc.id)
            return dtodo.update({
              list: new_list
            })
            .then(() => {
              tip("Item actualizado")
            })
            .catch((error) => {
              // The document probably doesn't exist.
              tip('No se pudo actualizar')
              console.error("Error updating document: ", error)
            })
          }
        })
        to_t.addEventListener('keydown', function(ekey) {
          if (ekey.key == 'Enter') {
            blurForceToNewCreate = to_t.parentElement.parentElement.previousElementSibling.children[0].value
            to_t.blur()
          }
        })
        chk.addEventListener('click', function() {
          let las_list = JSON.parse(JSON.stringify(dt.list))
          let new_list = []
          las_list.forEach(function(i) {
            if (JSON.stringify(i) == JSON.stringify(h)) {
              i.done = !h.done
            }
            new_list.push(i)
          })
          let dtodo = db.collection("todo").doc(doc.id)
          return dtodo.update({
            list: new_list
          })
          .then(() => {
            tip("Estado actualizado")
          })
          .catch((error) => {
            // The document probably doesn't exist.
            tip('No se pudo actualizar')
            console.error("Error updating document: ", error)
          })
        })
      }
      done_text.innerText = 'Completed: ' + complete_task
    })
    let clone_local_order = []
    let clone_local_order_only_names = []
    let saved_order = db.collection('todo-order').doc('order')
    saved_order.get().then((doc) => {
      if (doc.exists) {
        clone_local_order = (doc.data())['default']
        for (let o in clone_local_order) {
          clone_local_order_only_names.push(clone_local_order[o]['name'])
        }
        let chd = tb.children
        for (let nt in chd) {
          let n = chd[nt]
          if (typeof n === 'object') {
            let nv = n.getElementsByClassName('to-submit-title')[0].value
            let or = clone_local_order.filter(i => i.name === nv)
            n.setAttribute('data-order', or[0]['order'])
          }
        }
        function jss(obj) {
          return JSON.stringify(obj)
        }
        if (true) {
          slist(tb)
          let items_o = tb.childNodes
          let itemsArr = []
          for (let i in items_o) {
            if (items_o[i].nodeType == 1) {
              itemsArr.push(items_o[i])
            }
          }
          itemsArr.sort(function(a, b) {
            let val_a = '', val_b = ''
            val_a = a.getAttribute('data-order')
            val_b = b.getAttribute('data-order')
            return val_a == val_b
            ? 0
            : (val_a > val_b ? 1 : -1)
          })
          for (i = 0; i < itemsArr.length; ++i) {
            tb.appendChild(itemsArr[i])
          }
        }
        if (firedata.last_order_todo.length == 0) {
          firedata.last_order_todo = JSON.parse(jss(clone_local_order_only_names))
        }
        tbt.innerHTML = ''
        tbt.appendChild(frg)
      }
    }).catch((error) => {
      console.error('Error getting order:', error)
    })
  })
  $('.add-to').addEventListener('click', function() {
    let length_todos = $('.table-to').childElementCount
    let sync_order
    let docRef = db.collection('todo-order').doc('order')
    docRef.get().then((doc) => {
      if (doc.exists) {
        sync_order = doc.data()
        sync_order['default'].push({
          'name': 'New list',
          'order': length_todos
        })
        var data_order = db.collection('todo-order').doc('order')
        return data_order.update({
          default: sync_order['default']
        })
        .then(() => {
          db.collection("todo").add({
            name: 'New list',
            list: [{
              done: false,
              text: 'New list'
            }]
          })
          .then(function() {
            tip('and new order saved')
          })
          .catch((error) => {
            tip('Sorry, have an error')
            console.error("Error adding note:", error)
          })
        })
        .catch((error) => {
          console.error("Error updating document: ", error)
        })
      } else {
        console.log("No such document!")
      }
    }).catch((error) => {
      console.error("Error getting document:", error)
    })
    
  })
  $('#link-s').addEventListener('click', function() {
    let tv = $('#title-link').value
    let cv = $('#raw-links').value

    let gid = 'data-id-coll'
    if ($('#title-link').hasAttribute(gid)) {
      let did = $('#title-link').getAttribute(gid)
      let dlink = db.collection("links").doc(did)
      dlink.get().then((doc) => {
        if (doc.exists) {
          let last_data = doc.data()
          let n_list = JSON.parse(JSON.stringify(last_data.url))
          let n_link = []
          function trimURLValid(url_text) {
            let rlink = url_text
            if (rlink.endsWith('&&')) {
              rlink = rlink.slice(0, - 2)
            }
            rlink = rlink.trim()
            if (rlink != '') {
              n_link.push(rlink)
            }
          }
          if (cv.includes('\n')) {
            cv.split('\n').forEach(function(a) {
              trimURLValid(a)
            })
          } else {
            cv.split('&&').forEach(function(a) {
              trimURLValid(a)
            })
          }
          n_list = n_list.concat(n_link)
          return dlink.update({
            url: n_list
          })
          .then(() => {
            $('#link-c').click()
            tip("Collection update")
          })
          .catch((error) => {
            // The document probably doesn't exist.
            tip('No se pudo guardar')
            console.error("Error updating document: ", error)
          })
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      })
    } else {
      if (cv == '' && tv == '') {
        tip('Complete los datos correctamente')
      } else {
        let lik = []
        let tit_sesion = ''
        if (tv == '') {
          tit_sesion = new Date().toLocaleString().replace(', ',' - ')
        } else {
          tit_sesion = tv
        }
        if (cv.includes('\n')) {
          cv.split('\n').forEach(function(a) {
            if (a.endsWith('&&')) {
              a = a.substring(0, a.length - 2)
            }
            lik.push(a.trim())
          })
        } else {
          cv.split('&&').forEach(function(a) {
            lik.push(a.trim())
          })
        }
        db.collection("links").add({
          name: tit_sesion,
          url: lik
        })
        .then(function() {
          setTimeout(function() {
            $('#link-c').click()
          }, 2e1)
          tip('Save successfully')
        })
        .catch((error) => {
          tip('Sorry, have an error')
          console.log("Error adding note:", error)
        })
      }
    }
  })
  $('#link-c').addEventListener('click', function() {
    $('.new-link').classList.remove('close')
    $('.new-link').classList.add('close')
    $('#title-link').value = ''
    $('#raw-links').value = ''
  })
  $('.add-link').addEventListener('click', function() {
    $('.new-link').classList.remove('close')
    $('#title-link').removeAttribute('disabled')
    $('#title-link').removeAttribute('data-id-coll')
  })
  
  $('#preview').addEventListener('click', function() {
    $('.preview').innerHTML = marked.parse(ipt.txt.value)
    $('.note').classList.toggle('md')
    if ($('.note').classList.contains('md')) {
      $('#input').blur()
      $('#preview').focus()
      $$('[class*=language]').forEach(function(code) {
        code.classList.add('line-numbers')
      })
      evalPRISM()
    } else {
      $('#preview').blur()
      $('#input').focus()
    }
  })
  $('.bx-menu').addEventListener('click', function() {
    $('.main').classList.toggle('mini')
  })
  $('.view-apps').addEventListener('click', function() {
    $('.root').classList.toggle('change')
  })
  window.addEventListener('keydown', function(e) {
    let ek = e.keyCode
    let ec = e.code
    if (e.ctrlKey && !e.shiftKey && (ec == 'NumpadDivide' || ek == 111)) {
      $('.bx-menu').click()
    }
    if (e.ctrlKey && !e.shiftKey && (ec == 'Enter' || ek == 13)) {
      $('#update-note').click()
    }
    if (e.ctrlKey && !e.shiftKey && (ec == 'KeyM' || ek == 77)) {
      $('#preview').click()
    }
    if (e.ctrlKey && !e.shiftKey && (ec == 'NumpadDecimal' || ek == 110)) {
      $('.view-apps').click()
    }
  })
  $('#filter').addEventListener('input', function(e) {
    let s = e.target.value
    let c = $('.notes-list')
    let ch = c.childElementCount
    while (ch--) {
      let n = c.children[ch]
      if (n.textContent.replace(/\n/g,'').trim().toLowerCase().includes(s.toLowerCase())) {
        n.style.display = ''
      } else {
        n.style.display = 'none'
      }
    }
  })
  $$('[class^=call]').forEach(function(a) {
    let clss = a.className
    clss = clss.split('-')[1]
    a.addEventListener('click', function() {
      $$('[id^=cont]').forEach(function(d) {
        if (d.id.includes(clss)) {
          d.style.display = ''  
          if (d.id.includes('note')) {
            show_note(firedata.last_note_id)
            ipt.tit.removeAttribute('disabled')
            $('.header').setAttribute('data-note-status', 'true')
          } else {
            ipt.tit.value = 'Firenote - ' + clss
            ipt.tit.setAttribute('disabled', '')
            $('.header').setAttribute('data-note-status', 'false')
          }
          if (d.id.includes('link')) {
            let bcont = d.firstElementChild
            let flink = bcont.firstElementChild
            if (!!flink) {
              if (flink.offsetHeight == 0) {
                bcont.classList.add('onestep')
                $$('.card-link').forEach(function(card) {
                  card.classList.remove('min')
                })
                $$('.card-link .action-size').forEach(function(btn_size) {
                  btn_size.click()
                })
                setTimeout(function() {
                  bcont.classList.remove('onestep')
                }, 6e2)
              } else {
                bcont.classList.remove('onestep')
              }
            }
          }
        } else {
          d.style.display = 'none'
        }
      })
    })
  })
  $('.preview').innerHTML = ''
  setTimeout(function() {
    $('.call-todo').click()
  }, 1e3)
  setTimeout(function() {
    let ls = location.search.split('autosave=')[1]
    if (ls !== '' && ls !== undefined) {
      ls = decodeURIComponent(ls)
      let group = ls.split('&&')
      let cgroup = []
      group.forEach(function(gi) {
        let titOr = gi.trim()
        if (titOr != '') {
          cgroup.push(titOr)
        }
      })
      setTimeout(function() {
        $('.call-link').click()
      }, 5e2)
      db.collection("links").add({
        name: new Date().toLocaleString().replace(', ',' - '),
        url: cgroup
      })
      .then(function() {
        tip('Autosave done!')
        setTimeout(function() {
          open(location.href.split('?')[0], '_top')
        }, 3e3)
      })
      .catch((error) => {
        tip('Sorry, have an error')
        console.log("Error adding note:", error)
      })
    }
    console.log('Firenote v3.085')
  }, 8e2)
})