let ports = [];

function connected(port) {
  ports[port.sender.tab.id] = port
  port.onDisconnect.addListener((p) => {
    delete ports[port.sender.tab.id]
  });
}

browser.runtime.onConnect.addListener(connected);

function solveCaptcha(message) {
  var adsfuckerPage = ports[message.tabId]
  let requestURL

  if (adsfuckerPage.name === "argonclick.com")
    requestURL = 'http://127.0.0.1:5000/solver/argonclick'
  else    
    requestURL = 'http://127.0.0.1:5000/solve'

  const formDataToUpload = new FormData()
  formDataToUpload.append('file', message.data)

  const driveRequest = new Request(requestURL, {
    method: 'POST',
    keepalive: true,
    body: formDataToUpload
  })

  fetch(driveRequest, { mode: 'cors' }).then((response) => {
    response.json().then((json) => {
      let msg
      if (json.data == "0") {
        msg = `${adsfuckerPage.name} \n preiction error: ${json.predict}`
        browser.notifications.create({
          type: 'basic',
          iconUrl: browser.extension.getURL('logo_48.png'),
          title: 'Ads Fucker Captcha Solver',
          message: msg
        })
      }
      adsfuckerPage.postMessage({ predict: json.predict, data: json.data })
    })
  })
}

function solver(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId)

  let data = [];
  filter.ondata = event => {
    data.push(event.data);
  };

  filter.onstop = event => {

    for (let buffer of data) {
      filter.write(buffer);
    }

    var blob = new Blob(data, { type: "image/png" });
    solveCaptcha({ data: blob, tabId: details.tabId })
    filter.disconnect();
  }
}

function saveImage(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId)

  let data = [];
  filter.ondata = event => {
    data.push(event.data);
  };

  filter.onstop = event => {

    for (let buffer of data) {
      filter.write(buffer);
    }

    var blob = new Blob(data, { type: "image/png" });

    const requestURL = 'http://127.0.0.1:5000/save'

    const formDataToUpload = new FormData()
    formDataToUpload.append('file', blob)

    const driveRequest = new Request(requestURL, {
      method: 'POST',
      body: formDataToUpload
    })

    fetch(driveRequest, { mode: 'cors' })
    filter.disconnect();
  }
}

function requestBlocker(requestDetails) {
  var adsfuckerPage = ports[requestDetails.tabId]
  if (adsfuckerPage != undefined) {
    if (!requestDetails.url.includes(adsfuckerPage.name)) {
      console.log(`cancel the request from ${adsfuckerPage.name} to ${requestDetails.url}`)
      return { cancel: true }
    }
  }
}

browser.webRequest.onBeforeRequest.addListener(
  solver,
  {
    urls: [
      "*://vuexybux.com/viewads/captcha",
      "*://challengebux.com/viewads/captcha",
      "*://imdbux.com/viewads/*",
      "*://pidbux.com/viewads/*",
      "*://argonclick.com/viewads/captcha"

    ],
    types: ["image"]
  },
  ["blocking"]
)

browser.webRequest.onBeforeRequest.addListener(
  requestBlocker,
  {
    urls: ["<all_urls>"]
  },
  ["blocking"]
)