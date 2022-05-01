const express = require('express');

const app = express();
app.use(express.json());

let data = []

app.get('/get_data',(req,res) => {
    res.send(data);
})

app.post('/post_data',(req,res) => {
    
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
        ){
        return res.status(400).send("Error");
    }
    
    for(let i = 0; i < data.length; i++){
        if (data[i].id == emp_data.id ||
            data[i].email == emp_data.email ||
            data[i].tel == emp_data.tel){
            return res.status(400).send("Your information has already been used.");
        }
    }

    data.push(emp_data)
    console.log(emp_data)

    res.send('Create Data Success');
})

app.put('/push_data',(req,res) => {
    if (!req.body.id ||
        !req.body.tel ||
        !req.body.email ||
        !req.body.position 
        ) {
        return res.status(400).send("Error");
    }
    for(let i = 0; i < data.length; i++){
        if (data[i].id == req.body.id){
        
        data[i].id = req.body.id
        data[i].tel = req.body.tel
        data[i].email = req.body.email
        data[i].position = req.body.position

        return res.send("Update Information Success");
        }
    }
    return res.status(400).send("Error");
})

app.delete('/del_data',(req,res) => {
    if (!req.body.id){
        return res.status(400).send("Error");
    }
    for(let i = 0; i < data.length; i++){
        if (data[i].id == req.body.id){
        data.splice(i, 1);    
        return res.send("Delete Information Success");
        }
    }
    res.status(400).send("Error");
})

app.listen(3000 , () => {
    console.log('Listening on port: 3000');
});

