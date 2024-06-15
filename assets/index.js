let bubbles = document.querySelectorAll(".bubble")
const parentElement = bubbles[0].parentElement

function getRandCoordinates(el) {
    let rect = el.getBoundingClientRect(); // Récupérer les dimensions et la position de l'élément
    let xMax = rect.width; // Largeur de l'élément
    let yMax = rect.height; // Hauteur de l'élément

    // Générer des coordonnées aléatoires dans les limites de l'élément
    let x = ( Math.random() * xMax * 1.3 ) - (xMax * 0.4);
    let y = ( Math.random() * yMax * 1.3 ) - (xMax * 0.4);

    return { x: x, y: y };
}

function animateBubble(element) {
    // Récupérer les coordonnées actuelles de l'élément
    var style = window.getComputedStyle(element);
    var matrix = new WebKitCSSMatrix(style.transform);
    let xStart = matrix.m41;
    let yStart = matrix.m42;

    // Générer des coordonnées aléatoires pour l'élément
    let newCoordinates = getRandCoordinates(parentElement);
    let xEnd = newCoordinates.x;
    let yEnd = newCoordinates.y;

    // Créer l'objet de configuration de l'animation
    let animationOptions = {
        duration: 3000, // Durée de l'animation en millisecondes
        iterations: 1, // Nombre d'itérations de l'animation
        easing: 'ease-in-out', // Type d'animation
        fill: "forwards" // filling properties
    };

    // Définir les propriétés à animer
    let keyframes = [
        { transform: `translate(${xStart}px, ${yStart}px)` }, // Position de départ
        { transform: `translate(${xEnd}px, ${yEnd}px)` } // Position d'arrivée
    ];

    // Lancer l'animation
    element.animate(keyframes, animationOptions);
}

function renderBubbles() {
    bubbles.forEach((b) => {
        animateBubble(b);
    })

    setTimeout(() => { renderBubbles(); }, 3000); //
}

renderBubbles();

// organic reactive animations

function getCursorPositionRelativeToCenter(element, event) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;
    return [offsetX, offsetY];
}

document.onmousemove = (event) => {
    document.querySelectorAll(".floater").forEach(el => {
        const offsets = getCursorPositionRelativeToCenter(el, event);
        const translations = offsets.map(o => o * 0.1)

        const rect = el.getBoundingClientRect();
        const ORGANIC_RATIO = 1.7
        const organicWidth = rect.width / ORGANIC_RATIO
        const organicHeight = rect.height / ORGANIC_RATIO

        if ((offsets[0] < organicWidth && offsets[0] > -organicWidth) && (offsets[1] < organicHeight && offsets[1] > -organicHeight)) {
            el.style.transform = `translate(${translations[0]}px, ${translations[1]}px)`
        } else {
            el.style.transform = ""
        }
    })

    document.querySelectorAll(".float-inside").forEach(parent => {
        Object.values(parent.children).forEach(child => {
            const offsets = getCursorPositionRelativeToCenter(child, event);
            const translations = offsets.map(o =>  o * 0.05)

            const rect = parent.getBoundingClientRect();
            const ORGANIC_RATIO = 2
            const organicWidth = rect.width / ORGANIC_RATIO
            const organicHeight = rect.height / ORGANIC_RATIO

            if ((offsets[1] < organicHeight && offsets[1] > -organicHeight) && (offsets[0] < organicWidth && offsets[0] > -organicWidth)) {
                child.style.transform = `translate(${translations[0]}px, ${translations[1]}px)`
            } else {
                child.style.transform = ""
            }
        })
    })
}

// sticky nav
// nav
const nav = document.querySelector('nav')
// const themeSwitcher = document.querySelector('.themeSwitcher')

window.addEventListener('scroll', () => {
    updateScrollElements()
})

function updateScrollElements() {
    nav.classList.toggle('sticky', window.scrollY > 100)

    // calculate top and bottom blockers for project dynamic preview
    let topBlockerRect = document.querySelector("#links img").getBoundingClientRect()
    const ProjectDynPrevTopBlocker = topBlockerRect.top + window.scrollY

    let bottomBlockerRect = document.querySelector(".sticker#custominer").getBoundingClientRect()
    const ProjectDynPrevBottomBlocker = bottomBlockerRect.top + window.scrollY

    if (window.scrollY > ProjectDynPrevBottomBlocker) {
        ProjectsDynPrev.hide()
    }

    if (window.scrollY < ProjectDynPrevTopBlocker) {
        ProjectsDynPrev.hide()
    }
}

function previewProject() {

}

// url parameters, hashes...
const urlParams = new URLSearchParams(window.location.search);

// handle errors
if (urlParams.get('err') != null) {
    if (urlParams.get('err') == "404") {
        openPopup("Error!", "I didn't find what you were looking for 🫡", urlParams.get('err'), "damn it!")
    } else if (urlParams.get('err') == "500") {
        openPopup("Error!", "Internal Server Error, try again later.", urlParams.get('err'), "OK")
    } else if (urlParams.get('err') == "503") {
        openPopup("Error!", "Service Unavailable 🤦‍♂️", urlParams.get('err'), "OK")
    } else {
        openPopup("Error!", "It's an error. Damn it!", urlParams.get('err'), "OK")
    }

    // remove URL data
    window.history.replaceState({}, document.title, "/" + "")
}

// PROJECTS MANAGEMENT & DOM RENDERING + PROJECTS DATA

const PROJECTS_DATA = {
    "mindtunes": {
        "title": "MindTunes",
        "text": "MindTunes is an AI soundscape generator that helps you to work, sleep and meditate.",
        "links": {
            "View": "https://wivonhub.com/projects/mindtunes/index.html"
        }
    },
    "windowsweb": {
        "title": "Windows Web",
        "text": "I coded the desktop experience of Windows 10 and Windows 11 with basic web languages (CSS + Javascript).",
        "links": {
            "Windows 10": "https://wivonhub.com/projects/online-windows/index.html",
            "Windows 11": "https://wivon.github.io/Windows11-web/"
        }
    },
    "ecom": {
        "title": "E-commerce Website",
        "text": "I own an e-commerce brand, my main focus in life currently is to grow this brand. I started e-commerce in december 2023 with Yomi Denzel's \"Ecom Pro\" course.",
        "links": {
            "Contact": "mailto:brousselilian6@gmail.com"
        }
    },
    "eightbee": {
        "title": "EIGHTBEE",
        "text": "EIGHTBEE is a 2D survival and adventure game made with my friends, it supports multiplayer but it is not finished yet (if you're interested to work with us, contact me)",
        "links": {
            "Contact": "mailto:brousselilian6@gmail.com",
            "Discord Server": "https://discord.gg/p74gqTX"
        }
    },
    "custominer": {
        "title": "CustoMiner",
        "text": "CustoMiner is a Windows / Mac app that you can use to add mods, ressource packs, shaders and more to your minecraft installation easily and automatically. This project isn't fnished and if you want to help, you're welcome!",
        "links": {
            "View": "https://wivon.github.io/CustoMiner-WEB/#!/home",
            "Contact": "mailto:brousselilian6@gmail.com"
        }
    },
    "emc2": {
        "title": "EMC2 Design System",
        "text": "EMC2 personal branding. Geometric and minimalist logo, combining letters and shapes.",
        "images": ["./assets/cards/Marble/wivondesign.png"],
        "links": {
            "Contact": "mailto:brousselilian6@gmail.com"
        }
    },"wivonhub": {
        "title": "Wivon Hub",
        "text": "The website you’re in. Matching modern design trends and my personal tastes. Join my discord server to start the conversation with me and my friends.",
        "images": ["./assets/cards/Marble/wivondesign.png"],
        "links": {
            "Contact": "mailto:brousselilian6@gmail.com",
            "Discord Server": "https://discord.gg/p74gqTX"
        }
    }
}

class DynamicPreview {
    constructor(element, nav) {
        this.el = element
        this.nav = nav
    }

    loadProject(projectData) {
        // update content
        this.setTitle(projectData.title)
        this.setText(projectData.text)
        this.renderButtons(projectData.links)

        // show Dynamic Preview
        this.showUp()
    }

    showUp() {
        this.nav.classList.add("expanded")
    }

    hide() {
        this.nav.classList.remove("expanded")
    }

    setTitle(text) {
        this.el.querySelector("h2").innerHTML = text
    }

    setText(text) {
        this.el.querySelector("p").innerHTML = text
    } 

    renderButtons(links) {
        let buttonDOMArray = []
        let buttonsContainer = this.el.querySelector(".links-container")

        // clear previous content
        buttonsContainer.innerHTML = ""

        // create buttons
        Object.keys(links).forEach(btnID => {
            let newEl = document.createElement("button")
            newEl.innerHTML = btnID
            newEl.setAttribute("onclick", `goTo("${links[btnID]}")`)
            buttonDOMArray.push(newEl)
        })

        //add close button
        let closeBtn = document.createElement("button")
        closeBtn.innerHTML = "X"
        closeBtn.classList.add("mini")
        closeBtn.setAttribute("onclick", "closeProjPrev()")
        buttonDOMArray.push(closeBtn)

        // add buttons to dom
        buttonDOMArray.forEach(button => {
            buttonsContainer.appendChild(button)
        })
    }
}

let ProjectsDynPrev = new DynamicPreview(document.querySelector("nav .dynamic-preview"), document.querySelector("nav"))

function previewProject(id) {

    const data  = PROJECTS_DATA[id];
    ProjectsDynPrev.loadProject(data)
} 

function closeProjPrev() {
    ProjectsDynPrev.hide()
}