'use strict'

const HOST = window.location.hostname
const HREF = window.location.href

const IS_AQUIN = HOST === 'www.aquinads.com'
const IS_ADSPAYU = HOST === 'adspayu.click'
const IS_SERF = HOST === 'serfbux.com'
const IS_ARGON = HOST === 'argonclick.com'
const IS_CHALLENGE = HOST === 'challengebux.com'
const IS_STAR = HOST === 'www.star-clicks.com'
const IS_NEO = HOST === 'www.neobux.com'

let timer
let adsWindow = null
let myPort = browser.runtime.connect({ name: HREF.split('/')[2] });

function clickNumber(num) {
  if (IS_CHALLENGE || IS_ARGON) {
    document.querySelectorAll("frame")[1].contentDocument.querySelectorAll(".serfnum")[num - 1].onclick()
  } else {
    document.querySelectorAll(".serfnum")[num - 1].onclick()
  }
}

myPort.onMessage.addListener(function (message) {
  console.log(message)
  if (message.data != "0") {
    if (timer <= 5) {
      timer = 2
    } else {
      timer -= 5
    }
    setTimeout(() => { clickNumber(message.data) }, timer * 1000)
  } else {
    location.reload()
  }
});

window.addEventListener("message", function (event) {
  timer = event.data.timer
});


function fuckingads() {
  function closeWindowsAds() {
    try {
      success = document.querySelector('.successbox')
      error = document.querySelector('.errorbox')
      if (success) {
        window.close()
      } else if (error) {
        location.reload()
      }
    } catch (e) {
    }
    setTimeout(closeWindowsAds, 1000)
  }
  try {
    document.querySelector('#pgl').removeAttribute('src')
    adloaded = true
    endprogress('')
    closeWindowsAds()
  } catch (error) {
    consele.log(error)
  }
}

function fuckingserf(doc) {
  try {
    document.getElementById('framesite').removeAttribute('src')
    origTime = time
    window.postMessage({ timer: origTime }, "*")
    time = 1
    setTimeout(function () {
      if (origTime <= 5) {
        TTimer = 20
      } else if (origTime <= 10) {
        TTimer = 35
      } else if (origTime <= 15) {
        TTimer = 60
      } else if (origTime <= 20) {
        TTimer = 66
      } else if (origTime <= 30) {
        TTimer = 95
      }
    }, 2000)
  } catch (err) {
  }
}

function argonHack() {
  function closeArgonWindow() {
    const footer = document.getElementsByName('frame_footer')[0].contentDocument
    const success = footer.querySelector('.blocksuccess')
    const err = footer.querySelector('.blockerror')
    const load = footer.querySelector('#blockwait')
    if (success) {
      window.close()
    } else if (err) {
      if (err.textContent == 'ERROR!Not link 24 hours') {
        window.close()
      } else {
        location.reload()
      }
    } else if (load) {
      try {
        if (window.getComputedStyle(load).display == 'none') {
          setTimeout(closeArgonWindow, 1000)
        } else {
          setTimeout(function () {
            location.reload()
          }, 4000)
        }
      } catch (err) {
        setTimeout(closeArgonWindow, 1000)
      }
    } else {
      setTimeout(closeArgonWindow, 1000)
    }
  }

  function hackTimer() {
    if (frame_footer.vtime) {
      try {
        origTime = frame_footer.vtime
        window.postMessage({ timer: origTime }, "*")
        frame_footer.vtime = 1
        setTimeout(function () {
          if (origTime <= 5) {
            frame_footer.tm = 20
          } else if (origTime <= 10) {
            frame_footer.tm = 35
          } else if (origTime <= 15) {
            frame_footer.tm = 60
          } else if (origTime <= 20) {
            frame_footer.tm = 66
          } else if (origTime <= 30) {
            frame_footer.tm = 95
          }
        }, 2000)
      } catch (err) {
      }
    } else {
      setTimeout(hackTimer, 200)
    }
  }

  function customStyleArgon() {
    try {
      const table = frame_footer.document.querySelector('.table_gl')
      const imageDiv = frame_footer.document.querySelector('.clocktable')
      table.style.position = 'absolute'
      table.style.bottom = '50%'
      table.style.height = '500px'
      imageDiv.querySelector('img').style.height = '200px'
      imageDiv.querySelector('img').style.width = '500px'
    } catch (err) {
      setTimeout(customStyleArgon, 500)
    }
  }

  hackTimer()
  closeArgonWindow()
  customStyleArgon()
}

function aquinHack() {
  panel = document.getElementById('UpdatePanel1')
  complete = panel.querySelector('#TableCompleted')
  invalid = panel.querySelector('#TableInvalid')
  if (complete || invalid) {
    window.close()
  }
  setTimeout(aquinHack, 500)
}

function neohack() {
  document.querySelector('iframe').removeAttribute('src')
  document.querySelector('iframe').removeAttribute('sandbox')
  function succesCheck() {
    try {
      const succes = document.querySelector('div.msgDv#o1').style.display == 'none'
      if (!succes) {
        window.close()
      }
      setTimeout(succesCheck, 500)
    } catch (error) {
    }
  }
  succesCheck()
}

function closeWindow() {
  try {
    const success = document.querySelector('.blocksuccess')
    const err = document.querySelector('.blockerror')
    const verify = document.querySelector('#blockverify')
    if (success) {
      window.close()
    } else if (err) {
      if (err.textContent == 'ERROR!Not link 24 hours') {
        window.close()
      } else {
        location.reload()
      }
    } else if ((verify.textContent == '2' && IS_SERF) || (verify.textContent == '' && !IS_SERF)) {
      location.reload()
    }
  } catch (err) { }
  setTimeout(closeWindow, 1000)
}

if (IS_ADSPAYU) {
  if (HREF === 'https://adspayu.click/index.php?view=ads') {
    AutoClick('.ad-block:not(.disabled) #click', 'index.php?view=surfer&t=', 'adsPayU')
  } else {
    executeInPage(fuckingads, false, 'surfbar')
  }
} else if (IS_ARGON || IS_CHALLENGE) {
  if (HREF.endsWith('argonclick.com/viewads')) {
    AutoClick('#show_table .mb-0 a', '/viewads/', 'argon')
  } else if (HREF.endsWith('challengebux.com/viewads')) {
    AutoClick('.card-title.text-center', 'http://challengebux.com/viewads/', 'challenge')
  } else {
    document.getElementsByName('frame_site')[0].removeAttribute('src')
    document.getElementsByTagName('frameset')[0].setAttribute('rows', '10%, 90%')
    executeInPage(argonHack, false, '')
  }
} else if (IS_AQUIN) {
  if (HREF === 'https://www.aquinads.com/DS_ViewAds.aspx') {
    let fuckingAquin = document.querySelectorAll('.advertise_title a')
    function aquinAds(element, index) {
      try {
        if (!element.parentElement.parentElement.parentElement.style.opacity) {
          if (typeof adsWindow === 'undefined' || adsWindow == null) {
            adsWindow = window.open(element.getAttribute('href'), 'aquin')
            function closecheck() {
              try {
                if (!adsWindow.closed) {
                  setTimeout(closecheck, 1000)
                  return
                }
              } catch (error) {
              }
              adsWindow = null
              setTimeout(() => {
                fuckingAquin = document.querySelectorAll('.advertise_title a')
                fuckingAquin.forEach(aquinAds)
              }, 3000)
            }
            closecheck()
          }
        }
      } catch (error) {
      }
    }
    fuckingAquin.forEach(aquinAds)
  } else {
    executeInPage(aquinHack, false, '')
    try {
      document.querySelector('iframe').removeAttribute('src')
    } catch (error) {

    }
  }
} else if (IS_STAR) {
  fuckingStar()
} else if (IS_NEO) {
  if (HREF.startsWith('https://www.neobux.com/m/v/?vl=')) {
    autoClickNeo()
  } else {
    neohack()
  }
} else {
  if (HREF.endsWith('serfbux.com/account/serfing')) {
    AutoClick('.serf-title', 'http://serfbux.com/account/serfing/view/', 'SerfBux')
  } else if (HREF.endsWith('vuexybux.com/viewads')) {
    AutoClick('.item-name a', 'http://vuexybux.com/viewads/', 'vuexy')
  } else if (HREF.endsWith('imdbux.com/viewads')) {
    AutoClick('.notranslate.card-title.mb-0 a', 'http://imdbux.com/viewads/', 'imdb')
  } else if (HREF.endsWith("pidbux.com/viewads")) {
    AutoClick('.notranslate.list-group-item a', 'http://pidbux.com/viewads/', 'pidbux')
  } else {
    executeInPage(fuckingserf, false, 'body')
    customStyle(document.getElementsByClassName('table_gl')[0], document.querySelector('#blockverify'))
    setTimeout(closeWindow, 4000)
  }
}

document.body.style.border = '10px solid green'

window.eval('document.hasFocus = function () { return true }')

function customStyle(table, imageDiv) {
  try {
    table.style.position = 'absolute'
    table.style.bottom = '50%'
    table.style.height = '500px'
    table.style.align = 'center'
    const img = imageDiv.querySelector('img')
    img.style.height = '200px'
    img.style.width = '500px'
  } catch (err) {
    setTimeout(customStyle, 500, table, imageDiv)
  }
}

function fuckingStar() {
  try {
    const ads = document.querySelector('#BasicModulem9_11')
    if (ads) {
      const con = ads.getAttribute('onclick')
      const id = con.substring(con.search('iq=') + 3, con.search("','mywindow"))
      setTimeout(location.reload, 2500)
      try {
        window.open('adrouter.aspx?iq=' + id, 'mywindow')
      } catch (error) {
        return
      }
    } else {
      window.open('', 'mywindow').close()
    }
  } catch (error) {
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function autoClickNeo() {
  const availableAds = document.querySelector('.sbV')

  if (availableAds) {
    const label = availableAds.parentNode.parentNode
    label.onclick()
    await sleep(2000)
    const adsTitle = label.querySelector('.redDTA')
    if (adsTitle) {
      const id = adsTitle.getAttribute('href')
      if (typeof adsWindow !== 'undefined' || adsWindow == null) {
        var adsWindow = window.open(id, 'neo')
        adsTitle.parentNode.parentNode.parentNode.remove()
      }
      function closeAdsCheck() {
        try {
          if (!adsWindow.closed) {
            setTimeout(closeAdsCheck, 1000)
            return
          }
        } catch (error) {
        }
        autoClickNeo()
      }
      closeAdsCheck()
    }
  }
}

function AutoClick(title, url, targetWindow) {
  try {
    const adsTitle = document.querySelector(title)
    if (adsTitle) {
      const fun = adsTitle.getAttribute('onclick')
      if (IS_ADSPAYU) {
        var id = fun.substring(fun.search('&t=') + 3, fun.search("','_blank"))
      } else {
        var id = fun.match(/\d+/)[0]
      }
      if (typeof adsWindow !== 'undefined' || adsWindow == null) {
        var adsWindow = window.open(url + id, targetWindow)
        adsTitle.parentNode.parentNode.parentNode.remove()
      }
      function closeAdsCheck() {
        try {
          if (!adsWindow.closed) {
            setTimeout(closeAdsCheck, 1000)
            return
          }
        } catch (error) {
        }
        AutoClick(title, url, targetWindow)
      }
      closeAdsCheck()
    }
  } catch (error) {
  }
}

function executeInPage (functionToRunInPage, leaveInPage, id) {
  function convertToText (args) {
    let asText = ''
    let level = 0
    function lineSeparator (adj, isntLast) {
      level += adj - ((typeof isntLast === 'undefined' || isntLast) ? 0 : 1)
      asText += (isntLast ? ',' : '') + '\n' + (new Array(level * 2 + 1)).join('')
    }
    function recurseObject (obj) {
      if (Array.isArray(obj)) {
        asText += '['
        lineSeparator(1)
        obj.forEach(function (value, index, array) {
          recurseObject(value)
          lineSeparator(0, index !== array.length - 1)
        })
        asText += ']'
      } else if (obj === null) {
        asText += 'null'
      } else if (obj === undefined) {
        asText += 'undefined'
      } else if (Number.isNaN(obj)) {
        asText += 'Number.NaN'
      } else if (obj === 1 / 0) {
        asText += '1/0'
      } else if (obj === 1 / -0) {
        asText += '1/-0'
      } else if (obj instanceof RegExp || typeof obj === 'function') {
        asText += obj.toString()
      } else if (obj instanceof Date) {
        asText += 'new Date("' + obj.toJSON() + '")'
      } else if (typeof obj === 'object') {
        asText += '{'
        lineSeparator(1)
        Object.keys(obj).forEach(function (prop, index, array) {
          asText += JSON.stringify(prop) + ': '
          recurseObject(obj[prop])
          lineSeparator(0, index !== array.length - 1)
        })
        asText += '}'
      } else if (['boolean', 'number', 'string'].indexOf(typeof obj) > -1) {
        asText += JSON.stringify(obj)
      } else {
        console.log('Didn\'t handle: typeof obj:', typeof obj, '::  obj:', obj)
      }
    }
    recurseObject(args)
    return asText
  }
  const newScript = document.createElement('script')
  if (typeof id === 'string' && id) {
    newScript.id = id
  }
  const args = []
  for (let index = 3; index < arguments.length; index++) {
    args.push(arguments[index])
  }
  newScript.textContent = '(' + functionToRunInPage.toString() + ').apply(null,' +
    convertToText(args) + ');';
  (document.head || document.documentElement).appendChild(newScript)
  if (!leaveInPage) {
    document.head.removeChild(newScript)
  }
  return newScript
}
