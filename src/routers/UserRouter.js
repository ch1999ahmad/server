const express = require('express');
const { successFalse, successTrue } = require('../helper');
const router = new express.Router()

const User = require('../models/UserModal')

router.post("/user", (req, res) => {
    let user = new User(req.body);
    user.save().then(() => {
        res.json({
            success: true,
            message: 'User Created'
        })
        res.send(res).statusCode(201)
    }).catch((e) => {
        res.json({
            success: false,
            message: e.message
        })
        res.send(res).statusCode(501)
    })
})
router.get("/user", async (req, res) => {
    let { email, password } = req.body

    User.find({ email }).then((resp) => {

        if (resp.length > 0 && resp[0].password === password) {
            res.json(successFalse('Login Successfull.', resp[0]))
            res.statusCode(200).send(res)
        }
        else {
            res.json(successFalse('Email or Password is Invalid', error))
            res.statusCode(400).send(res)

        }
    }).catch((error) => {
        res.json(successFalse('Email or Password is Invalid', error))
        res.statusCode(400).send(res)
    })


})
router.patch("/user/:id", async (req, res) => {
    let id = req.params.id
console.log(req.body,'-----------------------')
    User.findByIdAndUpdate(id, req.body, { new: true }).then((resp) => {

        res.json(successTrue('Update Successfull.', resp))
        res.statusCode(400).send(res)

    }).catch((error) => {
        res.json(successFalse('An error occurred', error))
        res.statusCode(500).send(res)
    })


})

module.exports = router