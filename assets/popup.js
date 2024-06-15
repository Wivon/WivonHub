let POPUP_DISPLAYED = false
let popup = document.querySelector('.popup')
let popupTitle = document.querySelector('.popup h2')
let popupText = document.querySelector('.popup p')
let popupErrCode = document.querySelector('.popup span')
let popupAction = document.querySelector('.popup button')

function openPopup(title, text="Oops! It looks like an error.", code=null, action="OK") {
    // display popup
    POPUP_DISPLAYED = true
    popup.style.display = "flex"
    
    // change content
    popupTitle.textContent = title
    popupText.textContent = text

    if (code != null) {
        popupErrCode.style.display = "block"
        popupErrCode.textContent = code
    } else {
        popupErrCode.style.display = "none"
        popupErrCode.textContent = ""
    }

    if (action == popupAction.textContent) return
    popupAction.textContent = action
}

function closePopup () {
    // save old transform property
    const OLD_TRANSFORM = popup.style.transform

    // animate for mobile & desktop
    if (document.documentElement.clientWidth >= 870) {
        popup.style.transform = 'translate(-50%, -50%) scale(.9)'
        popup.style.opacity = '0'
    } else {
        popup.style.transform = 'translate(0, 100%)'
    }

    POPUP_DISPLAYED = false

    // restore old state and set display to none
    setTimeout(() => {
        popup.style.transform = OLD_TRANSFORM
        popup.style.opacity = '1'

        popup.style.display = 'none'
    }, 250)
}