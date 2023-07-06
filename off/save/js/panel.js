(function () {
  setTimeout(function () {
    let pan = document.createElement('div')
    pan.id = 'app-panel-left'
    if (document.contentType.includes('xml')) {
      console.warn('NO INSTALL PANEL.JS')
    } else {
      document.body.appendChild(pan)
    }
    let sdm = pan.attachShadow({
      mode: 'closed'
    })
    let cssIFR = '---app-s'
    function nee(tag, where, css) {
      let t = document.createElement(tag)
      t.className = css
      where.appendChild(t)
      return t
    }
    let apps = [
      [false, 'usat', 'https://intranet.usat.edu.pe/campusestudiante/Default.aspx', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAl9JREFUOE+lkk1IlGEQx/8zz6q7imxFgooprrlr1G7mR7BKsseIwJYSOnSIoIPRwQ4JS4dOHTp4KegQQdHHaQ+GUQh9QYV9KZZgtuKi5KZEuQShbrv7zsS7ppUoFA088Mww82M+/oRVNt0U3A2i46raQMBmAHkKzDL0rRBf2/J64CkBulxGy5+ZxmCdRTgHoB2AWQ3+6QuAB0Y1Ujb0YtgG5QAfmluaSfQWCLXrFK4OzwjkaNXgy/s0HQxuQgZPAGwD4Qsp5hTIAnADKAHgWgeasNhqo+mmlguA1kJxg8HPyj3lHxGNylR9yM1mcQcz7YfSYQBVa4D6bcDBisGBXgLs+da0eGOjO5/y7f2ECTC6tET7La4s8W9m/9zaWrycp1/zdL4EWarxNoTj4zV9QNSq9Ps3mqxpgvAnUt3HhHcTseE7AOy89uJCebyQQrsIigAmIRWq8e2653SkD4yOjqarfQEfqzlL0GI1EhFw2eRY7aNqX3w7Q3qJ+ISAZhharirHiM15G3DX6UiHfwNEcm0SJr7PO3sSiecpT139RRJ+qCx7Kks3dCcSyVI15kw8Ntz5B8BTt9ML5W6XI92VyuZ3AepXY06zJX2i2ktEbQI6ZaxscgWw1ddwU1Sv5tHCqwyKDoHEz9B+BwqGMpq5TtBxJR4jWFOqHAZ0To25TJZEch14vc2eLGdOspJbobMW4YpROmKrkqDvAS4wOt8Ti8W+VVQEXc7CVCfDcVuQ2Tsx/uZS7oyhUMiRTCYLRkZGFrGkBw4EAq4lv4PsC/06c4cBogJ0sB3/Jx2spZX/BvwA01oGvfoBJK4AAAAASUVORK5CYII="],
      [false,'bitrix', 'https://locked.bitrix24.es/', 'https://www.bitrix24.es/favicon.ico', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAj5JREFUOE+lk21Ik1EUx//3PnurgeYyEpk4H4cVyiiSqJCSElIaBYFiMWKpEycLaykEpqw1YlJISYiZzRr2qp8sKqIvjSEhIdWnMtugoA8WQe9rj8+98cxcOVlf9v927zn3xznnfy7hnBNkIJIxALW3BdM6/UGA2AFsAxAHR5iAeiLeXeHU4oo894fAYY6erKlUYqS4694ZmbP21ERCECOcW96css4sxIq67h4HyGm1QGPTnprlCcDZhy/bnr37ZLNXiFM7S1bPTkQ+GBqvTjbEJFmXo9f4pjqru5VEsXO8CsADzkE1Khp75bXOAzjnBQAsAJ4CmAWQa+m+M/01Jq0oN63sG23dfsTUMWoSqGoqR69hn39KWTJjNNKzT7UASLpA6kZpoRHnCODSqoT4cHPFnrr+xyEtxaRAqXnAvrW35cqEOz7HdNHeWroIYHQFDRqVeoxzVGrVQrynflNgb7nJbT56Y4Bx2DqslhFnVWn7mmO33iYA5/f/BRQ4g/lqgYbAIep16m/+A5uDuzcW+otdI1bO0Z9uTTi4n5gP92kxl/1EZmx9btayjxdbdgxtEFddAPC+rO3azI9fkpgOUGo03CQljmGHxORBgRIWdFf7tqzN7wXw5c+jVgB5/wLEpssnlHNkqNEHIETKnMPPv8ckxYUl4iDXo4Em2yJAwyWWAAQc8zMwNwxKsswSlqRKzMsOP/LXK9uZlPnQICME7HWgOWljFwBNmj5fABhLiXkAKFV4l+xBumH97z7j3/gbDGLaE/wJpmgAAAAASUVORK5CYII="],
      [false, 'blackboard', 'https://senati.blackboard.com/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAhNJREFUOE+Vk0trU0EYht8xnBr01JC0UWMVFKwKKrW0VTCLVsWdxW4VBVeBgn9BmgjWpYItJLFaXFgXKaiI1gtCgn/gKAiiVVxoqW1iT+LJpecyn8w0OZI2bXBgZvExz/t+lxmG6nImd0YZ0M+JBogIq7e4JmIgShN4eutwISZiTBzOZEgDqKsRKKEqTB4vCArI1MEJmu9qoZsJZwAjTWFFxU81ATgBhOwIeP6b0I0x4U7EG7q7zso2zJ16jLmkA4/pRXu3gZB1BWT8yDD7/g7aqGZSVDw5MY2s/yjCloHC+He07q9gi34ZQWUBzLq3XSOqr/+fs4pUXwoJfgiXOnLw4BOO/FLhm4lg+fcsFA/LMHMiWJdBI/jirixm9Ac4j06En42ikv1SGx7Y8t12V8AdlbcNqZ4pxJ0DqMFnnA6cfX4LZm7WheUYK8k2KVAHH59G3NzrwifNIAZfjsHKfa2DpUA5EZC0FBHO/wFLgVIioEE0cZOCd6ff4npxDy6EVmoO89049+I2rMXPa5yrrzDDSnH/Sgmb/aB9Q3h9OIIJfUrCg6/GYc5/bAjXgqz0qEcDoQstPrSEb6D0IYk3B4fQ+fRacxjIsOLD3ijAR0QSOcPBn6IJu7wEu7i4obPsG2Mx+ZkKY63uY5rXLRhlpykM0Pvem/yYFBArf0eNEtEA59S/kLdgVPi6jeOMpftGbfEJ8RfQR4dMfDszBAAAAABJRU5ErkJggg=="],
      [true,'bookmarlets', '@off/save', '@_cdn_/favs/commands.64.png', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAVtJREFUOE/tk79Lm3EQxj/3fV/RYGh0EcUphpIpBaliBAf9A8TBTReprauIQrcuCnUQVxdFQZ3ExU0n0RI6OTj5s8HFwSlCQwwk30cSOpQg+Lp703Hc89zdc3cG0D+V7wwC9df8qNZStdPjrWTBauAw9BdAIir4X95Dc8WlLTv9Z9RMB28E19M96nsneEUDyZacKSmYlNg3p13DugQ/ER9eFVH4EUfwWWju8fGpJ5Fo/u48v7xzP0DDkQlAM7n1VHrw6+0eMA5YpDX+18GKYQu59eTq0Jf8p6pjE9QbuQOhlVpFgytJs9bEmSp279HAS4d0B7YIft4HNuaq9g3TR4MdiWXBTnvMLxdK7q9H2ZcICiYby230nAzO3GbwHAGSafp3d+pw4Pom7mJuDZiojzA8lW8rh/4S6Gj4hxIQa4iVgRAIgHyx3Jqpq1kjKYXV1FseqlSOX5xvdxafAagkvRak9cmMAAAAAElFTkSuQmCC"],
      [false,'contacts', 'https://contacts.google.com/?hl=es-419', 'https://ssl.gstatic.com/images/branding/product/1x/contacts_96dp.png', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAgVJREFUOE91Uk1rE1EUPXfyJTUJCWpJJ8GFtMXQRXXXja5sFUXcuC9aLSjUkoyK3Yju/KytG6Fo0I0u7EqRovgHsioIJqDgQo15xg/aTgNNM3lX5iUTptPx7u457553Pw7BE6lcdShAdI6JjwOUbtP0nZiXWsyPxYO+j+4ScpL+qc+ReiQ2T4zzADSvcCeXDF5Ixv5Ol24MbSppRUxySI+J1wAd/U+hB+a3P8zUSSxQUwnoeTEPwiVvcbDThyW3yxJjrjKbylEmV+uXmiwDCLqfjewL4+nZhILGCysoflEdu8PSpJYl3fh5G+CrXvbZRAJHshEFvy83MP5kxWc6ukP6ZVECI+tlJ0YIN0/3Kvj6yxoKRfaZA2XS86IOQo+XJdnEgd3rCl7+HQW0kN9+66QbwgQQdbO7dmo4MbwDB/cGESDC8tcm3nzYQM3cts11W8Be4H5H4NBAGIUzCfSEuxZRVMNiTD1fU0LdIHsEo3oPIMMBX0wmcXgw7GuHUtXC6P0/Lo7uUuZKbUBKWXLOODMWwsXRpK/AYnEVucWGw7XPaGdpQ8wxMK2Y1ibiMKFtnQD2DVZlFAi2T9s1kspsK8fFKzAd8/3aAxJoqWL2nupa2RHpi4tbxGRbeosrXfUWEz+srqWu2cWqE++P6fyvQaB1gQljADKdN9+I8Q4IPKrM7vnkrvkHPCOvr+P/cmgAAAAASUVORK5CYII="],
      [false,'calendar', 'https://calendar.google.com/calendar/u/0/r', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAllBMVEVHcEz0IjWwnzFXkfEYaNX8vQMahDdChfVChfUyolwYgDhChfQwqVP8vQHSjE5LmIl2g6V6j75ChfX///+Osvg6gfX9vgImp06IyJc0qFNwnu/7ugAPZdT/03Td6//r8f29ZT7xcCcmgYUXgDcfjT2qw/X7/f9gle0ib97tOzUXgDDW4vn/1nYVfy41qlR3hKR3g6L/1m19RA+eAAAAEnRSTlMAJR79SE1SS1JSRlNVUPv8TfodulFfAAAAhUlEQVQYlW3P2RaCIBCAYVSi9NgKoqElLmXl/v4vF4xyWv8r5rvgzCD029KEMYb5YLoliZaVegbQCxwG7Yd+BxAwCo2cL2ZIK0Gr8ymODdBUXNk3XN6hFg79gOnThvO1AjfPtxG0yTJbAXm0ZQjJu6VX94qi7I6qUFrTcR4hrs63/1yO0BPWuA8OLhF1bgAAAABJRU5ErkJggg=="],
      [false,'deezer', 'https://www.deezer.com/es/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4jWNgGGjASKoGoVXx/2Hsd2ELGZmo6x4yAIYXPuyXhTtRwPExhrzw8kq4/NvI9sHohTdJhnAnisw7z9iuXwPnV15sYRRo3gXnf6h1Gwxe+NEnCncSR9FrRkJeEE45i4iFOcaDwAsDDwB6xygNEThTQwAAAABJRU5ErkJggg=="],
      [false,'docs', 'https://docs.google.com/document', 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAT0lEQVQ4jWN0afvy/99/BrIAEyMDAxO5mhkYGBj+/WdgYCJfOwSwIHP2VnETpcm57SucTV0XIJtMLBgNA3qFAT6XDYMwYGJiYiRfMyMDAwCS3xcl3vLjgwAAAABJRU5ErkJggg=="],
      [false,'drive', 'https://drive.google.com/drive', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAllBMVEVHcEw0qFMdqFX7vAQSfzjptww0qFNChfRBhfSVvSL+vQIjm0uFVo30uQc3ifszqzwfdrv7vAQ0qFMZZtT7vATuYy3/wQAUZc/qQDY0qFMSpVVSg+n0PBMsnEtChfX8vAM0qFP9wQA1rEgYZtMWhTwdcMTsVTDrQjM1g/Q2h/ryRx0yd+YEfTkab8KrYZqNb7uPmSdgjjCDmDesAAAAHnRSTlMAMV3jsDXkUuAJXe8Z+kStLK2OzokospnJsvLilT8zW0YxAAAAj0lEQVQYlW2P2RKCMAwAAwhaBvC+lRR7DYLX//+cibX6wr7ttpmmAIOcR0T6dyG17l+N+IW9lLovcR48khSeDWIYyigcSkRMvMfkMs4pYP4J7BlAwoV9wSECSDms6MkLMeWTTUMImBljbhPmeLXWrgGWSnU1096d29HNQqna0zpX8Oy2C+Fx8otU4y/V0MffelQPlcRPioEAAAAASUVORK5CYII="],
      [true, 'duolingo', 'https://duolingo.com', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAnZJREFUOE+lk19Ik1EYxn/n+7Y1t6HbbJaSlV5oKUGBN3VTEIRESEQXUVgXXlReRN5YDYwuBKGNhC5ihLtKujL7A0EQhATLuYzKMtRKBBE1nVva/vBt+058WyjR6qb35sA57/N7D+c8jwDoHOaEEFwT0ICgBIkw9v8ogUSSkvBJSnpu7mdQ/BIPKAIhBOh6Uen6pqKAlKBLpJScFFfCvFYVmqxWsNkhtgK5XHGIqoLLDckEpNOQ0xkV3giJcg82PQeqqSCOF4EYYqcbjDWXBUWF6BJJceMdeqkTYVFK2WzeQywzyY/MMvFYodEokwnKXOAwe3CZ61jWxtDkGvE4Uvi+InfYDtFS8YhNShlZmeLZcitTiQdkMwWA2QK77Kc5Uh5EFVbS+gqPv7Uwmwwhbs0gz1Z+pNzSSCQSYWRkhLaLp7g7V4mk8BiKsHBh2yLvR6cYGhqio6ODFTnG/fmmAuDS9jSr8SSBQIBQKEQwGGRQa8hPMsquVnHGNUVvby/hcBi/309NXSV3Zp0bgPEPk3i93rygr6+Ph5nG3wDN+jDt7e35c5/PR2191QbgXNUE1kw13d3dOBwOLnee5+n0Fg5mPHlHvTTHOFqzgK/nNpqm0dXVxaqYoH9+L8I/jay1NXOsYgCzsJOTGs+jbdR/7mdnzpKfOKNqfKlr47A7gCJMaPoaT5aOM5N4gbj+Fr3MibCpHios+4hmxvmuzWGfhtZXhV+4dwASteC0VOM272ZRe0MqFzW+WoqrYRKKgs1aUjBJNgvpVMGuW1cBCQtlYNg832MCw3RGj66TzFtZQNO/E1D8VMLoepgEf0ngX8jSuKQRpv+N80+7rxXXSPaHgwAAAABJRU5ErkJggg=="],
      [false,'firenote', '@off/firenote', '@_cdn_/favs/firenote.64.png', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAktJREFUOE91k19IU3EUx7/nd6shq6DowZcedldYKRGZOCdUQqRBhFJYEP1x1/kQWNRTj73Um1hEYHQ3JSkfDIQCs70YgbtKhSARmN4N+gM9yVqsaW2/E7v3tzV13ZcLv3PO93zO73t+hApfc3cykGfZrvGf21PRPT8r5RTPaG0w2LPgZymeAjgEwpD8Ja/PPNmdbricrPYCy6+HfKnymlUCqvgugJMqKceMPo1pUAr5kEFfaEPupjVQ820dwYneBU8qK8YBHAGglXXJAPwZoL0AcgzE0j+WOz6O1v4u5JQIAmH7GDFi5Wf/mZ2J6Wg8or/5J3CLRdPXxByAWlW0RMBLBs6toVFhmrVMXz1A7BA0GYvtIBorzQ1c3VYlo6mseADAqERCklrjUT3mCAQMe4TI6QYGxmnLpjNW/85sfc/8jo1Se0GgRmL0M9E+gNtcQXpsmfoll6DbngVwwDlmuhiP6MPFrkFjsY5JdHpydGdZy58loiElMGuZ+sGiwFvHdweBOq2IPloJOxi2TzPjmYq9s0x/gztCtx0loEsFBixTv1JgWbdkht3HhBtq1MFp0x9yCcLJVrCccEdDmhld06Y+Vi4SDCWOs+ARANvdPNFmPfK9cgT2X/ju9Xoy7wHUKG8/MdN9EjyTZ5YCKFjWC6BOUc1nVrz1c8PVmdIiBY3EYSYuWOl2cAxBRv03ly3YEjF1rF4kVdEcWmyRQlxTVnnW3MEKQBNCyntT0V2Txdi619h4fmGrVoUWJnEKrJAJH4jl83wWk4WXWS78F3em4BEaM9vVAAAAAElFTkSuQmCC"],
      [false,'github', 'https://github.com/espinozamnj/', 'https://github.com/favicon.ico', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACKUlEQVQ4jY1R32tScRT/fI8wxLm0dq96HbvqnUMylR6CvDXjIr4kRE8+BAVGT+3Nh/oDgp7zKRYFMXqohyD6B6Q5svfRy3BTrEaas6dlTvzebw95x1Vq24EvnHP4/DjnfBmmIpvNXms0Grf6/X5WcK4AAHM4vrtcroqmaa8rlUrVjme23BFaWHg5GA7vTIvawzkz86q1t3cXALcLOAKBwKbgXD+OfOTqcHxqt9sZAJwAIBQMrgvOdcZY9UIyebnT7T4aDIe7DNhmwLYpxKDT7T4AUZoxVhWc66FgcB0AYBhG2i/Lwi/LQlXVtbGJG4DLZuq2plVVdc3CG4aRpma9vmqhEonEi3F6AKBvEzgAIABA07Q3VrNZr6/SYDRaAQBumsN4PN47af9cLtc0hTgEgMFotMJkSfpNjDlB9KXT6YROc0S/39+CaaqmEAOyRjNN0wOATsEnk3PvOBfEiL7iL9OTyWRunMTWdT1PjJ0BAEb0jdyzs5umEPixv88/b229vZ5OX/0f+aauX9nd2Xlu1U6n8wMKhcJFz5xHADhkjPWISBBR3zCMtAUMh8MGEXWt77NesVhMAgAikcgzvyyLe0tLiVgsdluSpI1SqaRZAvl8/pLX650gR6PRJxPjBXy+DVmSfpbLZVUI4cVkzMmS9MsiLyrKu3/uqGnaU2l+fuSTpB4Axa5/5ByJPD72yueXlx8qivKxVquds3qtVuvsYiDwPpVK3Z/G/wGcTcQ2HUf96QAAAABJRU5ErkJggg=="],
      [false,'google', 'https://www.google.com/?igu=1', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAkFBMVEVHcEzg4eL////6+/v////////4+fn9/v7x8vL9/f38/Pz+/v7///////////8dpUb+/PzqOy0xfvPR3/2938T8vQWEq/f79PAvqE7wfHXpMx/l7P08g/WRs/ntYVcjfep1v43ykYv51tR0ofa4zfrv+fdPqUf629fh8OXs04ONyJqNyZpjuHj5zK34qAD8yjs3yEdfAAAADnRSTlMADRWS0qBtLAR85TtHou17CO8AAAChSURBVBiVbY/HAoMgEESxizEjEHvX9P7/f5cF9ZZ32WW2DYxpAu55PGAbtguDay/vgHIxz4KCaQopmWop64mkkIQ90EtZVXVFFY8E4C37AijMHrPh+7kCB6LRW2Igy6g0KKWOQMx2WqD2vMvbHNjpI/fLqMc7dTJnXJyT8pWm49CSt8XXrUyIslmdcWpPH8+UAl+8+1jxt99ZTiRE5FjsHz8fNQziOWMtZgAAAABJRU5ErkJggg=="],
      [false,'gmail', 'https://mail.google.com/mail', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAaVBMVEVHcEzy8/Pkv7zgYlfWTkHfvLrcvLrz9fXk5OTAOCjau7nN1NTQoZ3GdG7v7+/l5ubq6+vePzDj5OTy8vLUQTL0+fneTD/U2NnWUkfKwL/jg3zBLhvs0M7NjorCLBfWXVTCLRjhenOxNSes7OhCAAAADnRSTlMA/vw8QPP4RU9ASv78+ip0XyQAAACBSURBVBiVjc/LFoIwDEXR8hAtLNImJX0Jgv7/R5qyRJ3pmd09u0r9rjl/1cj2GdjtMdyxVW30vubKuYprxEkLjB6zY3YZcXwITKe0op9nj2vqrjuYYUFpCfYAGlKMicwHKIRARmA7wFLZ8AIyACBb4Fags1CyArWA0v3lXa//+PoE6eMK9e2D/AgAAAAASUVORK5CYII="],
      [false,'history', '@off/save/pa55', '@_cdn_/favs/key.64.png', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAX1JREFUOE+Vk0tLAmEUht8zZlRQqxZhKGUiRQRRtBiF7A+0bdNKvKykbXQhhOgCES0kSFGICKLsH7QwQh2EbqtAc1y1alUu0qTmhBMKTsrkWX7feR7e73IIOuXwFGZZUObBQh8TZwUDn6aPbK81jFrx0/5sf6diuATIpekpA7whRW171fWmgrlgouPzxXIPYKJ1QApIUethU4HDJy8zY1cDp0C8D8YWQGMAysQ02lQgeuUkAGeDgGlBilnjokdeAWFb3WOsNk/glbMM2BsTUIHBJwT2A2T63aNIqwQPACb1XgiEnT8Cp1+2KAoyAAZ0BaxMNQiqMCtIMmDWgwkUSketS3VBm/A59xrd0oG5pAp04FsA7wD1AMiB6EwaHLpCkBT1GmfcebPRQCltbCYkCHisUPf6XcT00epIJPryITAFtA2KAfZMeORZ9y5EbyEM9W1rxRfMQq5YLG0+xccrbQuIyZWOWW/0wPo0quNKWFR/JvNX17ewdn08/PZfwQ8LXpFaZVmoqgAAAABJRU5ErkJggg=="],
      [false,'main', '@off', '@_cdn_/favs/main.64.png', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAASZJREFUOE/VkD9Lw3AQhp+riig46OCiIKQB/Qimmy6Cm4OL4GSqBRHcFAdpvoODf0J1cfILiIM4SFsQBycR0hYU3M1Y25zUYm1q1BQnb7v7ve9zv3uFP5Z8509lvFGtyalC9TXB0u1h8iVKGwmwVitTBME5MNE06X2tztzNsfnUCfkCSNnerCJnwEhYrM89QWL+Omfctc9DgNRKeVlFD4CByNMEX+qymM8ZFx/vLcC0Xd4R1AF6f8m1qqJrxSPzpKETULHsyj5outnHKlVwim7SEcsu7QHrsWydIpWNBmATyACTXUIeUN1ufdmyS9oNoOAm373/GNA//th3lZ2ptZ/gA0OxchD8wpgxTFaCT0DaW0BlV2DwJ4iCL+hW3jUvQyHG2hwhegPidGO/f9WYkwAAAABJRU5ErkJggg=="],
      [true,'maps', 'https://www.google.com/maps', 'https://www.google.com/images/branding/product/ico/maps15_bnuw3a_32dp.ico', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAkRJREFUOE+NUltIVFEUXfvcq12daaaHoEhlgYj6E8hMLyOGJhKhoLLG0fyIiIjKj/BDEvuyfiRINAjpT0ordfwQxB5mRCXoTAbRg35kPsxHUfiYmRy9d8eZujIzKrW/ztp7rcU6+xzCKpVVM+EUEJcAzmNAybJoAbsmml/U2T4n0ym5kV0z1QjwFQCqnK1PVTnbqhEBi0SoH6izNsZrEgyCh4uv1ubUNry07VIkSVMUbLNpEFJuFqPyeb21w4TLk2mXywolNG5A2Jqyz+Be5onIdntaeyqRAaKzAGKmCxltkz83DuZ89HRGJV42+OZ2eBn0x5mgvy4sKjne3Dog4cHr8xUgtEftT/Ar4z6EEPuGPZ1DCQbTbkcdQDdk03JsbNZS/d0ef9cDTa/mw5ktFtASCFQ24u3yJSc4z6DWNNcEtL2TrGIpnw7hiyTtabu2W1fH3rCIiJjIMEpHKnv6ExOUFOWm5s98shwJqvJiDAoqpN/8aqRvrvrhvhxiNcNMlCLEliFP53iCgQTR/pRnpLLbJBogXJjZz+8XNy3viokeBcq7yle8gmxEHms7VGXpA4A0iRvmitC3sDV+FWFd58LR077gqgaxFAMp54j5blskj++EChI/muBTfo+va82PZA46enNbboV2XjSA2NJkGcDtt97u6njxih2Yw9y+0nUbZtNHART87b1jS7Q4cLQ3/F8GkuToOOkC8aA86wznaEW3P1m8ZgKT6HhQFgDznL/C51pN/E8D58OyKtaNKX9lz9O1DH4DmRe+EXQZsPQAAAAASUVORK5CYII="],
      [false,'monaco', '@off/code/', '@_cdn_/favs/monaco.64.png', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAUNJREFUOE+t0zFLw0AUB/D/S2PFQRHBRXEwSdW9gw3RSfwCQhEXB43o4Ogk4iooCK5yERx0cuh3kHhVEMGpQhNQRAdFwU2a9EmqlFIhnNSbHtx7v3vcuyN0uKjDejQBZykcjwljKiBTfHMpco9JbhOw3eADQK8KQMDrhTAH2wEmsKiDT9IQgrYFYEYKs3F4awcMxqb0zJ1kw3HDaV8Y50lcWK46Zc/yk9h2g1MAC6lAwQ0PCJyXwpz6Kaow81HZs3aVANsNbgEqSWFsfwPhMcBDUpizasDa3TCizL4U1nyzbc6uS2/kTQlIu8RfQLHImfueSr+ud+dB9aeoVntOA7r07CiDBqLo8/rKmHgne6W6B6YNlfm35xDTIhXcYI6As9aRKmLMmmY33sHkapBDzH2KhY00XaMX/9B8+L/P9JfTW3O/AElEkx7jiAqBAAAAAElFTkSuQmCC"],
      [true,'music', 'https://music.youtube.com/channel/UCSFMRGTyAcCHgE2Fp0xsD_A', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAASZJREFUOE+tky1vAkEQhp8VReJJTRU4DAn9A2BRGFqBgQAGiSX8BUz5EhggJCgsSAxNkCAwbUgafGWbcM3cHGW5IODaUbczO887Ozdj8JkDSaAApIF7L/wBzICegVc7xRwPDoSBF+DJD/Wdh0DFwKf4XYCXLAqifo1JFWmBHAGDM+VIBMpliEYVtt1CqwX7vQ0fGng23puXv5FUCqpVaDRgtVJ3IgH1OjSbMJ/bkEcBdICi6xXldhuyWVXfbOBw0IRQCCYTKJXsSroCeAMe3EuiOp2qcr8P8bhWs1icKslktBq1dwF8AXfucTSCXE5DAsjn9Xs8hloNdrvzO/D9L4A/P+FyE2MxWK+vaqIMT/DfKD1yIPggeQDZg+CjbEGCLZM9m7eu8w8qRo1b9yA1jAAAAABJRU5ErkJggg=="],
      [false,'mp3', 'https://espinozamnj.github.io/_j.em/links/music/', 'https://github.com/favicon.ico', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAgVJREFUOE+NkztMFFEUhr//zmqpNKKxkl0SOy18sINRCzFoorGgNCHRHZQQNNHKysKYGCt8FCIsUqkNhVhhZQXLxlc0sXJ21YgRaYztsjPH7CCbZSSGW57Hd875z7linZcf/LxLy3YKF+82c7GIP8a46XIx+zMdrlbDweBLh0f9AagH8FLBdTOm3SYbmhvtXFr1NQF+oXIMMQW0AQtgY5i+IyZSoMUY9ZaL2Q8NewJYqRy9bSSb6WbG6pOR5w0T043oWmfKRWVsb6OTBOAH4Qyot5EsZ2XgMcaW9fRp2sTD0nhuUIlg9TgEfkR4Rzyid8BWxIiLeBJlnKfYhsD605pkonin8gPhJZnugV2Xqc3EVeBOqZi70prgB9VnYGfWQMxOyh8I72MaxigAFxozu5gDs49yr/2gUgb7VSp2nsgXqqcle74WQEH5oHpX2OVWh8P5s8WO+UQbsVQa7+zvHqj0mSVbapGB8/IL4UWk0dR8T0vF7FmQrdhNflB5CTraGmfiuLqC6naHLQCZtRDNmJh0xmbDBoFDqSK1mqM9WWO+UJmS6Pvv2lJOM27PT+SuJYDuwbDd6noP7NggJKw59r8Zy/1unnJXUN3jsBcbgIQy9cxNZL82T3m1atJJpBt/V5rShJoZI8setxqV//lMra0fPvdpW91pH2inhMXi27J41Zq4Gv8Hmc/LWTxtzQ0AAAAASUVORK5CYII="],
      [false,'notes', '@off/note', '@_cdn_/favs/note.64.png', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAShJREFUOE+1kyFIBFEQhr9/z7N52WJyw2WbGMR+WkxaBBHMghzYTBYRg2DQQ0xabAaz4bgrF0QEg14xLwbD4rG3I7u6sLvHcnvBV95j5r3vzT/8I/7W0vbrzLAytS5jOolFuxnfTpUHDQK/fVX/Sueis5LA4s77DbCRvwDyULiGceSEwWoekgbcA41igNpgj3nIhIBYVAZSAsBgSKXuKFhOqpPU61zMP+d7UCAhfvYJvIGCuAaFt91L92wSQKY1hp10W+7+fwJstwK99LcBaggOYwnjK5AnzMsYSsxi1EoCODDTSxogx1Yw9koBTDzJ+MiZqg645QDGuSP1MxKwBWCzFGDUztlIQRP712Bb4x7/5q3ZabnHGR8UjfPI+JrjW6161zmd86PcD2BypxFYjqA7AAAAAElFTkSuQmCC"],
      [false,'notion', 'https://notion.so/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACPUlEQVQ4jZWTv0tbURSAv5ubHzjcF3zJVBy6CA5uFodCcas4Oah06ZJFMRhqsWD/BLd2cO6WQkHeJKR2aKC4JOAmDyfFvEEIMea+mIJ5ue92aBMaLUI/OJzD4ZzvcIcrpJSOEOKlECIPuEAecK21ozqdTrtKKff29rYVRdG7fr//GYgBhJTyYzabfVMqlcjlcuRyOVzXHctKKaSUNJtN1tfXqVQqX4wxRWNMO2mMcdrtNo1Gg93dXSYmJgCI45hut4vWmiAI0FqjtWZtbY3Ly8tXp6enz1Op1GsBfAIKwOhap9Oh2+0SxzHpdBqlFNlsdiyCIODk5KTKH4EF7OLioq3Vavbs7MxeXV3ZXq9njTH2X3ieZ4HvCf5iZmaG+fl5lFL4vk+lUqHVagFQq9XY2dmhWCxyc3Mz2hkTDDk6OmJpaYnV1VU2Nzex1jI9PU29Xmdubo7JycnHBYVCgUwmQyKRwPM8Dg4OcF0XpRSJxPjKPwVDSqUSAFtbW6On3OdRwcrKCsvLyzSbTba3t/9fALC/v4/jOJTLZer1+kOBEGLwmGBqaoq9vT0Arq+vHwqSyaR3v3lxccFgMKBcLqO1ZmNjg4WFBQCklGOzySiKvmYymQ93d3dvh80gCPA8j3w+j+M4CCE4PDzk/Pyc2dlZAKIo+i0A6Pf771Op1DPf918cHx/T6/UIw5BGo0G1WkVrTRiGo/8QhiG+7yOl/CmGV6WUT6SUP4wxT4UQIdABhnlUCyE61tpQCNGJ4/jbL13AF6Tkh+a3AAAAAElFTkSuQmCC"],
      [false,'office', 'https://office.com', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABmUlEQVQ4jZ2SsW4TQRCGv9k7O2cZKXYRJSIgroxEhIR4AUiBRIF01GkooUK8AIInMOnoCOIBCG0qUqRESkFHwQkkIFZkg2zj3GV3h8JxdIfPETDbrEb//83s7Ahz4nkzag3UdXrOxVdv6t7mQ91pJBz8qZMq8+v24tPcu0e/nGsNvaPnHU9eOFRJ1fIOx9bigwksLBrfLq8kJ951rHexIBgRak6oiZAfOlBi4L4qCdAuAXZXr7yx3iUiE6MRj3hBkAMRtvKuvDyrpLRAKQHqQZAYEczElAruFbC92eunAHeOCoBCFAB1jNjT6ube3e9fSwOz/WnNOYCwuYyMexh7zMaXjzPTtoOz9qsBwYVLSBAh46OqTvF5ZboIuIiEERI2gPfV6nMBzZVJB2H01+YyoLGEBAtIuPB/ABO1wdRSkeDxvwBmVjlfv/3p2GbxMB8zOBnTzUZ8y0ZcW++WdGv7KgCmAvpjetHT48/RzADqH3ave/TZVKRa+voU2AZuzX3CND7HN1pDm3UOs1Fsm/29y6s/d9b2dWbBfgOBf5b+XSdZ3AAAAABJRU5ErkJggg=="],
      [false,'onedrive', 'https://senatipe-my.sharepoint.com/', 'https://p.sfx.ms/images/favicon.ico', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAVZJREFUOE/Fjz1Iw2AQht/7EpNYSqMBK65uOgmCTh2cBKWLIOjuIjj7s4qb4NBBRKir0tlRnN0sWAoODhUE3WpJW5vk8klSS1PbEqGDt773PO8dYcShEXkMF+zcTSuSl4ICVriMy7WXQWX9gt3bScVTryCRBaB0IXpg6W0hv16JinoFmwVNNVNFCcwNee2DVXcRF9m3Tt4WHD1tQNIJfkDyXFDjE+R89Xsk3XB+dbsrCGFRAGTk3HZMThPCrgI+A0TQLROKYXi6lcp5CnLVvdkK4bBU7jQPOlvTBCaSAKs6SIjICtnweSUQyEFg0tRhTY0jkdTCmNlHvebAaXF0vdwjEIJgpRMwLQNjWt9HIRgI7FoLPrd7CQelRyOhLgRg0BpI4kZKoFl30ai7Ns2cv2ZMy7gHoMaBv3N2eT+sm79+X2YSpwRk/iixJeTxs0ifxd8bY/x/wTdbvG/malqqQAAAAABJRU5ErkJggg=="],
      [false,'outlook', 'https://outlook.office.com/mail/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABq0lEQVQ4jY2TP0gbYRjGf3c5TUw4jCbSQUKCFg1CG+Lq0CGLi7TYgu0oNFMgSEFwcnDqUNyyWCh0a4eGky5d7eDicGZTQpGYYiXm2rNH/nuJi545PWOe6Xuf732f73nf7/sErjD44qMfOAL89Ae9qSRHpG5m4vVzx+JofMyJ9itKEvE6aipJvc+TbRBcb3/84wHbA26J+XTiDq9MC4J4u9jvlYgEhmyJrcYF+a33juLWDGIhmU/LT4iFZAAKWo3FjEquaABgNuqOAtYMNpeihANDvMyoJD7sAZBNxXt1ZnfwbHqUje+/2N4vAfB594T1hUkrsXxa5UA9s+LG7yK+2MqR7Rr7Qat8Rj2fxxQHcS+8iVgCBa1GOhEmd/wfgHQizM7hX6uw02xSUVValSrtR2Ha8ghidwuLGZVsKs63q74LWo13Xw9uLJ/8QXrqw3w85TyDXNFgcu3nvdbbw6OYwfE7vAg8+AKFzgWiS6BtlOm0Gva960Xw1Wqnl4h3Zo6ByCxGqYxpguCRwSXdCES/lHoKdKN+bmCUNJDcdF+jTp9f2TMs45Z9VDRdvwSpUYU074/1fgAAAABJRU5ErkJggg=="],
      [true,'play store', 'https://play.google.com/store?hl=es-419', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB8UlEQVQ4jZXQ30uTURgH8O8571ZORhTquShNKMOuu5DwQpQ2IYgguhnVRVdBF4EpYg0tkgLpokDpH7C1txZERAlKduFFjYiMCJGgH24X07Nwurk1977nPF30buaa6A48hwOH53Oe72FExA5/T7kMa6yjrmZP9F1zTw5VLA4AcbnPF8sdD88hMd+wdONc1YBlwLv+u1tks75dKZ4P1awEo/Xp4fYdAzAAuAC16hcq5ZfrTLUtU3bGszoYPpC5c3B7wAXA7UC//ALSJwngeViBRZ2Z86aHbh/N3fduOwHcTiX9AvKEBAANqs1SIfjNkl/HFn0BoItXnqCIFKFkdwkBgEtrH/iVzHQYC2/fI1HXuRlgzolXRi6nZ+WDldcCBIAKx0CpN0h6Ropv/92VQ7LNGW+FEhgqxIELG3cEglZ52ygBRuUfvvliXF6fDAtiTQCHZBfnhdL4aFvo3d1MM/9HMJziwODzh3LgpSm0ZtDEoKYb7cKrxsAPjbZi80aEfxEAwSch2f/ssVCcgRhyNul7lm3f3dsTX2spm9JVnnvAfCT7IhGhOddKqYgFfU18mopVDlkG9I+b8qr5VFgMUQXdu//zRHSrxtIiIoYF+2TfsLkUaz0T/9l6+jwRsZ0WiIi1jE64vxw52zV76JSnmmYiYn8AcG0XEvCySPgAAAAASUVORK5CYII="],
      [false,'raindrop', 'https://app.raindrop.io/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEVHcEwaieEua/ss1e0raPcxaf8ZiOAUg9ws1u0ZiOAbw+cxaf8xaf8s1O0xav8s1O0ftuYxaf8s1O0xaf8yXf8ZiOAr1O0xaf8MtOIwVP8yTf8NuuIXit8RpuEid+sVmOHGNSmZAAAAFXRSTlMADYDR+kpIB0i/6EjR6NGDfGlpRErUA9lyAAAAgElEQVQYlW2P6w6DIAxGq4JKdnWOlnLZ3v8t14IuW+L375ycNABwvG4cux+cnJe56ct+227cLtx/kHNuyb2Ut/LLmF55wBBC8ZkjR7oC3FBFKiYyM1EPF8QkJiiLMIDYkhYQyYlqVCifYVaBSYQynQAezcTKS33IrHtaa9ejf38AUL4NkM2EMAMAAAAASUVORK5CYII="],
      [false,'saved', 'https://saved.io/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAANlBMVEVHcEzvPU/vPU/vPU/vPU/vPU/vPU/vPU/vPU/vPU/vPU/vPU/vPU/vPU/vPU/vPU/vPU/vPU/WoGTTAAAAEXRSTlMADza+xvHXIWnj+F2soYtDfebb7tYAAABrSURBVAiZbY/REoQgCEVJ0zDL9vz/zy4j0e5D9+HMXFC4iLxp0y7SdQu/ArUZjvBFK+TPzjnfU4znMMBiVEb8PbiMiRqFwpzbUPeD1ZfijeQjZmc3LtB/QZrIvdRVaYX8Hz4/MUNXer3S9AUoGQPVy5WMIAAAAABJRU5ErkJggg=="],
      [true,'speedtest', 'https://openspeedtest.com/Get-widget.php', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACdElEQVQ4jV3STWicVRSH8d99Z/Jl2jB2rEGJXYgyVAWRKFHqRCmu3AhRig5dKGpRFFxUoSAIEkXstsUWIpWgxqoLtS/UT2zpFKE1VRvoolGIHyVp8CNN2+ikk3mvm3cg5MDZ3Ydz/s+5wZqqTsSb8QYeEJzoOvvprp7Jsa1CYRBf4mCapsvt98U1cD/24HaJ0Y5zJxe7T3+wO4d/xE70YH+bKayCE7yMRwU7y/vueLc4e+qFELOteBEv4SS2VyqVH6anpxcgWbXAEJ7Gsdjpo1bfwFOS4jaMYzxN02aapt9jDJvbUJJPL+RwSWKsvO/ea4XwPH7H3jRNm20gtJaPxY6rzg6PX+5a7aCCB/FT7PBt1l16Djfi1bk3D01XHzOI+1Fe4DexNSkkJcy3IwyjX/D5hv33FYVkG+YIH/dM2Y5RXI8ldAuFEcKd1YkYitWJGHA3VmLRUYXOQWwWs4OLI+9FmZHcw0ZcyvPP4EmcS7AeN2E+Fv0ci51DKITWla+zdaUKpnP77yDgFiziDwwn6EUZc8W//rwoJBUsWWlMidZjsV4LM7gGD+N9/IoGepP8L3TgQufMNxmhjL9Dc+l8iGaxKb9SA2/jMM5gADMJmlhGKyxfjvllLsWuUiMWTaIvz7tUr4XPkOFxrMPRJBdzHn3NG+4JxIuIsbPX8UfCBbyGLThQnYh78i2G8Eq9FuaTei38i++wqTlw20ZZawpX561eC2dCY/7ZsNIYxYd4HTvqtXBablV1It6KTySO9Jx460jXL1/sxoG8+8V4XciuHD90+Kt/rKmkPQW7ZLb8d9czD2U9G/YSn0CKHUKYjYWuhbUw/A/sGOS0lt+wXQAAAABJRU5ErkJggg=="],
      [true,'telegram', 'https://t.me/joseJAEM', 'https://telegram.org/favicon.ico', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAllJREFUOE91Ul1Ik1EYft6zOZuzmqPZ+sOBWi4dSyoklMKICLwxZgpBUhB0YURE0EUXedMvQd1KF6u0lPVDdBHRD/1BgoJFpQij1E0nC8twM0n3nTe+4za/pp27c87zPO/zvu9DyDpVD3/WEGnHwVQFyNVgSAbGQXgvhPlqd73js5FC6cuOYMQqTZZ2ZuwHWGQLp+4aSASKNGfLvUaa1d+UgE7WYOpmIl/mEQD/R4UIrxLStW+gkWaVwPZg9D4z+xfhM/5SPwZFIehaz4G1p2hrMFoDKd8AWGw7LcDAJrsZe4vy0DGYwOQfqStqkKKCtnWGuyTQtJRbq5nQUJKPOrcNpfYcBfE/GcfwVHIeLqiVKu8ODwFwGwXKCiw4VLYCu9ZbQSD0xmawc12eglQHI5jRlAN9hB9py52h3wCsutv64nw0lC6Hx5GrpvtsJIGOwTgu1zixxmZGdDqJukejC7UIcfJ1fEuA2VawzISTlQ7s3mBDYk7iYu8ERuNJtO1xwWk1K9KL8DROv40ZzU6Srz0UYqaSf8PBaoXP/W4U5s2T9XO9bwKB/l9GaA9V3A7dIubmpYboXZWL89UuuFda1HfLyzG8G9M7To8AZ8gb+OplmvvADNPCewYAiyAcLnfgoMcO/+MR/JhJbYCQlJRTrDZdfnPwBiQfTeckkx9DDrIdEuHslyOeCwqyOdhvoTieMlC7VCvZkRZEnc5wrPl1a20yU0wX4Sm+BPAJYL6dbCIBSSJxrjDy/YpOVknIrrix7VOZMFMTS9QTuBg6CRQC0QPSqGvgWHnYyPkLqozLWI6Mi7UAAAAASUVORK5CYII="],
      [false,'tiktok', 'https://www.tiktok.com/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAb1BMVEVHcEz/epX/v8wRsaz///8AAABS5t8AAAAAAAAAAAC4ACD/pbYAj4oA1M0zBAn+8PSb+/YJWFXuE0j/bouF9PBUAA2PYGmVycYALis6TUzm////+fq5WGw+1tD4LV6VYWvpb4eaAAD/iaGTAABszMkY2aGzAAAACnRSTlMA////////IPu/6uzizwAAAIxJREFUGJVVz+kSgyAMBOAUN3IIaNXeh73e/xlrgLGVP5l8M2F2ibQ1XJ6xmkiXpaq2MjTZAjWUDEtmAezlivgHOMxXf9ACTQEfPrHGMKlNhtChfdaYt10C36EZ3gk4QUDj5I8FbnjxCiq0kf2IewbDxzMwdlAu1ZHop8scSvWco0u5eH30LueTuuv6X79aB4ogtN9yAAAAAElFTkSuQmCC"],
      [false,'translate', 'https://translate.google.com/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACOUlEQVQ4jX2ST0hUURTGf/e+Ny/nn4ma05BOlIYFTZsGoj9Gi2gTRLUoCIpA3bRq1SpoIGpXSyFpWVCrNpFQG1GCiHBRGJkSKISmpM6Yo857954W8ydngrlw4HIv3znf951PXX28+tRop18ELICAACIQNiunX9xJjdPg6EA5/aBBaVRdbZimgUZgAC2UJ9ZNF0BcdS2bnfQaNXClcpP/P5WOuK2HI5+npqanPc+1ruuKtWCMRWuRQiF46VaAu+LQ3+fTHoX5HDx6GyIQmFmN9p4p/u6NRiM4jkZECIUcRIR43LnoVigP9Pm8+eIwMaeJN0FgS++zuQjL+QU8r0A8FkEpVeuBLevtaBYm5jRnD1nunvd5eMkHwIji21KE4laRe8PPERFESrRFhKqExbzi6F7Lu6+a3Aac7LFVY8dnLKsLExzs6uTZyCjLa+t0Jdq5cCrzz8QnYyEG+3xunDAs5RVDo051K2sk2RlvI92T4MfPedLdKY4c2Ie1FrfMhoUc3H8dqtmIlGn6othUnYy8/0C4yeN4uhff93EcBy1SMottJdvAFRnfcy1sFQNQCmMM1lqCIKgNkgC2bJLdBhZgNt/MuWMZ0t0pXo19xBhbkhBsbg1pz7tVnycRUAqU0oiAweVXsZVMqpmWWAQRCzjULrXuZLOfIuOTi+sAsZjD7ZsJkokwSoHWGqUUunGDTGH/Hnc2vEMzeKWN9tZQNQOVHDRsAJDcbR9cv9xMssNBxCJS0m6MYWnlz/BfVT0X3fHmE3AAAAAASUVORK5CYII="],
      [false,'trello', 'https://trello.com/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABP0lEQVQ4jX2TsU7DMBCGP1sWQ0aEBMqYx6FdeIA8BxMdmGDjHTIgsXShfQNeohVdEFGRkKouneI7hsRJ09pYsmTf/fr//+5sw5teUG8fMVKimoMBlHaFs2G0DDVqK/KbmeHl6wnR+zg+QTCknx1eSkynKB1W4viBLDi0pUObHG0V3u+umRQZAMvNgcl8C5hRfLE5MJ3/dARN7pBBLoAAbosMVEDH8UmRgfj+7lCfrlEEVM/j2omq4oJKnMDHuUcOvAeTcpDI6VD2/w5UiSaPHFjEd82KzE4a8J7Fet+HFuv9gFfpHKSaqAoI09fPEGD8DkIJqYcjTduDMIlwDn1RsO2oPKhnudoNVle71uZxiZFtePj4BvKEh5OSOP1rtUWl6hmDmvj4PndUOdzljOYXhBI0H03tTDH0wNZYrXBXsz9WycsKSyBFtgAAAABJRU5ErkJggg=="],
      [false,'tasksboard', 'https://tasksboard.com/app', 'https://tasksboard.com/favicon.png', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHZJREFUOE9jZEi7dYuBgUGVAQP8388wS90JJKzW8vciA8N/PUw1DGcYGdJu/cciARL6xjBLjRtiwJ+fDAwMbNjUjRrAwAAKg4MMDAymGAHEyLCSYaZaIuFAxBEFyML4Y2HUAEYigoBAUibChEERC6DEZofFsTsAvzJJ5XXwAaMAAAAASUVORK5CYII="],  
      [true,'videos', '@links/youtu-be.html', '@_cdn_/favs/youtube.64.png', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAUpJREFUOE+tkz9LQnEUht/3mjcjJazBJQrxCzgJWkEfIBwCJ0siXWopKIigwSkIEfoCEi3t0doUUbQFETV0BaWlpaF/SN1+b5RLphlWZ37Owzmc9xB/LP6xHx+CVEqeap8T9cAKGxo/wH5LbJAbSoBuId51GTqHQ+Ez5GkYy1wMeGz7BECkw2lOu+3aGONZZxXEeofNdZyaZDxX3gaUaSG4BxBoJxaxxET2aldk8itIcBo0rsRNAKHWIhYYzzl7ACaaACF9XIrsjM+f+2vPPQuE1gD4PnOCij8KRucqQffFLRJIA7CbBN+tIGLKAgYlrAAItlpBwgYTWWdLxEwL4BFAb9vrEIuMZ8vLoAq/OaPEJEdmLwPG8h4AiHYo2UfATtbjmpcVu64Me6HQK1wfafllGqNMS5LMA+V5InBzVApX35P0P8/U4egN+BtMCXSmM/M4TQAAAABJRU5ErkJggg=="],
      [true,'viewer', '@off/view', '@_cdn_/favs/files.64.png', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAUBJREFUOE/t079Lw0AUB/Dvu9aiCILg5NLhFBcFoYMmgzi5OPoHCJoixUHERZ1FVxdRakLAwf9BJwVtClV0dbiKOEvpItrSe9JIJElTxcHN2+493od3Px4htqZW1KhoYQ2gnnCKiKus9Xkj1f9wWxx+DXIUBwxLXQKYiccB8ph0kVgsNkTvfIAkATcAct0BcgG6CBAfmLZUAYxs2ZGbhqW6AHjitJhFkyfaNS2t7yvuyLMPGJY6JSBXsuXYNwAAqgJca9cQcFCypftLIHQwxrbnyL1/4I/u4BqA2fmROiLrni33/Vcwl5XLhIV6/W1oYDAzLjQVGCIyC5G5YH4RmfTO1WG29gksVedY8BmAo4bo2wgPy0+dfM2CkVe7YGwBaAJ4TypkxknZkauRbsIbM/84ycw5QKeSACK6Kx3LSjj3AeakshGEjJ6yAAAAAElFTkSuQmCC"],
      [false,'whatsapp', 'https://web.whatsapp.com/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAZlBMVEVHcEzt7+77+/v7+/vo5+jz9vRibGX6/Pvi5ePz8fL////////v7u/7+fr69vn18vX//v8MwUMAvjAAvzcAvCcCwUDY8NyX3aXs9+6+6cbP7tUoxVA4x1pt0YKj4K+G2Jex5LtQy2xNCFTjAAAAEHRSTlMASLpaYicR+jqSk9+pb+THwpF8BgAAAKxJREFUGJU1j1kSwjAMQ00JTcuq2M7WFe5/SZIU9CfNs0ciqjpdu+56or8Gi/B+B9jh8GdkzyLsM87VXxCVXZHXiEsJbpPO2TXpdKvAwhOiNGYpyCMpB2Q5kPSgcWLZ8RHnvXMcRhoDl1vMvMzSAmPVOQmIqTxSGOqxeud5AxB5RU/UhdpCeP0wp3vp8dyUpUUSbAF6bDntXtXvtnoywOsOWAuMx/I2cTDmN/ULgFMONthigHoAAAAASUVORK5CYII="],
      [false,'youtube', 'https://www.youtube.com/', '', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAJ1BMVEVHcEz/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/////mJj/wcH/jY3aUCqcAAAACHRSTlMA8czbELSvDrGIfzkAAABCSURBVBiVY2AgA7CwMTMycgABIyMzGztQgIkDCTABBThQAEyAixtNgIeTkwu/AIYWZEMxrGVhZWaE8BiZWVnI8RoAJWEEDt2WmW4AAAAASUVORK5CYII="],
    ]
    let s = nee('style', sdm, '')
    let css = `
      .${cssIFR}{height:100vh;position:fixed;left:-3px;top:0;bottom:0;z-index:1000000000;border:none;width:48px;transition:all 0.2s;transform:translateX(-100%);}
      .${cssIFR}.show{transform:translateX(0);left:0px;background-color:rgba(0,0,0,0.17);backdrop-filter:blur(0px) brightness(1) saturate(2);box-shadow:-1px 0px 4px 1px rgba(0,0,0,0.513);}
      .${cssIFR}{height:100%;min-height:100%;background-color:transparent;direction:rtl;}
      .group{box-sizing:border-box;padding-top:50px;height:100%;overflow-y:overlay;overflow-x:hidden;}
      .group::-webkit-scrollbar{background-color:transparent;width:4px;height:0;}
      .group:hover::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,0.117);}
      .group::-webkit-scrollbar-thumb:hover{background-color:rgba(0,0,0,0.397);}
      .link{overflow:hidden;display:flex;align-items:center;justify-content:center;text-decoration:none;transition:all 0.3s;height:48px;}
      .link.hid{height:0px !important;opacity:0 !important;}
      .link:last-child{margin-bottom:96px;}
      .link:hover{background-color:transparent;}
      .link img{width:18px;border:0px solid white;border-radius:6px;padding:6px;background-color:white;box-shadow:0px 1px 2px 0px rgba(0,0,0,0.2);transition:all 0.2s;}
      .link:hover img{border:4px solid white;box-shadow:0px 1px 2px 0px rgba(0,0,0,0.6)}
      .over{cursor:pointer;height:50px;background-color:rgba(0,0,0,0.1);border:none;border-right:2px solid rgba(255,255,255,0.3);position:fixed;left:0;top:25%;z-index:1000000001;width:8px;transition:all 0.2s;border-radius:0px 8px 8px 0px;background-clip:padding-box;}
      .over.show{/*left:48px;*/}
      .over:hover{background-color:rgba(0,0,0,0.8)}
      a.hidd{height:0px;opacity:0}
      .all a.hidd{opacity:1;height:48px}
      .finds{position:absolute;left:0;top:0;transition:all 0.3s;}
      .finds::before{content:"";opacity:0;pointer-events:none;transition:all 0.3s;position:absolute;height:68px;width:48px;top:0;left:0;background-image:linear-gradient(to bottom,#00000052,transparent);}
      .finds.scrolled::before{opacity:1;}
      #find::selection{background-color:#7692f19e;}
      #find{font-size:14px;box-sizing:border-box;position:relative;z-index:1;direction:ltr;transition:all 0.3s;border:2px solid #e5e5e5;width:36px;padding:8px 12px;text-align:center;margin:6px;border-radius:4px;box-shadow:0px 2px 6px -2px #00000025;}
      #find:focus{border:2px solid #f2f2f2;outline:none;box-shadow:0px 2px 6px -2px #00000058;width:200px;text-align:left;}`
    s.innerHTML = css.replace(/\n +/g, '\n')
    let bar = nee('div', sdm, cssIFR)
    let group = nee('div', bar, 'group')
    let nav = nee('div', sdm, 'over')
    let finds = nee('div', bar, 'finds')
    group.addEventListener('scroll', function(){
      if (group.scrollTop > 50) {
        finds.classList.add('scrolled')
      } else {
        finds.classList.remove('scrolled')
      }
    })
    function show_panel(){
      bar.classList.toggle('show')
      nav.classList.toggle('show')
      console.log(pan)
    }
    function show_all_panel(){
      group.classList.toggle('all')
      console.log(pan)
    }
    function hidden_toggle() {
      if (nav.style.display == 'none') {
        nav.style.display = ''
      } else {
        nav.style.display = 'none'
      }
    }
    function resize_on_zoom() {
      let wzoom = Math.round(window.devicePixelRatio * 100)
      let invert_zoom = Math.round(1 * 100 / wzoom * 100) / 100
      bar.style.zoom = invert_zoom
      nav.style.zoom = invert_zoom
    }
    nav.addEventListener('click', function() {
      show_panel()
    })
    nav.addEventListener('wheel', function() {
      hidden_toggle()
    })
    nav.addEventListener('contextmenu', function(e) {
      e.preventDefault()
      show_all_panel()
    });
    let i_search = document.createElement('input'), clearInput
    (function(){
      let i = i_search
      i.setAttribute('type', 'text')
      i.setAttribute('placeholder', '#')
      i.setAttribute('id', 'find')
      i.setAttribute('autocomplete', 'off')
      i.setAttribute('spellcheck', 'false')
      finds.appendChild(i)
      function search(name) {
        let childs = group.children
        let _i = 0
        while(_i < childs.length) {
          let child = childs[_i]
          if (child.title.includes(name.toUpperCase())) {
            child.classList.remove('hid')
          } else {
            child.classList.add('hid')
          }
          _i++
        }
      }
      clearInput = function() {
        i.value = ''
        search(i.value)
      }
      i.addEventListener('focus', function(){i.setAttribute('placeholder', 'Search...')})
      i.addEventListener('blur', function(){i.setAttribute('placeholder', '#')})
      i.addEventListener('input', function(){search(i.value)})
      i.addEventListener('dblclick', function (){clearInput()})
    })();
    apps.forEach(function (a) {
      // dir_project
      let url = a[2].replace('@', 'https://espinozamnj.github.io/_j.em/')
      let itm = nee('a', group, 'link')
      if (a[0]) {
        itm.classList.add('hidd')
      }
      itm.setAttribute('title', a[1].toUpperCase())
      itm.setAttribute('href', url)
      itm.setAttribute('rel', 'noreferrer nofollow')
      itm.setAttribute('target', '_blank')
      itm.addEventListener('auxclick', function(e) {
        if (e.button == 1) {
          clearInput()
          setTimeout(function() {
            show_panel()
          }, 5e2)
        }
      })
      let img = nee('img', itm, '')
      if (!!true) {
        img.src = a[4]
      } else {
        if (a[3] == '') {
          img.src = 'http://s2.googleusercontent.com/s2/favicons?domain=' + url
        } else {
          img.src = a[3].replace('@', location.protocol + '//espinozamnj.github.io/')
        }
      }
    })
    window.addEventListener('keyup', function (e) {
      if (!e.altKey && e.ctrlKey && e.shiftKey && e.code == 'KeyQ') {
        hidden_toggle()
      }
      if (!e.altKey && e.ctrlKey && e.shiftKey && e.code == 'Space') {
        show_panel()
      }
      if (e.altKey && e.ctrlKey && e.shiftKey && e.code == 'Space') {
        show_all_panel()
      }
    })
    if (top !== self) {hidden_toggle()}
    // show_panel()
    resize_on_zoom()
    window.addEventListener('resize', function(){resize_on_zoom()})
  }, 5e2)
})()