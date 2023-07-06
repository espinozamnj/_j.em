function qS(elmt) {
    return document.querySelector(elmt)
}
function tS(d) {
    return JSON.stringify(d)
}

function shw(data) {
    let ob = data
    for (var p in ob) {
        var tss = ob[p]
        var fd = tss['path']
        if (fd.startsWith('/')) {
            fd = fd.substring(1, fd.length)
        }
        fd = fd.split("/");
        var ubi = "";
        fd.forEach(a => ubi += `<span>${a}</span>`)
        let item = document.createElement("div"),
            nm = document.createElement("p"),
            lk = document.createElement("p"),
            p_fd = document.createElement("p")
        nm.classList.add('nm')
        nm.innerText = tss['name']
        lk.classList.add('lk')
        lk.innerText = tss['url']
        p_fd.classList.add('fd')
        p_fd.innerHTML = ubi
        item.classList.add('itm')
        qS('.con').appendChild(item)
        item.appendChild(nm)
        item.appendChild(lk)
        item.appendChild(p_fd)
    }
}

function carp(data) {
    let tr = {},
        ob = data
    for (let p in ob) {
        let fd = ob[p]['path']
        fd = fd.substring(1, fd.length)
        fd = 'all/' + fd
        let cur = tr
        fd.split("/").slice(1).forEach(function (elem) {
            cur[elem] = cur[elem] || {}
            cur = cur[elem]
        })
        //console.log(fd)
    }
    return tr
}
function dir(data) {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    let tr = [],
        ob = data
    for (let d in ob) {
        let dr = ob[d]['path'],
            uq
        dr = dr.substring(1, dr.length)
        dr = dr.split("/")
        let l = 0
        while (l < dr.length) {
            tr.push(dr[l])
            l++
        }
        uq = tr.filter(onlyUnique)
        tr = []
        tr = uq
    }
    return tr
}
function cnt(toFind, data) {
    let _f = toFind
    let ob = data
    let _F = '/' + _f
    let results = ob.filter(element => element.path.toString().toLowerCase().includes(_F.toLowerCase()))
    return results.length
}
function convert(data) {
    let d_ = data
    var all_d = carp(d_)
    for (let k = 0; k < d_.length; k++) {
        b = d_[k]
        fd = b["path"]
        fd = fd.substring(1, fd.length)
        fd = 'all/' + fd
        fd = fd.split("/")
        let o
        for (let i = 1; i < fd.length; i++) {
            if (typeof (o) == 'undefined') {
                o = all_d
            }
            let dir = fd[i].toString()
            if (i == fd.length - 1) {
                o = o[dir]
                if (tS(o) == '{}') {
                    o.items = []
                } else {
                    // o.items = false
                    //console.log(tS(o))
                }
                let i_bk = []
                i_bk.push(b.name)
                i_bk.push(b.url)
                if (!!o.items) {
                    o.items.push(i_bk)
                } else {
                    if (!!o.chd) {
                        o.chd.push(i_bk)
                    } else {
                        o.chd = []
                        o.chd.push(i_bk)
                    }
                }
            } else {
                o = o[dir]
            }
        }
    }
    return all_d
}