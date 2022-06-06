if ('serviceWorker' in navigator) {
  // declaring scope manually
  // dir_project
  navigator.serviceWorker.register('/_j.em/sw.js', {scope: '/_j.em/'}).then(function(registration) {
    console.log('Service worker registration succeeded:', registration)
  }, /*catch*/ function(error) {
    console.log('Service worker registration failed:', error)
  })
} else {
  console.log('Service workers are not supported.')
}