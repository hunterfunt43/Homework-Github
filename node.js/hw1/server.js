const http = require('http')
const name = 'Phatthanan Phutong'
const dateTime = new Date().toLocaleString()
const server = http.createServer((req,res) => {//create function
    res.write(name + '\n' + dateTime)
    res.end() 
})

server.listen(2337, () =>{
    console.log('Server Started \n' + name + dateTime)
})
