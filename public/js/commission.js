function addCommission(){

let sales = localStorage.getItem("sales") || 0
let commission = sales * 200

localStorage.setItem("earnings", commission)

}

addCommission()
