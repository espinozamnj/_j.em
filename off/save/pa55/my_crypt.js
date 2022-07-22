var spy = {
    di: `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@[];$"',.{}()_^!¡#/&\\+%*¿?:`,
    do: function encryp(text, key = '', mode_encode = true) {
        let key_c = ''
        key == '' ? key_c = 'qwerty' : key_c = key
        var dicc = spy.di
        function nmb(lt) {
            let numero = dicc.indexOf(lt)
            if (numero == -1) {
                numero = 'false'
            }
            return numero
        }
        let dividido = '', largo_div = 0, resultado = '', all_dic = '', repeat_dicc = 0
        dividido = text
        largo_div = dividido.length
        repeat_dicc = Math.round(largo_div / key_c.length) + 1
        while (repeat_dicc--) {
            all_dic += key_c
        }
        // console.log('==', all_dic, '====')
        let i = 0
        while (i < largo_div) {
            let letra, numero_ini, numero_add, numero_f, final, clave
            letra = dividido[i]
            clave = all_dic[i]
            numero_ini = nmb(letra)
            numero_add = nmb(clave)
            // console.log(`${letra}: ${numero_ini} <--> ${clave} : ${numero_add}`)
            if (numero_ini == 'false' || numero_add == 'false') {
                final = letra
            } else {
                if (mode_encode) {
                    numero_f = numero_ini + numero_add
                } else {
                    numero_f = numero_ini - numero_add
                }
                if (numero_f < 0) {
                    numero_f = dicc.length - Math.abs(numero_f)
                }
                if (numero_f >= dicc.length) {
                    numero_f = numero_f - dicc.length
                }
                final = dicc[numero_f]
            }
            // console.log(`-- saliendo suma ${numero_f} y por ende :::: ${final}`)
            resultado += final
            i++
        }
        return resultado
    }
}