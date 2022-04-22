const ap = [
    "A","B","C","D",
    "E","F","G","H",
    "I","J","K","L",
    "M","N","O","P",
    "Q","R","S","T",
    "U","V","W","X",
    "Y","Z",
]

let result = []

for(let i = 0; i < 13; i++){
    //let index = i*2
    //result += ap[index + 1] + " " + az[index] + " "
    const elm = ap.splice(0,2)
    result.push(elm[1])
    result.push(elm[0])
}
let resultText = ""
for (let i  = 0; i < result.length; i++){
    resultText += result[i] + " "
}
console.log(resultText)
