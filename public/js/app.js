let currentLead = 0

function nextLead(){

let rows = document.querySelectorAll("#leads tr")

if(rows.length === 0) return

let phone = rows[currentLead].children[1].innerText

window.location="tel:"+phone

currentLead++

if(currentLead>=rows.length){
currentLead=0
}

}


function countCall(employee){

let calls = JSON.parse(localStorage.getItem("calls") || "{}")

if(!calls[employee]){
calls[employee] = 0
}

calls[employee]++

localStorage.setItem("calls", JSON.stringify(calls))

}
