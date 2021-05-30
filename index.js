const express = require('express');
const app = express()
require('./src/db/connection')
let port = process.env.PORT || 3000
app.listen(port, () => console.log('listenning:', port))

const User = require('./src/models/UserModal')
const Item = require('./src/models/ItemModal')

let { successFalse, successTrue } = require('./src/helper')

app.use(express.static("public"));

app.use(express.json({ limit: '1mb' }));

app.post("/register", (req, res) => {
    let user = new User(req.body);
    user.save().then(() => {
        res.json({
            success: true,
            message: 'User Created'
        })
        // res.send(res).statusCode(201)
    }).catch((e) => {
        res.json({
            success: false,
            message: e.message
        })
        // res.send(res).statusCode(501)
    })
})
app.post("/login", async (req, res) => {
    let { email, password } = req.body

    User.find({ email }).then((resp) => {

        if (resp.length > 0 && resp[0].password === password) {
            res.json(successTrue('Operation Successfull.', resp[0]))
            // res.statusCode(200).send(res) 
        }
        else {
            res.json(successFalse('Email or Password is Invalid', error))
            // res.statusCode(400).send(res)
          
        }
    }).catch((error) => {
        res.json(successFalse('Email or Password is Invalid', error))
        // res.statusCode(400).send(res)
    })


})

app.patch("/update/:id", async (req, res) => {
    let id = req.params.id 
    User.findByIdAndUpdate(id, req.body, { new: true }).then((resp) => {

        res.json(successTrue('Update Successfull.', resp))
        // res.statusCode(400).send(res)

    }).catch((error) => {
        res.json(successFalse('An error occurred', error))
        // res.statusCode(500).send(res)
    })
})