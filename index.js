const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const multer = require('multer')
const csv = require('csv-parser')

const upload = multer({ dest: 'uploads/' })

app.use(express.json())
app.use(express.static('public'))

const DATA_FILE = 'leads.json'

if (!fs.existsSync(DATA_FILE)) {
fs.writeFileSync(DATA_FILE, JSON.stringify({ leads: [] }))
}

app.post('/lead', (req, res) => {

let employees = ["emp1","emp2"]



const lead = req.body
let data = JSON.parse(fs.readFileSync(DATA_FILE))
let index = data.leads.length % employees.length
lead.employee = employees[index]
data.leads.push(lead)
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
console.log("New Lead:", lead)
res.json({ status: "saved" })
})
0

app.get('/leads', (req, res) => {
let data = JSON.parse(fs.readFileSync(DATA_FILE))
res.json(data.leads)

})

app.post('/delete', (req, res) => {

const { phone } = req.body

let data = JSON.parse(fs.readFileSync(DATA_FILE))

data.leads = data.leads.filter(l => l.phone !== phone)

fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))

res.json({status:"deleted"})

})

app.post('/status', (req, res) => {

const {phone,status,employee} = req.body

let data = JSON.parse(fs.readFileSync(DATA_FILE))

data.leads.forEach(l=>{
if(l.phone==phone){
l.status=status
}
})

fs.writeFileSync(DATA_FILE,JSON.stringify(data,null,2))


updateCommission(employee,status)

res.json({status:"updated"})

})

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public/index.html'))
})

function updateCommission(employee,status){

let data = JSON.parse(fs.readFileSync("commission.json"))

let emp = data.employees.find(e=>e.name===employee)

if(!emp) return

if(status==="Interested"){
emp.interested +=1
emp.commission +=10
}

if(status==="Free Audit"){
emp.audit +=1
emp.commission +=50
}

if(status==="Sale Closed"){
emp.sales +=1
emp.commission +=300
}

fs.writeFileSync("commission.json",JSON.stringify(data,null,2))

}

app.post("/call", (req,res)=>{

const {employee} = req.body

let data = JSON.parse(fs.readFileSync("calls.json"))

let emp = data.employees.find(e=>e.name===employee)

if(emp){
emp.calls +=1
}

fs.writeFileSync("calls.json",JSON.stringify(data,null,2))

res.json({status:"call counted"})

})

app.get("/performance",(req,res)=>{

let calls = JSON.parse(fs.readFileSync("calls.json"))
let commission = JSON.parse(fs.readFileSync("commission.json"))

let result = []

calls.employees.forEach(c=>{

let emp = commission.employees.find(e=>e.name===c.name)

result.push({

name:c.name,
calls:c.calls,
interested:emp ? emp.interested : 0,
audit:emp ? emp.audit : 0,
sales:emp ? emp.sales : 0,
commission:emp ? emp.commission : 0

})

})

res.json(result)

})


app.post('/upload', upload.single('file'), (req,res)=>{

let results=[]

fs.createReadStream(req.file.path)
.pipe(csv())
.on('data',(data)=>results.push(data))
.on('end',()=>{

let db = JSON.parse(fs.readFileSync(DATA_FILE))

let employees = ["emp1","emp2"]

results.forEach(l=>{

let index = db.leads.length % employees.length
l.employee = employees[index]

db.leads.push(l)

})

fs.writeFileSync(DATA_FILE,JSON.stringify(db,null,2))

res.json({status:"uploaded",count:results.length})

})

})

app.listen(3000, () => {
console.log("Server started on port 3000")
})
