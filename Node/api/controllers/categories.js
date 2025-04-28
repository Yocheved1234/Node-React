import Categories from '../models/categories.js'


export const getAll = (req, res) => {
    Categories.find().populate("arrayApart")
        .then(list => {
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


export const getApartCategories = (req, res) => {
    const categoryName = req.params.Categories;

    Categories.find({ name: categoryName }).populate("arrayApart")
        .then(list => {
            console.log("Results:", list);            
            res.status(200).send(list);            
        })
        .catch(err => {
            console.error("Error:", err);            
            res.status(500).send({ error: err.message });            
        });        
}

export const create = (req, res) => {

    const { name, arrayApart} = req.body

    const newCategories = new Categories({
        name,
        arrayApart,
    })

    newCategories.save()
        .then(Categories => {
            return res.status(200).send({ message: `create article ${Categories._id} succeed!` })
        })
        .catch(err => {
            return res.status(500).send({ error: err.message })
        })
}

export const remove = (req, res) => {
    Categories.findByIdAndDelete(req.params.id)
        .then(Categories => {
            res.status(200).send({ message: `delete Categories ${Categories._id} succeed!` })
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

    Categories.findByIdAndUpdate(id, req.body, { new: true })
        .then(Categories => {
            res.status(200).send({ message: `update Categories ${Categories._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}