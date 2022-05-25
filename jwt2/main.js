const express = require('express');
const jsonwebtoken = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())
app.use(cookieParser())

const port = 3000;
const jwt_key = "mykey01";

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/main.html")
});

app.get('/home', (req, res) => {
    console.log(req.cookies)
    if(!req.cookies.token) return res.redirect('/error')

    let tokenResult;

    try {
        tokenResult = jsonwebtoken.verify(req.cookies.token, jwt_key)
    } catch {
        return res.redirect('/error')
    }
    
    res.sendFile(__dirname + "/public/home.html")
});

app.get('/error', (req, res) => {
    res.sendFile(__dirname + "/public/error.html")
});

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + "/public/style.css")
});

app.post('/login', (req, res) => {
    const username = req.body.user;
    const password = req.body.pass;

    if(!username || !password) 
    return res.status(400).json({msg: "fail"})

    if(username !== "username" || password !== "pass0000")
    return res.status(400).json({msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"})

    const token = jsonwebtoken.sign({
        user: username
    }, jwt_key)

    res.cookie('token',token)
    res.send({msg: "ok"})
})

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});