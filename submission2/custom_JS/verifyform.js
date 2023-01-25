let submit = document.getElementById("submit")
submit.addEventListener("click", (e) => {
    let all = true;
    document.querySelectorAll("input, textarea").forEach((q) => {
        q.classList.remove("invalid")
        void q.offsetWidth
        if (!q.checkValidity()) {

            all = false;
            q.classList.add("invalid")
        } else {
            q.classList.add("valid")
        }
    })
    if (!all) {e.preventDefault()} else {
        let message = ""
        document.querySelectorAll("input, textarea").forEach((q) => {message+=q.value+"; "})
        alert(message)
        // Just because we don't need to redirect
        e.preventDefault()
    }
})