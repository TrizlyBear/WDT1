try {document.getElementById("submitsignup").addEventListener("click", (e)=>verifySignUp(e))}catch (e){}
const passwordcharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\" !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~\""
const namecharacters = "abcdefghijklmnopqrstuvwxyz "
function verifySignUp(e) {
    let verified =
    verify(document.getElementById("fullname"),e,(verifyName(document.getElementById("fullname").value)&&requiredCheck(document.getElementById("fullname"))))
    +verify(document.getElementById("username"),e,(requiredCheck(document.getElementById("username"))&&usernameVerification(document.getElementById("username").value)))
    +verify(document.getElementById("email"),e,(requiredCheck(document.getElementById("email"))&&checkEmail(document.getElementById("email").value)))
    +verify(document.getElementById("aboutyou"),e,true)
    +verify(document.getElementById("address"),e,true)
    +verify(document.getElementById("country"),e,requiredCheck(document.getElementById("country")))
    +verify(document.getElementById("language"),e,requiredCheck(document.getElementById("language")))
    +verify(document.getElementById("zipcode"),e,(requiredCheck(document.getElementById("zipcode"))&&(document.getElementById("country").value.toLowerCase() != "netherlands" ||zipcodeVerification(document.getElementById("zipcode").value))))
    +verify(document.getElementById("password"),e,(requiredCheck(document.getElementById("password"))&&verifyPassword(document.getElementById("password").value)))

    let message = ""
    if (verified == 0) {
        document.querySelectorAll("input, textarea, select").forEach((q) => {
            message += q.value + "; "
        })
        alert(message)
    }
    e.preventDefault()
}

try {document.getElementById("submit").addEventListener("click", (e)=>verifyLogIn(e))}catch (e){}
function verifyLogIn(e) {
    let email = document.getElementById("email")
    let password = document.getElementById("password")

    if(!requiredCheck(email)||!checkEmail(email.value)){email.classList.add("invalid");e.preventDefault()} else {email.classList.add("valid");password.classList.remove("invalid")}
    if(!requiredCheck(password)){password.classList.add("invalid");e.preventDefault()} else {password.classList.add("valid");password.classList.remove("invalid")}

}
try {document.getElementById("submitgoal").addEventListener("click", (e)=>verifyNewGoal(e))}catch (e){}
function verifyNewGoal(e) {
    ["name", "description","date","typeSelect","descriptor","monetaryinput","numericinput","booleaninput"].forEach(id => {
        if(!requiredCheck(document.getElementById(id))) {
            document.getElementById(id).classList.add("invalid")
            e.preventDefault()
        } else {
            document.getElementById(id).classList.remove("invalid")
            document.getElementById(id).classList.add("valid")
        }
    })
    e.preventDefault()
}

function checkEmail(mail) {
    let combo = mail.split("@")
    if (combo.length != 2) return false;
    let domain = combo[1].split(".")
    domain = domain.filter(c=> c!="")
    console.log(domain)
    if (domain.length < 2) {return false}
    [...combo.concat(domain).join("")].forEach(c=>{if(c>'z'||c<'a')return false})
    return true
}

function requiredCheck(e) {
    return e.value != "";
}

function verifyPassword(password) {
    if (password.length < 12) return false;
    [...password].forEach(c=>{if (![...passwordcharacters].includes(c)){return false}})
    return true
}
function verifyName(name) {
    name = name.toLowerCase();
    [...name].forEach(c=>{if (![...namecharacters].includes(c)){return false}})
    return true
}

function verify(q,e,v) {
    if (v) {
        q.classList.add("valid")
        q.classList.remove("invalid")
        return false
    } else {
        q.classList.add("invalid")
        q.classList.remove("valid")
        e.preventDefault()
        return true
    }
}

function usernameVerification(username) {
    let split = [...username]
    if (split.length < 5 || split.length > 12) return false;
    if (split[0]<"A" || split[0] > "Z") return false;
    if (split[-1]<"0" || split[-1] > "9") return false;
    return true
}

function zipcodeVerification(zipcode) {
    const split = [...zipcode]
    if (zipcode.length != 6) return false
    for (let i = 0; i < 4; i++) {
        if (split[i] < "0" || split[i] > "9") return false
    }
    for (let i = 4; i < 6; i++) {
        if (split[i] < "A" || split[i] > "Z") return false
    }
    return true
}