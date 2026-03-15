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

function getEmployee(){

let emp = localStorage.getItem("employee")

if(!emp){
emp="emp1"
}

return emp

}

function getStats(){

let calls = JSON.parse(localStorage.getItem("calls")) || {}

let emp = getEmployee()

return {
calls: calls[emp] || 0
}

}

function addCommission(employee){

let data = JSON.parse(localStorage.getItem("commission")) || {}

if(!data[employee]){
data[employee] = 0
}

data[employee] += 500

localStorage.setItem("commission", JSON.stringify(data))

}

function updateStatus(status, employee){

let stats = JSON.parse(localStorage.getItem("stats")) || {
interested:0,
audit:0,
sales:0
}

if(status=="Interested"){
stats.interested++
}

if(status=="Free Audit"){
stats.audit++
}

if(status=="Sales Closed"){
stats.sales++
addCommission(employee)
}

localStorage.setItem("stats", JSON.stringify(stats))

}
