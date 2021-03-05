'use strict'

const HOST = window.location.hostname
const HREF = window.location.href

const IS_AQUIN = HOST === 'www.aquinads.com'
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
}

document.body.style.border = '10px solid green'
