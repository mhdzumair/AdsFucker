// let myWindowId

const contentBox = document.querySelector('#content')

// const tab = browser.tabs.query({ currentWindow: true, active: true })
browser.windows.getCurrent().then((windowInfo) => {
  browser.tabs.query({ windowId: windowInfo.id, active: true })
    .then((tabs) => {
      contentBox.textContent = tabs[0].url.split('/')[2]
    })
  // document.querySelector('#fuck').innerHTML = `Capturing ${Date.now()}`
  // try {
  //   const capturing = browser.tabs.captureTab(windowInfo.id)
  //   capturing.then(function (imageUri) {
  //     contentBox.textContent = imageUri
  //   })
  // } catch (error) {
  //   document.querySelector('#fuck').innerHTML = error
  // }
})

/*
Make the content box editable as soon as the user mouses over the sidebar.
*/
// window.addEventListener('mouseover', () => {
//   contentBox.setAttribute('contenteditable', true)
// })

/*
When the user mouses out, save the current contents of the box.
*/
// window.addEventListener('mouseout', () => {
//   contentBox.setAttribute('contenteditable', false)
//   browser.tabs.query({ windowId: myWindowId, active: true }).then((tabs) => {
//     const contentToStore = {}
//     contentToStore[tabs[0].url] = contentBox.textContent
//     browser.storage.local.set(contentToStore)
//   })
// })

/*
Update the sidebar's content.

1) Get the active tab in this sidebar's window.
2) Get its stored content.
3) Put it in the content box.
*/
// function updateContent () {
//   contentBox.textContent = window.location.hostname
//   // browser.tabs.query({ windowId: myWindowId, active: true })
//   //   .then((tabs) => {
//   //     return browser.storage.local.get(tabs[0].url)
//   //   })
//   //   .then((storedInfo) => {
//   //     contentBox.textContent = window.location.hostname
//   //     // contentBox.textContent = storedInfo[Object.keys(storedInfo)[0]]
//   //   })
// }

// updateContent()
