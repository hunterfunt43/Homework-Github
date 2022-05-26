const express = require('express');

const app = express();
app.use(express.json());

app.use((req, res, next)=> {
    if(req.path == "/login") return next()

    const auth = req.headers.authorization
    if(!auth) return res.json({msg: "Error Unauthorize"})

    const token = auth.split(' ')[1]
    if(!token) return res.json({msg: "Error Unauthorize"})

    jsonwebtoken.verify(token, jwt_key, (err, result) => {
        if(err) return res.json({msg: "Error Unauthorize"})
        next()
    })
})

let data = []

const { createPool } = require('mysql2') //create connection to database

const jsonwebtoken = require('jsonwebtoken');
const jwt_key = "my json web token is here"

const sqlPool = createPool({
    namedPlaceholders: true,
    charset: 'utf8',
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "Test_Oauth",
})

/*sqlPool.query("SELECT * FROM employee", (err, result) => {
    console.log({ err, result })
})*/

app.post('/login', (req, res) => {
    const username = req.body.user;
    const password = req.body.pass;

    if(!username || !password) 
    return res.status(400).json({msg: "fail"})

    if(username != "username" || password != "pass0000") 
    return res.status(400).json({msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"})

    const token = jsonwebtoken.sign({
        user: username
    }, jwt_key)

    res.cookie('token',token)
    res.json({
        msg: "ok",
        token: token})
})

app.get('/Data', (req, res) => {

    const sql = "SELECT * FROM employee"

    sqlPool.query(sql, (err, result) => {
        console.log({ err, result })

        if (err) return res.status(400).send({ msg: 'error' })

        res.json({ data: result })
    })

})

app.post('/Insert_data', (req, res) => {

    const emp_data = {
        fname: req.body.fname,
        lname: req.body.lname,
        id: req.body.id,
        tel: req.body.tel,
        email: req.body.email,
        position: req.body.position
    }

    if (!emp_data.fname ||
        !emp_data.lname ||
        !emp_data.id ||
        !emp_data.tel ||
        !emp_data.email ||
        !emp_data.position
    ) {
        return res.status(400).send("Error");
    }

    const sql = "INSERT INTO employee VALUE(:id, :fname, :lname, :pos, :tel, :email)"

    sqlPool.query(sql, {
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        pos: req.body.position,
        tel: req.body.tel,
        email: req.body.email

    },
        (err, result) => {

            console.log(err)

            if (err) {
                if (err.code == "ER_DUP_ENTRY") return res.status(400).json({ msg: "Error, Duplicate Data" })
                return res.status(400).json({ msg: "Error, Unknown Error" })
            }
            res.json({ msg: "ok" })

        })

    console.log(emp_data)
})

app.put('/Update_data', (req, res) => {
    if (!req.body.id ||
        !req.body.tel ||
        !req.body.email ||
        !req.body.position
    ) {
        return res.status(400).send("Error");
    }

    const sql = "UPDATE employee SET POS = :pos, TEL = :tel, EMAIL = :email WHERE ID = :id"

    sqlPool.query(sql, {
        id: req.body.id,
        pos: req.body.position,
        tel: req.body.tel,
        email: req.body.email
    }, (err, result) => {

        console.log(err)

        if (err) {
            if (err.code == "ER_DUP_ENTRY") return res.status(400).json({ msg: "Error, Duplicate Data" })
            return res.status(400).json({ msg: "Error, Unknown Error" })
        }
        if (result.affectedRows == 0) return res.status(400).json({ msg: "Error, Employee Not Found" })
        res.json({ msg: "ok" })

    })

})

app.delete('/Remove_data', (req, res) => {
    if (!req.body.id) {
        return res.status(400).send("Error");
    }
    const sql = "DELETE FROM employee WHERE ID = :id"
    sqlPool.query(sql, {
        id: req.body.id

    }, (err, result) => {

        console.log(err)

        if (err) {
            return res.status(400).json({ msg: "Error, Unknown Error" })
        }
        if (result.affectedRows == 0) return res.status(400).json({ msg: "Error, Employee Not Found" })
        res.json({ msg: "ok" })

    })
})

app.listen(3000, () => {
    console.log('Listening on port: 3000');
});

