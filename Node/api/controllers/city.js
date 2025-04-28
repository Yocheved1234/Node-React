import City from '../models/city.js'

export const getAll = (req, res) => {
    City.find()
        .then(list => {
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getApart = (req, res) => {
    City.find({ name: req.params.city }).populate("arrayApart")
        .then(list => {
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    const { name, arrayApart} = req.body

    const newCity = new City({
        name,
        arrayApart,
    })

    newCity.save()
        .then(City => {
            return res.status(200).send({ message: `create article ${City._id} succeed!` })
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
}

export const remove = (req, res) => {
    City.findByIdAndDelete(req.params.id)
        .then(City => {
            res.status(200).send({ message: `delete City ${City._id} succeed!` })
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

    City.findByIdAndUpdate(id, req.body, { new: true })
        .then(City => {
            res.status(200).send({ message: `update City ${City._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}