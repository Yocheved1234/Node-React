import Advertiser from '../models/advertiser.js'
import jwt from 'jsonwebtoken';

export const getAll = (req, res) => {
    Advertiser.find()
        .then(list => {
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    const { email, code, phone, phoneEx, apartArray} = req.body

    const newadvertiser = new Advertiser({
        email,
        code,
        phone,
        phoneEx,
        apartArray,
    })

    newadvertiser.save()
        .then(Advertiser => {
            return res.status(200).send({ message: `create Advertiser ${Advertiser._id} succeed!`})
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })

}

export const remove = (req, res) => {
    Advertiser.findByIdAndDelete(req.params.id)
        .then(Advertiser => {
            res.status(200).send({ message: `delete Advertiser ${Advertiser._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const update = (req, res) => {

    const { _id } = req.body

    if (_id) {
        return res.status(403).send({ error: `update id is forbidden!` })
    }

    const { id } = req.params

    Advertiser.findByIdAndUpdate(id, req.body, { new: true })
        .then(Advertiser => {
            res.status(200).send({ message: `update Advertiser ${Advertiser._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}

export const getByMailAdPas = (req, res) => {
    const { email, phone } = req.body;
    
        if (!email || !phone) {
            return res.status(400).send({ error: `email and password are required!` })
        }

        try{

                const token =  jwt.sign(
                    { phone, email },
                    process.env.SECRET,
                    {
                         expiresIn: '10m',

                    }
                )

                res.status(200).send({ token })

            }
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
}