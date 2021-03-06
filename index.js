const express = require('express');
const app = express()
require('./src/db/connection') 
let port = process.env.PORT || 3000
app.listen(port, () => console.log('listenning:', port))
const cors = require('cors')
const User = require('./src/models/UserModal')
const Item = require('./src/models/ItemModal')


let { successFalse, successTrue } = require('./src/helper')

app.use(express.static("public"));

app.use(express.json({ limit: '1mb' }));
app.use(cors())

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


app.post("/items/add", (req, res) => {
    let item = new Item(req.body);
    item.save().then(() => {
        res.json({
            success: true,
            message: 'Item Created'
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
app.get("/users", async (req, res) => {

    try {
        let resp = await    
        res.json(successTrue('Operation Successfull.', resp)) 
        // res.send(res)
 
    } catch (error) {
        res.json(successFalse('An error occured while getting users', error)) 
        // res.send(res)
    }

})
app.get("/items", async (req, res) => {

    try {
        let resp = await Item.find({})
        res.json(successTrue('Operation Successfull.', resp))
        // res.send(res)
 
    } catch (error) {
        res.json(successFalse('An error occured while getting users', error))
        // res.send(res)
    }

})
app.put("/items/update/:id", async (req, res) => {
    let id = req.params.id 
    Item.findByIdAndUpdate(id, req.body, { new: true }).then((resp) => {
        res.json(successTrue('Item Update Successfull.', resp))
        // res.statusCode(400).send(res)
      
    }).catch((error) => {
        res.json(successFalse('An error occurred', error))
        // res.statusCode(500).send(res)
    })
})