const http = require('http')
const name = 'Phatthanan Phutong'
const date = new Date().toLocaleString()
const server = http.createServer((req,res) => {//create function
    res.write(name + '\n' + date)
    res.end() 
})

server.listen(2337, () =>{
    console.log('Server Started \n' + name + date)
})
