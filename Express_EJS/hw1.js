const express = require('express');
const game24 = require('24game-solver/dist/24game-solver')

const app = express();
app.use(express.json());

const isNum = (data) => typeof data == "number"

const Nir = (data) => (data > 0 && data < 10)


const loopCheck = (arr,checkfunc) => {
    for(let i = 0; i < arr.length; i++){
        if(checkfunc(arr[i])) return true;
    }
    return false;
}

app.post('/', (req, res) => {
    console.log(req.body)

    const body = req.body
    const num = [body.n1,body.n2,body.n3,body.n4]

    if (
        loopCheck(num, (n) => !n) ||
        loopCheck(num, (n) => (typeof n) != "number") ||
        loopCheck(num, (n) => (n <= 0 || n >= 10))
    ) return res.status(403).send("Error Input")

    const result = game24(num, 24)



    /*if(!body.n1 || !body.n2 || !body.n3 || !body.n4){
        return res.status(403).send("Incomplete numbers")
    }

    if(!isNum(body.n1) || !isNum(body.n2) || !isNum(body.n3) || !isNum(body.n4)){
        return res.status(403).send("Contains non-numeric data")
    }

    if(!Nir(body.n1) || !Nir(body.n2) || !Nir(body.n3) || !Nir(body.n4)){
        return res.status(403).send("Numbers not listed in 1-9")
    }

    const result = game24([body.n1,body.n2,body.n3,body.n4],24)
    */

    if(result.length == 0)
        return res.status(403).send("No result")
        res.send({ msg : "success", data: result})
})



app.listen(3500 , () => {
    console.log('Server Started!!');
});