function goTo(url, newTab = false, animate = true, invert = false) {
    if (url=="TOP") {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          return
    }

    if (animate == false) {
        if (newTab == true) {
            window.open(url)
        } else {
            window.location.href = url
        }
    } else {
        if (invert == true) {
            document.body.style.transform = "translateX(2.5%)"
        } else {
            document.body.style.transform = "translateX(-2.5%)"
        }
        document.body.style.opacity = "0"
        document.body.style.overflow = "hidden"
        setTimeout(() => {
            if (newTab == true) {
                window.open(url)
            } else {
                window.location.href = url
            }
        }, 250)
        setTimeout(() => {
            document.body.style.transform = "translateX(0)"
            document.body.style.opacity = "1"
            document.body.style.overflow = "auto"
        }, 1500)

        console.log("redirecting to " + url + " using Wivon Hub animations framework.")
    }
}
