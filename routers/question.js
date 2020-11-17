const express = require('express')
const Test = require('../models/question.js')
const router = new express.Router()


router.post('/create', async (req, res) => {
    const create = new Test(req.body)

    try {
        await create.save()
        res.status(201).send(create)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/create', async (req, res) => {
    try {
        const create = await Test.find({})
        res.send(create)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/create/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const create = await Test.findById(_id)

        if (!create) {
            return res.status(404).send()
        }

        res.send(create)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/create/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['pregunta', 'resp1','resp2','resp3','resp4','solucion',]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const create = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!create) {
            return res.status(404).send()
        }

        res.send(create)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/create/:id', async (req, res) => {
    try {
        const create = await Test.findByIdAndDelete(req.params.id)

        if (!create) {
            res.status(404).send()
        }

        res.send(create)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router