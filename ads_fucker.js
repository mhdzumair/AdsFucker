'use strict'

const HOST = window.location.hostname
const HREF = window.location.href

const IS_AQUIN = HOST === 'www.aquinads.com'
const IS_ADSPAYU = HOST === 'adspayu.click'
let adsWindow = null

function aquinClose () {
  const panel = document.getElementById('UpdatePanel1')
  const complete = panel.querySelector('#TableCompleted')
  const invalid = panel.querySelector('#TableInvalid')
  if (complete || invalid) {
    window.close()
  }
  setTimeout(aquinClose, 500)
}

function aquinAutoClick () {
  let fuckingAquin = document.querySelectorAll('.advertise_title a')
  function aquinAds (element) {
    try {
      if (!element.parentElement.parentElement.parentElement.style.opacity) {
        if (typeof adsWindow === 'undefined' || adsWindow == null) {
          adsWindow = window.open(element.getAttribute('href'), 'aquin')
          function closecheck () {
            try {
              if (!adsWindow.closed) {
                setTimeout(closecheck, 1000)
                return
              }
            } catch { }
            adsWindow = null
            setTimeout(() => {
              fuckingAquin = document.querySelectorAll('.advertise_title a')
              fuckingAquin.forEach(aquinAds)
            }, 3500)
          }
          closecheck()
        }
      }
    } catch { }
  }
  fuckingAquin.forEach(aquinAds)
}

if (IS_AQUIN) {
  if (HREF.endsWith('DS_ViewAds.aspx')) {
    aquinAutoClick()
  } else {
    aquinClose()
    try {
      document.querySelector('iframe').removeAttribute('src')
    } catch { }
  }
} else if (IS_ADSPAYU) {
  if (HREF.endsWith('?view=ads')) {
    AutoClick('.ad-block:not(.disabled) #click', 'index.php?view=surfer&t=', 'adsPayU')
  } else {
    executeInPage(fuckingadspayu, false, 'surfbar')
    adspayuClose()
  }
}

document.body.style.border = '10px solid green'

function changeFocus () {
  document.hasFocus = function () { return true }
}

executeInPage(changeFocus, false, '')

function AutoClick (title, url, targetWindow) {
  try {
    const adsTitle = document.querySelector(title)
    if (adsTitle) {
      const fun = adsTitle.getAttribute('onclick')
      const id = fun.substring(fun.search('&t=') + 3, fun.search("','_blank"))
      if (typeof adsWindow !== 'undefined' || adsWindow == null) {
        adsWindow = window.open(url + id, targetWindow)
        adsTitle.parentNode.parentNode.parentNode.remove()
      }
      function closeAdsCheck () {
        try {
          if (!adsWindow.closed) {
            setTimeout(closeAdsCheck, 1000)
            return
          }
        } catch {
        }
        AutoClick(title, url, targetWindow)
      }
      closeAdsCheck()
    }
  } catch (error) {
  }
}

function adspayuClose () {
  try {
    const success = document.querySelector('.successbox')
    const error = document.querySelector('.errorbox')
    if (success) {
      window.close()
    } else if (error) {
      location.reload()
    }
  } catch { }
  setTimeout(adspayuClose, 500)
}

function fuckingadspayu () {
  try {
    document.querySelector('#pgl').removeAttribute('src')
    adloaded = true
    endprogress('')
  } catch {
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
