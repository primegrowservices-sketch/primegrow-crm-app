let leads = [

{name:"Rahul Sharma",phone:"9810241778"},
{name:"Pooja Verma",phone:"9315873877"},
{name:"Amit Kumar",phone:"9560826797"},
{name:"Neha Singh",phone:"8130990799"}

]

let index = 0

function nextLead(){

index++

if(index >= leads.length){
index = 0
}

let lead = leads[index]

document.getElementById("leadName").innerText = lead.name
document.getElementById("leadPhone").innerText = lead.phone

}
