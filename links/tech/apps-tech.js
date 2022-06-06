let nwOBJ = convert(_tech)
// console.log(nwOBJ)
document.getElementById('json').value = JSON.stringify(nwOBJ,undefined,2)
setTimeout(function(){document.getElementById('toggle-panel').click()},1e3)