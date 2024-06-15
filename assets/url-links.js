let URL_LINKS = []

window.onload = () => {
    fetchURL()
}

async function fetchURL() {
    try {
        await fetch('./linked-url.json').then(response => {
            response.json().then(res => {
                URL_LINKS = res

                Array.from(URL_LINKS).forEach(link => {
                    if (window.location.search == link.key) {
                        goTo(link.url)
                    }
                });
            })
        })
        console.log('links loaded successfully', URL_LINKS)
    } catch (err) {
        console.log(err)
    }
}