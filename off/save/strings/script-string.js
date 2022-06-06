// =========================================================
// Constants (Sample Text)
// =========================================================

// Loaded in from an another Pen
// https://codepen.io/adrianparr/pen/eeb3f57c889eb9b902055db69821d6dc

// =========================================================
// Global variables 
// =========================================================

let savedText = '';
let history = [];
let historyIndex = null;


// =========================================================
// Init 
// =========================================================

function init() {
    const params = new URLSearchParams(document.location.search.substring(1));
    const queryParamText = params.get('text');
    const queryParamBase64 = params.get('base64');
    if (queryParamText && queryParamText.trim() !== '') {
        $('#main-textarea').val(queryParamText);
    } else if (queryParamBase64 && queryParamBase64.trim() !== '') {
        console.log(queryParamBase64)
        console.log(b64DecodeUnicode(queryParamBase64))
        $('#main-textarea').val(b64DecodeUnicode(queryParamBase64));
    } else {
        $('#main-textarea').val('');
    }
    updateHistory();
}


// =========================================================
// History functions 
// =========================================================

function updateHistory() {
    if (historyIndex < history.length-1) {
        history = history.slice(0, historyIndex+1);
    }
    history.push($('#main-textarea').val());
    if (history.length > 1) {
        $('#btn-history-undo, #btn-history-clear').prop('disabled', false);
    } else {
        $('#btn-history-undo').prop('disabled', true);
    }
    $('#btn-history-redo').prop('disabled', true);
    historyIndex = history.length-1;
    $('#history-legend').text('History ('+ (historyIndex+1) +' of '+ history.length +')');
    //logHistory();
}

function clearHistory() {
    history = [];
    updateHistory();
    $('#btn-history-undo, #btn-history-redo, #btn-history-clear').prop('disabled', true);
}

function undo() {
    historyIndex--;
    if (historyIndex <= 0) {
        historyIndex = 0;
        $('#btn-history-undo').prop('disabled', true);
    }
    $('#main-textarea').val(history[historyIndex]);
    $('#btn-history-redo').prop('disabled', false);
    $('#history-legend').text('History ('+ (historyIndex+1) +' of '+ history.length +')');
    //logHistory();
}

function redo() {
    historyIndex++;
    if (historyIndex >= history.length-1) {
        historyIndex = history.length-1;
        $('#btn-history-redo').prop('disabled', true);
    }
    $('#main-textarea').val(history[historyIndex]);
    $('#btn-history-undo').prop('disabled', false);
    $('#history-legend').text('History ('+ (historyIndex+1) +' of '+ history.length +')');
    //logHistory();
}

$('#main-textarea').on('change', function(event) {
    updateHistory();
});

$('#main-textarea').on('keyup', function(event) {
    let ignoreWhichKeys = [16,17,18,27,91,93,37,38,39,40];
    if (ignoreWhichKeys.indexOf(event.which) === -1) {
        updateHistory();
    }
});

function logHistory() {
    console.clear();
    console.log(history);
    console.log('historyIndex:', historyIndex);
    console.log('history['+historyIndex+']:', history[historyIndex]);
}


// =========================================================
// Wordwrap checkbox
// =========================================================

$('#word-wrap-checkbox').on('change', function(event) {
    if ($(this).prop('checked')) {
        $('#main-textarea').addClass('wordwrap');
    } else {
        $('#main-textarea').removeClass('wordwrap');
    }
});



// =========================================================
// Event handler for clicking on legends
// =========================================================

$('legend').click(function() {
    let $fieldset = $(this).closest('fieldset');
    let $content = $fieldset.find('.fieldset-content');
    $content.slideToggle('fast');
    $fieldset.toggleClass('collapsed');
});


// =========================================================
// General fieldset
// =========================================================

$('#btn-clear-textarea-1, #btn-clear-textarea-2').click(function(event) {
    $('#main-textarea').val('');
    updateHistory();
});

$('#btn-collapse-panels-1, #btn-collapse-panels-2').click(function(event) {
    let $fieldsetContent, $fieldset;
    let $fieldsetContents = $('.fieldset-content').not('.general-fieldset-content');
    $fieldsetContents.each(function() {
        $fieldsetContent = $(this);
        $fieldsetContent.slideUp('fast');
        $fieldset = $fieldsetContent.closest('fieldset');
        $fieldset.addClass('collapsed');
    });
});

$('#btn-expand-panels-1, #btn-expand-panels-2').click(function(event) {
    let $fieldsetContent, $fieldset;
    let $fieldsetContents = $('.fieldset-content').not('.general-fieldset-content');
    $fieldsetContents.each(function() {
        $fieldsetContent = $(this);
        $fieldsetContent.slideDown('fast');
        $fieldset = $fieldsetContent.closest('fieldset');
        $fieldset.removeClass('collapsed');
    });
    if (event.target.id === 'btn-expand-panels-2') {
        const $controlPanel  = $('aside.control-panel');
        $controlPanel.scrollTop($controlPanel[0].scrollHeight);
    }
});

$('#btn-jump-to-top-of-control-panel').click(function() {
   const $controlPanel  = $('aside.control-panel');
        $controlPanel.scrollTop(0);
});


// =========================================================
// Clipboard fieldset
// =========================================================

$('#btn-clipboard-select-all').click(function() {
    $('#main-textarea').select();
});

// $('#btn-clipboard-copy').click(function() {
   
// });

$('#btn-clipboard-cut').click(function() {
   setTimeout(function(){
        $('#main-textarea').val('');
        updateHistory();
   }, 200);
});


// =========================================================
// History fieldset
// =========================================================

$('#btn-history-undo').click(function() {
    undo();
});

$('#btn-history-redo').click(function() {
    redo();
});

$('#btn-history-clear').click(function() {
    clearHistory();
});


// =========================================================
// Font fieldset
// =========================================================

$('#font-family').change(function() {
    const fontFamily = $(this).val();
    setFontFamily(fontFamily);
    localStorage.setItem('fontFamily', fontFamily);
});

$('#font-size').change(function() {
    const fontSize = $(this).val();
    setFontSize(fontSize);
    localStorage.setItem('fontSize', fontSize);
});

$('#font-weight').change(function() {
    const fontWeight = $(this).val();
    setFontWeight(fontWeight);
    localStorage.setItem('fontWeight', fontWeight);
});

$('#line-height').change(function() {
    const lineHeight = $(this).val();
    setLineHeight(lineHeight);
    localStorage.setItem('lineHeight', lineHeight);
});

$('#letter-spacing').change(function() {
    const letterSpacing = $(this).val();
    setLetterSpacing(letterSpacing);
    localStorage.setItem('letterSpacing', letterSpacing);
});

$('#color-theme').change(function() {
    let colorTheme = $(this).val();
    setColorTheme(colorTheme);
    localStorage.setItem('colorTheme', colorTheme);
});

let fontFamily;
if (window && window.localStorage) {
    fontFamily = localStorage.getItem('fontFamily');
}
if (fontFamily) {
   $('#font-family').val(fontFamily);
   setFontFamily(fontFamily);
}

let fontSize;
if (window && window.localStorage) {
   fontSize = localStorage.getItem('fontSize');
}
if (fontSize) {
   $('#font-size').val(fontSize);
   setFontSize(fontSize);
}

let fontWeight;
if (window && window.localStorage) {
    fontWeight = localStorage.getItem('fontWeight');
}
if (fontWeight) {
   $('#font-weight').val(fontWeight);
   setFontWeight(fontWeight);
}

let lineHeight
if (window && window.localStorage) {
    lineHeight = localStorage.getItem('lineHeight');
}
if (lineHeight) {
   $('#line-height').val(lineHeight);
   setLineHeight(lineHeight);
}

let letterSpacing
if (window && window.localStorage) {
    letterSpacing = localStorage.getItem('letterSpacing');
}
if (letterSpacing) {
   $('#letter-spacing').val(letterSpacing);
   setLetterSpacing(letterSpacing);
}

let colorTheme;
if (window && window.localStorage) {
    colorTheme = localStorage.getItem('colorTheme');
}
if (colorTheme) {
   $('#color-theme').val(colorTheme);
   setColorTheme(colorTheme);
}

function setFontFamily(fontFamily) {
    $('#main-textarea').css('font-family', fontFamily);
}

function setFontSize(fontSize) {
    $('#main-textarea').css('font-size', fontSize);
}

function setFontWeight(fontWeight) {
    $('#main-textarea').css('font-weight', fontWeight);
}

function setLineHeight(lineHeight) {
    $('#main-textarea').css('line-height', lineHeight);
}

function setLetterSpacing(letterSpacing) {
    $('#main-textarea').css('letter-spacing', letterSpacing);
}

function setColorTheme(colorTheme) {
    switch(colorTheme) {
        case 'green-on-black':
            $('#main-textarea').css('color', '#009c0f');
            $('#main-textarea').css('background-color', '#000');
            break;
        case 'white-on-black':
            $('#main-textarea').css('color', '#fff');
            $('#main-textarea').css('background-color', '#000');
            break;
        case 'light-on-dark':
            $('#main-textarea').css('color', '#e8e8e8');
            $('#main-textarea').css('background-color', '#252525');
            break;
        case 'dark-on-light':
            $('#main-textarea').css('color', '#4e4e4e');
            $('#main-textarea').css('background-color', '#e8e8e8');
            break;
        case 'black-on-white':
            $('#main-textarea').css('color', '#000');
            $('#main-textarea').css('background-color', '#fff');
            break;
        default:
            break;
    }
}

$('#btn-font-reset-to-default').click(function() {
    const fontFamily = 'Source Code Pro';
    $('#font-family').val(fontFamily);
    setFontFamily(fontFamily);
    localStorage.setItem('fontFamily', fontFamily);
    
    const fontSize = '18px';
    $('#font-size').val(fontSize);
    setFontSize(fontSize);
    localStorage.setItem('fontSize', fontSize);

    const fontWeight = 'lighter';
    $('#font-weight').val(fontWeight);
    setFontWeight(fontWeight);
    localStorage.setItem('fontWeight', fontWeight);

    const lineHeight = '1.4';
    $('#line-height').val(lineHeight);
    setLineHeight(lineHeight);
    localStorage.setItem('lineHeight', lineHeight);

    const letterSpacing = '0px';
    $('#letter-spacing').val(letterSpacing);
    setLetterSpacing(letterSpacing);
    localStorage.setItem('letterSpacing', letterSpacing);

    const colorTheme = 'light-on-dark';
    $('#color-theme').val(colorTheme);
    setColorTheme(colorTheme);
    localStorage.setItem('colorTheme', colorTheme);
});

// =========================================================
// Save/restore fieldset
// =========================================================

$('#btn-save-text').click(function() {
    localStorage.setItem('savedText', $('#main-textarea').val());
    $('#btn-restore-text').prop('disabled', false);
});

$('#btn-restore-text').click(function() {
    let savedText = localStorage.getItem('savedText');
    if (savedText) {
        $('#main-textarea').val(savedText);
        updateHistory();
    }
});

$('#btn-save-text-to-file').click(function() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    let min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    let formattedDate = year + '-' + month + '-' + date + '_' + hour + '-' + min;
    let $textarea = $('#main-textarea');
    let blob = new Blob([$textarea.val()], {type: 'text/plain;charset=utf-8'});
    window.saveAs(blob, 'text_' + formattedDate + '.txt');
});

$('#btn-save-json-to-file').click(function() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    let min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    let formattedDate = year + '-' + month + '-' + date + '_' + hour + '-' + min;
    let $textarea = $('#main-textarea');
    let blob = new Blob([$textarea.val()], {type: 'application/json;charset=utf-8'});
    window.saveAs(blob, 'data_' + formattedDate + '.json');
});

$('#btn-save-csv-to-file').click(function() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    let min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    let formattedDate = year + '-' + month + '-' + date + '_' + hour + '-' + min;
    let $textarea = $('#main-textarea');
    let blob = new Blob([$textarea.val()], {type: 'text/csv;charset=utf-8'});
    window.saveAs(blob, 'data_' + formattedDate + '.csv');
});

$('#btn-save-json-as-csv-file').click(function() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    let min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    let formattedDate = year + '-' + month + '-' + date + '_' + hour + '-' + min;
    const $textarea = $('#main-textarea');
    const input = $textarea.val();
    JSONToCSVConvertor(input, 'data_' + formattedDate, true);
});

// =========================================================
// Drag 'n' Drop fieldset
// =========================================================

const $dropTarget = $('.file-drop-area');

$dropTarget[0].ondragover = function(evt) {
  evt.preventDefault()
  evt.stopPropagation()
  $(evt.target).addClass('active')
}

$dropTarget[0].ondragleave = function(evt) {
  evt.preventDefault()
  evt.stopPropagation()
  $(evt.target).removeClass('active')
}

$dropTarget[0].ondrop = function(evt) {
  evt.preventDefault()
  evt.stopPropagation()
  $(evt.target).removeClass('active')
  const fileReader = new FileReader();
  const file = evt.dataTransfer.files[0]
  fileReader.onload = function(evt) {            
     $('#main-textarea').val(evt.target.result);
  }
  if (file) {
    fileReader.readAsText(file, 'UTF-8')  // 
  }
}

// =========================================================
// Set / Copy as URL fieldset
// =========================================================

$('#btn-set-as-url-readable').click(function() {
    const $textarea = $('#main-textarea');
    const input = $textarea.val();
    const newUrl = `${document.location.origin}${document.location.pathname}?text=${encodeURIComponent(input)}`;
    if (window.history.replaceState) {
        window.history.replaceState({}, null, newUrl);
    } else {
        document.location = newUrl;
    }
});

$('#btn-copy-as-url-readable').click(function() {
    const $textarea = $('#main-textarea');
    const input = $textarea.val();
    const url = `${document.location.origin}${document.location.pathname}?text=${encodeURIComponent(input)}`;
    navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
        if (result.state === 'granted') {
            const type = 'text/plain';
            const blob = new Blob([url], { type });
            let data = [new ClipboardItem({ [type]: blob })];
            navigator.clipboard.write(data).then(function() {
                alert('Copied the URL to the clipboard!');
            }, function() {
                alert('Unable to copy the URL to the clipboard!');
            });
        }
    });
});

$('#btn-set-as-url-base64').click(function() {
    const $textarea = $('#main-textarea');
    const input = $textarea.val();
    const newUrl = `${document.location.origin}${document.location.pathname}?base64=${b64EncodeUnicode(input)}`;
    if (window.history.replaceState) {
        window.history.replaceState({}, null, newUrl);
    } else {
        document.location = newUrl;
    }
});

$('#btn-copy-as-url-base64').click(function() {
    const $textarea = $('#main-textarea');
    const input = $textarea.val();
    const url = `${document.location.origin}${document.location.pathname}?base64=${b64EncodeUnicode(input)}`;
    navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
        if (result.state === 'granted') {
            const type = 'text/plain';
            const blob = new Blob([url], { type });
            let data = [new ClipboardItem({ [type]: blob })];
            navigator.clipboard.write(data).then(function() {
                alert('Copied the URL to the clipboard!');
            }, function() {
                alert('Unable to copy the URL to the clipboard!');
            });
        }
    });
});

$('#btn-clear-url').click(function() {
    const url = `${document.location.origin}${document.location.pathname}`;
    document.location = url;
});

// =========================================================
// Scroll to fieldset
// =========================================================

$('#btn-scroll-to-top-left').click(function() {
    let $textarea = $('#main-textarea');
    $textarea.scrollTop(0).scrollLeft(0);
});

$('#btn-scroll-to-bottom-left').click(function() {
    let $textarea = $('#main-textarea');
    $textarea.scrollTop($textarea[0].scrollHeight).scrollLeft(0);
});

$('#btn-scroll-to-top').click(function() {
    let $textarea = $('#main-textarea');
    $textarea.scrollTop(0);
});

$('#btn-scroll-to-bottom').click(function() {
    let $textarea = $('#main-textarea');
    $textarea.scrollTop($textarea[0].scrollHeight);
});

$('#btn-scroll-to-left').click(function() {
    let $textarea = $('#main-textarea');
    $textarea.scrollLeft(0);
});

$('#btn-scroll-to-right').click(function() {
    let $textarea = $('#main-textarea');
    $textarea.scrollLeft($textarea[0].scrollWidth);
});

// =========================================================
// Sample text fieldset
// =========================================================

const addSampleText = (sampleText) => {
    const $textArea = $('#main-textarea');
    const existingContent = $textArea.val();
    if ($('#sample-replace-radio').is(':checked')) {
	    $textArea.val(sampleText);
	} else if ($('#sample-prepend-radio').is(':checked')) {
        if (existingContent === '') {
            $textArea.val(sampleText);
        } else {
            $textArea.val(`${sampleText}\n${existingContent}`);
        }
	} else if ($('#sample-append-radio').is(':checked')) {
        if (existingContent === '') {
            $textArea.val(sampleText);
        } else {
            $textArea.val(`${existingContent}\n${sampleText}`);
        }
	}
}

$('#btn-sample-hello-world').click(function() {
    addSampleText(`hello world`);
    updateHistory();
});

$('#btn-sample-accent').click(function() {
    addSampleText(`déjà vu`);
    updateHistory();
});

$('#btn-sample-simple-url').click(function() {
    addSampleText(`http://www.example.com/`);
    updateHistory();
});

$('#btn-sample-complex-url').click(function() {
    addSampleText(`http://username:password@www.example.com:80/path/to/file.php?foo=316&bar=this+has+spaces#anchor`);
    updateHistory();
});

$('#btn-sample-text').click(function() {
    addSampleText(sampleText);
    updateHistory();
});

$('#btn-sample-html-emmet-starter').click(function() {
    addSampleText(sampleEmmetHtml);
    updateHistory();
});

$('#btn-sample-html').click(function() {
    addSampleText(sampleHtml);
    updateHistory();
});

$('#btn-sample-html-5-boilerplate').click(function() {
    addSampleText(decodeURIComponent(sampleHtml5Boilerplate));
    updateHistory();
});

$('#btn-sample-html-5-kitchen-sink').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/html-5-kitchen-sink.html')
        .then(function(response) {
            addSampleText(response.data);
            updateHistory();
            $('body').removeClass('cursor-wait');
        })
        .catch(function(error) {
            alert('Oops! An error occurred: ' + error);
        });
});

$('#btn-sample-html-table').click(function() {
    addSampleText(sampleHtmlTable);
    updateHistory();
});

$('#btn-sample-xml').click(function() {
    addSampleText(sampleXml);
    updateHistory();
});

$('#btn-sample-js-with-comments').click(function() {
    addSampleText(jsWithComments);
    updateHistory();
});

$('#btn-sample-js-jquery-unminified').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/jquery-3.3.1.js')
        .then(function(response) {
            addSampleText(response.data);
            updateHistory();
            $('body').removeClass('cursor-wait');
        })
        .catch(function(error) {
            alert('Oops! An error occurred: ' + error);
        });
});

$('#btn-sample-bootstrap-css-unminified').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/bootstrap.css')
        .then(function(response) {
            addSampleText(response.data);
            updateHistory();
            $('body').removeClass('cursor-wait');
        })
        .catch(function(error) {
            alert('Oops! An error occurred: ' + error);
        });
});

$('#btn-sample-wordpress-directory-structure').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/wordpress-directory-structure.txt')
        .then(function(response) {
            addSampleText(response.data);
            updateHistory();
            $('body').removeClass('cursor-wait');
        })
        .catch(function(error) {
            alert('Oops! An error occurred: ' + error);
        });
});

$('#btn-sample-markdown').click(function() {
    addSampleText(markdown);
    updateHistory();
});

$('#btn-sample-poem').click(function() {
    addSampleText(samplePoem);
    updateHistory();
});

$('#btn-shakespeare-play-titles').click(function() {
    addSampleText(sampleShakespearePlayTitles);
    updateHistory();
});

$('#btn-sample-alice-extract').click(function() {
    addSampleText(sampleAlice);
    updateHistory();
});

$('#btn-sample-alice-full').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/alice-in-wonderland.txt')
        .then(function(response) {
            addSampleText(response.data);
            updateHistory();
            $('body').removeClass('cursor-wait');
        })
        .catch(function(error) {
            alert('Oops! An error occurred: ' + error);
        });
});

$('#btn-sample-quote').click(function() {
    addSampleText(`And in the end, the love you take is equal to the love you make`);
    updateHistory();
});

$('#btn-sample-pangrams').click(function() {
    addSampleText(samplePangrams);
    updateHistory();
});

$('#btn-sample-boys-names').click(function() {
    addSampleText(boysNames);
    updateHistory();
});

$('#btn-sample-girls-names').click(function() {
    addSampleText(girlsNames);
    updateHistory();
});

$('#btn-sample-466k-english-words').click(function() {
    if (confirm('This list is VERY large and may take a while to load and render. Do you wish to continue?')) {
        $('body').addClass('cursor-wait');
        axios.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt')
            .then(function(response) {
                addSampleText(response.data);
                updateHistory();
                $('body').removeClass('cursor-wait');
            })
            .catch(function(error) {
                alert('Oops! An error occurred: ' + error);
            });
    } else {
        return;
    }
});

$('#btn-sample-reserved').click(function() {
    addSampleText(`#$%&+,/:;=?@[]`);
    updateHistory();
});

$('#btn-sample-unreserved').click(function() {
    addSampleText(`-_.!~*'()`);
    updateHistory();
});

$('#btn-sample-az-uppercase').click(function() {
    addSampleText(`ABCDEFGHIJKLMNOPQRSTUVWXYZ`);
    updateHistory();
});

$('#btn-sample-az-lowercase').click(function() {
    addSampleText(`abcdefghijklmnopqrstuvwxyz`);
    updateHistory();
});

$('#btn-sample-special-chars').click(function() {
    addSampleText(charsWithNamedEntities);
    updateHistory();
});

$('#btn-sample-character-mapping').click(function() {
    addSampleText(sampleCharacterMapping);
    updateHistory();
});

$('#btn-sample-emoticons').click(function() {
    addSampleText(emoticons);
    updateHistory();
});

$('#btn-sample-phonetic').click(function() {
    addSampleText(phoneticAlphabet);
    updateHistory();
});

$('#btn-sample-lorem-ipsum').click(function() {
    addSampleText(loremIpsum);
    updateHistory();
});

$('#btn-sample-lorem-ipsum-generated').click(function() {
    const maxNumWords = 181;
    let numWords = prompt("How many words do you want?", '100');
    if (numWords !== undefined && numWords !== '') {
        numWords = parseInt(numWords, 10);
        let loremIpsumWords = '';
        if (parseInt(numWords, 10) <= maxNumWords) {
            loremIpsumWords = HolderIpsum.words(numWords, true);
        } else {
            let remainder = numWords%maxNumWords;
            let multiple = (numWords - remainder) / maxNumWords;
            for (var i=0; i<multiple; i++) {
                loremIpsumWords += HolderIpsum.words(maxNumWords, true);
                if (i < multiple-1) {
                    loremIpsumWords += ' ';
                }
            }
            if (remainder > 0) {
                loremIpsumWords += ' ' + HolderIpsum.words(remainder, true);
            }
        }
        loremIpsumWords = loremIpsumWords.charAt(0).toUpperCase() + loremIpsumWords.slice(1) + '.';
        addSampleText(loremIpsumWords);
        updateHistory();
    }
});

$('#btn-sample-number-column-n-n').click(function() {
    let numbersArray = [];
    let startNum = prompt("Starting number?", '1');
    let endNum = prompt("Ending number?", '100');
    if (startNum !== '' && endNum !== '') {
        startNum = parseInt(startNum, 10);
        endNum = parseInt(endNum, 10);
        if (!isNaN(startNum) && !isNaN(endNum)) {
            if (startNum !== endNum) {
                if (startNum < endNum) {
                    for (let i=startNum; i<=endNum; i++) {
                        numbersArray.push(i);
                    }
                } else if (startNum > endNum) {
                    for (let i=startNum; i>=endNum; i--) {
                        numbersArray.push(i);
                    }
                }
                let output = numbersArray.join('\n');
                addSampleText(output);
                updateHistory();
            }
        }
    }
});


$('#btn-sample-number-column-01-99').click(function() {
    let numbersArray = [];
    for (let i=1; i<=99; i++) {
        numbersArray.push(_.padStart(i, 2, '0'));
    }
    let output = numbersArray.join('\n');
    addSampleText(output);
    updateHistory();
});

$('#btn-sample-number-column-001-999').click(function() {
    let numbersArray = [];
    for (let i=1; i<=999; i++) {
        numbersArray.push(_.padStart(i, 3, '0'));
    }
    let output = numbersArray.join('\n');
    addSampleText(output);
    updateHistory();
});

$('#btn-sample-number-column-0001-9999').click(function() {
    let numbersArray = [];
    for (let i=1; i<=9999; i++) {
        numbersArray.push(_.padStart(i, 4, '0'));
    }
    let output = numbersArray.join('\n');
    addSampleText(output);
    updateHistory();
});

$('#btn-sample-curly-quotes').click(function() {
    addSampleText(curlyQuotes);
    updateHistory();
});

$('#btn-sample-ascii-image-simple').click(function() {
    addSampleText(ascii);
    updateHistory();
});

$('#btn-sample-ascii-image-complex').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/the-simpsons-ascii-art.txt')
        .then(function(response) {
            addSampleText(response.data);
            updateHistory();
            $('body').removeClass('cursor-wait');
        })
            .catch(function(error) {
            alert('Oops! An error occurred: ' + error);
        });
});

$('#btn-sample-diamond-of-bullets').click(function() {
    addSampleText(sampleDiamondOfBullets);
    updateHistory();
});

$('#btn-sample-csv-data').click(function() {
    addSampleText(csvData);
    updateHistory();
});

$('#btn-sample-lined-up-csv-data').click(function() {
    addSampleText(linedUpCsvData);
    updateHistory();
});

$('#btn-sample-tab-delimited-data').click(function() {
    addSampleText(tabDelimitedData);
    updateHistory();
});

$('#btn-sample-lined-up-tab-delimited-data').click(function() {
    addSampleText(linedUpTabDelimitedData);
    updateHistory();
});

$('#btn-sample-javascript-array-of-objects').click(function() {
    addSampleText(javascriptArrayOfObjects);
    updateHistory();
});

$('#btn-sample-json-formatted').click(function() {
    addSampleText(formattedJson);
    updateHistory();
});

$('#btn-sample-json-formatted-2').click(function() {
    addSampleText(decodeURIComponent(formattedJson2));
    updateHistory();
});

$('#btn-sample-json-simple-formatted-1').click(function() {
    addSampleText(decodeURIComponent(jsonSimpleFormatted1));
    updateHistory();
});

$('#btn-sample-json-simple-formatted-2').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/simple-people-data.json')
        .then(function(response) {
            let output = JSON.stringify(response.data, null, 2);
            addSampleText(output);
            updateHistory();
            $('body').removeClass('cursor-wait');
        })
        .catch(function(error) {
            alert('Oops! An error occurred: ' + error);
        });
});

$('#btn-sample-json-simple-unformatted').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/simple-people-data.json')
        .then(function(response) {
            let output = JSON.stringify(response.data);
            addSampleText(output);
            updateHistory();
            $('body').removeClass('cursor-wait');
        })
        .catch(function(error) {
            alert('Oops! An error occurred: ' + error);
        });
});

$('#btn-sample-json-complex-unformatted').click(function() {
    addSampleText(unformattedJson);
    updateHistory();
});

$('#btn-sample-json-unicode-names-minified').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/unicodeNamesLookupTable.min.json')
        .then(function(response) {
            let output = JSON.stringify(response.data);
            addSampleText(output);
            updateHistory();
            $('body').removeClass('cursor-wait');
        })
        .catch(function(error) {
            alert('Oops! An error occurred: ' + error);
        });
});

$('#btn-sample-yaml-simple-1').click(function() {
    addSampleText(simpleYaml1);
    updateHistory();
});

$('#btn-sample-yaml-simple-2').click(function() {
    addSampleText(simpleYaml2);
    updateHistory();
});

$('#btn-sample-yaml-complex').click(function() {
    addSampleText(complexYaml);
    updateHistory();
});

$('#btn-sample-regular-array').click(function() {
    addSampleText(simpleRegularArray);
    updateHistory();
});

$('#btn-sample-associative-array').click(function() {
    addSampleText(simpleAssociativeArray);
    updateHistory();
});

$('#btn-sample-data-string').click(function() {
    addSampleText(dataString);
    updateHistory();
});

$('#btn-sample-repeating-data-string').click(function() {
    addSampleText(repeatingDataString);
    updateHistory();
});

$('#btn-sample-data-to-be-lined-up').click(function() {
    addSampleText(dataToBeLinedUp);
    updateHistory();
});

$('#btn-sample-string-to-be-incremented').click(function() {
    addSampleText(stringToBeIncremented);
    updateHistory();
});

$('#btn-sample-merge-bottom-into-top').click(function() {
    addSampleText(sampleMergeBottomIntoTop);
    updateHistory();
});

$('#btn-sample-uuids-with-duplicates').click(function() {
    addSampleText(duplicateUuids);
    updateHistory();
});

$('#btn-sample-indentation-tabs').click(function() {
    addSampleText(indentationWithTabs);
    updateHistory();
});

$('#btn-sample-indentation-two-spaces').click(function() {
    addSampleText(indentationWithTwoSpaces);
    updateHistory();
});

$('#btn-sample-indentation-four-spaces').click(function() {
    addSampleText(indentationWithFourSpaces);
    updateHistory();
});

$('#btn-sample-extract-data').click(function() {
    addSampleText(sampleExtractData);
    updateHistory();
});

$('#btn-sample-authorization-header-jwt').click(function() {
    addSampleText(sampleAuthorizationHeaderJwt);
    updateHistory();
});

$('#btn-sample-svg-markup-simple').click(function() {
    addSampleText(sampleSvgMarkup);
    updateHistory();
});

$('#btn-sample-svg-markup-complex').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/tiger_copy.svg')
        .then(function(response) {
        addSampleText(response.data);
        updateHistory();
        $('body').removeClass('cursor-wait');
    })
        .catch(function(error) {
        alert('Oops! An error occurred: ' + error);
    });
});

$('#btn-sample-animated-gif-data-uri').click(function() {
    $('body').addClass('cursor-wait');
    axios.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/animated-gif-data-uri.txt')
        .then(function(response) {
        addSampleText(response.data);
        updateHistory();
        $('body').removeClass('cursor-wait');
    })
        .catch(function(error) {
        alert('Oops! An error occurred: ' + error);
    });
});

$('#btn-sample-pdf-data-uri').click(function() {
    addSampleText(samplePdfDataUri);
    updateHistory();
});

$('#btn-sample-date-now').click(function() {
    let newDate = new Date();
    let iso8601 = dateFns.format(newDate, 'YYYY-MM-DDTHH:mm:ss');
    let text = `\u0069\u006D\u0070\u006F\u0072\u0074\u0020\u007B\u0020\u0070\u0061\u0072\u0073\u0065\u002C\u0020\u0066\u006F\u0072\u006D\u0061\u0074\u0020\u007D\u0020\u0066\u0072\u006F\u006D\u0020\u0027\u0064\u0061\u0074\u0065\u002D\u0066\u006E\u0073\u0027

Date.now()\t\t\t\t\t\t\t${Date.now()}
new Date().toString()\t\t\t\t\t\t${newDate}
dateFns.parse('${iso8601}')\t\t\t\t${dateFns.parse(iso8601)}
dateFns.format(new Date())\t\t\t\t\t${dateFns.format(newDate)}
dateFns.format(new Date(), 'YYYY-MM-DDTHH:mm:ss.SSSZ')\t\t${dateFns.format(newDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')}
dateFns.format(new Date(), 'YYYY-MM-DDTHH:mm:ss')\t\t${dateFns.format(newDate, 'YYYY-MM-DDTHH:mm:ss')}
dateFns.format(new Date(), 'dddd Do MMMM YYYY')\t\t\t${dateFns.format(newDate, 'dddd Do MMMM YYYY')}
dateFns.format(new Date(), 'Do MMMM YYYY')\t\t\t${dateFns.format(newDate, 'Do MMMM YYYY')}
dateFns.format(new Date(), 'Do MMM ‘YY')\t\t\t${dateFns.format(newDate, 'Do MMM ‘YY')}
dateFns.format(new Date(), 'MM/DD/YYYY')\t\t\t${dateFns.format(newDate, 'MM/DD/YYYY')}
dateFns.format(new Date(), 'YYYY-MM-DD')\t\t\t${dateFns.format(newDate, 'YYYY-MM-DD')}
dateFns.format(new Date(), 'HH:mm')\t\t\t\t${dateFns.format(newDate, 'HH:mm')}
dateFns.format(new Date(), 'ddd HH:mm')\t\t\t\t${dateFns.format(newDate, 'ddd HH:mm')}
dateFns.format(new Date(), 'HH:mm:ss')\t\t\t\t${dateFns.format(newDate, 'HH:mm:ss')}
dateFns.format(new Date(), 'h:mma')\t\t\t\t${dateFns.format(newDate, 'h:mma')}
dateFns.format(new Date(), 'HH[h] mm[m] ss[s] SSS[ms]')\t\t${dateFns.format(newDate, 'HH[h] mm[m] ss[s] SSS[ms]')}
dateFns.format(new Date(), 'M')\t\t\t\t\t${dateFns.format(newDate, 'M')}
dateFns.format(new Date(), 'Mo')\t\t\t\t${dateFns.format(newDate, 'Mo')}
dateFns.format(new Date(), 'MM')\t\t\t\t${dateFns.format(newDate, 'MM')}
dateFns.format(new Date(), 'MMM')\t\t\t\t${dateFns.format(newDate, 'MMM')}
dateFns.format(new Date(), 'MMMM')\t\t\t\t${dateFns.format(newDate, 'MMMM')}
dateFns.format(new Date(), 'Q')\t\t\t\t\t${dateFns.format(newDate, 'Q')}
dateFns.format(new Date(), 'Qo')\t\t\t\t${dateFns.format(newDate, 'Qo')}
dateFns.format(new Date(), 'D')\t\t\t\t\t${dateFns.format(newDate, 'D')}
dateFns.format(new Date(), 'Do')\t\t\t\t${dateFns.format(newDate, 'Do')}
dateFns.format(new Date(), 'DD')\t\t\t\t${dateFns.format(newDate, 'DD')}
dateFns.format(new Date(), 'DDD')\t\t\t\t${dateFns.format(newDate, 'DDD')}
dateFns.format(new Date(), 'DDDo')\t\t\t\t${dateFns.format(newDate, 'DDDo')}
dateFns.format(new Date(), 'DDDD')\t\t\t\t${dateFns.format(newDate, 'DDDD')}
dateFns.format(new Date(), 'd')\t\t\t\t\t${dateFns.format(newDate, 'd')}
dateFns.format(new Date(), 'do')\t\t\t\t${dateFns.format(newDate, 'do')}
dateFns.format(new Date(), 'dd')\t\t\t\t${dateFns.format(newDate, 'dd')}
dateFns.format(new Date(), 'ddd')\t\t\t\t${dateFns.format(newDate, 'ddd')}
dateFns.format(new Date(), 'dddd')\t\t\t\t${dateFns.format(newDate, 'dddd')}
dateFns.format(new Date(), 'E')\t\t\t\t\t${dateFns.format(newDate, 'E')}
dateFns.format(new Date(), 'W')\t\t\t\t\t${dateFns.format(newDate, 'W')}
dateFns.format(new Date(), 'Wo')\t\t\t\t${dateFns.format(newDate, 'Wo')}
dateFns.format(new Date(), 'WW')\t\t\t\t${dateFns.format(newDate, 'WW')}
dateFns.format(new Date(), 'YY')\t\t\t\t${dateFns.format(newDate, 'YY')}
dateFns.format(new Date(), 'YYYY')\t\t\t\t${dateFns.format(newDate, 'YYYY')}
dateFns.format(new Date(), 'GG')\t\t\t\t${dateFns.format(newDate, 'GG')}
dateFns.format(new Date(), 'GGGG')\t\t\t\t${dateFns.format(newDate, 'GGGG')}
dateFns.format(new Date(), 'A')\t\t\t\t\t${dateFns.format(newDate, 'A')}
dateFns.format(new Date(), 'a')\t\t\t\t\t${dateFns.format(newDate, 'a')}
dateFns.format(new Date(), 'aa')\t\t\t\t${dateFns.format(newDate, 'aa')}
dateFns.format(new Date(), 'H')\t\t\t\t\t${dateFns.format(newDate, 'H')}
dateFns.format(new Date(), 'HH')\t\t\t\t${dateFns.format(newDate, 'HH')}
dateFns.format(new Date(), 'h')\t\t\t\t\t${dateFns.format(newDate, 'h')}
dateFns.format(new Date(), 'hh')\t\t\t\t${dateFns.format(newDate, 'hh')}
dateFns.format(new Date(), 'm')\t\t\t\t\t${dateFns.format(newDate, 'm')}
dateFns.format(new Date(), 'mm')\t\t\t\t${dateFns.format(newDate, 'mm')}
dateFns.format(new Date(), 's')\t\t\t\t\t${dateFns.format(newDate, 's')}
dateFns.format(new Date(), 'ss')\t\t\t\t${dateFns.format(newDate, 'ss')}
dateFns.format(new Date(), 'S')\t\t\t\t\t${dateFns.format(newDate, 'S')}
dateFns.format(new Date(), 'SS')\t\t\t\t${dateFns.format(newDate, 'SS')}
dateFns.format(new Date(), 'SSS')\t\t\t\t${dateFns.format(newDate, 'SSS')}
dateFns.format(new Date(), 'Z')\t\t\t\t\t${dateFns.format(newDate, 'Z')}
dateFns.format(new Date(), 'ZZ')\t\t\t\t${dateFns.format(newDate, 'ZZ')}
dateFns.format(new Date(), 'X')\t\t\t\t\t${dateFns.format(newDate, 'X')}
dateFns.format(new Date(), 'x')\t\t\t\t\t${dateFns.format(newDate, 'x')}
`;
    addSampleText(text);
    updateHistory();
});

$('#btn-sample-sanity-groq-query').click(function() {
    addSampleText(sampleSanityGroqQuery);
    updateHistory();
});

$('#btn-sample-geometric-shapes').click(function() {
    addSampleText(sampleGeometricShapes);
    updateHistory();
});

$('#btn-sample-arrow-symbols').click(function() {
    addSampleText(sampleArrowSymbols);
    updateHistory();
});

$('#btn-sample-dingbat-symbols').click(function() {
    addSampleText(sampleDingbatSymbols);
    updateHistory();
});

$('#btn-sample-heart-symbols').click(function() {
    addSampleText(sampleHeartSymbols);
    updateHistory();
});

$('#btn-sample-special-symbols').click(function() {
    addSampleText(sampleSpecialSymbols);
    updateHistory();
});

$('#btn-sample-flower-symbols').click(function() {
    addSampleText(sampleFlowerSymbols);
    updateHistory();
});

$('#btn-sample-quotation-marks').click(function() {
    addSampleText(sampleQuotationMarks);
    updateHistory();
});

$('#btn-sample-star-symbols').click(function() {
    addSampleText(sampleStarSymbols);
    updateHistory();
});

$('#btn-sample-emoji-symbols').click(function() {
    addSampleText(sampleEmojiSymbols);
    updateHistory();
});

$('#btn-sample-zodiac-symbols').click(function() {
    addSampleText(sampleZodiacSymbols);
    updateHistory();
});

$('#btn-sample-currency-symbols').click(function() {
    addSampleText(sampleCurrencySymbols);
    updateHistory();
});

$('#btn-sample-greek-symbols').click(function() {
    addSampleText(sampleGreekSymbols);
    updateHistory();
});

$('#btn-sample-roman-numerals').click(function() {
    addSampleText(sampleRomanNumerals);
    updateHistory();
});

$('#btn-sample-suits-of-the-cards').click(function() {
    addSampleText(sampleSuitsOfTheCards);
    updateHistory();
});

$('#btn-sample-punctuation-marks').click(function() {
    addSampleText(samplePunctuationMarks);
    updateHistory();
});

$('#btn-sample-box-drawing').click(function() {
    addSampleText(sampleBoxDrawing);
    updateHistory();
});

$('#btn-sample-unicode-profanity').click(function() {
    addSampleText(sampleUnicodeProfanity);
    updateHistory();
});

// =========================================================
// Random content fieldset
// =========================================================

$('#btn-random-passwords-length-8').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push('$' + chance.string({ length: 6, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }) + '!');
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-passwords-length-16').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push('$' + chance.string({ length: 14, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }) + '!');
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-passwords-length-24').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push('$' + chance.string({ length: 22, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }) + '!');
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-passwords-length-32').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push('$' + chance.string({ length: 30, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }) + '!');
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-passwords-length-64').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push('$' + chance.string({ length: 62, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }) + '!');
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-uuids').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(uuidv4());
    }
    let uuidsStr = array.join('\n');
    $('#main-textarea').val(uuidsStr);
    updateHistory();
});

$('#btn-random-booleans').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.bool());
    }
    let booleanStr = array.join('\n');
    $('#main-textarea').val(booleanStr);
    updateHistory();
});

$('#btn-random-characters-all').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.character());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-characters-lowercase').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.character({ casing: 'lower', alpha: true }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-characters-uppercase').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.character({ casing: 'upper', alpha: true }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-characters-ABCD').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.character({ pool: 'ABCD' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-floating').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.floating());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-floating-positive').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.floating({ min: 0, max: 1000000, fixed: 1 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-integers').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.integer());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-integers-positive').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.integer({ min: 1000000000000000, max: 9999999999999999 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-integers-plus-minus-100').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.integer({ min: -100, max: 100 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-integers-0-to-1000').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.integer({ min: 0, max: 1000 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-integers-0-to-100').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.integer({ min: 0, max: 100 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-integers-0-to-10').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.integer({ min: 0, max: 10 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-integers-0-to-1').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.integer({ min: 0, max: 1 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-strings').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.string());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-strings-length-8').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.string({ length: 8, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-strings-length-16').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.string({ length: 16, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-strings-length-32').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.string({ length: 32, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-strings-length-64').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.string({ length: 64, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-strings-length-128').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.string({ length: 128, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-strings-uppercase').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.string({ length: 128, pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-strings-lowercase').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.string({ length: 128, pool: 'abcdefghijklmnopqrstuvwxyz' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-strings-digits').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.string({ length: 128, pool: '0123456789' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-strings-slashes').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.string({ length: 128, pool: '╱╲' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-paragraphs').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.paragraph());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-sentences').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.sentence());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-sentences-5-words').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.sentence({ words: 5 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-sentences-10-words').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.sentence({ words: 10 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-sentences-15-words').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.sentence({ words: 15 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-sentences-20-words').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.sentence({ words: 20 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-syllables').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.syllable());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-words').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.word({ syllables: 3 }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-dates-last-10-years').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    let maxYear = parseInt(dateFns.format(new Date(), 'YYYY'), 10) - 1;
    let minYear = maxYear - 10;
    let randomYear;
    for (let i=0; i<numItems; i++) {
        randomYear = chance.year({ min: minYear, max: maxYear });
        array.push(chance.birthday({ year: randomYear }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-dates-last-100-years').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    let maxYear = parseInt(dateFns.format(new Date(), 'YYYY'), 10) - 1;
    let minYear = maxYear - 100;
    let randomYear;
    for (let i=0; i<numItems; i++) {
        randomYear = chance.year({ min: minYear, max: maxYear });
        array.push(chance.birthday({ year: randomYear }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-dates-formatted').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.birthday({ string: true, american: false }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-names-first').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.first());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-names-last').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.last());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-names-first-last').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.first() + ' ' + chance.last());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-names-male').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.name({ gender: 'male' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-names-female').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.name({ gender: 'female' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

// Doesn't appear to work
// $('#btn-random-animals').click(function() {
//     let array = [];
//     let numItems = parseInt($('#num-random-items-select').val(), 10);
//     for (let i=0; i<numItems; i++) {
//         array.push(chance.animal());
//     }
//     let charsStr = array.join('\n');
//     $('#main-textarea').val(charsStr);
//     updateHistory();
// });

$('#btn-random-color-hex').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.color({format: 'hex'}));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});
  
$('#btn-random-color-rgb').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.color({format: 'rgb'}));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

// $('#btn-random-company').click(function() {
//     let array = [];
//     let numItems = parseInt($('#num-random-items-select').val(), 10);
//     for (let i=0; i<numItems; i++) {
//         array.push(chance.company());
//     }
//     let charsStr = array.join('\n');
//     $('#main-textarea').val(charsStr);
//     updateHistory();
// });

$('#btn-random-domain').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.domain());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-email').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.email());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-email-domain-com').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.email({domain: 'domain.com'}));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-ip-address').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.ip());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-ipv6').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.ipv6());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

// $('#btn-random-profession').click(function() {
//     let array = [];
//     let numItems = parseInt($('#num-random-items-select').val(), 10);
//     for (let i=0; i<numItems; i++) {
//         array.push(chance.profession());
//     }
//     let charsStr = array.join('\n');
//     $('#main-textarea').val(charsStr);
//     updateHistory();
// });

$('#btn-random-url').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.url());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-address').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.address());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-city-uk').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    let city;
    for (let i=0; i<numItems; i++) {
        city = chance.pickset(citiesUk, 1);
        array.push(city);
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-coordinates').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.coordinates());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-country').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.country({ full: true }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-phone').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.phone());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-phone-uk').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.phone({ country: 'uk' }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-phone-uk-mobile').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.phone({ country: 'uk', mobile: true }));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

// $('#btn-random-postcode').click(function() {
//     let array = [];
//     let numItems = parseInt($('#num-random-items-select').val(), 10);
//     for (let i=0; i<numItems; i++) {
//         array.push(chance.postcode());
//     }
//     let charsStr = array.join('\n');
//     $('#main-textarea').val(charsStr);
//     updateHistory();
// });

$('#btn-random-timestamp').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.timestamp());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-weekday').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.weekday());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-credit-card-visa').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.cc({type: 'Visa'}));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-dollar').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.dollar({max: 299}));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-euro').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.euro({max: 299}));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-coin-toss').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.pickset(['Heads', 'Tails'], 1));
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-dice-6').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.d6());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-random-hash').click(function() {
    let array = [];
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    for (let i=0; i<numItems; i++) {
        array.push(chance.hash());
    }
    let charsStr = array.join('\n');
    $('#main-textarea').val(charsStr);
    updateHistory();
});

$('#btn-10-print').click(function() {
    let numItems = parseInt($('#num-random-items-select').val(), 10);
    const output = makeRandomString(numItems, '╱╲');
    $('#main-textarea').val(output);
    updateHistory();
});

// =========================================================
// Count fieldset
// =========================================================

$('#btn-count-chars').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let count = input.length;
    alert(count.toLocaleString() + ' characters');
});

$('#btn-count-chars-alphanumeric').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let count = v.countWhere(input, v.isAlpha);
    alert(count.toLocaleString() + ' alphanumeric characters');
});

$('#btn-count-words').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/\r?\n|\r/g, ' ');
    input = input.replace(/\t/g, ' ');
    let array = input.split(' ');
    array = array.filter(Boolean);
    let count = array.length;
    alert(count.toLocaleString() + ' words');
});

$('#btn-count-words-alphanumeric').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let count = v.countWords(input);
    alert(count.toLocaleString() + ' words');
});

$('#btn-count-lines').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let count = input.split(/\r?\n|\r/).length;
    alert(count.toLocaleString() + ' lines');
});

$('#btn-count-lines-empty').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let linesAllCount = array.length;
    let trimmedArray = array.filter(function(entry) {
        return entry.trim() != '';
    });
    let linesNonEmptyCount = trimmedArray.length;
    let linesEmptyCount = linesAllCount - linesNonEmptyCount;
    let percent = linesEmptyCount / linesAllCount;
    let percentFormatted = Math.round(percent * 100);
    alert(linesEmptyCount.toLocaleString() + ' empty lines ('+percentFormatted+'%)');
});

$('#btn-count-lines-non-empty').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let linesAllCount = array.length;
    let trimmedArray = array.filter(function(entry) {
        return entry.trim() != '';
    });
    let linesNonEmptyCount = trimmedArray.length;
    let percent = linesNonEmptyCount / linesAllCount;
    let percentFormatted = Math.round(percent * 100);
    alert(linesNonEmptyCount.toLocaleString() + ' non-empty lines ('+percentFormatted+'%)');
});

$('#btn-count-average-per-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let numChars = input.length;
    let numLines = input.split(/\r?\n|\r/).length
    let averageCharsPerLine = Math.round(numChars / numLines);
    alert(averageCharsPerLine.toLocaleString() + ' characters per line (average)');
});

$('#btn-count-shortest-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let shortest = 10000000;
    for (let item of array) {
        if (item.length < shortest) {
            shortest = item.length;
        }
    }
    alert('Num chars on shortest line: ' + shortest);
});

$('#btn-count-longest-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    alert('Num chars on longest line: ' + longest);
});

$('#btn-count-selected-chars').click(function() {
    let $textarea = $('#main-textarea');
    let input = getSelectionText();
    let count = input.length;
    alert(count + ' characters in selected text');
});

$('#btn-count-selected-words').click(function() {
    let input = getSelectionText();
    input = input.replace(/\r?\n|\r/g, ' ');
    input = input.replace(/\t/g, ' ');
    let array = input.split(' ');
    array = array.filter(Boolean);
    let count = array.length;
    alert(count.toLocaleString() + ' words in selected text');
});

$('#btn-count-filesize').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let bytes = countByteSize(input);
    let formattedBytes = formatByteSize(bytes);
    alert(`${formattedBytes} (${bytes.toLocaleString()} bytes)`);
});

$('#btn-count-character-frequency').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/\r?\n|\r/g, '');
    let textArray = [],
        chars = {},
        sortedArray = [],
        output = 'Char\tCount\n';
    textArray = input.split('');
    textArray = textArray.filter((n) => { return n != '' });
    chars = textArray.reduce(function(obj, item) {
        if (!obj[item]) {
            obj[item] = 0;
        }
        obj[item]++;
        return obj;
    }, {});
    for (var char in chars) {
        sortedArray.push(
            {'char': char,
             'count': chars[char]
            }
        );
    }
    sortedArray.sort(function(a, b) {
        return b.count - a.count;
    });
    for (var i = 0; i < sortedArray.length; i++) {
        const newline = i === sortedArray.length-1 ? '' : '\n';
        output += sortedArray[i].char + '\t' + sortedArray[i].count.toString() + newline;
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-count-word-frequency').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let textArray = [],
        words = {},
        sortedArray = [],
        output = 'Word\tCount\n';
    input = input.toLowerCase();
    input = input.replace('.', ' ');
    input = input.replace(/[\n\r]/g, ' ');
    input = input.replace(/[^0-9a-zA-Z -]/g, '');
    input = input.replace(/--/g, ' ');
    textArray = input.split(' ');
    textArray = textArray.filter((n) => { return n != '' });
    words = textArray.reduce(function(obj, item) {
        if (!obj[item]) {
            obj[item] = 0;
        }
        obj[item]++;
        return obj;
    }, {});
    for (var word in words) {
        sortedArray.push(
            {'word': word,
             'count': words[word]
            }
        );
    }
    sortedArray.sort(function(a, b) {
        return b.count - a.count;
    });
    for (var i = 0; i < sortedArray.length; i++) {
        const newline = i === sortedArray.length-1 ? '' : '\n';
        output += sortedArray[i].word + '\t' + sortedArray[i].count.toString() + newline;
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-count-uuids').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let regExp = new RegExp(/[\da-zA-Z]{8}-([\da-zA-Z]{4}-){3}[\da-zA-Z]{12}/, 'gim');
    let foundArray = input.match(regExp);
    let count = foundArray.length;
    alert(count.toLocaleString() + ' UUIDs');
});

$('#btn-count-array-length').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    try {
      let array = eval(input)
      alert('Array length: ' + array.length);
    } catch {
      alert('Unable to evaluate the array. Please check the syntax.')
    } 
});

$('#btn-count-associative-array-length').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    try {
      let associativeArray = eval('(' + input + ')')
      alert('Associative array length: ' + Object.keys(associativeArray).length);
    } catch {
      alert('Unable to evaluate the associative array. Please check the syntax.')
    } 
});

$('#substring-frequency-exact-value').on('change input', function() {
    if ($(this).val() === '') {
        $('#btn-count-substring-frequency-exact').prop('disabled', true);
    } else {
        $('#btn-count-substring-frequency-exact').prop('disabled', false);
    }
});

$('#btn-count-substring-frequency-exact').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let count = v.countSubstrings(input, $('#substring-frequency-exact-value').val());
    alert(count.toLocaleString() + ' occurrences of the exact string \''+$('#substring-frequency-exact-value').val()+'\'');
});

$('#word-frequency-wildcard-value').on('change input', function() {
    if ($(this).val() === '') {
        $('#btn-count-word-frequency-wildcard').prop('disabled', true);
    } else {
        $('#btn-count-word-frequency-wildcard').prop('disabled', false);
    }
});

$('#btn-count-word-frequency-wildcard').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let stringToMatch = $('#word-frequency-wildcard-value').val();
    const matchWordLength = true;
    let wordsArray = input.split(/\r?\n|\r/);
    wordsArray = wordsArray.join(' ');
    wordsArray = wordsArray.split(' ');
    wordsArray = wordsArray.map(word => word.trim());
    wordsArray = wordsArray.filter(word => word !== '');
    wordsArray = wordsArray.map(word => word.replace(/\r?\n|\r/g, ''));
    const wordLength = stringToMatch.length;
    if (matchWordLength) wordsArray = wordsArray.filter(word => word.length === wordLength);
    stringToMatch = stringToMatch.replace(/_/g, '\\\w');
    let matchRegex = new RegExp(stringToMatch, 'gi');
    wordsArray = wordsArray.filter(word => word.match(matchRegex));
    const numMatches = wordsArray.length;
    alert(numMatches.toLocaleString() + ' occurrences of the word \''+$('#word-frequency-wildcard-value').val()+'\'');
});

// =========================================================
// Remove fieldset
// =========================================================

$('#btn-remove-using-regular-expression').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let pattern = '';
    pattern = prompt('Regex pattern:', '([A-Z])\\w+');
    if (pattern) {
        pattern = encodeURIComponent(pattern);
        input = encodeURIComponent(input);
        const url = `http://regexstorm.net/tester?p=${pattern}&i=${input}`;
        window.open(url,'_blank');
    }
});

$('#btn-remove-linebreaks').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/\r?\n|\r/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-linebreaks-keep-empty').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    array = array.map(function(line) {
        if (line.trim() === '') {
            return '<emptyline>';
        } else {
            return line;
        }
    });
    input = array.join('\n');
    input = input.replace(/\n/g, ' ');
    input = input.replace(/<emptyline>/g, '\n\n');
    let output = input;
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-whitespace-all').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/\s/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-trim-each-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return _.trim(line);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-whitespace-from-start').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return _.trimStart(line);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-whitespace-from-end').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return _.trimEnd(line);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-spaces-multiple').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/  +/g, ' ').trim();
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-spaces-all').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/ /g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-spaces-from-csv').click(function() {
    const delimiter = ','
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let linesArray = input.split(/\r?\n|\r/)
    linesArray = linesArray.map(line => line.trim()).filter(line => line !== '').map(line => line.split(delimiter))
    linesArray = linesArray.map(rowArray => rowArray.map(item => item.trim()))
    linesArray = linesArray.map(rowArray => rowArray.join(delimiter))
    let output = linesArray.join('\n')
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-non-alpha-chars').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/ /g,'');
    input = input.replace(/[^a-z0-9\s]/gi, '');
    let output = input.toLowerCase();
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-az-lowercase').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/[a-z]/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-az-uppercase').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/[A-Z]/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-numbers').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/[0-9]/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-special-chars').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/[^\na-zA-Z0-9 ]/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-vowels').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/[aeiouAEIOU]/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-consonants').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-html-markup').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = $(input).text();
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-dom-elements-using-selector').click(function() {
  let selector = prompt("Enter a selector for elements to be removed (e.g. \"div.red, div.blue\")", "");
  if (selector != "" && selector != null) {
    let $textarea = $("#main-textarea");
    let input = $textarea.val();
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(input, "text/html");
    const elementsToRemove = doc.querySelectorAll(selector);
    elementsToRemove.forEach((el) => el.parentNode.removeChild(el));
    const body = doc.querySelector("body");
    $textarea.val(body.innerHTML);
    updateHistory();
  }
});

$('#btn-remove-surrounding-dom-elements-using-selector').click(function() {
  let selector = prompt('Enter a selector of elements to keep (e.g. "div.red, div.blue"). All surrounding markup will be removed.', "");
  if (selector != "" && selector != null) {
    let $textarea = $("#main-textarea");
    let input = $textarea.val();
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(input, "text/html");
    const elementsToKeep = doc.querySelectorAll(selector);
    const markup = Array.prototype.reduce.call(elementsToKeep, function(html, node) {
      return html + ( node.outerHTML || node.nodeValue );
    }, '')
    const markupDom = domParser.parseFromString(markup, "text/html");
    const markupDomBody = markupDom.querySelector("body");
    const output = markupDomBody.innerHTML
    $textarea.val(output)
  }
});

$('#btn-remove-html-inline-styles').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let regexp = new RegExp(/<[/]?(span|o:p|font)[^>]*>|(class|style)="[^>]*"||| |(width)="([0-9]+)"/, 'g');
    let output = input.replace(regexp, '');
    output = output.replace(/ >/g, '>');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-empty-lines-all').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    array = array.filter(entry => entry.trim() != '');
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-empty-lines-top-bottom').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let startIndex = 0,
        endIndex = 0;
    for (let i=0; i<array.length; i++) {
        if (array[i].trim() != '') {
            startIndex = i;
            break;
        }
    }
    for (let i=array.length-1; i>=0; i--) {
        if (array[i].trim() != '') {
            endIndex = i;
            break;
        }
    }
    array = array.slice(startIndex, endIndex+1);
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-empty-lines-multiple').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/^(\n{2,})/gm, '\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-lines-that-only-contain-special-chars').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        if (_.trim(line) === '') {
            return line;
        } else {
            if (_.trim(line.replace(/[^\na-zA-Z0-9 ]/g, '')) !== '') {
                return line;
            }
        }
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-uuids').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let regExp = new RegExp(/[\da-zA-Z]{8}-([\da-zA-Z]{4}-){3}[\da-zA-Z]{12}/, 'gim');
    let output = input.replace(regExp, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-tabs-all').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/\t/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-tabs-multiple').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/\t\t+/g, '\t').trim();
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-duplicate-words').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(' ');
    array = _.compact(array);
    array = _.uniq(array);
    let output = array.join(' ');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-duplicate-lines').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    array = _.compact(array);
    array = _.uniq(array);
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-random-chars').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('');
    if (array.length > 1) {
        array = array.filter(function (item, index) {
            if (Math.random() < 0.5) {
                return true;
            } else {
                if (item === '\n') {
                    return true;
                } else {
                    return false;
                }
            }
        });
    }
    let output = array.join('');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-random-words').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(' ');
    if (array.length > 1) {
        array = array.filter(function (item, index) {
            if (Math.random() < 0.5) {
                return true;
            } else {
                return false;
            }
        });
    }
    let output = array.join(' ');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-random-lines').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    if (array.length > 1) {
        array = array.filter(function (item, index) {
            if (Math.random() < 0.5) {
                return true;
            } else {
                return false;
            }
        });
    }
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-first-char-of-each-word').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    let wordArray;
    lineArray = lineArray.map(line => {
        wordArray = line.split(' ');
        wordArray = wordArray.map(word => {
            return word.slice(1);
        });
        return wordArray.join(' ');
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-first-char-of-each-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(line => {
        return line.slice(1);
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-non-alpha-prefix').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(line => {
        const strLowerCase = line.toLowerCase();
        const numChars = line.length;
        let posOfFirstAlphaChar = null;
        for (let i=0; i<numChars; i++) {
            const charCode = strLowerCase.charCodeAt(i);
            if (charCode >= 97 && charCode <= 122) {
                posOfFirstAlphaChar = i;
                break;
            }
        }
        if (posOfFirstAlphaChar) {
            const lastPart = line.substring(posOfFirstAlphaChar, numChars);
            const modifiedLine = _.padStart(lastPart, numChars, ' ');
            return modifiedLine;
        } else {
            return '';
        }
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-non-alpha-suffix').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(line => {
        const strLowerCase = line.toLowerCase();
        const numChars = line.length;
        let posOfLastAlphaChar = null;
        for (let i=numChars; i>=0; i--) {
            const charCode = strLowerCase.charCodeAt(i);
            if (charCode >= 97 && charCode <= 122) {
                posOfLastAlphaChar = i;
                break;
            }
        }
        if (posOfLastAlphaChar) {
            return line.substring(0, posOfLastAlphaChar+1);
        } else {
            return '';
        }
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-alternate-lines-odd').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    if (array.length > 1) {
        array = array.filter(function (item, index) {
            return isOdd(index);
        });
    }
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-alternate-lines-even').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    if (array.length > 1) {
        array = array.filter(function (item, index) {
            return isEven(index);
        });
    }
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-shortest-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let shortestLineLength = 10000000;
    for (let item of array) {
        if (item.length < shortestLineLength) {
            shortestLineLength = item.length;
        }
    }
    array = array.filter(line => line.length > shortestLineLength)
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-longest-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longestLineLength = 0;
    for (let item of array) {
        if (item.length > longestLineLength) {
            longestLineLength = item.length;
        }
    }
    array = array.filter(line => line.length < longestLineLength)
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-reverse-line-feed').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.toUnicode();
    input = input.replace(/\\u008D/g, '');
    let output = input.replace(/\\u([\d\w]{4})/gi, function (match, grp) {
        return String.fromCharCode(parseInt(grp, 16));
    });
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-console-logs').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/console.log.*/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-javascript-comments').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-html-comments').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/<!--(.|\s)*?-->/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-head-tag').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-body-tag').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/<body\b[^<]*(?:(?!<\/body>)<[^<]*)*<\/body>/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-script-tags').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-style-tags').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/g, '');
    $textarea.val(output);
    updateHistory();
});

$('#lines-that-value').on('change input', function() {
    if ($(this).val() === '') {
        $('#btn-lines-that').prop('disabled', true);
    } else {
        $('#btn-lines-that').prop('disabled', false);
    }
});

$('#btn-lines-that').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let linesThatValue = $('#lines-that-value').val();
    switch($('#select-lines-that').val()) {
        case 'match-exactly':
            array = array.filter(function (line, index) {
                return line !== linesThatValue;
            });
            break; 
        case 'start-with':
            array = array.filter(function (line, index) {
                return !_.startsWith(line, linesThatValue);
            });
            break;
        case 'contain':
            array = array.filter(function (line, index) {
                return !v.includes(line, linesThatValue);
            });
            break;
        case 'end-with':
            array = array.filter(function (line, index) {
                return !_.endsWith(line, linesThatValue);
            });
            break;
        case 'dont-start-with':
            array = array.filter(function (line, index) {
                return _.startsWith(line, linesThatValue);
            });
            break;
        case 'dont-contain':
            array = array.filter(function (line, index) {
                return v.includes(line, linesThatValue);
            });
            break;
        case 'dont-end-with':
            array = array.filter(function (line, index) {
                return _.endsWith(line, linesThatValue);
            });
            break;
        case 'dont-match-exactly':
            array = array.filter(function (line, index) {
                return line === linesThatValue;
            });
            break;
        default:
            break;
    }
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});





$('#words-that-value').on('change input', function() {
    if ($(this).val() === '') {
        $('#btn-words-that').prop('disabled', true);
    } else {
        $('#btn-words-that').prop('disabled', false);
    }
});

$('#btn-words-that').click(function() {
    let $textarea = $('#main-textarea')
    let input = $textarea.val()
    let linesArray = input.split(/\r?\n|\r/)
    let wordsArray = []
    let wordsThatValue = $('#words-that-value').val().trim()
    $('#words-that-value').val(wordsThatValue)
    if (linesArray.length > 1) {
        linesArray = linesArray.map(line => {
            wordsArray = line.split(' ')
            switch($('#select-words-that').val()) {
                case 'match-exactly':
                    wordsArray = wordsArray.filter(function (word, index) {
                        return word !== wordsThatValue;
                    });
                    break; 
                case 'start-with':
                    wordsArray = wordsArray.filter(function (word, index) {
                        return !_.startsWith(word, wordsThatValue);
                    });
                    break;
                case 'contain':
                    wordsArray = wordsArray.filter(function (word, index) {
                        return !v.includes(word, wordsThatValue);
                    });
                    break;
                case 'end-with':
                    wordsArray = wordsArray.filter(function (word, index) {
                        return !_.endsWith(word, wordsThatValue);
                    });
                    break;
                case 'dont-start-with':
                    wordsArray = wordsArray.filter(function (word, index) {
                        return _.startsWith(word, wordsThatValue);
                    });
                    break;
                case 'dont-contain':
                    wordsArray = wordsArray.filter(function (word, index) {
                        return v.includes(word, wordsThatValue);
                    });
                    break;
                case 'dont-end-with':
                    wordsArray = wordsArray.filter(function (word, index) {
                        return _.endsWith(word, wordsThatValue);
                    });
                    break;
                case 'dont-match-exactly':
                    wordsArray = wordsArray.filter(function (word, index) {
                        return word === wordsThatValue;
                    });
                    break;
                default:
                    break;
            }  
            line = wordsArray.join(' ')
            return line
        })
        let output = linesArray.join('\n');
        $textarea.val(output);
        updateHistory();
    }
});

$('#instance-of-text-value').on('change input', function() {
    if ($(this).val() === '') {
        $('#btn-instance-of').prop('disabled', true);
    } else {
        $('#btn-instance-of').prop('disabled', false);
    }
});

$('#btn-instance-of').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let searchText = $('#instance-of-text-value').val();
    let searchTextLength = searchText.length;
    array = array.map(function(line) {
        if (v.includes(line, searchText)) {
            var index = 0;
            switch($('#select-text-on-each-line-position').val()) {
                case 'first':
                    index = line.indexOf(searchText);
                    break;
                case 'last':
                    index = line.lastIndexOf(searchText);
                    break;
                default:
                    break;
            }
            switch($('#select-text-on-each-line').val()) {
                case 'before':
                    return line.substring(index, line.length);
                    break;
                case 'before-and-including':
                    return line.substring(index+searchTextLength, line.length);
                    break;
                case 'including-and-after':
                    return line.substring(0, index);
                    break;
                case 'after':
                    return line.substring(0, index+searchTextLength);
                    break;
                default:
                    return line;
                    break;  
            }
        } else {
            return line;
        }
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#input-remove-chars-from-nth-position').hide();
$('#remove-chars-from-position-from-the-nth-position').hide();
$('#select-remove-chars-from-nth-position-beginning-end').hide();

$('#input-remove-chars-from-nth-position').on('blur', function() {
    $(this).val( $(this).val().trim() );
});

$('#select-remove-chars-from-position').change(function() {
    if ($(this).val() === 'nth-position') {
        $('#input-remove-chars-from-nth-position').show();
        $('#remove-chars-from-position-from-the-nth-position').show();
        $('#select-remove-chars-from-nth-position-beginning-end').show();
    } else {
        $('#input-remove-chars-from-nth-position').hide();
        $('#remove-chars-from-position-from-the-nth-position').hide();
        $('#select-remove-chars-from-nth-position-beginning-end').hide();
    }
});

$('#select-remove-chars-from-position-num-chars').change(function() {
    const value = $(this).val();
    if (value === '1') {
        $('#remove-chars-from-position-if-it-is-a').show();
    } else {
        $('#remove-chars-from-position-if-it-is-a').hide();
    }
});

$('#btn-remove-chars-from-position').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    let numChars = $('#select-remove-chars-from-position-num-chars').val();
    let isIsNot = $('#select-remove-chars-from-nth-position-if-is-is-not').val();
    let isIsNotChar = $('#select-remove-chars-from-nth-position-if-is-is-not-character').val();
    let charToBeRemoved = null;
    numChars = parseInt(numChars, 10);
    let fromPosition = $('#select-remove-chars-from-position').val();
    if (fromPosition === 'beginning') {
        lineArray =  lineArray.map(function(line) {
            if (numChars !== 1) {
                return line.substring(numChars);
            } else {
                charToBeRemoved = line.substring(0, 1);
                if (isIsNotChar === 'anything') {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'space' && isIsNot === 'is' && charToBeRemoved === ' ') || (isIsNotChar === 'space' && isIsNot === 'is-not' && charToBeRemoved !== ' ')) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'tab' && isIsNot === 'is' && charToBeRemoved === '\t') || (isIsNotChar === 'tab' && isIsNot === 'is-not' && charToBeRemoved !== '\t')) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'full-stop' && isIsNot === 'is' && charToBeRemoved === '.') || (isIsNotChar === 'full-stop' && isIsNot === 'is-not' && charToBeRemoved !== '.')) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'colon' && isIsNot === 'is' && charToBeRemoved === ':') || (isIsNotChar === 'colon' && isIsNot === 'is-not' && charToBeRemoved !== ':')) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'semicolon' && isIsNot === 'is' && charToBeRemoved === ';') || (isIsNotChar === 'semicolon' && isIsNot === 'is-not' && charToBeRemoved !== ';')) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'single-quote' && isIsNot === 'is' && charToBeRemoved === '\'') || (isIsNotChar === 'single-quote' && isIsNot === 'is-not' && charToBeRemoved !== '\'')) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'double-quote' && isIsNot === 'is' && charToBeRemoved === '"') || (isIsNotChar === 'double-quote' && isIsNot === 'is-not' && charToBeRemoved !== '"')) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'backtick' && isIsNot === 'is' && charToBeRemoved === '`') || (isIsNotChar === 'backtick' && isIsNot === 'is-not' && charToBeRemoved !== '`')) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'pipe' && isIsNot === 'is' && charToBeRemoved === '|') || (isIsNotChar === 'pipe' && isIsNot === 'is-not' && charToBeRemoved !== '|')) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'lowercase' && isIsNot === 'is' && 'abcdefghijklmnopqrstuvwxyz'.indexOf(charToBeRemoved) > -1) || (isIsNotChar === 'lowercase' && isIsNot === 'is-not' && 'abcdefghijklmnopqrstuvwxyz'.indexOf(charToBeRemoved) === -1)) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'uppercase' && isIsNot === 'is' && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(charToBeRemoved) > -1) || (isIsNotChar === 'uppercase' && isIsNot === 'is-not' && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(charToBeRemoved) === -1)) {
                    return line.substring(numChars);
                } else if ((isIsNotChar === 'number' && isIsNot === 'is' && '0123456789'.indexOf(charToBeRemoved) > -1) || (isIsNotChar === 'number' && isIsNot === 'is-not' && '0123456789'.indexOf(charToBeRemoved) === -1)) {
                    return line.substring(numChars);
                }
            }
            return line;
        });
    } else if (fromPosition === 'end') {
        lineArray =  lineArray.map(function(line) {
            const lineLength = line.length;
            if (numChars !== 1) {
                return line.substring(0, lineLength-numChars);
            } else {
                charToBeRemoved = line.substring(lineLength-1, lineLength);
                if (isIsNotChar === 'anything') {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'space' && isIsNot === 'is' && charToBeRemoved === ' ') || (isIsNotChar === 'space' && isIsNot === 'is-not' && charToBeRemoved !== ' ')) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'tab' && isIsNot === 'is' && charToBeRemoved === '\t') || (isIsNotChar === 'tab' && isIsNot === 'is-not' && charToBeRemoved !== '\t')) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'full-stop' && isIsNot === 'is' && charToBeRemoved === '.') || (isIsNotChar === 'full-stop' && isIsNot === 'is-not' && charToBeRemoved !== '.')) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'colon' && isIsNot === 'is' && charToBeRemoved === ':') || (isIsNotChar === 'colon' && isIsNot === 'is-not' && charToBeRemoved !== ':')) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'semicolon' && isIsNot === 'is' && charToBeRemoved === ';') || (isIsNotChar === 'semicolon' && isIsNot === 'is-not' && charToBeRemoved !== ';')) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'single-quote' && isIsNot === 'is' && charToBeRemoved === '\'') || (isIsNotChar === 'single-quote' && isIsNot === 'is-not' && charToBeRemoved !== '\'')) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'double-quote' && isIsNot === 'is' && charToBeRemoved === '"') || (isIsNotChar === 'double-quote' && isIsNot === 'is-not' && charToBeRemoved !== '"')) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'backtick' && isIsNot === 'is' && charToBeRemoved === '`') || (isIsNotChar === 'backtick' && isIsNot === 'is-not' && charToBeRemoved !== '`')) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'pipe' && isIsNot === 'is' && charToBeRemoved === '|') || (isIsNotChar === 'pipe' && isIsNot === 'is-not' && charToBeRemoved !== '|')) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'lowercase' && isIsNot === 'is' && 'abcdefghijklmnopqrstuvwxyz'.indexOf(charToBeRemoved) > -1) || (isIsNotChar === 'lowercase' && isIsNot === 'is-not' && 'abcdefghijklmnopqrstuvwxyz'.indexOf(charToBeRemoved) === -1)) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'uppercase' && isIsNot === 'is' && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(charToBeRemoved) > -1) || (isIsNotChar === 'uppercase' && isIsNot === 'is-not' && 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(charToBeRemoved) === -1)) {
                    return line.substring(0, lineLength-1);
                } else if ((isIsNotChar === 'number' && isIsNot === 'is' && '0123456789'.indexOf(charToBeRemoved) > -1) || (isIsNotChar === 'number' && isIsNot === 'is-not' && '0123456789'.indexOf(charToBeRemoved) === -1)) {
                    return line.substring(0, lineLength-1);
                }
            }
            return line;
        });
    } else if (fromPosition === 'beginning-and-end') {
        lineArray =  lineArray.map(function(line) {
            const lineLength = line.length;
            return line.substring(numChars, lineLength-numChars);
        });
    } else {
        let nthPos = $('#input-remove-chars-from-nth-position').val();
        let fromBeginningEnd = $('#select-remove-chars-from-nth-position-beginning-end').val();
        nthPos = parseInt(nthPos, 10);
        if (!isNaN(nthPos)) {
            let lineLength, part1, part2;
            lineArray =  lineArray.map(function(line) {
                if (fromBeginningEnd === 'beginning') {
                    lineLength = line.length;
                    part1 = line.substring(0, nthPos);
                    part2 = line.substring(nthPos + numChars, lineLength);
                    return (part1 + part2);
                } else if (fromBeginningEnd === 'end') {
                    lineLength = line.length;
                    part1 = line.substring(0, lineLength - nthPos);
                    part2 = line.substring(lineLength - nthPos + numChars, lineLength);
                    return (part1 + part2);
                }
            });
        }
    }
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#input-remove-lines-from-nth-position').hide();
$('#remove-lines-from-position-from-the-nth-position').hide();
$('#select-remove-lines-from-nth-position-beginning-end').hide();

$('#input-remove-lines-from-nth-position').on('blur', function() {
    $(this).val( $(this).val().trim() );
});

$('#select-remove-lines-from-position').change(function() {
    if ($(this).val() === 'nth-position') {
        $('#input-remove-lines-from-nth-position').show();
        $('#remove-lines-from-position-from-the-nth-position').show();
        $('#select-remove-lines-from-nth-position-beginning-end').show();
    } else {
        $('#input-remove-lines-from-nth-position').hide();
        $('#remove-lines-from-position-from-the-nth-position').hide();
        $('#select-remove-lines-from-nth-position-beginning-end').hide();
    }
});

$('#btn-remove-lines-from-position').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    let numLines = $('#select-remove-lines-from-position-num-lines').val();
    numLines = parseInt(numLines, 10);
    let fromPosition = $('#select-remove-lines-from-position').val();
    if (fromPosition === 'beginning') {
        lineArray.splice(0, numLines);
    } else if (fromPosition === 'end') {
        lineArray.splice(lineArray.length-numLines, lineArray.length);
    } else if (fromPosition === 'beginning-and-end') {
        lineArray.splice(lineArray.length-numLines, lineArray.length);
        lineArray.splice(0, numLines);
    } else {
        let nthPos = $('#input-remove-lines-from-nth-position').val();
        let fromBeginningEnd = $('#select-remove-lines-from-nth-position-beginning-end').val();
        nthPos = parseInt(nthPos, 10);
        if (!isNaN(nthPos)) {
            if (fromBeginningEnd === 'beginning') {
                lineArray.splice(nthPos, numLines)
            } else if (fromBeginningEnd === 'end') {
                lineArray.splice(lineArray.length-nthPos, numLines) 
            };     
        }
    }
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#select-remove-words-and-lines-by-length').change(function() {
    if ($(this).val() === 'remove-words-by-length') {
        $('#btn-remove-words-and-lines-by-length').text('Remove words');
    } else if ($(this).val()  === 'remove-lines-by-length') {
        $('#btn-remove-words-and-lines-by-length').text('Remove lines');
    }
});

$('#btn-remove-words-and-lines-by-length').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    let type = $('#select-remove-lines-by-length-type').val();
    let numChars = $('#select-remove-lines-by-length-num-chars').val();
    let wordsOrLines;
    if ($('#select-remove-words-and-lines-by-length').val() === 'remove-words-by-length') {
        wordsOrLines = 'words';
    } else if ($('#select-remove-words-and-lines-by-length').val() === 'remove-lines-by-length') {
        wordsOrLines = 'lines';   
    }
    numChars = parseInt(numChars, 10);
    let wordsArray = [];
    switch(type) {
        case 'less-than':
            if (wordsOrLines === 'lines') {
                lineArray = lineArray.filter(function(line) {
                    if (line.length >= numChars) {
                        return true;
                    }
                });
            } else if (wordsOrLines === 'words') {
                lineArray = lineArray.map(function(line) {
                    wordsArray = line.split(' ');
                    wordsArray = wordsArray.filter(function(word) {
                        if (word.length >= numChars) {
                            return true;
                        }
                    });
                    return wordsArray.join(' ');
                });
            }
            break;
        case 'less-than-or-equal-to':
            if (wordsOrLines === 'lines') {
                lineArray = lineArray.filter(function(line) {
                    if (line.length > numChars) {
                        return true;
                    }
                });
            } else if (wordsOrLines === 'words') {
                lineArray = lineArray.map(function(line) {
                    wordsArray = line.split(' ');
                    wordsArray = wordsArray.filter(function(word) {
                        if (word.length > numChars) {
                            return true;
                        }
                    });
                    return wordsArray.join(' ');
                });
            }
            break;
        case 'equal-to':
            if (wordsOrLines === 'lines') {
                lineArray = lineArray.filter(function(line) {
                    if (line.length !== numChars) {
                        return true;
                    }
                });
            } else if (wordsOrLines === 'words') {
                lineArray = lineArray.map(function(line) {
                    wordsArray = line.split(' ');
                    wordsArray = wordsArray.filter(function(word) {
                        if (word.length !== numChars) {
                            return true;
                        }
                    });
                    return wordsArray.join(' ');
                });
            }
            break;
        case 'not-equal-to':
            if (wordsOrLines === 'lines') {
                lineArray = lineArray.filter(function(line) {
                    if (line.length === numChars) {
                        return true;
                    }
                });
            } else if (wordsOrLines === 'words') {
                lineArray = lineArray.map(function(line) {
                    wordsArray = line.split(' ');
                    wordsArray = wordsArray.filter(function(word) {
                        if (word.length === numChars) {
                            return true;
                        }
                    });
                    return wordsArray.join(' ');
                });
            }
            break;
        case 'more-than-or-equal-to':
            if (wordsOrLines === 'lines') {
                lineArray = lineArray.filter(function(line) {
                    if (line.length < numChars) {
                        return true;
                    }
                });
            } else if (wordsOrLines === 'words') {
                lineArray = lineArray.map(function(line) {
                    wordsArray = line.split(' ');
                    wordsArray = wordsArray.filter(function(word) {
                        if (word.length < numChars) {
                            return true;
                        }
                    });
                    return wordsArray.join(' ');
                });
            }
            break;
        case 'more-than':
            if (wordsOrLines === 'lines') {
                lineArray = lineArray.filter(function(line) {
                    if (line.length <= numChars) {
                        return true;
                    }
                });
            } else if (wordsOrLines === 'words') {
                lineArray = lineArray.map(function(line) {
                    wordsArray = line.split(' ');
                    wordsArray = wordsArray.filter(function(word) {
                        if (word.length <= numChars) {
                            return true;
                        }
                    });
                    return wordsArray.join(' ');
                });
            }
            break;
        default:
            break;  
    }
    let output = '';
    if (wordsOrLines === 'lines') {
        output = lineArray.join('\n');
    } else if (wordsOrLines === 'words') {
        output = lineArray.join('\n');
    }
    $textarea.val(output);
    updateHistory();
});


$('#btn-remove-lines-start-with-type').click(function() {
    const $textarea = $('#main-textarea')
    const input = $textarea.val()
    let lineArray = input.split(/\r?\n|\r/)
    const type = $('#select-remove-lines-start-with-type').val()
    let firstCharCode;
    switch(type) {
        case 'az':
            lineArray = lineArray.filter(line => {
                firstCharCode = line.charCodeAt(0)
                return !(firstCharCode >= 97 && firstCharCode <= 122)
            })
            break
        case 'AZ':
            lineArray = lineArray.filter(line => {
                firstCharCode = line.charCodeAt(0)
                return !(firstCharCode >= 65 && firstCharCode <= 90)
            })
            break
        case '09':
            lineArray = lineArray.filter(line => {
                firstCharCode = line.charCodeAt(0)
                return !(firstCharCode >= 48 && firstCharCode <= 57)
            })
            break
        case 'azAZ':
            lineArray = lineArray.filter(line => {
                firstCharCode = line.charCodeAt(0)
                return !((firstCharCode >= 97 && firstCharCode <= 122) || (firstCharCode >= 65 && firstCharCode <= 90))
            })
            break
        case 'punctuation-symbol':
            lineArray = lineArray.filter(line => {
                firstCharCode = line.charCodeAt(0)
                return ((firstCharCode >= 97 && firstCharCode <= 122) || (firstCharCode >= 65 && firstCharCode <= 90) || (firstCharCode >= 48 && firstCharCode <= 57))
            })
            break
        case 'space':
            lineArray = lineArray.filter(line => {
                firstCharCode = line.charCodeAt(0)
                return !(firstCharCode === 32)
            })
            break
        case 'tab':
            lineArray = lineArray.filter(line => {
                firstCharCode = line.charCodeAt(0)
                return !(firstCharCode === 9)
            })
            break
        case 'hyphen':
            lineArray = lineArray.filter(line => {
                firstCharCode = line.charCodeAt(0)
                return !(firstCharCode === 45)
            })
            break
        case 'less-than':
            lineArray = lineArray.filter(line => {
                firstCharCode = line.charCodeAt(0)
                return !(firstCharCode === 60)
            })
            break
        default:
            break 
    }
            
    const output = lineArray.join('\n')
    $textarea.val(output)
    updateHistory()
});

// =========================================================
// Replace fieldset
// =========================================================

$('#btn-replace-using-regular-expression').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let pattern = '';
    pattern = prompt('Regex pattern:', '([A-Z])\\w+');
    if (pattern) {
        pattern = encodeURIComponent(pattern);
        input = encodeURIComponent(input);
        const url = `http://regexstorm.net/tester?p=${pattern}&i=${input}`;
        window.open(url,'_blank');
    }
});

$('#replace-1-other, #replace-2-other').hide();

$('#select-replace-1').change(function() {
    if ($(this).val() === 'other') {
        $('#replace-1-other').show();
    } else {
        $('#replace-1-other').hide();
    }
});

$('#select-replace-2').change(function() {
    if ($(this).val() === 'other') {
        $('#replace-2-other').show();
    } else {
        $('#replace-2-other').hide();
    }
});

$('#btn-replace').click(function() {
    let output = '',
        array = [];
    
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    
    let replace1 = '';
    switch($('#select-replace-1').val()) {
        case 'linebreaks':
            array = input.split(/\r?\n|\r/);
            replace1 = '\n\r';
            break;
        case 'tabs':
            array = input.split('\t');
            replace1 = '\t';
            break;
        case 'two-tabs':
            array = input.split('\t\t');
            replace1 = '\t\t';
            break;
        case 'spaces':
            array = input.split(' ');
            replace1 = ' ';
            break;
        case 'two-spaces':
            array = input.split('  ');
            replace1 = '  ';
            break;
        case 'four-spaces':
            array = input.split('    ');
            replace1 = '    ';
            break;
        case 'hyphen':
            array = input.split('-');
            replace1 = '-';
            break;
        case 'underscore':
            array = input.split('_');
            replace1 = '_';
            break;
        case 'commas':
            array = input.split(',');
            replace1 = ',';
            break;
        case 'commas-space':
            array = input.split(', ');
            replace1 = ', ';
            break;
        case 'full-stops':
            array = input.split('.');
            replace1 = '.';
            break;
        case 'full-stop-space':
            array = input.split('. ');
            replace1 = '. ';
            break;
        case 'colon':
            array = input.split(':');
            replace1 = ':';
            break;
        case 'semicolon':
            array = input.split(';');
            replace1 = ';';
            break;
        case 'single-quotes':
            array = input.split('\'');
            replace1 = '\'';
            break;
        case 'double-quotes':
            array = input.split('"');
            replace1 = '"';
            break;
        case 'double-double-quotes':
            array = input.split('""');
            replace1 = '""';
            break;
        case 'backticks':
            array = input.split('``');
            replace1 = '`';
            break;
        case 'array-single':
            array = input.split(', ');
            replace1 = 'array-single';
            break;
        case 'array-double':
            array = input.split(', ');
            replace1 = 'array-double';
            break;
        case 'pipe':
            array = input.split('|');
            replace1 = '|';
            break;
        case 'angle-brackets':
            array = input.split('><');
            replace1 = '><';
            break;
        case 'between-each-char':
            array = input.split('');
            replace1 = '';
            break;
        case 'single-backslash':
            array = input.split('\\');
            replace1 = '';
            break;
        case 'double-backslash':
            array = input.split('\\\\');
            replace1 = '';
            break;
        case 'middle-dot-unicode':
            array = input.split('·');
            replace1 = '·';
            break;
        case 'other':
            array = input.split($('#replace-1-other').val());
            replace1 = $('#replace-1-other').val();
            break;
        default:
            break;
    }
    
    let replace2 = '';
    switch($('#select-replace-2').val()) {
        case 'linebreaks':
            replace2 = '\n';
            break;
        case 'tabs':
            replace2 = '\t';
            break;
        case 'two-tabs':
            replace2 = '\t\t';
            break;
        case 'spaces':
            replace2 = ' ';
            break;
        case 'two-spaces':
            replace2 = '  ';
            break;
        case 'four-spaces':
            replace2 = '    ';
            break;
        case 'hyphen':
            replace2 = '-';
            break;
        case 'underscore':
            replace2 = '_';
            break;
        case 'commas':
            replace2 = ',';
            break;
        case 'commas-space':
            replace2 = ', ';
            break;
        case 'full-stops':
            replace2 = '.';
            break;
        case 'full-stop-space':
            replace2 = '. ';
            break;
        case 'full-stop-linebreak':
            replace2 = '.\n';
            break;
        case 'colon':
            replace2 = ':';
            break;
        case 'semicolon':
            replace2 = ';';
            break;
        case 'single-quotes':
            replace2 = '\'';
            break;
        case 'double-quotes':
            replace2 = '"';
            break;
        case 'double-double-quotes':
            replace2 = '""';
            break;
        case 'backticks':
            replace2 = '`';
            break;
        case 'array-single':
            replace2 = 'array-single';
            break;
        case 'array-double':
            replace2 = 'array-double';
            break;
        case 'pipe':
            replace2 = '|';
            break;
        case 'angle-brackets-linebreak':
            replace2 = '>\n<';
            break;
        case 'nothing':
            replace2 = '';
            break;
        case 'single-backslash':
            replace2 = '\\';
            break;
        case 'double-backslash':
            replace2 = '\\\\';
            break;
        case 'middle-dot-unicode':
            replace2 = '·';
            break;
        case 'other':
            replace2 = $('#replace-2-other').val();
            break;
        default:
            break;
    }
    
    if (replace1 === 'array-single' || replace1 === 'array-double') {
        input = _.trim(input);
        if (input.charAt(0) === '[') {
            input = removeFirstChar(input);
        }
        if (input.charAt(input.length-1) === ']') {
            input = removeLastChar(input);
        }
        array = input.split(', ');
        array =  array.map(function(item) {
            item = removeFirstChar(item);
            item = removeLastChar(item);
            return item;
        });
    } else {
        const replace1Escaped = _.escapeRegExp(replace1);
        let regExp1 = new RegExp(replace1Escaped, 'g');
    }
    
    if (replace2 === 'array-single' || replace2 === 'array-double') {
        output += '[';
        let quoteChar;
        if (replace2 === 'array-single') {
            quoteChar = '\'';
        } else if (replace2 === 'array-double') {
            quoteChar = '"';
        }
        array = array.map(function(char) {
            return quoteChar + char + quoteChar;
        });
        output += array.join(', ');
        output += ']';
    } else {
        output = array.join(replace2);
    }
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Split on String fieldset
// =========================================================

$('#btn-split-on-string').click(function() {
    let $textarea = $('#main-textarea');
    let splitStr = $('#split-on-string').val();
    let input = $textarea.val();
    input = input.replace(/\r?\n|\r/g, '');
    let re = new RegExp(splitStr, 'g');
    input = input.replace(re, '\n'+splitStr);
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line, index) {
        return _.trim(line);
    });
    array = array.filter(function(line) {
        if (line !== undefined && line.length > 0) {
            return true;
        }
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Case fieldset
// =========================================================

$('#btn-case-invert').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array =  input.split('').map(function(char) {
        let tempChar = char.toUpperCase()
        if (char === tempChar) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    });
    let output = array.join('');
    $textarea.val(output);
    updateHistory();
});

$('#btn-case-uppercase').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.toUpperCase();
    $textarea.val(output);
    updateHistory();
});

$('#btn-case-lowercase').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.toLowerCase();
    $textarea.val(output);
    updateHistory();
});

$('#btn-case-titlecase-words').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.toLowerCase();
    let array = input.split(' ');
    array = array.map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    });
    let output = array.join(' ');
    $textarea.val(output);
    updateHistory();
});

$('#btn-case-titlecase-lines').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.toLowerCase();
    let array = input.split('\n');
    array = array.map(function(line) {
        return line.charAt(0).toUpperCase() + line.slice(1);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-case-random').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array =  input.split('').map(function(char) {
        if(Math.random() < 0.5) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    });
    let output = array.join('');
    $textarea.val(output);
    updateHistory();
});

$('#btn-case-alternate').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array =  input.split('').map(function(char, index) {
        if(isEven(index)) {
            return char.toUpperCase();
        } else {
            return char.toLowerCase();
        }
    });
    let output = array.join('');
    $textarea.val(output);
    updateHistory();
});

$('#btn-case-uppercase-first-letter-each-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(function(line) {
      return line.charAt(0).toUpperCase() + line.slice(1);
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-case-lowercase-first-letter-each-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(function(line) {
      return line.charAt(0).toLowerCase() + line.slice(1);
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Order / Sort fieldset
// =========================================================

$('#btn-modify-order-chars').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('');
    array =  array.map(function(char) {
        return char.charCodeAt(0);
    });
    array = array.sort(function(a, b) {
        return a - b;
    });
    array = array.map(function(charCode) {
        return String.fromCharCode(charCode);
    });
    let output = array.join('');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-order-words').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(' ');
    array =  array.sort();
    let output = array.join(' ');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-order-words-by-length').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(' ');
    array =  array.sort();
    array.sort(function(a,b){
        return a.length - b.length;
    });
    let output = array.join(' ');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-order-lines').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array =  array.sort();
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-order-lines-by-length').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array =  array.sort();
    array.sort(function(a,b){
        return a.length - b.length;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Reverse fieldset
// =========================================================

$('#btn-modify-reverse-chars').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.split('').reverse().join('');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-reverse-chars-on-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(function(line) {
      let charsArray = line.split('');
      charsArray = charsArray.reverse();
      return charsArray.join('');
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-reverse-chars-in-each-word').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(line => {
        let wordsArray = line.split(' ');
        wordsArray = wordsArray.map(word => {
            let charsArray = word.split('');
            charsArray = charsArray.reverse();
            return charsArray.join('');
        });
        return wordsArray.join(' ');
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-reverse-words').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.split(' ').reverse().join(' ');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-reverse-words-on-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(line => {
      let wordsArray = line.split(' ');
      wordsArray = wordsArray.reverse();
      return wordsArray.join(' ');
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-reverse-lines').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.split(/\r?\n|\r/).reverse().join('\n');
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Scramble fieldset
// =========================================================

$('#btn-modify-scramble-all-chars').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('');
    array = array.sort(function() {return 0.5 - Math.random()});
    let output = array.join('');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-scramble-chars-on-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(function(line) {
      let charsArray = line.split('');
      charsArray = charsArray.sort(function() {return 0.5 - Math.random()});
      return charsArray.join('');
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-scramble-chars-in-each-word').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(line => {
        let wordsArray = line.split(' ');
        wordsArray = wordsArray.map(word => {
            let charsArray = word.split('');
            charsArray = charsArray.sort(function() {return 0.5 - Math.random()});
            return charsArray.join('');
        });
        return wordsArray.join(' ');
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-scramble-chars-in-each-word-keep-first-and-last').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(line => {
        let wordsArray = line.split(' ');
        wordsArray = wordsArray.map(word => {
            return shuffleAlphaChars(word, true, true)
        });
        return wordsArray.join(' ');
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-scramble-all-words').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(' ');
    array = array.sort(function() {return 0.5 - Math.random()});
    let output = array.join(' ');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-scramble-words-on-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(line => {
      let wordsArray = line.split(' ');
      wordsArray = wordsArray.sort(function() {return 0.5 - Math.random()});
      return wordsArray.join(' ');
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-scramble-lines').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.sort(function() {return 0.5 - Math.random()});
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-scramble-lines-fisher-yates').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = shuffleFisherYates(array);
    array = shuffleFisherYates(array);
    array = shuffleFisherYates(array);
    array = shuffleFisherYates(array);
    array = shuffleFisherYates(array);
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Modify fieldset
// =========================================================

$('#btn-modify-leetspeak').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/[a-z]/g,function f(a){return "4BCD3F6H1JKLMN0PQR57"[parseInt(a, 36)-10] || a.replace(/[a-t]/gi,f)});
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-straighten-quotes').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = v.tr(input, '‘’“”', '\'\'""');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-upside-down').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.toLowerCase();
    input = input.split('').reverse().join('');
    let output = v.tr(input, 'abcdefghijklmnopqrstuvwxyz?!<>', 'ɐqɔpǝɟƃɥıɾʞןɯuodbɹsʇnʌʍxʎz¿¡><');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-upside-down').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.toLowerCase();
    input = input.split('').reverse().join('');
    let output = v.tr(input, 'ɐqɔpǝɟƃɥıɾʞןɯuodbɹsʇnʌʍxʎz¿¡<>', 'abcdefghijklmnopqrstuvwxyz?!><');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-insert-line-numbers').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let numLines = array.length;
    let padSize = numLines.toString().length;
    array = array.map(function(line, index) {
        return _.padStart(index+1, padSize, '0') + '\t' + line;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-pad-left').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let longestLineLength = 0;
    let numLines = array.length;
    let padChar = prompt("What character do you want to pad with?", '0');
    if (padChar !== '') {
        for (let i=0; i<numLines; i++) {
	        if (array[i].length > longestLineLength) {
	            longestLineLength = array[i].length;
	        }
	    }
	    array = array.map(function(line, index) {
	        return _.padStart(line, longestLineLength, padChar);
	    });
	    let output = array.join('\n');
	    $textarea.val(output);
	    updateHistory();
    }
});

$('#btn-modify-pad-right').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let longestLineLength = 0;
    let numLines = array.length;
    let padChar = prompt("What character do you want to pad with?", '0');
    if (padChar !== '') {
        for (let i=0; i<numLines; i++) {
	        if (array[i].length > longestLineLength) {
	            longestLineLength = array[i].length;
	        }
	    }
	    array = array.map(function(line, index) {
	        return _.padEnd(line, longestLineLength, padChar);
	    });
	    let output = array.join('\n');
	    $textarea.val(output);
	    updateHistory();
    }
});

$('#btn-modify-pad-left-and-right').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let longestLineLength = 0;
    let numLines = array.length;
    let padChar = prompt("What character do you want to pad with?", '0');
    if (padChar !== '') {
        for (let i=0; i<numLines; i++) {
	        if (array[i].length > longestLineLength) {
	            longestLineLength = array[i].length;
	        }
	    }
	    array = array.map(function(line, index) {
            let padStartLength = Math.floor((longestLineLength - line.length) / 2) + line.length;
	        return _.padStart(line, padStartLength, padChar);
	    });
        array = array.map(function(line, index) {
	        return _.padEnd(line, longestLineLength, padChar);
	    });
	    let output = array.join('\n');
	    $textarea.val(output);
	    updateHistory();
    }
});

$('#btn-modify-line-up-first-instance-of-char').click(function() {
    let str = prompt("Which character or string do you want to line up?", ':');
    if (str != '' && str != null) {
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let array = input.split(/\r?\n|\r/);
        let largestIndexOfStr = 0;
        for (let i=0; i<array.length; i++) {
            if (array[i].indexOf(str) > largestIndexOfStr) {
                largestIndexOfStr = array[i].indexOf(str)
            }
        }
        array = array.map(line => {
            if (line.indexOf(str) > -1) {
                let lineLength = line.length;
                let offset = largestIndexOfStr - line.indexOf(str)
                let newLine = _.padStart(line, offset + lineLength, ' ');
                return newLine;
            } else {
                return line;
            }
        })
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-line-up-last-instance-of-char').click(function() {
    let str = prompt("Which character or string do you want to line up?", ':');
    if (str != '' && str != null) {
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let array = input.split(/\r?\n|\r/);
        let largestIndexOfStr = 0;
        for (let i=0; i<array.length; i++) {
            if (array[i].lastIndexOf(str) > largestIndexOfStr) {
                largestIndexOfStr = array[i].indexOf(str)
            }
        }
        array = array.map(line => {
            if (line.lastIndexOf(str) > -1) {
                let lineLength = line.length;
                let offset = largestIndexOfStr - line.lastIndexOf(str)
                let newLine = _.padStart(line, offset + lineLength, ' ');
                return newLine;
            } else {
                return line;
            }
        })
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-line-up-csv-data').click(function() {
    const delimiter = ','
    let numLines = 0
    let numCols = 0
    let $textarea = $('#main-textarea')
    let input = $textarea.val()
    let linesArray = input.split(/\r?\n|\r/)
    linesArray = linesArray.map(line => line.trim()).filter(line => line !== '').map(line => line.split(delimiter))
    if (linesArray.length > 1) {
        numCols = linesArray[0].length
        let longestItemsByCol = new Array(numCols)
        longestItemsByCol = longestItemsByCol.fill(0)
        linesArray = linesArray.map(rowArray => {
            rowArray = rowArray.map((item, index) => {
                let tempDelimiter = ''
                if (index < numCols-1) {
                    tempDelimiter = delimiter
                }
                item = `${item.trim()}${tempDelimiter}`
                if (longestItemsByCol[index] < item.length) longestItemsByCol[index] = item.length
                return item
            })
            return rowArray
        })

        linesArray = linesArray.map(rowArray => rowArray.map((item, index) => {
            return _.padEnd(item, longestItemsByCol[index]+1, ' ')
        }))
        linesArray = linesArray.map(rowArray => rowArray.join('').trim())
        let output = linesArray.join('\n')
        $textarea.val(output)
        updateHistory()
    }
});

$('#btn-modify-line-up-pipe-delimited-data').click(function() {
    const delimiter = '|'
    let numLines = 0
    let numCols = 0
    let $textarea = $('#main-textarea')
    let input = $textarea.val()
    let linesArray = input.split(/\r?\n|\r/)
    linesArray = linesArray.map(line => line.trim()).filter(line => line !== '').map(line => line.split(delimiter))
    if (linesArray.length > 1) {
        numCols = linesArray[0].length
        let longestItemsByCol = new Array(numCols)
        longestItemsByCol = longestItemsByCol.fill(0)
        linesArray = linesArray.map(rowArray => {
            rowArray = rowArray.map((item, index) => {
                let tempDelimiter = ''
                if (index < numCols-1) {
                    tempDelimiter = delimiter
                }
                item = `${item.trim()}${tempDelimiter}`
                if (longestItemsByCol[index] < item.length) longestItemsByCol[index] = item.length
                return item
            })
            return rowArray
        })

        linesArray = linesArray.map(rowArray => rowArray.map((item, index) => {
            return _.padEnd(item, longestItemsByCol[index]+1, ' ')
        }))
        linesArray = linesArray.map(rowArray => rowArray.join('').trim())
        let output = linesArray.join('\n')
        $textarea.val(output)
        updateHistory()
    }
});

$('#btn-modify-transpose').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    let longestLineLength = 0;
    for (let i=0; i<lineArray.length; i++) {
      if (lineArray[i].length > longestLineLength) {
        longestLineLength = lineArray[i].length;
      }
    }
    lineArray = lineArray.map(function(line) {
      return _.padEnd(line, longestLineLength, ' ').split('');
    });
    let transposedLineArray = Array.from({ length: lineArray[0].length }, function(x, row) {
      return Array.from({ length: lineArray.length }, function(x, col) {
        return lineArray[col][row];
      });
    });
    let output = '';
    for (let i=0; i<transposedLineArray.length; i++) {
      let line = transposedLineArray[i];
      if (i < transposedLineArray.length-1) {
        output += line.join('') + '\n';
      } else {
        output += line.join('');
      }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-trim-each-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line, index) {
        return _.trim(line);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-one-char-per-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.split('').join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-duplicate-text').click(function() {
    let numTimes = prompt("How many duplications do you want?", '1');
    if (numTimes != '' && numTimes != null) {
        numTimes = parseInt(numTimes, 10);
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let output = '';
        for (let i=0; i<=numTimes; i++) {
            if (i<numTimes) {
                output += input + '\n';
            } else {
                output += input;
            }
        }
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-duplicate-each-line-horizontally').click(function() {
    let numTimes = prompt("How many duplications do you want of each line?", '1');
    if (numTimes != '' && numTimes != null) {
        numTimes = parseInt(numTimes, 10);
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let lineArray = input.split(/\r?\n|\r/);
        lineArray =  lineArray.map(function(line) {
            return line.repeat(numTimes+1);
        });
        let output = lineArray.join('\n');
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-duplicate-each-line-vertically').click(function() {
    let numTimes = prompt("How many duplications do you want of each line?", '1');
    if (numTimes != '' && numTimes != null) {
        numTimes = parseInt(numTimes, 10);
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let lineArray = input.split(/\r?\n|\r/);
        let newArray=[];
        for (let i = 0; i<lineArray.length; ++i) {
          for (let j = 0; j<=numTimes; ++j) {
             newArray.push(lineArray[i]);
          }
        }
        let output = newArray.join('\n');
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-swap-top-and-bottom').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    const numLines = lineArray.length;
    if (!isEven(numLines)) {
        alert('There must be an even number of lines.');
        return false;
    }
    const firstHalf = lineArray.slice(0, numLines/2);
    const secondHalf = lineArray.slice(numLines/2, numLines);
    const flippedArray = secondHalf.concat(firstHalf);
    const output = flippedArray.join('\n');
    $textarea.val(output);
    updateHistory();
 });   

$('#btn-modify-merge-bottom-into-top').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    if (!isEven(lineArray.length)) {
        alert('There must be an even number of lines.');
        return false;
    }
    let joinStr = prompt("Which character or string do you want to use to join them together?", ' ');
    if (joinStr != null) {
        let startArray = lineArray.slice(0, lineArray.length/2);
        let endArray = lineArray.slice(lineArray.length/2);
        let mergedArray = [];
        for (let i=0; i<lineArray.length/2; i++) {
            mergedArray.push(`${startArray[i]}${joinStr}${endArray[i]}`);
        }
        let output = `${mergedArray.join('\n')}`;  
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-hard-word-wrap').click(function() {
    let lineLength = prompt('Word wrap after how many characters?', '50');
    if (lineLength != '' && lineLength != null) {
        lineLength = parseInt(lineLength, 10);
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        const output = wordwrap(input, 0, lineLength, 'soft');
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-insert-linebreak-every-n-chars').click(function() {
    let charCount = prompt('Insert a linebreak after how many characters?', '8');
    if (charCount != '' && charCount != null) {
        charCount = parseInt(charCount, 10);
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let regexStr = "(.{" + charCount + "}|.*)";   
        let regex = new RegExp(regexStr,'g');
        let output = input.match(regex).join('\n');        
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-insert-n-linebreak-after-each-line').click(function() {
    let linebreakCount = prompt('Insert how many linebreaks after each line?', '2');
    if (linebreakCount != '' && linebreakCount != null) {
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let lineArray = input.split(/\r?\n|\r/);
        linebreakCount = parseInt(linebreakCount, 10);
        let linebreaksArray = [];
        for (var i=0; i<linebreakCount; i++) {
          linebreaksArray.push('\n');
        }
        const linebreaksStr = linebreaksArray.join('');
        const output = lineArray.join(linebreaksStr);       
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-insert-n-linebreaks-after-every-n-lines').click(function() {
    let linebreakCount = prompt('Insert how many linebreaks do you want to insert?', '1');
    let linebreakPos = prompt('Insert linebreaks after how many lines?', '10');
    
    if (linebreakCount != '' && linebreakCount != null && linebreakPos != '' && linebreakPos != null) {
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let lineArray = input.split(/\r?\n|\r/);
        linebreakCount = parseInt(linebreakCount, 10);
        linebreakCount = linebreakCount - 1;
        linebreakPos = parseInt(linebreakPos, 10);
        var numInserts = (lineArray.length - (lineArray.length % linebreakPos)) / linebreakPos;
        let textToInsert = _.repeat('\n', linebreakCount);
        var count = 1;
        for (var i=0; i<numInserts; i++) {
          lineArray.splice((linebreakPos * count)+(count-1), 0, textToInsert);
          count++;
        }
        const output = lineArray.join('\n');       
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-insert-text-at-position-n').click(function() {
    let insertStr = prompt('Text to be inserted \u2026', '');
    let position =  prompt('After character position \u2026', '0');
    if (insertStr != '' && insertStr != null && position != '' && position != null) {
        position = parseInt(position, 10);
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let lineArray = input.split(/\r?\n|\r/);
        let lineLength = 0;
        lineArray = lineArray.map(function(line, index) {
            lineLength = line.length;
            if (lineLength >= position) {
                return line.substr(0, position) + insertStr + line.substr(position);
            } else {
                return line;
            }
        });
        let output = lineArray.join('\n');  
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-insert-prefix-and-suffix').click(function() {
    let prefixStr = prompt('Prefix text \u2026', '');
    let suffixStr =  prompt('Suffix \u2026', '');
    if (prefixStr === null) {
        prefixStr = '';
    }
    if (suffixStr === null) {
        suffixStr = '';
    }
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    let lineLength = 0;
    lineArray = lineArray.map(function(line, index) {
        lineLength = line.length;
        if (lineLength > 0) {
            return prefixStr + line + suffixStr;
        } else {
            return line;
        }
    });
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-move-the-to-the-end').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(line => {
        const firstFourChars = line.substring(0, 4);
        if (firstFourChars.toLowerCase() === 'the ') {
          const numChars = line.length;
          line = `${line.substring(4, numChars)}, ${firstFourChars.trim()}`
        }
        return line;
    })
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-move-a-to-the-end').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(line => {
        const firstTwoChars = line.substring(0, 2);
        if (firstTwoChars.toLowerCase() === 'a ') {
          const numChars = line.length;
          line = `${line.substring(2, numChars)}, ${firstTwoChars.trim()}`
        }
        return line;
    })
    let output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-html-table-to-json').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    var $tableElement = $(input);
    $('body').append($tableElement);
    let tableJson = $tableElement.tableToJSON();
    $tableElement.remove();
    let output = JSON.stringify(tableJson, null, 2);
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-data-string-to-json').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let dataObj = input.split(';')
        .map(x => x.split(':'))
        .reduce((data, [key, value]) => {
            if (isNaN(value)) {
                data[key] = String(value);
            } else {
                data[key] = Number(value);
            }
                return data;
            }, {});
    let dataJson = JSON.stringify(dataObj, null, 2);

    let output = dataJson;  
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-populate-uuid').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/'uuid': ''/g, function() {
        let newUuid = uuidv4()
        return `'uuid': '${newUuid}'`;
    });
    input = input.replace(/"uuid": ""/g, function() {
        let newUuid = uuidv4()
        return `"uuid": "${newUuid}"`;
    });
    let output = input;  
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-replace-uuids').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let regExp = new RegExp(/[\da-zA-Z]{8}-([\da-zA-Z]{4}-){3}[\da-zA-Z]{12}/, 'gim');
    const numUUIDs = ((input || '').match(regExp) || []).length;
    if (numUUIDs > 0) {
        input = input.replace(regExp, function() {
            return uuidv4();
        })
        let output = input;
        $textarea.val(output);
        updateHistory();
        if (numUUIDs === 1) {
            alert(`${numUUIDs} UUID replaced.`)
        } else {
            alert(`${numUUIDs} UUIDs replaced.`)
        }
    } else {
        alert('No UUIDs found!')
    }
});

$('#btn-modify-create-bookmarklet-js').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input.replace(/\r?\n|\r/g, '');
    output = output.replace(/  +/g, ' ').trim();
    $textarea.val(`javascript:(function(){${output}})();`);
    updateHistory();
});

$('#btn-modify-acronymize').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.map(function(line) {
        line = line.trim();
        line = line.toUpperCase();
        line = line.replace(/[.(),|;:&-]/ig, ' ');
        line = line.replace(/[^A-Z ]/g, '');
        let wordsArray = line.split(' ');
        wordsArray = wordsArray.filter(word => word !== '');
        wordsArray = wordsArray.map(word => word.charAt(0));
        let acronym = wordsArray.join('');
        return acronym;
    });
    output = lineArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-regular-expression').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let pattern = '';
    pattern = prompt('Regex pattern:', '([A-Z])\\w+');
    if (pattern) {
        pattern = encodeURIComponent(pattern);
        input = encodeURIComponent(input);
        const url = `http://regexstorm.net/tester?p=${pattern}&i=${input}`;
        window.open(url,'_blank');
    }
});

$('#btn-modify-deconstructed-props').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.filter(line => line.trim() !== '');
    lineArray = lineArray.map(line => line.trim());
    let line = lineArray[0];
    const openBraceIndex = line.indexOf('{');
    const closeBraceIndex = line.lastIndexOf('}');
    line = line.substring(openBraceIndex+1, closeBraceIndex);
    line = line.trim();
    let propArray = line.split(',');
    propArray = propArray.map(prop => prop.trim());
    let output = propArray.join(', ');
    output += '\n\n\n';
    output += propArray.map(prop => `const ${prop} = '';`).join('\n');
    output += '\n\n\n';
    output += propArray.map(prop => `${prop}={${prop}}`).join(' ');
    output += '\n\n\n';
    output += propArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-merge-lines').click(function() {
    const $textarea = $('#main-textarea');
    let input = $textarea.val();
    let doTrim = false;
    
    const nLines = parseInt($('#select-merge-lines-num').val(), 10);
    if ($('#merge-lines-trim-checkbox').is(':checked')) {
        doTrim = true;
    }
    const joinCharStr = $('#select-merge-lines-join-char').val();

    let linesArray = input.split(/\r?\n|\r/);
    linesArray = linesArray.filter(line => {
      if (line.trim() !== '') {
        return line
      }
    })
    if (doTrim) {
      linesArray = linesArray.map(line => {
        return line.trim()
      })
    }
    let newArray = [];
    for (const [index, value] of linesArray.entries()) {
      newArray.push(value)
      if ((index+1) % nLines === 0) {
        newArray.push('\n')
      } else {
        newArray.push(joinCharStr)
      }
    }
    newArray.pop();
    const output = newArray.join('');
    $textarea.val(output);
    updateHistory();
});  

// =========================================================
// Decrement / Increment counter fieldset
// =========================================================

$('#btn-decrement-increment-and-generate').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    const operation = $('#select-decrement-increment').val();
    
    let startValue = prompt('Counter start value:', '0');
    startValue = parseInt(startValue, 10);
    if (isNaN(startValue)) return;

    let stepValuePrompt;
    if (operation === 'decrement') {
        stepValuePrompt = 'Decrement each step by:';
    } else if (operation === 'increment') {
        stepValuePrompt = 'Increment each step by:';   
    }
    
    let stepValue = prompt(stepValuePrompt, '1');
    stepValue = parseInt(stepValue, 10)
    if (isNaN(stepValue)) return;
    
    let numTimes = prompt('Number of times:', '100');
    numTimes = parseInt(numTimes, 10)
    if (isNaN(numTimes)) return;
    
    let stringToReplace = prompt('String to replace:', '#');
    if (stringToReplace.trim() === null || stringToReplace.trim() === undefined || stringToReplace.trim() === '') return;
    let replaceRegex = new RegExp(stringToReplace, 'g');
    
    let myArray = [];
    let number = startValue;
    for (let i=0; i < numTimes; i++) {
        if (input.trim() === '') {
            myArray.push(number);
        } else {
            myArray.push(input.replace(replaceRegex, number));
        }
        if (operation === 'decrement') {
            number -= stepValue;
        } else if (operation === 'increment') {
            number += stepValue;
        }
    }
    
    let output = myArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-decrement-increment-and-replace-on-each-line').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    if (input.trim() === '') return;
        
    const operation = $('#select-decrement-increment').val();
    
    let startValue = prompt('Counter start value:', '0');
    startValue = parseInt(startValue, 10);
    if (isNaN(startValue)) return;

    let stepValuePrompt;
    if (operation === 'decrement') {
        stepValuePrompt = 'Decrement each step by:';
    } else if (operation === 'increment') {
        stepValuePrompt = 'Increment each step by:';   
    }
    
    let stepValue = prompt(stepValuePrompt, '1');
    stepValue = parseInt(stepValue, 10);
    if (isNaN(stepValue)) return;
    
    let stringToReplace = prompt('String to replace:', '#');
    if (stringToReplace.trim() === null || stringToReplace.trim() === undefined || stringToReplace.trim() === '') return;
    let replaceRegex = new RegExp(stringToReplace, 'g');
    
    let linesArray = input.split(/\r?\n|\r/);
    let number = startValue;
    linesArray = linesArray.map(line => {
        if (line.indexOf(stringToReplace) === -1) return line;
        line = line.replace(replaceRegex, number);
        if (operation === 'decrement') {
            number -= stepValue;
        } else if (operation === 'increment') {
            number += stepValue;
        }
        return line;
    })
    
    let output = linesArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-decrement-increment-each-occurrence-in-text').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    if (input.trim() === '') return;
    
    const operation = $('#select-decrement-increment').val();
    
    let startValue = prompt('Counter start value:', '0');
    startValue = parseInt(startValue, 10);
    if (isNaN(startValue)) return;

    let stepValuePrompt;
    if (operation === 'decrement') {
        stepValuePrompt = 'Decrement each step by:';
    } else if (operation === 'increment') {
        stepValuePrompt = 'Increment each step by:';   
    }
    
    let stepValue = prompt(stepValuePrompt, '1');
    stepValue = parseInt(stepValue, 10);
    if (isNaN(stepValue)) return;
    
    let stringToReplace = prompt('String to replace:', '#');
    if (stringToReplace.trim() === null || stringToReplace.trim() === undefined || stringToReplace.trim() === '') return;
    const replaceRegex = new RegExp(stringToReplace, 'g');
    const numOccurrences = ((input || '').match(replaceRegex) || []).length;
    
    let counterArray = [];
    let number = startValue;
    for (let i=0; i < numOccurrences; i++) {
        counterArray.push(number);
        if (operation === 'decrement') {
            number -= stepValue;
        } else if (operation === 'increment') {
            number += stepValue;
        }
    }

    const output = input.replace(replaceRegex, () => counterArray.shift());
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Populate template fieldset
// =========================================================

$('#btn-populate-template-from-csv').click(function() {
    let template = prompt('Enter the template text containing placeholders <A>, <B>, <C> etc... (can be multiline):', '');
    if (template) {
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let outputArray = [];
        let linesArray = input.split(/\r?\n|\r/);
        linesArray = linesArray.filter(line => {
          if (line.trim() !== '') {
            return line.trim();
          }
        });
        linesArray.forEach(line => {
            let itemsArray = line.split(',');
            itemsArray = itemsArray.map(item => item.trim());
            let chunk = template;
            let numitems = itemsArray.length;
            itemsArray.forEach((item, index) => {
                let regex = new RegExp(`<${String.fromCharCode(65 + index)}>`, 'gi');
                chunk = chunk.replace(regex, item);
            });
            outputArray.push(chunk);
        })
        $textarea.val(outputArray.join('\n\n'));
        updateHistory();
    }
});

$('#btn-populate-template-from-tsv').click(function() {
    let template = prompt('Enter the template text containing placeholders <A>, <B>, <C> etc... (can be multiline):', '');
    if (template) {
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        let outputArray = [];
        let linesArray = input.split(/\r?\n|\r/);
        linesArray = linesArray.filter(line => {
          if (line.trim() !== '') {
            return line.trim();
          }
        });
        linesArray.forEach(line => {
            let itemsArray = line.split('\t');
            itemsArray = itemsArray.map(item => item.trim());
            let chunk = template;
            let numitems = itemsArray.length;
            itemsArray.forEach((item, index) => {
                let regex = new RegExp(`<${String.fromCharCode(65 + index)}>`, 'gi');
                chunk = chunk.replace(regex, item);
            });
            outputArray.push(chunk);
        })
        $textarea.val(outputArray.join('\n\n'));
        updateHistory();
    }
});

$('#btn-populate-template-from-json').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let outputArray = [];
    let jsonIsValid = false;
    let jsonObj = null;
    try {
        jsonObj = JSON.parse(input);
        jsonIsValid = true;
    } catch(err) {
        alert('The JSON is NOT valid!');
        return;
    }
    if (jsonIsValid) {
        let template = prompt('Enter the template text containing properties as placeholders <firstname>, <lastname>, <age> etc... (can be multiline):', '');
        if (template) {
            jsonObj.forEach(entry => {
                let chunk = template;
                Object.keys(entry).forEach(key => {
                    let regex = new RegExp(`<${key}>`, 'gi');
                    chunk = chunk.replace(regex, entry[key]);
                });
                outputArray.push(chunk);
            });
            $textarea.val(outputArray.join('\n\n'));
            updateHistory();
        }
    }
});

// =========================================================
// Switch format fieldset
// =========================================================

$('#btn-switch-format-json-to-csv-with-quotes').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    try {
        let json = $.parseJSON(input);
        let output = json2csv(json, true, true);
        $textarea.val(output);
        updateHistory();
    } catch {
        alert('Unable to parse JSON string! Please check it is formatted correctly.')
    }
});

$('#btn-switch-format-json-to-csv-without-quotes').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    try {
        let json = $.parseJSON(input);
        let output = json2csv(json, false, true);
        $textarea.val(output);
        updateHistory();
    } catch {
        alert('Unable to parse JSON string! Please check it is formatted correctly.')
    }
});

$('#btn-switch-format-csv-to-json').click(function() {
    const delimiter = ','
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    
    let linesArray = input.split(/\r?\n|\r/);
    linesArray = linesArray.map(line => line.trim()).filter(line => line !== '').map(line => line.split(delimiter))
    linesArray = linesArray.map(rowArray => rowArray.map(item => item.trim()))
    linesArray = linesArray.map(rowArray => rowArray.join(delimiter))
    input = linesArray.join('\n')
    
    input = input.replace(/"/g,'')
    let array = input.split('\n');
    array = array.filter(entry => entry.trim() != '');
    input = array.join('\n');
    input = csv2json(input);
    
    try {
        const jsonObj = JSON.parse(input);
        console.dir(jsonObj, {depth: null, colors: true});
        let output = JSON.stringify(JSON.parse(input), null, 2);
        $textarea.val(output);
        updateHistory();
        $textarea.scrollTop(0).scrollLeft(0);
    }
    catch (error) {
        alert('Unable to convert CSV to JSON! Please check it is formatted correctly.');
        console.error(error);
    }
});

$('#btn-switch-format-javascript-object-to-json').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    if (input === '') return;
    try {
        const output = JSON.stringify(eval(input), null, 2);
        $textarea.val(output);
        updateHistory();
        $textarea.scrollTop(0).scrollLeft(0);
    }
    catch (error) {
        alert('Unable to convert JavaScript object to JSON! Please check it is formatted correctly.');
        console.error(error);
    }
});

$('#btn-switch-format-json-to-javascript-object').click(function() {
    const delimiter = ','
    let $textarea = $('#main-textarea')
    let input = $textarea.val()
    if (input === '') return
    try {
        const json = JSON.parse(input)
        let csv = json2csv(json, false, true)
        csv = csv.split('\n').filter(line => line.trim() != '').join('\n')
        let csvLinesArray = csv.split(/\r?\n|\r/)
        csvLinesArray = csvLinesArray.filter(line => line.trim() !== '')
        let headersLine = csvLinesArray[0]
        let headersLineArray = headersLine.split(delimiter)
        headersLineArray = headersLineArray.map(header => _.camelCase(header))
        headersLine = headersLineArray.join(delimiter) 
        csvLinesArray[0] = headersLine
        csv = csvLinesArray.join('\n')
        const papaParseConfigObj = {
          header: true,
          dynamicTyping: true
        }
        const newJsonObj = Papa.parse(csv, papaParseConfigObj).data
        let output = JSON.stringify(newJsonObj, null, 2)
        let outputArray = output.split(/\r?\n|\r/)
        outputArray = outputArray.map(line => {
            if ( (line.match(/"/g) || []).length >= 2 ) {
                return removeFirstOccurrences(line, '"', 2)
            } else {
                return line
            }
        })
        output = outputArray.join('\n')
        $textarea.val(output);
        updateHistory();
    } catch {
        alert('Unable to parse JSON string! Please check it is formatted correctly.')
    }
});

$('#btn-switch-format-yaml-to-json').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    if (input === '') return;
    try {
        let SexyYamlType = new jsyaml.Type('!sexy', {
            kind: 'sequence',
            construct: function (data) {
            return data.map(function (string) { return 'sexy ' + string; });
        }
        });
        let SEXY_SCHEMA = jsyaml.Schema.create([ SexyYamlType ]);
        let jsonObj = jsyaml.load(input, { schema: SEXY_SCHEMA });
        let output = JSON.stringify(jsonObj, null, 2);
        console.dir(JSON.parse(output), {depth: null, colors: true});
        $textarea.val(output);
        updateHistory();
        $textarea.scrollTop(0).scrollLeft(0);
    }
    catch (error) {
        alert('Unable to parse YAML string! Please check it is formatted correctly.');
        alert(error.message);
        console.error(error);
    }
});

// =========================================================
// Create lookup table fieldset
// =========================================================

$('#btn-create-lookup-table-encode-formatted').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.filter(entry => entry.trim() != '');
    if (!isEven(lineArray.length)) {
        alert('There must be an even number of lines.');
        return false;
    }  
    let fromArray = lineArray.slice(0, lineArray.length/2);
    let toArray = lineArray.slice(lineArray.length/2);
    let comma, mappingArray = [];
    for (let i=0; i<lineArray.length/2; i++) {
        if (i < (lineArray.length/2)-1) {
            comma = ',';
        } else {
            comma = '';
        }
        mappingArray.push(`    '${fromArray[i]}': '${toArray[i]}'${comma}`);
    }
    let output = `const encodeLookupTable = {\n${mappingArray.join('\n')}\n};`;  
    $textarea.val(output);
    updateHistory();
});

$('#btn-create-lookup-table-encode-unformatted').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.filter(entry => entry.trim() != '');
    if (!isEven(lineArray.length)) {
        alert('There must be an even number of lines.');
        return false;
    }  
    let fromArray = lineArray.slice(0, lineArray.length/2);
    let toArray = lineArray.slice(lineArray.length/2);
    let comma, mappingStr = '';
    for (let i=0; i<lineArray.length/2; i++) {
        if (i < (lineArray.length/2)-1) {
            comma = ',';
        } else {
            comma = '';
        }
        mappingStr += `'${fromArray[i]}':'${toArray[i]}'${comma}`;
    }
    let output = `const encodeLookupTable = {${mappingStr}};`;  
    $textarea.val(output);
    updateHistory();
});

$('#btn-create-lookup-table-decode-formatted').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.filter(entry => entry.trim() != '');
    if (!isEven(lineArray.length)) {
        alert('There must be an even number of lines.');
        return false;
    }  
    let fromArray = lineArray.slice(lineArray.length/2);
    let toArray = lineArray.slice(0, lineArray.length/2);
    let comma, mappingArray = [];
    for (let i=0; i<lineArray.length/2; i++) {
        if (i < (lineArray.length/2)-1) {
            comma = ',';
        } else {
            comma = '';
        }
        mappingArray.push(`    '${fromArray[i]}': '${toArray[i]}'${comma}`);
    }
    let output = `const decodeLookupTable = {\n${mappingArray.join('\n')}\n};`;  
    $textarea.val(output);
    updateHistory();
});

$('#btn-create-lookup-table-decode-unformatted').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let lineArray = input.split(/\r?\n|\r/);
    lineArray = lineArray.filter(entry => entry.trim() != '');
    if (!isEven(lineArray.length)) {
        alert('There must be an even number of lines.');
        return false;
    }  
    let fromArray = lineArray.slice(lineArray.length/2);
    let toArray = lineArray.slice(0, lineArray.length/2);
    let comma, mappingStr = '';
    for (let i=0; i<lineArray.length/2; i++) {
        if (i < (lineArray.length/2)-1) {
            comma = ',';
        } else {
            comma = '';
        }
        mappingStr += `'${fromArray[i]}':'${toArray[i]}'${comma}`;
    }
    let output = `const decodeLookupTable = {${mappingStr}};`;  
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Convert to comment block fieldset
// =========================================================

$('#btn-comments-html').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    array = array.map(function(line) {
        return line +  _.repeat(' ', longest - line.length);
    });
    array.unshift(_.repeat('=', longest));
    array.push(_.repeat('=', longest));
    array = array.map(function(line) {
        return '<!-- ' + line + ' -->';
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-comments-css').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    array = array.map(function(line) {
        return line +  _.repeat(' ', longest - line.length);
    });
    array.unshift(_.repeat('=', longest));
    array.push(_.repeat('=', longest));
    array = array.map(function(line) {
        return '/* ' + line + ' */';
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-comments-js').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    array.unshift(_.repeat('=', longest));
    array.push(_.repeat('=', longest));
    array = array.map(function(line) {
        return '// ' + line;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-comments-js-dont-minify').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    array = array.map(function(line) {
        return ' * ' + line;
    });
    array.unshift('/*!');
    array.push(' */');
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-comments-console-log').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    array.unshift(_.repeat('=', longest));
    array.push(_.repeat('=', longest));
    array = array.map(line => line.replace(/'/g, "\\'"))
    array = array.map(line => _.padEnd(line, longest, ' '))
    array = array.map(function(line) {
        return `console.log('${line}')`
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-comments-react-jsx').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    array = array.map(function(line) {
        return line +  _.repeat(' ', longest - line.length);
    });
    array.unshift(_.repeat('=', longest));
    array.push(_.repeat('=', longest));
    array = array.map(function(line) {
        return '{/*  ' + line + '  */}';
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-comments-php').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    array.unshift(_.repeat('=', longest));
    array.push(_.repeat('=', longest));
    array = array.map(function(line) {
        return '// ' + line;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-comments-blade-template').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    array = array.map(function(line) {
        return line +  _.repeat(' ', longest - line.length);
    });
    array.unshift(_.repeat('=', longest));
    array.push(_.repeat('=', longest));
    array = array.map(function(line) {
        return '{{-- ' + line + ' --}}';
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-comments-python').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    array.unshift(_.repeat('=', longest));
    array.push(_.repeat('=', longest));
    array = array.map(function(line) {
        return '# ' + line;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-comments-yaml').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    array.unshift(_.repeat('=', longest));
    array.push(_.repeat('=', longest));
    array = array.map(function(line) {
        return '# ' + line;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-comments-pug').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split('\n');
    let longest = 0;
    for (let item of array) {
        if (item.length > longest) {
            longest = item.length;
        }
    }
    array.unshift(_.repeat('=', longest));
    array.push(_.repeat('=', longest));
    array = array.map(function(line) {
        return '//- ' + line;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});


// =========================================================
// Extract data fieldset
// =========================================================

$('#btn-extract-email-addresses').click(function() {
    let regExp = new RegExp(/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/, 'gm');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array) {
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No email addresses found!');
    }
});

$('#btn-extract-urls-inc-args').click(function() {
    let regExp = new RegExp(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'ig');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array) {
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No URLs found!');
    }
});

$('#btn-extract-urls-exc-args').click(function() {
    let regExp = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/, 'ig');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array) {
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No URLs found!');
    }
});

$('#btn-extract-non-ascii').click(function() {
    let regExp = new RegExp(/[^\x00-\x7F]+\ *(?:[^\x00-\x7F]| )*/, 'g');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array) {
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No Non-ASCII characters found!');
    }
});

$('#btn-extract-unicode-values').click(function() {
    let regExp = new RegExp(/(\\u)\w\w\w\w/, 'g');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array) {
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No Unicode values found!');
    }
});

$('#btn-extract-hex-colors').click(function() {
    let regExp = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'igm');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array) {
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No hex colors found!');
    }
});

$('#btn-extract-ip-addresses').click(function() {
    let regExp = new RegExp(/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/, 'ig');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array) {
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No IP addresses found!');
    }
});

$('#btn-extract-phone-numbers').click(function() {
    let regExp = new RegExp(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/, 'gm');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array) {
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No phone numbers found!');
    }
});

$('#btn-extract-uk-postcodes').click(function() {
    let regExp = new RegExp(/\b(GIR ?0AA|SAN ?TA1|(?:[A-PR-UWYZ](?:\d{0,2}|[A-HK-Y]\d|[A-HK-Y]\d\d|\d[A-HJKSTUW]|[A-HK-Y]\d[ABEHMNPRV-Y])) ?\d[ABD-HJLNP-UW-Z]{2})\b/, 'gim');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array) {
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No UK postcodes found!');
    }
});

$('#btn-extract-uuids').click(function() {
    let regExp = new RegExp(/[\da-zA-Z]{8}-([\da-zA-Z]{4}-){3}[\da-zA-Z]{12}/, 'gim');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array) {
        let output = array.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No UUIDs found!');
    }
});

$('#btn-extract-words-with-wildcards').click(function() {
    let stringToMatch = prompt('Enter the word with _ as wildcards:', '')
    if (stringToMatch !== null && stringToMatch.trim().length > 0) {
        stringToMatch = stringToMatch.trim()
        let userEnteredStringToMatch = stringToMatch
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        const matchWordLength = true
        let wordsArray = input.split(/\r?\n|\r/)
        wordsArray = wordsArray.join(' ')
        wordsArray = wordsArray.split(' ')
        wordsArray = wordsArray.map(word => word.trim())
        wordsArray = wordsArray.filter(word => word !== '')
        wordsArray = wordsArray.map(word => word.replace(/\r?\n|\r/g, ''))
        const wordLength = stringToMatch.length
        if (matchWordLength) wordsArray = wordsArray.filter(word => word.length === wordLength)
        stringToMatch = stringToMatch.replace(/_/g, '\\\w')
        let matchRegex = new RegExp(stringToMatch, 'gi')
        wordsArray = wordsArray.filter(word => word.match(matchRegex))
        const numMatches = wordsArray.length
        if (numMatches > 0) {
            let output = wordsArray.join('\n');
            $textarea.val(output);
            updateHistory();
        } else {
            alert(`No matches of '${userEnteredStringToMatch}' found!`);
        }
    }
});

$('#btn-extract-anagrams-of-letters').click(function() {
    let lettersToMatch = prompt('Enter the anagram (letters):', '')
    if (lettersToMatch !== null && lettersToMatch.trim().length > 0) {
        lettersToMatch = lettersToMatch.trim()
        let $textarea = $('#main-textarea');
        let input = $textarea.val();
        const matchWordLength = true
        let wordsArray = input.split(/\r?\n|\r/)
        wordsArray = wordsArray.join(' ')
        wordsArray = wordsArray.split(' ')
        wordsArray = wordsArray.map(word => word.trim())
        wordsArray = wordsArray.filter(word => word !== '')
        wordsArray = wordsArray.map(word => word.replace(/\r?\n|\r/g, ''))
        const wordLength = lettersToMatch.length
        if (matchWordLength) wordsArray = wordsArray.filter(word => word.length === wordLength)
        wordsArray = wordsArray.filter(word => isAnagram(word, lettersToMatch))
        const numMatches = wordsArray.length
        if (numMatches > 0) {
            let output = wordsArray.join('\n');
            $textarea.val(output);
            updateHistory();
        } else {
            alert(`No anagrams of '${lettersToMatch}' found!`);
        }
    }
});

$('#btn-extract-palindrome-words').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let wordsArray = input.split(/\r?\n|\r/)
    wordsArray = wordsArray.join(' ')
    wordsArray = wordsArray.split(' ')
    wordsArray = wordsArray.map(word => word.trim())
    wordsArray = wordsArray.filter(word => word !== '')
    wordsArray = wordsArray.map(word => word.replace(/\r?\n|\r/g, ''))
    wordsArray = wordsArray.filter(word => isPalindrome(word))
    wordsArray = wordsArray.filter(word => word.length > 2)
    const numMatches = wordsArray.length
    if (numMatches > 0) {
        let output = wordsArray.join('\n');
        $textarea.val(output);
        updateHistory();
    } else {
        alert('No palindromes found!');
    }
});

$('#btn-extract-movie-data-from-imdb').click(function() {
    // Example IMDb page ...
    // https://www.imdb.com/search/title/?title_type=feature&num_votes=200000,&genres=adventure&sort=user_rating,desc&ref_=adv_prv
    const $textarea = $('#main-textarea');
    const input = $textarea.val();
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(input, "text/html");
    const scrapeObj = {
  wrapperElementQuerySelector: ".lister-item",
  requiredPropertyName: "title",
  dataToScrape: {
    position: {
      querySelector: ".lister-item-header span.lister-item-index",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.split('.')[0]"
    },
    title: {
      querySelector: ".lister-item-header a",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.trim()"
    },
    year: {
      querySelector: ".lister-item-header span.lister-item-year",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "if (string.split(' ').length === 2) { string.split(' ')[1].substring(1, 5) } else { string.trim().substring(1, 5) }"
    },
    imdbRating: {
      querySelector: ".ratings-bar .ratings-imdb-rating strong",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.trim()"
    },
    id: {
      querySelector: ".lister-top-right .ribbonize",
      getInnerText: false,
      getAttribute: "data-tconst",
      stringFormatCode: "string.trim()"
    },
    url: {
      querySelector: ".lister-item-header a",
      getInnerText: false,
      getAttribute: "href",
      stringFormatCode: "('https://www.imdb.com'+string).split('?')[0]"
    },
    certificate: {
      querySelector: ".lister-item-content p.text-muted span.certificate",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.trim()"
    },
    runtimeMins: {
      querySelector: ".lister-item-content p.text-muted span.runtime",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.split(' ')[0]"
    },
    metascore: {
      querySelector:
        ".ratings-bar .ratings-metascore span.metascore",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.trim()"
    },
    numVotes: {
      querySelector: ".lister-item-content .sort-num_votes-visible",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.replace(/\\n/g, '').split(' ').filter(item => item !== '')[1].replace(/,/g, '')"
    },
    grossIncomeMillion: {
      querySelector: ".lister-item-content .sort-num_votes-visible",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.replace(/\\n/g, '').split(' ').filter(item => item !== '')[4].replace(/[M$]/g, '')"
    },
    // imageUrl: {
    //   querySelector: ".lister-item .lister-item-image .loadlate",
    //   getInnerText: false,
    //   getAttribute: "src",
    //   stringFormatCode: "string.trim()"
    // },
    // director: {
    //   querySelector:
    //     ".lister-item-content p:not(.text-muted)",
    //   getInnerText: true,
    //   getAttribute: "",
    //   stringFormatCode: "let array = string.split(' | ')[0].split(' '); array.shift(); array.join(' ')"
    // }
  }
};
    const dataToScrapeArray = Object.keys(scrapeObj.dataToScrape);
    const numWrapperElements = doc.querySelectorAll(scrapeObj.wrapperElementQuerySelector)
  .length;
    
    let scrapedData = [];
    let string, element;
    if (numWrapperElements > 0) {
  for (let i = 0; i < numWrapperElements; i++) {
    let wrapper = doc.querySelectorAll(scrapeObj.wrapperElementQuerySelector)[
      i
    ];
    if (dataToScrapeArray.length > 0) {
      let itemObject = {};
      for (let j = 0; j < dataToScrapeArray.length; j++) {
        element = wrapper.querySelector(scrapeObj.dataToScrape[dataToScrapeArray[j]].querySelector);
        if (element) {
            if (scrapeObj.dataToScrape[dataToScrapeArray[j]].getInnerText) {
                itemObject[dataToScrapeArray[j]] = element.innerText;
            } else if (scrapeObj.dataToScrape[dataToScrapeArray[j]].getAttribute) {
                itemObject[dataToScrapeArray[j]] = element.getAttribute(scrapeObj.dataToScrape[dataToScrapeArray[j]].getAttribute);
            } else {
                itemObject[dataToScrapeArray[j]] = '';
            }
        } else {
            itemObject[dataToScrapeArray[j]] = '';
        }
        if (scrapeObj.dataToScrape[dataToScrapeArray[j]].stringFormatCode !== '' && itemObject[dataToScrapeArray[j]] !== '') {
          string = itemObject[dataToScrapeArray[j]];
          try {
            string = eval(scrapeObj.dataToScrape[dataToScrapeArray[j]].stringFormatCode);
          } catch (err) {
            console.log(itemObject)
            console.error('Err:' + string, err);
            string = ''
          }
          itemObject[dataToScrapeArray[j]] = string;
        }
      }
      scrapedData.push(itemObject);
    }
  }
  let output = JSON.stringify(scrapedData, null, 2);
  $textarea.val(output);
  updateHistory();
} else {
  alert("No wrapper elements found!");
}  
});

$('#btn-extract-player-info-from-premierleague').click(function() {
    // Example IMDb page ...
    // https://www.premierleague.com/clubs/1/Arsenal/squad
    const $textarea = $('#main-textarea');
    const input = $textarea.val();
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(input, "text/html");
    const scrapeObj = {
  wrapperElementQuerySelector: "ul.squadListContainer li",
  requiredPropertyName: "name",
  dataToScrape: {
    number: {
      querySelector: ".playerCardInfo span.number",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.trim()"
    },
    name: {
      querySelector: ".playerCardInfo h4.name",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.trim()"
    },
    position: {
      querySelector: ".playerCardInfo span.position",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.trim()"
    },
    nationality: {
      querySelector: "ul.squadPlayerStats li.nationality dl dd span.playerCountry",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.trim()"
    },
    playerId: {
      querySelector: "a.playerOverviewCard",
      getInnerText: false,
      getAttribute: "href",
      stringFormatCode: "string.split('/')[2]" 
    },
    url: {
      querySelector: "a.playerOverviewCard",
      getInnerText: false,
      getAttribute: "href",
      stringFormatCode: "'https://www.premierleague.com' + string.trim()"
    },
    imageId: {
      querySelector: "header.squadPlayerHeader img.statCardImg",
      getInnerText: false,
      getAttribute: "data-player",
      stringFormatCode: "string.trim()"
    },
    imageSmallUrl: {
      querySelector: "header.squadPlayerHeader img.statCardImg",
      getInnerText: false,
      getAttribute: "src",
      stringFormatCode: "string.trim()"
    },
    imageLargeUrl: {
      querySelector: "header.squadPlayerHeader img.statCardImg",
      getInnerText: false,
      getAttribute: "src",
      stringFormatCode: "string.replace('110x140', '250x250')"
    },
    newImageName: {
      querySelector: ".playerCardInfo h4.name",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "string.trim()+'.png'"
    },
    newImageNameKebabCase: {
      querySelector: ".playerCardInfo h4.name",
      getInnerText: true,
      getAttribute: "",
      stringFormatCode: "_.kebabCase(string.trim())+'.png'"
    },
  }
};
    const dataToScrapeArray = Object.keys(scrapeObj.dataToScrape);
    const numWrapperElements = doc.querySelectorAll(scrapeObj.wrapperElementQuerySelector)
  .length;
    
    let scrapedData = [];
    let string, element;
    if (numWrapperElements > 0) {
  for (let i = 0; i < numWrapperElements; i++) {
    let wrapper = doc.querySelectorAll(scrapeObj.wrapperElementQuerySelector)[
      i
    ];
    if (dataToScrapeArray.length > 0) {
      let itemObject = {};
      for (let j = 0; j < dataToScrapeArray.length; j++) {
        element = wrapper.querySelector(scrapeObj.dataToScrape[dataToScrapeArray[j]].querySelector);
        if (element) {
            if (scrapeObj.dataToScrape[dataToScrapeArray[j]].getInnerText) {
                itemObject[dataToScrapeArray[j]] = element.innerText;
            } else if (scrapeObj.dataToScrape[dataToScrapeArray[j]].getAttribute) {
                itemObject[dataToScrapeArray[j]] = element.getAttribute(scrapeObj.dataToScrape[dataToScrapeArray[j]].getAttribute);
            } else {
                itemObject[dataToScrapeArray[j]] = '';
            }
        } else {
            itemObject[dataToScrapeArray[j]] = '';
        }
        if (scrapeObj.dataToScrape[dataToScrapeArray[j]].stringFormatCode !== '' && itemObject[dataToScrapeArray[j]] !== '') {
          string = itemObject[dataToScrapeArray[j]];
          try {
            string = eval(scrapeObj.dataToScrape[dataToScrapeArray[j]].stringFormatCode);
          } catch (err) {
            console.log(itemObject)
            console.error('Err:' + string, err);
            string = ''
          }
          itemObject[dataToScrapeArray[j]] = string;
        }
      }
      scrapedData.push(itemObject);
    }
      
    if (scrapeObj.requiredPropertyName.trim() !== '') {
      scrapedData = scrapedData.filter(item => item[scrapeObj.requiredPropertyName] !== '')
    }
  }
  let output = JSON.stringify(scrapedData, null, 2);
  $textarea.val(output);
  updateHistory();
} else {
  alert("No wrapper elements found!");
}  
});

// =========================================================
// Find duplicate fieldset
// =========================================================

$('#btn-find-duplicate-uuids').click(function() {
    let regExp = new RegExp(/[\da-zA-Z]{8}-([\da-zA-Z]{4}-){3}[\da-zA-Z]{12}/, 'gim');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.match(regExp);
    if (array && array.length > 0) {
        array.sort();
        var countObjs = compressArray(array, 2);
        if (countObjs.length > 0) {
            countObjs = _.orderBy(countObjs, 'count', 'desc');
            let outputArray = countObjs.map(function(obj) {
                return `${obj.count}×\t${obj.value}`;
            });
            let output = outputArray.join('\n');
            $textarea.val(output);
            updateHistory();
        } else {
            alert('No duplicate UUIDs found!');
        }
    } else {
        alert('No UUIDs found!');
    }
});

// =========================================================
// Prepend/append fieldset
// =========================================================

$('#prepend-append-other').hide();

$('#prepend-append').change(function() {
    let value = $(this).val();
    let $btnAction = $('#btn-prepend-append-action');
    switch (value) {
        case 'prepend':
            $btnAction.text('Prepend');
            break;
        case 'append':
            $btnAction.text('Append');
            break;  
        default:
            break;
    }
});

$('#prepend-append-value').change(function() {
    let value = $(this).val();
    if (value === 'other') {
        $('#prepend-append-other').show();
    } else {
        $('#prepend-append-other').hide();
    }
});

$('#btn-prepend-append-action').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let value;
    switch($('#prepend-append-value').val()) {
        case 'linebreak':
            value = '\n';
            break;
        case 'tab':
            value = '\t';
            break;
        case 'space':
            value = ' ';
            break;
        case 'two-spaces':
            value = '  ';
            break;
        case 'four-spaces':
            value = '    ';
            break;
        case 'comma':
            value = ',';
            break;
        case 'comma-space':
            value = ', ';
            break;
        case 'full-stop':
            value = '.';
            break;
        case 'full-stop-space':
            value = '. ';
            break;
        case 'colon':
            value = ':';
            break;
        case 'semicolon':
            value = ';';
            break;
        case 'pipe':
            value = '|';
            break;
        case 'br':
            value = '<br/>';
            break;
        case 'bullet':
            value = '\u2022 ';
            break;
        case 'right-arrow':
            value = '\u2192 ';
            break;
        case 'long-right-arrow':
            value = '\u27FC ';
            break;
        case 'other':
            value = $('#prepend-append-other').val();
            break;
        default:
            value = '';
            break;
    }
    if ($('#prepend-append').val() === 'prepend') {
        array = array.map(function(line) {
            return value + line;
        });
    } else if ($('#prepend-append').val() === 'append') {
        array = array.map(function(line) {
            return line + value;
        });    
    }
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Repeating data to tabular data fieldset
// =========================================================

$('#btn-repeats-to-table').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let nthLine = parseInt($('#repeats-after-select').val(), 10);
    let delimiter;
    switch($('#repeats-after-delimeter-select').val()) {
        case 'comma':
            delimiter = ',';
            break;
        case 'comma-space':
            delimiter = ', ';
            break;
         case 'tab':
            delimiter = '\t';
            break;
        case 'space':
            delimiter = ' ';
            break;
        case 'colon':
            delimiter = ':';
            break;
        case 'semicolon':
            delimiter = ';';
            break;
        case 'pipe':
            delimiter = '|';
            break;
        default:
            delimiter = '';
            break;
    }
    array = array.map(function(line, index) {
        if ((index+1) % nthLine === 0) {
            if (index < array.length-1) {
                return line + '\n';
            } else {
                return line;
            }
        } else {
            return line + delimiter;
        }
    });
    let output = array.join('');
    $textarea.val(output);
    updateHistory();
});



// =========================================================
// Tabular data fieldset
// =========================================================

$('#tabular-data-other-delimeter-value, #tabular-data-analysed-wrapper').hide();
$('#btn-tabular-data-perform-action').prop('disabled', true);

$('#tabular-data-delimeter-value').change(function() {
    if ($(this).val() === 'other') {
        $('#tabular-data-other-delimeter-value').show();
    } else {
        $('#tabular-data-other-delimeter-value').hide();
    }
});

$('#tabular-data-column-select').change(function() {
    if ($(this).val() === '') {
        $('#btn-tabular-data-perform-action').prop('disabled', true);
    } else {
        $('#btn-tabular-data-perform-action').prop('disabled', false);
    }
});

$('#tabular-data-convert-select').change(function() {
    if ($(this).val() === '') {
        $('#btn-tabular-data-convert').prop('disabled', true);
    } else {
        $('#btn-tabular-data-convert').prop('disabled', false);
    }
});

$('#tabular-data-action-select').change(function() {
    let actionBtnText = '';
    switch($(this).val()) {
        case 'delete-this':
            actionBtnText = 'Delete column';
            break;
        case 'delete-others':
            actionBtnText = 'Delete others';
            break;
        case 'delete-before':
            actionBtnText = 'Delete columns';
            break;
        case 'delete-after':
            actionBtnText = 'Delete columns';
            break;
        case 'move-left':
            actionBtnText = 'Move column';
            break;
        case 'move-right':
            actionBtnText = 'Move column';
            break;  
        case 'move-to-beginning':
            actionBtnText = 'Move column';
            break;
        case 'move-to-end':
            actionBtnText = 'Move column';
            break;
        default:
            actionBtnText = 'Perform action';
            break;
    }
    $('#btn-tabular-data-perform-action').text(actionBtnText);
});

function analyseTabularData() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let linesArray = input.split(/\r?\n|\r/);
    let numRows = linesArray.length;
    let firstRowIsHeadings = $('#tabular-data-first-row-headings-checkbox').prop('checked');
    if (firstRowIsHeadings) {
        numRows -= 1;
    }
    let numCols = 0;
    let delimiter;
    switch($('#tabular-data-delimeter-value').val()) {
        case 'linebreak':
            delimiter = '\n';
            break;
        case 'tab':
            delimiter = '\t';
            break;
        case 'space':
            delimiter = ' ';
            break;
        case 'comma':
            delimiter = ',';
            break;
        case 'comma-space':
            delimiter = ', ';
            break;
        case 'colon':
            delimiter = ':';
            break;
        case 'semicolon':
            delimiter = ';';
            break;
        case 'pipe':
            delimiter = '|';
            break;
        case 'other':
            delimiter = $('#tabular-data-other-delimeter-value').val();
            break;
        default:
            delimiter = '';
            break;
    }
    let dataArray = linesArray.map(function(line) {
        let rowArray = line.split(delimiter);
        if (rowArray.length > numCols) {
            numCols = rowArray.length;
        }
        return rowArray;
    });
    if (input === '') {
        numRows = 0;
        numCols = 0;
    }
    $('#tabular-data-num-rows-columns').text(numRows + ' rows, ' + numCols + ' columns');
    $('#tabular-data-column-select').children('option:not(:first)').remove();
    for (let i=0; i<numCols; i++) {
        let optionText;
        if (firstRowIsHeadings) {
            optionText = String.fromCharCode(65+i) + ' &ndash; ' + dataArray[0][i];
        } else {
            optionText = String.fromCharCode(65+i);
        }
        $('#tabular-data-column-select').append('<option value=\'' + (i) + '\'>' + optionText + '</option>');
    }
    $('#tabular-data-analysed-wrapper').show();
    $('#btn-tabular-data-perform-action, #btn-tabular-data-convert').prop('disabled', true);
}

$('#tabular-data-first-row-headings-checkbox').change(function() {
    if ($('#tabular-data-analysed-wrapper').is(':visible')) {
        analyseTabularData();
        if ($(this).prop('checked')) {
            $('#tabular-data-convert-select option[value=json]').prop('disabled', false);
            $("#tabular-data-convert-select")[0].selectedIndex = 0;
        } else {
            $('#tabular-data-convert-select option[value=json]').prop('disabled', true);
            $("#tabular-data-convert-select")[0].selectedIndex = 0;
        }
    }
});

$('#btn-tabular-data-analyse').click(function() {
    analyseTabularData();
});

$('#btn-tabular-data-perform-action').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let linesArray = input.split(/\r?\n|\r/);
    let delimiter;
    switch($('#tabular-data-delimeter-value').val()) {
        case 'linebreak':
            delimiter = '\n';
            break;
        case 'tab':
            delimiter = '\t';
            break;
        case 'space':
            delimiter = ' ';
            break;
        case 'comma':
            delimiter = ',';
            break;
        case 'comma-space':
            delimiter = ', ';
            break;
        case 'colon':
            delimiter = ':';
            break;
        case 'semicolon':
            delimiter = ';';
            break;
        case 'pipe':
            delimiter = '|';
            break;
        case 'other':
            delimiter = $('#tabular-data-other-delimeter-value').val();
            break;
        default:
            delimiter = '';
            break;
    }
    let dataArray = linesArray.map(function(line) {
        return line.split(delimiter);
    });
    let action = $('#tabular-data-action-select').val();
    let columnIndex = parseInt($('#tabular-data-column-select').val(), 10);
    if (action === 'delete-this') {
        dataArray = dataArray.map(function(rowArray) {
            return rowArray.filter(function (item, index) {
                return index != columnIndex;
            });
        });
    } else if (action === 'delete-others') {
        dataArray = dataArray.map(function(rowArray) {
            return rowArray.splice(columnIndex, 1);
        });
    } else if (action === 'delete-before') {
        dataArray = dataArray.map(function(rowArray) {
            return rowArray.filter(function (item, index) {
                return index >= columnIndex;
            });
        });
    } else if (action === 'delete-after') {
        dataArray = dataArray.map(function(rowArray) {
            return rowArray.filter(function (item, index) {
                return index <= columnIndex;
            });
        });
    } else if (action === 'move-left') {
        if (columnIndex > 0) {
            dataArray = dataArray.map(function(rowArray) {
                return moveArrayEntry(rowArray, columnIndex, columnIndex-1);
            });
        }
    } else if (action === 'move-right') {
        if (columnIndex < dataArray[0].length-1) {
            dataArray = dataArray.map(function(rowArray) {
                return moveArrayEntry(rowArray, columnIndex, columnIndex+1);
            });
        }
    } else if (action === 'move-to-beginning') {
        dataArray = dataArray.map(function(rowArray) {
            let valueToMove = rowArray[columnIndex];
            let modifiedArray = rowArray;
            modifiedArray.splice(columnIndex, 1);
            modifiedArray.unshift(valueToMove);
            return modifiedArray;
        });
    } else if (action === 'move-to-end') {
        dataArray = dataArray.map(function(rowArray) {
            let valueToMove = rowArray[columnIndex];
            let modifiedArray = rowArray;
            modifiedArray.splice(columnIndex, 1);
            modifiedArray.push(valueToMove);
            return modifiedArray;
        });
    }
    linesArray = dataArray.map(function(rowArray) {
        return rowArray.join(delimiter);
    });
    let output = linesArray.join('\n');
    $textarea.val(output);
    updateHistory();
    analyseTabularData();
});

$('#btn-tabular-data-convert').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let delimiter;
    switch($('#tabular-data-delimeter-value').val()) {
        case 'linebreak':
            delimiter = '\n';
            break;
        case 'tab':
            delimiter = '\t';
            break;
        case 'space':
            delimiter = ' ';
            break;
        case 'comma':
            delimiter = ',';
            break;
        case 'comma-space':
            delimiter = ', ';
            break;
        case 'colon':
            delimiter = ':';
            break;
        case 'semicolon':
            delimiter = ';';
            break;
        case 'pipe':
            delimiter = '|';
            break;
        case 'other':
            delimiter = $('#tabular-data-other-delimeter-value').val();
            break;
        default:
            delimiter = '';
            break;
    }
    let convertTo = $('#tabular-data-convert-select').val();
    if (convertTo === 'json') {
        input = convertToJson(input, delimiter)
    } else if (convertTo === 'html') {
        let options = {
            seperator: delimiter,
			hasHeader: $('#tabular-data-first-row-headings-checkbox').prop('checked'),
			headerPrefix: "COL"
        };
        input = convertToHtmlTable(input, options);
    }
    let output = input;
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Add HTML markup fieldset
// =========================================================

$('#btn-html-ol').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/^(\n{2,})/gm, '\n');
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return '    <li>' + _.trim(line) + '</li>';
    });
    input = '<ol>\n' + array.join('\n') + '\n</ol>';
    input = input.split('<li></li>').join('');
    let output = input;
    $textarea.val(output);
    updateHistory();
});

$('#btn-html-ul').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/^(\n{2,})/gm, '\n');
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return '    <li>' + _.trim(line) + '</li>';
    });
    input = '<ul>\n' + array.join('\n') + '\n</ul>';
    input = input.split('<li></li>').join('');
    let output = input;
    $textarea.val(output);
    updateHistory();
});

$('#btn-html-br').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return line + '<br/>';
    });
    let output = array.join('');
    $textarea.val(output);
    updateHistory();
});

$('#btn-html-p').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/^(\n{2,})/gm, '\n');
    input = input.replace(/\n/g, '<br/>');
    $textarea.val(input);
    input = $textarea.val();
    let array = input.split('<br/><br/>');
    array = array.map(function(line) {
        return '<p>' + line + '</p>\n';
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-html-wrap-lines').click(function() {
    let tagName = prompt("Enter the tag name:", 'h3');
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    if (tagName === null) {
        tagName = '';
    }
    array = array.map(function(line) {
        if (line !== '') {
            return '<'+tagName+'>' + line + '</'+tagName+'>';
        } else {
            return line;
        }
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-html-open-new-window').click(function() {
    let $textarea = $('#main-textarea');
    let html = '';
    switch ($('#view-html-css-select').val()) {
        case '':
            break;
        case 'meyer-reset':
            html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />';
            break;
        case 'normalize':
            html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />';
            break;
        case 'bootstrap3':
            html += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">';
            break;
        case 'bootstrap4':
            html += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">';
            break;
        case 'foundation5':
            html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.3/css/foundation.min.css" integrity="sha256-NTds7atVCDeolLUzbcl45lx4gJYO+hNXCaX1wC2HQHc=" crossorigin="anonymous" />';
            break;
        case 'foundation6':
            html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.5.1/css/foundation.min.css" integrity="sha256-1mcRjtAxlSjp6XJBgrBeeCORfBp/ppyX4tsvpQVCcpA=" crossorigin="anonymous" />';
            break;
        case 'bulma':
            html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css" />';
            break;
        case 'semantic-ui':
            html += '<link rel="stylesheet" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/semantic.min.css" />';
            break;
        case 'materialize':
            html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />';
            break;
        case 'pure':
            html += '<link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w" crossorigin="anonymous">';
            break;
        case 'skeleton':
            html += '<link rel="stylesheet" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/skeleton.css" />';
            break;
        case 'uikit':
            html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.5/css/uikit.min.css" integrity="sha256-iyi99z0YCXphPJKgycNSwgYQwMV9qvCJLC8tlBHvBO0=" crossorigin="anonymous" />';
            break;
        case 'milligram':
            html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.min.css" />';
            break;
        case 'spectre':
            html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.7/spectre.min.css" />';
            break;
        case 'mustard-ui':
            html += '<link rel="stylesheet" href="https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css">';
            break;
        case 'mui':
            html += '<link href="//cdn.muicss.com/mui-0.9.41/css/mui.min.css" rel="stylesheet" type="text/css" />';
            break;
        case 'animate':
            html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css" integrity="sha256-HtCCUh9Hkh//8U1OwcbD8epVEUdBvuI8wj1KtqMhNkI=" crossorigin="anonymous" />';
            break;
        case 'tailwind':
            html += `<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.0.1/base.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.0.1/components.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.0.1/tailwind.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.0.1/utilities.min.css" rel="stylesheet">`;
            break;
        case 'tachyons':
            html += '<link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>';
            break;
        case 'typesafe':
            html += '<link rel="stylesheet" href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/9487/typesafe.css"/>';
            break;
    }
    html += $textarea.val();
    let win = popupCenter('', 'HTML Preview', 1000, 800);
    win.document.body.innerHTML = html;
});

// =========================================================
// Data URIs
// =========================================================

$('#btn-data-uri-svg-to-background-image').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/\t/g, ' ');
    input = vkbeautify.xmlmin(input, true);
    input = input.replace(/  +/g, ' ').trim();
    input = input.replace(/\r?\n|\r/g, '');
    input = input.replace(/  +/g, ' ').trim();
    // let array = input.split(/\r?\n|\r/);
    // array = array.map(function(line) {
    //     return _.trim(line);
    // });
    // let output = array.join('');
    //output = encodeURIComponent(output);
    let output = input;
    output = output.replace(/  +/g, ' ')
    output = output.replace(/"/g, '\'');
    output = output.replace(/#/g, '%23');
    output = output.replace(/</g, '%3C');
    output = output.replace(/>/g, '%3E');
    output = 'background-repeat: no-repeat;\nbackground-position: center center;\nbackground-size: contain;\nbackground-image: url("data:image/svg+xml;charset=utf8,' + output + '");';
    $textarea.val(output);
    updateHistory();
});

$('#btn-data-uri-background-image-to-svg').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/\r?\n|\r/g, '');
    let output = input;
    let firstIndex = output.indexOf('%3Csvg');
    let lastIndex = output.lastIndexOf('svg%3E');
    output = output.substring(firstIndex, lastIndex + 6);
    output = decodeURI(output);
    $textarea.val(output);
    updateHistory();
});

$('#btn-base64-open-new-window').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/\r?\n|\r/g, '');
    let image = new Image();
    image.src = input;
    let win = popupCenter('', 'Image Preview', 1000, 800);
    win.document.body.innerHTML = image.outerHTML;
});

$('#btn-base64-download-file').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/\r?\n|\r/g, '');
    let fileExtension = '';
    if (input.indexOf('data:image/png') > -1) {
        fileExtension = '.png';
    } else if (input.indexOf('data:image/jpeg') > -1) {
        fileExtension = '.jpg';
    } else if (input.indexOf('data:image/svg+xml') > -1) {
        fileExtension = '.svg';
    } else if (input.indexOf('data:image/webp') > -1) {
         fileExtension = '.webp';
    } else if (input.indexOf('data:image/gif') > -1) {
         fileExtension = '.gif';
    } else if (input.indexOf('data:image/pdf') > -1) {
         fileExtension = '.pdf';
    }
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    let min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    let formattedDate = year + '-' + month + '-' + date + '_' + hour + '-' + min;
    window.saveAs(input, `from-data-uri_${formattedDate}${fileExtension}`);
});


// =========================================================
// Encode/decode fieldset
// =========================================================

$('#btn-modify-encodeURI').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return encodeURI(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = encodeURI(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-decodeURI').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return decodeURI(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = decodeURI(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-encodeURIComponent').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return encodeURIComponent(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = encodeURIComponent(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-decodeURIComponent').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return decodeURIComponent(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = decodeURIComponent(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toUnicode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return line.toUnicode();
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.toUnicode()
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromUnicode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return line.replace(/\\u([\d\w]{4})/gi, function (match, grp) {
                return String.fromCharCode(parseInt(grp, 16));
            });
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.replace(/\\u([\d\w]{4})/gi, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16));
        });
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toUnicode-zerox').click(function() {    
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return line.toUnicode().replace(/\\u/g, '0x');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.toUnicode().replace(/\\u/g, '0x');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromUnicode-zerox').click(function() {    
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return line.replace(/0x([\d\w]{4})/gi, function (match, grp) {
                return String.fromCharCode(parseInt(grp, 16));
            });
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.replace(/0x([\d\w]{4})/gi, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16));
        });
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toUnicode-uplus').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return line.toUnicode().replace(/\\u/g, 'U+');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.toUnicode().replace(/\\u/g, 'U+');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromUnicode-uplus').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return line.replace(/U\+([\d\w]{4})/gi, function (match, grp) {
                return String.fromCharCode(parseInt(grp, 16));
            });
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.replace(/U\+([\d\w]{4})/gi, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16));
        });
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-binary-unicode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.split('');
            charArray = charArray.map(function(char) {
                return v.padLeft(char.charCodeAt(0).toString(2), 8, '0');
            });
            return charArray.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.split('');
        charArray = charArray.map(function(char) {
            return v.padLeft(char.charCodeAt(0).toString(2), 8, '0');
        });
        output = charArray.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-binary-unicode').click(function() {    
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, array = [], index = 0;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            array = [];
            index = 0;
            while (index < line.length) {
                array.push(line.substring(index, Math.min(index + 8, line.length)));
                index += 8;
            }
            array = array.map(function(char) {
                return String.fromCharCode(parseInt(char, 2));
            });
            return array.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        while (index < input.length) {
            array.push(input.substring(index, Math.min(index + 8, input.length)));
            index += 8;
        }
        array = array.map(function(char) {
            return String.fromCharCode(parseInt(char, 2));
        });
        output = array.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-hex-unicode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return line.hexEncode();
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.hexEncode();
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-hex-unicode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return line.hexDecode();
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.hexDecode();
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-hex-escape-sequence').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return line.toHexEscapeSequence()
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.toHexEscapeSequence();
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-hex-escape-sequence').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
     if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return line.replace(/\\x/g, '00').hexDecode();
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.replace(/\\x/g, '00').hexDecode();
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-css-pseudo-content').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.split('');
            charArray = charArray.map(function(char, index) {
                return '\\' + char.hexEncode();
            });
            return 'content: \''+ charArray.join().replace(/,/g, '') + '\';';
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.split('');
        charArray = charArray.map(function(char, index) {
            return '\\' + char.hexEncode();
        });
        output = 'content: \''+ charArray.join().replace(/,/g, '') + '\';';
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toBinary').click(function() {
    const BASE = 2;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.split('');
            charArray = charArray.map(function(char, index) {
                return _.padStart(char.charCodeAt(0).toString(BASE), 8, '0');
            });
            return charArray.join(' ');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.split('');
        charArray = charArray.map(function(char, index) {
            return _.padStart(char.charCodeAt(0).toString(BASE), 8, '0');
        });
        output = charArray.join(' ');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromBinary').click(function() {
    const BASE = 2;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.trim().split(' ');
            charArray = charArray.filter(item => item !== null && item !== undefined && item !== '');
            charArray = charArray.map(function(char, index) {
                return String.fromCharCode(parseInt(char, BASE));
            });
            return charArray.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.trim().split(' ');
        charArray = charArray.filter(item => item !== null && item !== undefined && item !== '');
        charArray = charArray.map(function(char, index) {
            return String.fromCharCode(parseInt(char, BASE));
        });
        output = charArray.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toTernary').click(function() {
    const BASE = 3;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.split('');
            charArray = charArray.map(function(char, index) {
                return char.charCodeAt(0).toString(BASE);
            });
            return charArray.join(' ');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.split('');
        charArray = charArray.map(function(char, index) {
            return char.charCodeAt(0).toString(BASE);
        });
        output = charArray.join(' ');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromTernary').click(function() {
    const BASE = 3;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.trim().split(' ');
            charArray = charArray.filter(item => item !== null && item !== undefined && item !== '');
            charArray = charArray.map(function(char, index) {
                return String.fromCharCode(parseInt(char, BASE));
            });
            return charArray.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.trim().split(' ');
        charArray = charArray.filter(item => item !== null && item !== undefined && item !== '');
        charArray = charArray.map(function(char, index) {
            return String.fromCharCode(parseInt(char, BASE));
        });
        output = charArray.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toDecimal').click(function() {
    const BASE = 10;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.split('');
            charArray = charArray.map(function(char, index) {
                return char.charCodeAt(0).toString(BASE);
            });
            return charArray.join(' ');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.split('');
        charArray = charArray.map(function(char, index) {
            return char.charCodeAt(0).toString(BASE);
        });
        output = charArray.join(' ');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromDecimal').click(function() {
    const BASE = 10;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.trim().split(' ');
            charArray = charArray.filter(item => item !== null && item !== undefined && item !== '');
            charArray = charArray.map(function(char, index) {
                return String.fromCharCode(parseInt(char, BASE));
            });
            return charArray.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.trim().split(' ');
        charArray = charArray.filter(item => item !== null && item !== undefined && item !== '');
        charArray = charArray.map(function(char, index) {
            return String.fromCharCode(parseInt(char, BASE));
        });
        output = charArray.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toHex').click(function() {
    const BASE = 16;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.split('');
            charArray = charArray.map(function(char, index) {
                return char.charCodeAt(0).toString(BASE);
            });
            return charArray.join(' ');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.split('');
        charArray = charArray.map(function(char, index) {
            return char.charCodeAt(0).toString(BASE);
        });
        output = charArray.join(' ');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromHex').click(function() {
    const BASE = 16;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.trim().split(' ');
            charArray = charArray.filter(item => item !== null && item !== undefined && item !== '');
            charArray = charArray.map(function(char, index) {
                return String.fromCharCode(parseInt(char, BASE));
            });
            return charArray.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.trim().split(' ');
        charArray = charArray.filter(item => item !== null && item !== undefined && item !== '');
        charArray = charArray.map(function(char, index) {
            return String.fromCharCode(parseInt(char, BASE));
        });
        output = charArray.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toOctal').click(function() {
    const BASE = 8;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.split('');
            charArray = charArray.map(function(char, index) {
                return char.charCodeAt(0).toString(BASE);
            });
            return charArray.join(' ');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.split('');
        charArray = charArray.map(function(char, index) {
            return char.charCodeAt(0).toString(BASE);
        });
        output = charArray.join(' ');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromOctal').click(function() {
    const BASE = 8;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.trim().split(' ');
            charArray = charArray.filter(item => item !== null && item !== undefined && item !== '');
            charArray = charArray.map(function(char, index) {
                return String.fromCharCode(parseInt(char, BASE));
            });
            return charArray.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.trim().split(' ');
        charArray = charArray.filter(item => item !== null && item !== undefined && item !== '');
        charArray = charArray.map(function(char, index) {
            return String.fromCharCode(parseInt(char, BASE));
        });
        output = charArray.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toUTF8').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return utf8.encode(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = utf8.encode(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromUTF8').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return utf8.decode(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = utf8.decode(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toCharCode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.split('');
            charArray = charArray.map(function(char) {
                return char.charCodeAt(0);
            });
            return charArray.join(' ');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.split('');
        charArray = charArray.map(function(char) {
            return char.charCodeAt(0);
        });
        output = charArray.join(' ');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromCharCode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, wordArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            wordArray = line.split(' ');
            wordArray = wordArray.map(function(char) {
                return String.fromCharCode(char);
            });
            return wordArray.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        wordArray = input.split(' ');
        wordArray = wordArray.map(function(char) {
            return String.fromCharCode(char);
        });
        output = wordArray.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toCodePoint').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.split('');
            charArray = charArray.map(function(char) {
                return char.codePointAt(0);
            });
            return charArray.join(' ');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.split('');
        charArray = charArray.map(function(char) {
            return char.codePointAt(0);
        });
        output = charArray.join(' ');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromCodePoint').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, wordArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            wordArray = line.split(' ');
            wordArray = wordArray.map(function(char) {
                return String.fromCodePoint(char);
            });
            return wordArray.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        wordArray = input.split(' ');
        wordArray = wordArray.map(function(char) {
            return String.fromCodePoint(char);
        });
        output = wordArray.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-html-entity-decimal').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, charArray;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            charArray = line.split('');
            charArray = charArray.map(function(char) {
                return '&#' + char.charCodeAt(0) + ';';
            });
            return charArray.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        charArray = input.split('');
        charArray = charArray.map(function(char) {
            return '&#' + char.charCodeAt(0) + ';';
        });
        output = charArray.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-html-entity-decimal').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, entityArray, charCode;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            entityArray = line.split('&#');
            entityArray = entityArray.map(function(htmlEntity) {
                htmlEntity = '&#' + htmlEntity;
                charCode = htmlEntity.substring(2, htmlEntity.length-1);
                return String.fromCharCode(charCode);
            });
            return entityArray.join('');
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        entityArray = input.split('&#');
        entityArray = entityArray.map(function(htmlEntity) {
            htmlEntity = '&#' + htmlEntity;
            charCode = htmlEntity.substring(2, htmlEntity.length-1);
            return String.fromCharCode(charCode);
        });
        output = entityArray.join('');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-html-entity-named-unsafe').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return he.encode(line, {
                'encodeEverything': false,
                'useNamedReferences': true
            });
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = he.encode(input, {
            'encodeEverything': false,
            'useNamedReferences': true
        });
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-html-entity-named-all').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return he.encode(line, {
                'encodeEverything': true,
                'useNamedReferences': true
            });
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = he.encode(input, {
            'encodeEverything': true,
            'useNamedReferences': true
        });
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-html-entity-named-hex').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return he.decode(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = he.decode(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toBase64').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return b64EncodeUnicode(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = b64EncodeUnicode(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromBase64').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return b64DecodeUnicode(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = b64DecodeUnicode(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toMorse').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    morjs.modes.custom = {
      charSpacer:   '',
      letterSpacer: ' ',
      longString:   '-',
      shortString:  '.',
      wordSpacer:   '/'
    };
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return morjs.encode(line, {mode: 'custom'});
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = morjs.encode(input, {mode: 'custom'});
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromMorse').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    morjs.modes.custom = {
      charSpacer:   '',
      letterSpacer: ' ',
      longString:   '-',
      shortString:  '.',
      wordSpacer:   '/'
    };
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return morjs.decode(line, {mode: 'custom'});
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = morjs.decode(input, {mode: 'custom'});
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-json-string').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, tempStr;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            tempStr = line.replace(/\\/g, '\\\\');
            tempStr = tempStr.replace(/"/g, '\\"');
            tempStr = tempStr.replace(/\r?\n|\r/g, '\\n');
            tempStr = tempStr.replace(/\t/g, '\\t');
            return tempStr;
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.replace(/\\/g, '\\\\');
        output = output.replace(/"/g, '\\"');
        output = output.replace(/\r?\n|\r/g, '\\n');
        output = output.replace(/\t/g, '\\t');
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-json-string').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, tmpStr;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            tmpStr = line.replace(/\\t/g, '\t');
            tmpStr = tmpStr.replace(/\\n/g, '\n');
            tmpStr = tmpStr.replace(/\\"/g, '"');
            tmpStr = tmpStr.replace(/\\\\/g, '\\');
            return tmpStr;
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.replace(/\\t/g, '\t');
        output = output.replace(/\\n/g, '\n');
        output = output.replace(/\\"/g, '"');
        output = output.replace(/\\\\/g, '\\');
    }
    $textarea.val(output);
    updateHistory();
});



$('#btn-modify-to-textarea-value').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, tempStr;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            tempStr = line.replace(/\\/g, '\\\\');
            tempStr = tempStr.replace(/"/g, '\\"');
            tempStr = tempStr.replace(/\r?\n|\r/g, '\\n');
            tempStr = tempStr.replace(/\t/g, '\\t');
            return "document.getElementById('myTextarea').value = '" + tempStr.replace(/'/g, "\\'") + "';";
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.replace(/\\/g, '\\\\');
        output = output.replace(/"/g, '\\"');
        output = output.replace(/\r?\n|\r/g, '\\n');
        output = output.replace(/\t/g, '\\t');
        output = "// JavaScript code to populate textarea\nvar textarea = document.getElementById('myTextarea');\ntextarea.value = '" + output.replace(/'/g, "\\'") + "';\ntextarea.style.fontFamily = 'Consolas,monaco,monospace';";
    }
    $textarea.val(output);
    updateHistory();
});


$('#btn-modify-to-pre-inner-html').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, tempStr;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            tempStr = line.replace(/\\/g, '\\\\');
            tempStr = tempStr.replace(/"/g, '\\"');
            tempStr = tempStr.replace(/\r?\n|\r/g, '\\n');
            tempStr = tempStr.replace(/\t/g, '\\t');
            return "document.getElementById('myPre').innerHTML = '" + tempStr.replace(/'/g, "\\'") + "';";
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = input.replace(/\\/g, '\\\\');
        output = output.replace(/"/g, '\\"');
        output = output.replace(/\r?\n|\r/g, '\\n');
        output = output.replace(/\t/g, '\\t');
        output = "// JavaScript code to populate pre element\nvar newPre = document.createElement('pre');\nnewPre.id = 'myPre';\ndocument.body.appendChild(newPre);\n\ndocument.getElementById('myPre').innerHTML = '" + output.replace(/'/g, "\\'") + "';";
    }
    $textarea.val(output);
    updateHistory();
});


$('#btn-modify-to-dna-string').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, char, charCode, tempStr;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            tempStr = '';
            for (let i=0; i<line.length; i++) {
                char = line.charAt(i).toUpperCase();
                charCode = charToDnaLookupTable[char];
                if (charCode && charCode !== '') {
                    tempStr += charCode;
                }
            }
            return tempStr;
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        for (let i=0; i<input.length; i++) {
            charCode = charToDnaLookupTable[input.charAt(i).toUpperCase()];
            if (charCode && charCode !== '') {
                output += charCode;
            }
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-dna-string').click(function() {   
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    if (input !== '') {
        let output = '', dnaArray, char, tempStr;
        if ($('#encode-decode-each-line-radio').is(':checked')) {
            let lineArray = input.split(/\r?\n|\r/);
            lineArray = lineArray.map(function(line, index) {
                tempStr = '';
                dnaArray = line.match(/.{1,3}/g);
                for (let i=0; i<dnaArray.length; i++) {
                    char = dnaToCharLookupTable[dnaArray[i].toUpperCase()];
                    if (char) {
                        tempStr += char.toLowerCase();
                    }
                }
                tempStr = v.titleCase(tempStr);
                return tempStr;
            });
            output = lineArray.join('\n');
        } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
            dnaArray = input.match(/.{1,3}/g);
            for (let i=0; i<dnaArray.length; i++) {
                char = dnaToCharLookupTable[dnaArray[i].toUpperCase()];
                if (char) {
                    output += char.toLowerCase();
                }
            }
            output = v.titleCase(output);
        }
        $textarea.val(output);
        updateHistory();
    }
});

$('#btn-modify-to-fanda').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', char, isUpperCase, tempStr;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            tempStr = '';
            for (let i=0; i<line.length; i++) {
                isUpperCase = v.isUpperCase(line.charAt(i));
                char = charToFandaLookupTable[line.charAt(i).toLowerCase()];
                if (char) {
                    if (isUpperCase) {
                        char = char.toUpperCase();
                    }
                    tempStr += char;
                } else {
                    tempStr += line.charAt(i);
                }
            }
            return tempStr;
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        for (let i=0; i<input.length; i++) {
            isUpperCase = v.isUpperCase(input.charAt(i));
            char = charToFandaLookupTable[input.charAt(i).toLowerCase()];
            if (char) {
                if (isUpperCase) {
                    char = char.toUpperCase();
                }
                output += char;
            } else {
                output += input.charAt(i);
            }
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-fanda').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', char, isUpperCase, tempStr;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            tempStr = '';
            for (let i=0; i<line.length; i++) {
                isUpperCase = v.isUpperCase(line.charAt(i));
                char = fandaToCharLookupTable[line.charAt(i).toLowerCase()];
                if (char) {
                    if (isUpperCase) {
                        char = char.toUpperCase();
                    }
                    tempStr += char;
                } else {
                    tempStr += line.charAt(i);
                }
            }
            return tempStr;
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        for (let i=0; i<input.length; i++) {
            isUpperCase = v.isUpperCase(input.charAt(i));
            char = charToFandaLookupTable[input.charAt(i).toLowerCase()];
            if (char) {
                if (isUpperCase) {
                    char = char.toUpperCase();
                }
                output += char;
            } else {
                output += input.charAt(i);
            }
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-alphabet-position').click(function() {
    const WORD_DELIMITER = '_';
    const SENTENCE_DELIMITER = '.';
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', lineArray, sentenceArray, wordsArray, charsArray;
    input = input.toLowerCase().trim();
    input = input.replace(/[^\na-z .]/g, '');
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(line => {
            line = line.replace(/  +/g, ' ').trim();
            sentenceArray = line.split(SENTENCE_DELIMITER);
            sentenceArray = sentenceArray.map(sentence => {
                wordsArray = sentence.split(' ');
                wordsArray = wordsArray.map(word => {
                    charsArray = word.split('');
                    charsArray = charsArray.map(char => {
                        char = char.charCodeAt(0);
                        if (char === 32) {
                            return WORD_DELIMITER;
                        } else if (char === 46) {
                            return SENTENCE_DELIMITER;
                        } else {
                            return char - 96;
                        }
                    });
                    return charsArray.join(' ');
                });
                return wordsArray.join(WORD_DELIMITER);
            });
            return sentenceArray.join(SENTENCE_DELIMITER); 
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        input = input.replace(/\n/g, ' ');
        input = input.replace(/  +/g, ' ').trim();
        sentenceArray = input.split(SENTENCE_DELIMITER);
        sentenceArray = sentenceArray.map(sentence => {
            sentence = sentence.replace(/  +/g, ' ').trim();
            wordsArray = sentence.split(' ');
            wordsArray = wordsArray.map(word => {
                charsArray = word.split('');
                charsArray = charsArray.map(char => {
                    char = char.charCodeAt(0);
                    if (char === 32) {
                        return WORD_DELIMITER;
                    } else if (char === 46) {
                        return SENTENCE_DELIMITER;
                    } else {
                        return char - 96;
                    }
                });
                return charsArray.join(' ');
            });
            return wordsArray.join('_');
        });
        output = sentenceArray.join(SENTENCE_DELIMITER);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-alphabet-position').click(function() {
    const WORD_DELIMITER = '_';
    const SENTENCE_DELIMITER = '.';
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', lineArray, sentenceArray, wordsArray, charsArray;
    input = input.toLowerCase();
    input = input.replace(/[^\n0-9_ .]/g, '');
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(line => {
            line = line.replace(/  +/g, ' ').trim();
            sentenceArray = line.split(SENTENCE_DELIMITER);
            sentenceArray = sentenceArray.map(sentence => {
                sentence = sentence.replace(/  +/g, ' ').trim();
                wordsArray = sentence.split(WORD_DELIMITER);
                wordsArray = wordsArray.map(word => {
                    word = word.replace(/  +/g, ' ').trim();
                    charsArray = word.split(' ');
                    charsArray = charsArray.map(char => {
                        char = char.trim();
                        char = parseInt(char, 10);
                        char += 96;
                        return String.fromCharCode(char);
                    });
                    return charsArray.join('');
                });
                return wordsArray.join(' ');
            });
            return sentenceArray.join(SENTENCE_DELIMITER);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        input = input.replace(/\n/g, ' ');
        input = input.replace(/  +/g, ' ').trim();
        sentenceArray = input.split(SENTENCE_DELIMITER);
        sentenceArray = sentenceArray.map(sentence => {
            sentence = sentence.replace(/  +/g, ' ').trim();
            wordsArray = sentence.split(WORD_DELIMITER);
            wordsArray = wordsArray.map(word => {
              word = word.replace(/  +/g, ' ').trim();
                charsArray = word.split(' ');
                charsArray = charsArray.map(char => {
                    char = char.trim();
                    char = parseInt(char, 10);
                    char += 96;
                    return String.fromCharCode(char);
                });
              return charsArray.join('');
            });
            return wordsArray.join(' ');
        });
        output = sentenceArray.join(SENTENCE_DELIMITER);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-alphabet-position-hex').click(function() {
    const WORD_DELIMITER = '_';
    const SENTENCE_DELIMITER = '.';
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', lineArray, sentenceArray, wordsArray, charsArray;
    input = input.toLowerCase().trim();
    input = input.replace(/[^\na-z .]/g, '');
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(line => {
            line = line.replace(/  +/g, ' ').trim();
            sentenceArray = line.split(SENTENCE_DELIMITER);
            sentenceArray = sentenceArray.map(sentence => {
                wordsArray = sentence.split(' ');
                wordsArray = wordsArray.map(word => {
                    charsArray = word.split('');
                    charsArray = charsArray.map(char => {
                        char = char.charCodeAt(0);
                        if (char === 32) {
                            return WORD_DELIMITER;
                        } else if (char === 46) {
                            return SENTENCE_DELIMITER;
                        } else {
                            return (char - 96).toString(16).toUpperCase();
                        }
                    });
                    return charsArray.join(' ');
                });
                return wordsArray.join(WORD_DELIMITER);
            });
            return sentenceArray.join(SENTENCE_DELIMITER); 
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        input = input.replace(/\n/g, ' ');
        input = input.replace(/  +/g, ' ').trim();
        sentenceArray = input.split(SENTENCE_DELIMITER);
        sentenceArray = sentenceArray.map(sentence => {
            sentence = sentence.replace(/  +/g, ' ').trim();
            wordsArray = sentence.split(' ');
            wordsArray = wordsArray.map(word => {
                charsArray = word.split('');
                charsArray = charsArray.map(char => {
                    char = char.charCodeAt(0);
                    if (char === 32) {
                        return WORD_DELIMITER;
                    } else if (char === 46) {
                        return SENTENCE_DELIMITER;
                    } else {
                        return (char - 96).toString(16).toUpperCase();
                    }
                });
                return charsArray.join(' ');
            });
            return wordsArray.join('_');
        });
        output = sentenceArray.join(SENTENCE_DELIMITER);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-alphabet-position-hex').click(function() {
    const WORD_DELIMITER = '_';
    const SENTENCE_DELIMITER = '.';
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', lineArray, sentenceArray, wordsArray, charsArray;
    input = input.toLowerCase();
    console.log('input:', input);
    input = input.replace(/[^\n0-9a-f_ .]/g, '');
    console.log('input:', input);
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(line => {
            line = line.replace(/  +/g, ' ').trim();
            sentenceArray = line.split(SENTENCE_DELIMITER);
            sentenceArray = sentenceArray.map(sentence => {
                sentence = sentence.replace(/  +/g, ' ').trim();
                wordsArray = sentence.split(WORD_DELIMITER);
                wordsArray = wordsArray.map(word => {
                    word = word.replace(/  +/g, ' ').trim();
                    charsArray = word.split(' ');
                    charsArray = charsArray.map(char => {
                        char = char.trim();
                        char = parseInt(char,16)
                        char += 96;
                        return String.fromCharCode(char);
                    });
                    return charsArray.join('');
                });
                return wordsArray.join(' ');
            });
            return sentenceArray.join(SENTENCE_DELIMITER);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        input = input.replace(/\n/g, ' ');
        input = input.replace(/  +/g, ' ').trim();
        sentenceArray = input.split(SENTENCE_DELIMITER);
        sentenceArray = sentenceArray.map(sentence => {
            sentence = sentence.replace(/  +/g, ' ').trim();
            wordsArray = sentence.split(WORD_DELIMITER);
            wordsArray = wordsArray.map(word => {
              word = word.replace(/  +/g, ' ').trim();
                charsArray = word.split(' ');
                charsArray = charsArray.map(char => {
                    char = char.trim();
                    char = parseInt(char, 16);
                    char += 96;
                    return String.fromCharCode(char);
                });
              return charsArray.join('');
            });
            return wordsArray.join(' ');
        });
        output = sentenceArray.join(SENTENCE_DELIMITER);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-reversed-alphabet').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input;
    let charsArray = output.split('');
    let isUpperCase;
    charsArray = charsArray.map(char => {
        isUpperCase = v.isUpperCase(char);
        if (reversedAlphabetLookupTable[char.toUpperCase()]) {
            char = reversedAlphabetLookupTable[char.toUpperCase()];
        }
        if (!isUpperCase) {
            char = char.toLowerCase();
        }
        return char;
    })
    output = charsArray.join('');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-reversed-alphabet').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input;
    let charsArray = output.split('');
    let isUpperCase;
    charsArray = charsArray.map(char => {
        isUpperCase = v.isUpperCase(char);
        if (reversedAlphabetLookupTable[char.toUpperCase()]) {
            char = reversedAlphabetLookupTable[char.toUpperCase()];
        }
        if (!isUpperCase) {
            char = char.toLowerCase();
        }
        return char;
    })
    output = charsArray.join('');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-pigpen-font').click(function() {
    $('#main-textarea').css('fontFamily', 'PigPen');
    $('#main-textarea').css('letterSpacing', '0.3em');
    $('#main-textarea').css('fontWeight', 'bold');
});

$('#btn-modify-from-pigpen-font').click(function() {
    $('#main-textarea').css('fontFamily', '');
    $('#main-textarea').css('letterSpacing', '');
    $('#main-textarea').css('fontWeight', '');
});

$('#btn-modify-to-punycode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', char, isUpperCase, tempStr;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(line => punycode.encode(line))
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        input = punycode.encode(input)
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-from-punycode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', char, isUpperCase, tempStr;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(line => punycode.decode(line))
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        input = punycode.decode(input)
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-toMD5').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return SparkMD5.hash(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = SparkMD5.hash(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-pig-latin').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output, linesArray, wordsArray, firstCharIsUppercase;
    linesArray = input.split(/\r?\n|\r/);
    linesArray = linesArray.map(function(line) {
        wordsArray = line.split(' ');
        wordsArray = wordsArray.map(function(word) {
            firstCharIsUppercase = v.isUpperCase(word.substr(0, 1));
            word = word.toLowerCase();
            word = getPigLatinWord(word);
            if (firstCharIsUppercase) {
                word = v.capitalize(word);
            }
            return word;
        });
        return wordsArray.join(' ');
    });
    output = linesArray.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-to-feature-phone-texting').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = input;
    let charsArray = output.split('');
    let isUpperCase;
    charsArray = charsArray.map(char => {
        isUpperCase = v.isUpperCase(char);
        if (featurePhoneTextinglookupTable[char.toUpperCase()]) {
            char = featurePhoneTextinglookupTable[char.toUpperCase()];
        }
        if (!isUpperCase) {
            char = char.toLowerCase();
        }
        return char;
    })
    output = charsArray.join('');
    $textarea.val(output);
    updateHistory();
});



$('#btn-modify-to-regexp-escape-sequence').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#encode-decode-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.escapeRegExp(line);
        });
        output = lineArray.join('\n');
    } else if ($('#encode-decode-whole-document-radio').is(':checked')) {
        output = _.escapeRegExp(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-modify-fromJwt').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let splitOnSpaceArray = input.split(' ')
    if (splitOnSpaceArray.length > 1) {
        splitOnSpaceArray = splitOnSpaceArray.filter(item => {
            return item !== '' && item !== 'Authorization:' && item !== 'Bearer' && item !== 'Authorization:Bearer'
        })
    } 
    input = splitOnSpaceArray.join('')
    const header = Base64URLDecode(input.split('.')[0])
    const payload = Base64URLDecode(input.split('.')[1])
    const headerFormattedJson = JSON.stringify(JSON.parse(header), null, 2)
    const payloadFormattedJson = JSON.stringify(JSON.parse(payload), null, 2)
    const output =  `HEADER\n\n${headerFormattedJson}\n\nPAYLOAD\n\n${payloadFormattedJson}\n\nSECRET\n\n????`
    $textarea.val(output);
    updateHistory();
});

$('#btn-get-character-info').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/\s/g,'');
    let char = input.charAt(0);
    char = prompt('Enter a charcater \u2026', char);
    if (char != '' && char != null) {
        char = char.charAt(0);
        const output = `Glyph :                     ${char}
Unicode name:               ${unicodeNamesLookupTable[char.hexEncode().toUpperCase()]}
Unicode Code Point:         ${char.toUnicode().replace(/\\u/g, 'U+')}
HTML Entity (Named):        ${he.encode(char, {'encodeEverything': true, 'useNamedReferences': true})}
HTML Entity (Decimal):      &#${char.codePointAt(0)};
HTML Entity (Hexadecimal):  &#x${char.codePointAt(0).toString(16).toUpperCase()};
URL Escape Code:            ${encodeURIComponent(char)} 
UTF-16 (hex):               ${char.toUnicode().replace(/\\u/g, '0x')}
UTF-16 (decimal):           ${char.codePointAt(0)}
JavaScript and JSON:        ${char.toUnicode()}
CSS Pseudo Content:         \\${char.hexEncode().toUpperCase()}
Graphemica webpage:         https://graphemica.com/${encodeURIComponent(char)}
Compart webpage:            https://www.compart.com/en/unicode/${char.toUnicode().replace(/\\u/g, 'U+')}
Fileformat webpage:         https://www.fileformat.info/info/unicode/char/${char.hexEncode()}/index.htm
Unicode-table webpage       https://unicode-table.com/en/${char.hexEncode().toUpperCase()}/`;
        $textarea.val(output);
        updateHistory();
    }
});   

// =========================================================
// ROT fieldset
// =========================================================

$('#rot-number-select').change(function() {
    let rotNumber = parseInt($(this).val(), 10);
    $('#btn-to-rot').text('To ROT'+rotNumber);
    $('#btn-from-rot').text('From ROT'+rotNumber);
});

$('#btn-to-rot').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let rotNumber = parseInt($('#rot-number-select').val(), 10);
    let output = rot(input, rotNumber)
    $textarea.val(output);
    updateHistory();
});

$('#btn-from-rot').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let rotNumber = parseInt($('#rot-number-select').val(), 10);
    let output = rot(input, rotNumber * -1)
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Vigenère cipher fieldset
// =========================================================

$('#btn-vigenere-cipher-encode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let key = $('#vigenere-key').val();
    if (key === '') {
        alert('You must enter a key for the Vigenère cipher to work, eg \'abc\'.');
        return;
    }
    key = vigenereFilterKey(key);
    let output = vigenereCrypt(input, key);
    $textarea.val(output);
    updateHistory();
});

$('#btn-vigenere-cipher-decode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let key = $('#vigenere-key').val();
    if (key === '') {
        alert('You must enter a key for the Vigenère cipher to work, eg \'abc\'.');
        return;
    }
    key = vigenereFilterKey(key);
	for (var i = 0; i < key.length; i++) {
        key[i] = (26 - key[i]) % 26;
    }
    let output = vigenereCrypt(input, key);
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Spelling/Phonetic Alphabet fieldset
// =========================================================

$('#btn-spelling-alphabet-nato').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/[^\na-zA-Z0-9.\- ]/g, '');
    input = input.replace(/\r?\n|\r/g, ' ');
    input = input.replace(/  +/g, ' ').trim();
    input = input.toLowerCase();
    input = _.trim(input);
    let output = '';
    for (let i=0; i<input.length; i++) {
        let phonetic = natoPhoneticLookupTable[input.charAt(i)];
        output += phonetic + ' ';
    }
    output = _.trim(output);
    $textarea.val(output);
    updateHistory();
});

$('#btn-spelling-alphabet-dutch').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/[^\na-zA-Z0-9.\- ]/g, '');
    input = input.replace(/\r?\n|\r/g, ' ');
    input = input.replace(/  +/g, ' ').trim();
    input = input.toLowerCase();
    input = _.trim(input);
    let output = '';
    for (let i=0; i<input.length; i++) {
        let phonetic = dutchPhoneticLookupTable[input.charAt(i)];
        output += phonetic + ' ';
    }
    output = _.trim(output);
    $textarea.val(output);
    updateHistory();
});

$('#btn-spelling-alphabet-german').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/[^\na-zA-Z0-9.\- ]/g, '');
    input = input.replace(/\r?\n|\r/g, ' ');
    input = input.replace(/  +/g, ' ').trim();
    input = input.toLowerCase();
    input = _.trim(input);
    let output = '';
    for (let i=0; i<input.length; i++) {
        let phonetic = germanPhoneticLookupTable[input.charAt(i)];
        output += phonetic + ' ';
    }
    output = _.trim(output);
    $textarea.val(output);
    updateHistory();
});

$('#btn-spelling-alphabet-swedish').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/[^\na-zA-Z0-9.\- ]/g, '');
    input = input.replace(/\r?\n|\r/g, ' ');
    input = input.replace(/  +/g, ' ').trim();
    input = input.toLowerCase();
    input = _.trim(input);
    let output = '';
    for (let i=0; i<input.length; i++) {
        let phonetic = swedishPhoneticLookupTable[input.charAt(i)];
        output += phonetic + ' ';
    }
    output = _.trim(output);
    $textarea.val(output);
    updateHistory();
});

$('#btn-spelling-alphabet-decode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/\r?\n|\r/g, ' ');
    input = input.replace(/  +/g, ' ').trim();
    input = _.trim(input);
    let wordsArray = input.split(' ');
    wordsArray = wordsArray.map((word) => {
        return  decodePhoneticLookupTable[word.toUpperCase()];
    });
    let output = wordsArray.join('');
    output = output.toLowerCase();
    output = _.startCase(output);
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Mathematical Unicode fieldset
// =========================================================

$('#btn-to-mathematical-double-struck').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalDoubleStruckLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-from-mathematical-double-struck').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = mathematicalDoubleStruckToCharLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-fraktur').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalFrakturLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-bold-fraktur').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalBoldFrakturLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-bold').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalBoldLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-italic').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalItalicLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-bold-italic').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalBoldItalicLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-script').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalScriptLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-bold-script').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalBoldScriptLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-sans-serif').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalSansSerifLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-sans-serif-bold').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalSansSerifBoldLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-sans-serif-italic').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalSansSerifItalicLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-sans-serif-bold-italic').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalSansSerifBoldItalicLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-mathematical-monospace').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToMathematicalMonospaceLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-to-fullwidth-unicode').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = '', charCode;
    for (let i=0; i<input.length; i++) {
        charCode = charToFullwidthLookupTable[input.charAt(i)];
        if (charCode && charCode !== '') {
            output += charCode;
        } else {
            output += input.charAt(i)
        }
    }
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Lodash fieldset
// =========================================================

$('#btn-lodash-camelcase').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.camelCase(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.camelCase(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-capitalize').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.capitalize(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.capitalize(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-deburr').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.deburr(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.deburr(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-escape').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.escape(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.escape(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-escapeRegExp').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.escapeRegExp(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.escapeRegExp(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-kebabCase').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.kebabCase(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.kebabCase(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-lowerCase').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.lowerCase(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.lowerCase(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-lowerFirst').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.lowerFirst(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.lowerFirst(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-snakeCase').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.snakeCase(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.snakeCase(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-startCase').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.startCase(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.startCase(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-trim').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.trim(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.trim(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-unescape').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.unescape(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.unescape(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-upperCase').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.upperCase(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.upperCase(input);
    }
    $textarea.val(output);
    updateHistory();
});

$('#btn-lodash-upperFirst').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output;
    if ($('#lodash-each-line-radio').is(':checked')) {
        let lineArray = input.split(/\r?\n|\r/);
        lineArray = lineArray.map(function(line, index) {
            return _.upperFirst(line);
        });
        output = lineArray.join('\n');
    } else if ($('#lodash-whole-document-radio').is(':checked')) {
        output = _.upperFirst(input);
    }
    $textarea.val(output);
    updateHistory();
});


// =========================================================
// Voca fieldset
// =========================================================

$('#btn-voca-escapeHtml').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = v.escapeHtml(input);
    $textarea.val(output);
    updateHistory();
});

$('#btn-voca-escapeRegExp').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = v.escapeRegExp(input);
    $textarea.val(output);
    updateHistory();
});

$('#btn-voca-unescapeHtml').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = v.unescapeHtml(input);
    $textarea.val(output);
    updateHistory();
});

$('#btn-voca-slugify').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = v.slugify(input);
    $textarea.val(output);
    updateHistory();
});

$('#btn-voca-stripTags').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let output = v.stripTags(input);
    $textarea.val(output);
    updateHistory();
});


// =========================================================
// Beautify fieldset
// =========================================================

$('#btn-beautify-html').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let postUrl = 'https://www.10bestdesign.com/dirtymarkup/api/html';
    $('body').addClass('cursor-wait');
    
    $.post(postUrl, { 
        'code': $textarea.val(),
        'indent': 2,
        'line-length': 10000,
        'output': 'full-page',
        'indent-style': 'auto',
        'add-empty-lines': false,
        'allow-proprietary-attribs': false,
        'optimize-for-ms-word': false
    }).done(function(response) {
        let output = response.clean;
        let linesArray = output.split(/\r?\n|\r/);
        let length = linesArray.length;
        linesArray = linesArray.slice(6, length-2);
        linesArray = linesArray.map(function(line) {
            if (_.startsWith(line, '  ')) {
                return line.substring(2, line.length);
            } else {
                return line;
            }
        });
        output = linesArray.join('\n');
        $textarea.val(output);
        updateHistory();
        $('body').removeClass('cursor-wait');
        $textarea.scrollTop(0).scrollLeft(0);
    });
});

$('#btn-beautify-css').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let postUrl = 'https://www.10bestdesign.com/dirtymarkup/api/css';
    $('body').addClass('cursor-wait');
    
    $.post(postUrl, { 
        'code': $textarea.val(),
        'indent': 2,
        'newline-between-rules': true,
        'newline-between-selectors': false
    }).done(function(response) {
        $textarea.val(response.clean);
        updateHistory();
        $('body').removeClass('cursor-wait');
        $textarea.scrollTop(0).scrollLeft(0);
    });
});

$('#btn-beautify-js').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let postUrl = 'https://www.10bestdesign.com/dirtymarkup/api/js';
    $('body').addClass('cursor-wait');
    
    $.post(postUrl, { 
        'code': $textarea.val(),
        'indent': 4,
        'line-length': 10000,
        'brace-style': 'collapse',
        'spaces-in-parenthesis': false,
        'break-chained-methods': false,
        'commas-at-beginning': false,
        'keep-array-indentation': false,
        'preserve-empty-lines': false
    }).done(function(response) {
        $textarea.val(response.clean);
        updateHistory();
        $('body').removeClass('cursor-wait');
        $textarea.scrollTop(0).scrollLeft(0);
    });
});

$('#btn-beautify-json').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    
    try {
        const jsonObj = JSON.parse(input);
        console.dir(jsonObj, {depth: null, colors: true});
        let output = JSON.stringify(JSON.parse(input), null, 2);
        $textarea.val(output);
        updateHistory();
        $textarea.scrollTop(0).scrollLeft(0);
    }
    catch (error) {
        alert('Unable to parse JSON string! Please check it is formatted correctly.');
        console.error(error);
    }
});

$('#btn-beautify-xml').click(function() {
    const numSpacesPerIndentLevel = 2;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return convertIndentationTabsToSpaces(line, numSpacesPerIndentLevel);
    });
    input = array.join('\n');
    input = input.replace(/\r?\n|\r/g, '');
    input.replace(/  +/g, ' ').trim();
    input  = vkbeautify.xml(input, 2);
    input = input.replace(/  +/g, ' ').trim();
    input  = vkbeautify.xml(input, 2);
    let output = input;
    $textarea.val(output);
    updateHistory();
    $textarea.scrollTop(0).scrollLeft(0);
});

// =========================================================
// Indentation fieldset
// =========================================================

$('#btn-indentation-tabs-to-four-spaces').click(function() {
    const numSpacesPerIndentLevel = 4;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return convertIndentationTabsToSpaces(line, numSpacesPerIndentLevel);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-indentation-tabs-to-two-spaces').click(function() {
    const numSpacesPerIndentLevel = 2;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return convertIndentationTabsToSpaces(line, numSpacesPerIndentLevel);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-indentation-four-spaces-to-two-spaces').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return convertIndentationSpacesToSpaces(line, 4, 2);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-indentation-four-spaces-to-tabs').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return convertIndentationSpacesToTabs(line, 4);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-indentation-two-spaces-to-four-spaces').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return convertIndentationSpacesToSpaces(line, 2, 4);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-indentation-two-spaces-to-tabs').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return convertIndentationSpacesToTabs(line, 2);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-indent-one-space').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return ` ${line}`;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-indent-two-spaces').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return `  ${line}`;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-indent-four-spaces').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return `    ${line}`;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-indent-tab').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return `\t${line}`;
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-unindent-one-space').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let startsWithString = ' ';
    array = array.map(function(line) {
        if (v.startsWith(line, startsWithString)) {
            return line.substring(startsWithString.length, line.length);
        } else {
            return line;
        }
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-unindent-two-spaces').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let startsWithString = '  ';
    array = array.map(function(line) {
        if (v.startsWith(line, startsWithString)) {
            return line.substring(startsWithString.length, line.length);
        } else {
            return line;
        }
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-unindent-four-spaces').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let startsWithString = '    ';
    array = array.map(function(line) {
        if (v.startsWith(line, startsWithString)) {
            return line.substring(startsWithString.length, line.length);
        } else {
            return line;
        }
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-unindent-tab').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    let startsWithString = '\t'
    array = array.map(function(line) {
        if (v.startsWith(line, startsWithString)) {
            return line.substring(startsWithString.length, line.length);
        } else {
            return line;
        }
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

$('#btn-remove-all-indentation').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let array = input.split(/\r?\n|\r/);
    array = array.map(function(line) {
        return _.trimStart(line);
    });
    let output = array.join('\n');
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Minify/Uglify fieldset
// =========================================================

$('#btn-minify-css').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    if (input === '') {
      alert('Please enter some CSS to minify');
      return false;
    }
    let output = input
      .replace(/\/\*.*\*\/|\/\*[\s\S]*?\*\/|\n|\t|\v|\s{2,}/g, '')
      .replace(/\s*\{\s*/g, '{')
      .replace(/\s*\}\s*/g, '}')
      .replace(/\s*\:\s*/g, ':')
      .replace(/\s*\;\s*/g, ';')
      .replace(/\s*\,\s*/g, ',')
      .replace(/\s*\~\s*/g, '~')
      .replace(/\s*\>\s*/g, '>')
      .replace(/\s*\+\s*/g, '+')
      .replace(/\s*\!\s*/g, ' !')
      .replace(/\s*\;\}\s*/g, '}');
    $textarea.val(output);
    updateHistory();
});

$('#btn-minify-js').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    if (input === '') {
      alert('Please enter some JavaScript to minify');
      return false;
    }
    // To-Do: Do JS minification here
    let output = input;
    $textarea.val(output);
    updateHistory();
});

$('#btn-uglify-json').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    if (input === '') {
      alert('Please enter some JSON to minify');
      return false;
    }
    try {
        const jsonObj = JSON.parse(input);
        let output = JSON.stringify(JSON.parse(input));
        $textarea.val(output);
        updateHistory();
    }
    catch (error) {
        alert('Unable to parse JSON string! Please check it is formatted correctly.');
        console.error(error);
    }
});

$('#btn-uglify-xml').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    input = input.replace(/\t/g, ' ');
    input = vkbeautify.xmlmin(input, true);
    input = input.replace(/  +/g, ' ').trim();
    input = input.replace(/\r?\n|\r/g, '');
    input = input.replace(/  +/g, ' ').trim();
    let output = input;
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Obfuscate fieldset
// =========================================================

$('#btn-obfuscate-js-compact-false').click(function() {
    const DO_COMPACT = false;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let obfuscationResult = JavaScriptObfuscator.obfuscate(input, {compact: DO_COMPACT, controlFlowFlattening: true});
    let output = obfuscationResult.getObfuscatedCode();
    $textarea.val(output);
    updateHistory();
});

$('#btn-obfuscate-js-compact-true').click(function() {
    const DO_COMPACT = true;
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let obfuscationResult = JavaScriptObfuscator.obfuscate(input, {compact: DO_COMPACT, controlFlowFlattening: true});
    let output = obfuscationResult.getObfuscatedCode();
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Markdown fieldset
// =========================================================

$('#btn-markdown-to-html').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    var converter = new showdown.Converter();
    let output = converter.makeHtml(input);
    $textarea.val(output);
    updateHistory();
});

// =========================================================
// Validate fieldset
// =========================================================

$('#btn-validate-xml').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    var domParser = new DOMParser();
    var xmlDocument = domParser.parseFromString(input, 'text/xml');
    var selializedXml = (new XMLSerializer()).serializeToString(xmlDocument);
    if (selializedXml.indexOf('</parsererror>') === -1) {
        alert('The XML is valid!');
        let win = popupCenter('', 'XML Preview', 800, 600);
        win.document.body.innerHTML = selializedXml;
    } else {
        alert('The XML is NOT valid!');
    }
});

$('#btn-validate-json').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    try {
        let jsonObj = JSON.parse(input);
        alert('The JSON is valid!');
    } catch(err) {
        alert('The JSON is NOT valid!');
    }
});

// =========================================================
// Console fieldset
// =========================================================

$('#btn-console-log-text').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    console.log(input);
});

$('#btn-console-log-eval').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    console.log(eval(input));
});

$('#btn-console-log-json').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    try {
        let jsonObj = JSON.parse(input);
        console.log(jsonObj);
    } catch(err) {
        alert('The JSON is NOT valid!');
    }
});

$('#btn-console-table-json').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    try {
        let jsonObj = JSON.parse(input);
        console.table(jsonObj);
    } catch(err) {
        alert('The JSON is NOT valid!');
    }
});

$('#btn-console-dirxml').click(function() {
    let $textarea = $('#main-textarea');
    let input = $textarea.val();
    let $newDomElement = $(input);
    if ($newDomElement.length === 0) {
        alert('No DOM elements found!');
    } else if ($newDomElement.length === 1) {
        console.dirxml($newDomElement[0]);
    } else if ($newDomElement.length >= 2) {
        let $wrapper = $('<div></div>');
        $wrapper.append($newDomElement);
        console.dirxml($wrapper[0]);
    }
});

// =========================================================
// Sanity.io
// =========================================================

$('#btn-sanity-groq').click(function() {
    let $textarea = $('#main-textarea')
    let input = $textarea.val().trim()
    
    const projectId = $('#sanity-project-id-value').val().trim()
    const dataset = $('#sanity-dataset-value').val().trim()
    
    if (projectId !== '' && dataset !== '') {
        const url = `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=${encodeURIComponent(input)}`
        $('body').addClass('cursor-wait')
        
        axios.get(url)
            .then(function(response) {
                let sanityResult = JSON.stringify(response.data.result, null, 2)
                $('#main-textarea').val(sanityResult)
                updateHistory()
                $('body').removeClass('cursor-wait')
            })
            .catch(function(error) {
                $('body').removeClass('cursor-wait')
                alert('Oops! An error occurred: ' + error)
            });
    } else {
        alert('Please enter your Sanity.io projectId and dataset.')
    }
});

// =========================================================
// Helper functions  
// =========================================================

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    let CSV = 'sep=,' + '\r\n\n';
    if (ShowLabel) {
        let row = "";
        for (let index in arrData[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }
    for (let i = 0; i < arrData.length; i++) {
        let row = "";
        for (let index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }
    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    let fileName = ReportTitle.replace(/ /g,"_");   
    let uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    let link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getPigLatinWord(str) {
  // Convert string to lowercase
  str = str.toLowerCase()
  // Initialize array of vowels
  const vowels = ["a", "e", "i", "o", "u"];
  // Initialize vowel index to 0
  let vowelIndex = 0;

  if (vowels.includes(str[0])) {
    // If first letter is a vowel
    return str + "way";
  } else {
    // If the first letter isn't a vowel i.e is a consonant
    for (let char of str) {
      // Loop through until the first vowel is found
      if (vowels.includes(char)) {
        // Store the index at which the first vowel exists
        vowelIndex = str.indexOf(char);
        break;
      }
    }
    // Compose final string
    return str.slice(vowelIndex) + str.slice(0, vowelIndex) + "ay";
  }
}

function makeRandomString(length, characterPool) {
   let result = '';
   const charactersLength = characterPool.length;
   for (let i = 0; i < length; i++) {
      result += characterPool.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function shuffleAlphaChars(string, keepFirstAndLastChars, keepUpperCaseCharsAtIndex) {
  const trimmedString = string.trim();
  const trimmedStringArray = trimmedString.split('');
  const trimmedStringLength = trimmedString.length;
  const regex = /[a-zA-Z]/g;
  let matchesArray, alphaCharsArray = [];
  while ((matchesArray = regex.exec(trimmedString)) !== null) {
    alphaCharsArray.push({
      char: matchesArray['0'],
      index: matchesArray['index']
    })
  }
  const alphaCharsSimpleArray = alphaCharsArray.map(item => item.char)
  let alphaCharsSimpleArrayShuffled;
  if (keepFirstAndLastChars) {
    const firstChar = alphaCharsSimpleArray.shift();
    const lastChar = alphaCharsSimpleArray.pop();
    alphaCharsSimpleArrayShuffled = alphaCharsSimpleArray.sort(() => Math.random() - 0.5);
    alphaCharsSimpleArrayShuffled.unshift(firstChar);
    alphaCharsSimpleArrayShuffled.push(lastChar);
  } else {
    alphaCharsSimpleArrayShuffled = alphaCharsSimpleArray.sort(() => Math.random() - 0.5);
  }
  let alphaCharsArrayShuffled = alphaCharsArray.map((item, index) => {
    return {
      char: alphaCharsSimpleArrayShuffled[index],
      index: item.index
    }
  })
  let trimmedStringArrayShuffled = [...trimmedStringArray];  
  for (const item of alphaCharsArrayShuffled) {
    trimmedStringArrayShuffled[item.index] = item.char;
  }
  if (keepUpperCaseCharsAtIndex) {
    let upperCaseAlphaArray = [...trimmedStringArray];
    upperCaseAlphaArray = upperCaseAlphaArray.map(item => {
      const charCode = item.charCodeAt();
      return charCode >= 65 && charCode <= 90;
    })
    trimmedStringArrayShuffled = trimmedStringArrayShuffled.map((item, index) => {
      if (upperCaseAlphaArray[index]) {
        return item.toUpperCase();
      } else {
        return item.toLowerCase();
      }
    });
  }
  const trimmedStringShuffled = trimmedStringArrayShuffled.join('');  
  return trimmedStringShuffled;
}

function wordwrap(text, start, stop, mode) {
  var re = mode === "hard" ? /\b/ : /(\S+\s+)/;
  var chunks = text
    .toString()
    .split(re)
    .reduce(function(acc, x) {
      if (mode === "hard") {
        for (var i = 0; i < x.length; i += stop - start) {
          acc.push(x.slice(i, i + stop - start));
        }
      } else acc.push(x);
      return acc;
    }, []);

  return chunks
    .reduce(
      function(lines, rawChunk) {
        if (rawChunk === "") return lines;

        var chunk = rawChunk.replace(/\t/g, "    ");

        var i = lines.length - 1;
        if (lines[i].length + chunk.length > stop) {
          lines[i] = lines[i].replace(/\s+$/, "");

          chunk.split(/\n/).forEach(function(c) {
            lines.push(new Array(start + 1).join(" ") + c.replace(/^\s+/, ""));
          });
        } else if (chunk.match(/\n/)) {
          var xs = chunk.split(/\n/);
          lines[i] += xs.shift();
          xs.forEach(function(c) {
            lines.push(new Array(start + 1).join(" ") + c.replace(/^\s+/, ""));
          });
        } else {
          lines[i] += chunk;
        }

        return lines;
      },
      [new Array(start + 1).join(" ")]
    )
    .join("\n");
}

function removeFirstOccurrences(str, charToRemove, numberOfOccurrences) {
  var n = numberOfOccurrences
  while(--n + 1) {
    let regex = new RegExp(charToRemove)
    str = str.replace(regex, '')
  }
  return str
}

function isAnagram(stringA, stringB) {
    const sanitizeString = function (str) {
        return str.toLowerCase().replace(/[^a-z\d]/g, '').split('').sort().join('');
    }
    return sanitizeString(stringA) == sanitizeString(stringB)
}

function isPalindrome(text) {
    const reversedText = text.toLowerCase().split('').reverse().join('')
    return text === reversedText
}

function Base64URLDecode(base64UrlEncodedValue) {
    let result1, result2
    const newValue = base64UrlEncodedValue.replace("-", "+").replace("_", "/")
    try {
      result1 = window.atob(newValue)
      result2 = decodeURIComponent(escape(window.atob(newValue)))
    } catch (e) {
      throw "Base64URL decode of JWT segment failed"
    }
    return result2
}

function compressArray(original, minCount) {
  var compressed = [];
  var copy = original.slice(0);
  for (var i = 0; i < original.length; i++) {
    var myCount = 0;
    for (var w = 0; w < copy.length; w++) {
      if (original[i] == copy[w]) {
        myCount++;
        delete copy[w];
      }
    }
    if (myCount > 0 && myCount >= minCount) {
      var a = new Object();
      a.value = original[i];
      a.count = myCount;
      compressed.push(a);
    }
  }
  return compressed;
};

function shuffleFisherYates(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function roundDecimal(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function countByteSize(text) {
    var crlf = /(\r?\n|\r)/g;
    var length = text.length,
        nonAscii = length - text.replace(/[\u0100-\uFFFF]/g, '').length,
        lineBreaks = length - text.replace(crlf, '').length; 
    return length + nonAscii + Math.max(0, (lineBreaks - 1));
}

function formatByteSize(size) {
    var level = 0;
    while (size > 1024) {
        size /= 1024;
        level++;
    }
    size = roundDecimal(size, 1);
    if (level === 0 || level === 1) {
        size = Math.round(size);
    }
    level = ['', 'K', 'M', 'G', 'T'][level];
    return size + ' ' + level + 'B';
}

function convertIndentationTabsToSpaces(str, numSpacesPerIndentLevel) {
    let indentationLevel = countCharsAtStart(str, '\t');
    let spaceIndentStr = repeatingChar(' ', numSpacesPerIndentLevel);
    str = str.substring(indentationLevel, str.length);
    str = Array(indentationLevel+1).join(spaceIndentStr) + str;
    return str;
}

function convertIndentationSpacesToSpaces(str, inputNumSpacesPerIndentLevel, outputNumSpacesPerIndentLevel) {
    let spaceIndentStr = repeatingChar(' ', outputNumSpacesPerIndentLevel);
    let numSpacesAtStart = countCharsAtStart(str, ' ');
    let indentationLevel = (numSpacesAtStart - (numSpacesAtStart%inputNumSpacesPerIndentLevel)) / inputNumSpacesPerIndentLevel;
    str = str.substring(numSpacesAtStart, str.length);
    str = Array(indentationLevel+1).join(spaceIndentStr) + str;
    return str;
}

function convertIndentationSpacesToTabs(str, inputNumSpacesPerIndentLevel) {
    let numSpacesAtStart = countCharsAtStart(str, ' ');
    let indentationLevel = (numSpacesAtStart - (numSpacesAtStart%inputNumSpacesPerIndentLevel)) / inputNumSpacesPerIndentLevel;
    str = str.substring(numSpacesAtStart, str.length);
    str = Array(indentationLevel+1).join('\t') + str;
    return str;
}

function repeatingChar(char, numTimes) {
    return Array(numTimes+1).join(char);
}

function countCharsAtStart(str, char) {
    var count = 0;
    var index = 0;
    while (str.charAt(index++) === char) {
        count++;
    }
    return count;
}

function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}

function removeFirstChar(str) {
    return str.substr(1);
}

function removeLastChar(str) {
    return str.substr(0, str.length-1);
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function popupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
    
    return newWindow;
}


function convertToJson(text, delimiter){
    let lines = text.split("\n"),
        result = [];
    let headers = lines[0].split(delimiter);
    for (var i=1;i<lines.length;i++) {
        var obj = {};
	    var currentline=lines[i].split(delimiter);
	    for(var j=0;j<headers.length;j++){
		    obj[headers[j]] = currentline[j];
	    }
	    result.push(obj);
    }
    return JSON.stringify(result);
}

function convertToHtmlTable(text, options) {
    let result = convertToArray(text, options);
    return toHTML(result.rows, options);
}

function convertToArray(sCSV, options) {
    let result = {
            headers: null,
			rows: null
        },
        firstRowAt = 0,
        tds,
        first,
        cols;

	tds = sCSV.split("\x0a");
	first = tds[0].split(options.seperator);
	if (options.hasHeader) {
        result.headers = first;
		result.headers = result.headers.map(function(header) {
		    return header.replace(/\//g, "_");
		});
        firstRowAt = 1;
	} else {
		result.headers = first.map(function(header, i) {
		    return options.headerPrefix + i;
		});
	}
	cols = result.headers.length;
	result.rows = tds.map(function(row, i) {
        return row.split(options.seperator);
    });
    return result;
}

function tag(element, value) {
    return "<" + element + ">" + value + "</" + element + ">";
}

function toHTML(arr, options) {
    let sTable;
    if (options.hasHeader) {
        sTable = "<table class=\"table table-striped\">\n"+indentLevel1()+"<thead>";
    } else {
        sTable = "<table class=\"table table-striped\">";
    }
	arr.map(function(row, i) {
        var sRow = "";
		row.map(function(cell, ii) {
            if (i === 0 && options.hasHeader) {
                sRow += tag('th', cell);
            } else {
                sRow += tag('td', cell);
            }
		});
        if (options.hasHeader) {
            sTable += '\n'+indentLevel2()+tag("tr", sRow) + ((i === 0) ? "\n"+indentLevel1()+"</thead>\n"+indentLevel1()+"<tbody>" : "");
        } else {
            if (i === 0) {
                sTable += '\n'+indentLevel1()+'<tbody>\n'+indentLevel2()+tag("tr", sRow);
            } else {
                sTable += '\n'+indentLevel2()+tag("tr", sRow);
            }
        }
	});
	return sTable + "\n"+indentLevel1()+"</tbody>\n</table>";
}

function indentLevel1() {
    return '    ';
}

function indentLevel2() {
    return '        ';
}

function indentLevel3() {
    return '            ';
}

function moveArrayEntry(array, oldIndex, newIndex) {
    if (newIndex >= array.length) {
        var k = newIndex - array.length;
        while ((k--) + 1) {
            array.push(undefined);
        }
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
};

function getSelectionText() {
    var text = '';
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != 'Control') {
        text = document.selection.createRange().text;
    }
    return text;
}

var encodeJavaScriptString = function f(a, b) {
  return ++b                                 //`b` is a number (including 0) when `replace` calls the function
    ? '\\' + (                               //all escape sequences start with a backslash
      (a = a.charCodeAt()) >> 12             //all characters from U+1000 and above
        ? 'u'                                //must start with `\u`
        : a >> 8                             //all characters from U+0100 to U+0FFF
          ? 'u0'                             //must start with `\u0`
          : 'x'                              //characters from U+007F to U+00FF can start with `\u00` or `\x`
      ) + a.toString(16).toUpperCase()       //add the upper case hex string (it does not contain leading zeros)
    : a.replace(/[^\0-~]/g, f)               //else call the function for all non-ASCII characters (all except U+0000 to U+007E)
}

String.prototype.hexEncode = function(){
    var hex, i;
    var result = '';
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result;
}

String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = '';
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
}

String.prototype.toUnicode = function() {
    var result = '';
    for(var i = 0; i < this.length; i++){
        result += "\\u" + (("000" + this[i].charCodeAt(0).toString(16)).substr(-4)).toUpperCase();
    }
    return result;
};

String.prototype.toHexEscapeSequence = function() {
    var char, hex, prefixed, sliced, i;
    var result = '';
    for (i=0; i<this.length; i++) {
        result += '\\x'+(('000'+this.charCodeAt(i).toString(16)).slice(-2)).toUpperCase();   
    }
    return result;
};


/* 
 * Returns the result the Vigenère encryption on the given text with the given key.
 */
function vigenereCrypt(input, key) {
	var output = "";
	for (var i = 0, j = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (isUppercase(c)) {
			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
			j++;
		} else if (isLowercase(c)) {
			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
		} else {
			output += input.charAt(i);
		}
	}
	return output;
}


/* 
 * Returns an array of numbers, each in the range [0, 26), representing the given key.
 * The key is case-insensitive, and non-letters are ignored.
 * Examples:
 * - filterKey("AAA") = [0, 0, 0].
 * - filterKey("abc") = [0, 1, 2].
 * - filterKey("the $123# EHT") = [19, 7, 4, 4, 7, 19].
 */
function vigenereFilterKey(key) {
	var result = [];
	for (var i = 0; i < key.length; i++) {
		var c = key.charCodeAt(i);
		if (isLetter(c))
			result.push((c - 65) % 32);
	}
	return result;
}


// Tests whether the specified character code is a letter.
function isLetter(c) {
	return isUppercase(c) || isLowercase(c);
}

// Tests whether the specified character code is an uppercase letter.
function isUppercase(c) {
	return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
}

// Tests whether the specified character code is a lowercase letter.
function isLowercase(c) {
	return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
}


// =========================================================
// Clipboard 
// =========================================================

var clipboard = new Clipboard('.btn');

clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});


// =========================================================
// Keyboard shortcuts
// =========================================================

function KeyPress(event) {
    // Ctrl+Y or Cmd+Y
    if ((event.code === 'KeyY' && event.ctrlKey) || (event.code === 'KeyY' && event.metaKey)) {
        event.preventDefault();
        if ( $('#btn-history-redo').prop('disabled') === false ) {
            redo();
        }
        
    }
    // Ctrl+Z or Cmd+Z
    if ((event.code === 'KeyZ' && event.ctrlKey) || (event.code === 'KeyZ' && event.metaKey)) {
        event.preventDefault();
         if ( $('#btn-history-undo').prop('disabled') === false ) {
             undo();
        }
    }
    // Ctrl+H or Cmd+H
    if ((event.code === 'KeyH' && event.ctrlKey) || (event.code === 'KeyH' && event.metaKey)) {
        event.preventDefault();
        if ( $('#btn-history-undo').prop('disabled') === false ) {
            clearHistory();
        }
    }
}
document.onkeydown = KeyPress;

// =========================================================
// json2csv function
// =========================================================

function json2csv(objArray, wrapValues, includeLabels) {
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let line = '';
  if (includeLabels) {
    let head = array[0];
    if (wrapValues) {
      for (let index in array[0]) {
        let value = index + "";
        line += '"' + value.replace(/"/g, '""') + '",';
      }
    } else {
      for (let index in array[0]) {
        line += index + ',';
      }
    }
    line = line.slice(0, -1);
    str += line + '\r\n';
  }

  for (let i = 0; i < array.length; i++) {
    let line = '';
    if (wrapValues) {
      for (let index in array[i]) {
        let value = array[i][index] + "";
        line += '"' + value.replace(/"/g, '""') + '",';
      }
    } else {
      for (let index in array[i]) {
        line += array[i][index] + ',';
      }
    }
    line = line.slice(0, -1);
    str += line + '\r\n';
  }
  return str;
}

// =========================================================
// csv2json function
// =========================================================

function csv2json(csv) {
    let array = CSVToArray(csv);
    let objArray = [];
    for (let i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (let k = 0; k < array[0].length && k < array[i].length; k++) {
            let key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }
    let json = JSON.stringify(objArray);
    let str = json.replace(/},/g, "},\r\n");
    return str;
}

// =========================================================
// CSVToArray function
// =========================================================

function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    let objPattern = new RegExp(("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    let arrData = [[]];
    let arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        let strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            arrData.push([]);
        }
        if (arrMatches[2]) {
            let strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            var strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return arrData;
}

// =========================================================
// Call init()
// =========================================================

init();