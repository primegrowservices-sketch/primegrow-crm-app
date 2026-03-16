let leads = [
"8130990799",
"9560826797",
"9315873877",
"9810241778",
"9899001122"
]

let currentLead = 0

function updateCalls(){

let calls = localStorage.getItem("totalCalls") || 0

calls++

localStorage.setItem("totalCalls", calls)

}

function startCalling(){

let number = leads[currentLead]

updateCalls()

window.location.href = "tel:" + number

}

function nextLead(){

currentLead++

if(currentLead >= leads.length){

alert("All leads completed")

return

}

let number = leads[currentLead]

updateCalls()

window.location.href = "tel:" + number

}
