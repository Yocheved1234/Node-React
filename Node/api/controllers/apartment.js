import Apartment from '../models/apartment.js'
import Categories from '../models/categories.js';
import City from '../models/city.js';
import Advertiser from '../models/advertiser.js';

// שליפת כל הדירות
export const getAll = (req, res) => {
    Apartment.find()
        .populate("city")
        .populate("categories")
        .populate("advertiser")
        .then(list => {
            res.status(200).send(list);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}

//פונקציה להוספת דירה חדשה
export const create = async (req, res) => {
    const { name, pic , description, categories, city, address, numBed, extras, price, advertiser } = req.body;

    try {
        // חיפוש ה-ObjectId של הקטגוריה
        const categoriesDoc = await Categories.findOne({ name : categories });
        if (!categoriesDoc) {

            return res.status(400).send({ message: `categories not found: ${categories}` });
        }


        // חיפוש ה-ObjectId של העיר
        const cityDoc = await City.findOne({ name: city });
        if (!cityDoc) {
            return res.status(400).send({ message: `City not found: ${city}` });
        }

        // חיפוש ה-ObjectId של המפרסם
        const advertiserDoc = await Advertiser.findOne({ _id : advertiser });
        if (!advertiserDoc) {
            return res.status(400).send({ message: `advertiser not found: ${advertiser}` });
        }

        const newApartment = new Apartment({
            name,
            pic,
            description,
            categories: categoriesDoc._id,
            city: cityDoc._id,
            address,
            numBed,
            extras,
            price,
            advertiser: advertiserDoc._id,
        });

        const apartment = await newApartment.save();

        // עדכון העיר להוסיף את הדירה החדשה
        const updatedCity = await City.findOneAndUpdate(
            { _id: cityDoc._id },
            { $push: { arrayApart: apartment } },
            { new: true }
        );
        if (!updatedCity) {
            return res.status(500).send({ message: `create apartment ${apartment._id} succeed! update city failed!` });
        }

        const updatedCategories = await Categories.findOneAndUpdate(
            { _id: categoriesDoc._id },
            { $push: { arrayApart: apartment } },
            { new: true }
        );
        if (!updatedCategories) {
            return res.status(500).send({ message: `create apartment ${apartment._id} succeed! update categories failed!` });
        }

        const updatedAdvertiser = await Advertiser.findOneAndUpdate(
            { _id: advertiserDoc._id },
            { $push: { apartArray: apartment } },
            { new: true }
        );
        if (!updatedAdvertiser) {
            return res.status(500).send({ message: `create apartment ${apartment._id} succeed! update Advertiser failed!` });
        }

        return res.status(200).send({ message: `create apartment ${apartment._id} succeed!` });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
}

//פונקציה למחיקת דירה
export const  remove= async (req, res) => {
    const { id } = req.params;

    try {
        // חיפוש הדירה
        const apartment = await Apartment.findById(id);
        if (!apartment) {
            return res.status(404).send({ message: `Apartment not found: ${id}` });
        }

        // עדכון העיר, קטגוריות ומפרסם על מנת להסיר את ה-ID של הדירה
        await Promise.all([
            City.findByIdAndUpdate(apartment.city, { $pull: { arrayApart: apartment._id } }),
            Categories.findByIdAndUpdate(apartment.categories, { $pull: { arrayApart: apartment._id } }),
            Advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { apartArray: apartment._id } }),
        ]);

        // מחיקת הדירה
        await Apartment.findByIdAndDelete(id);

        return res.status(200).send({ message: `Delete apartment ${apartment._id} succeeded!` });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// פונקציה לעדכון דירה קיימת
export const update = async (req, res) => {
    
    const { id } = req.params; // ה-ID של הדירה מתוך ה-URL
    const { name, description, categories, numBed, extras, price ,pic} = req.body;
    
    try {
        // חיפוש הדירה
        const apartment = await Apartment.findById(id);
        console.log(apartment);
        
        if (!apartment) {
            return res.status(404).send({ message: `Apartment not found: ${id}` });
        }

        // חיפוש ה-ObjectId של הקטגוריה אם יש צורך לעדכן אותה
        let categoriesId;
        if (categories) {
            console.log(categories);
            const categoriesDoc = await Categories.findOne({ name: categories });
            if (!categoriesDoc) {
                return res.status(400).send({ message: `categories not found: ${categories}` });
            }
            categoriesId = categoriesDoc._id;
        }

        // עדכון הדירה
        const updatedApartment = await Apartment.findByIdAndUpdate(
            id,
            {
                name: name || apartment.name,
                description: description || apartment.description,
                categories: categoriesId || apartment.categories,
                numBed: numBed || apartment.numBed,
                extras: extras || apartment.extras,
                price: price || apartment.price,
                pic: pic || apartment.pic,
            },
            { new: true }
        );

        return res.status(200).send({ message: `Update apartment ${updatedApartment._id} succeed!`, apartment: updatedApartment });
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
};

// •	שליפת דירה לפי קוד
export const getWhere1 = (req, res) => {
    Apartment.findById(req.params.id)
        .then(Apartment => {
            if (!Apartment) {
                return res.status(404).send({ message: "Apartment not found" });
            }
            res.status(200).send(Apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}
// •	שליפת דירות לפי קוד קטגוריה
export const getWhere2 = (req, res) => {
    Apartment.find({ categories: req.params.categories })
    .populate("city")
    .populate("categories")
    .populate("advertiser")
        .then(Apartment => {
            res.status(200).send(Apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}
// •	שליפת דירות לפי קוד עיר
export const getWhere3 = (req, res) => {
    Apartment.find({ city: req.params.city })
    .populate("city")
    .populate("categories")
    .populate("advertiser")
        .then(Apartment => {
            res.status(200).send(Apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}
// •	שליפת דירות לפי כמות מיטות- קטן מ...
export const getWhere4 = (req, res) => {
    const numBed = parseInt(req.params.numBed);
    Apartment.find({ numBed: { $lte: numBed } })
    .populate("city")
    .populate("categories")
    .populate("advertiser")
        .then(Apartment => {
            res.status(200).send(Apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}
// •	שליפת דירות לפי כמות מיטות- שווה ל...
export const getWhere5 = (req, res) => {
    const { numBed } = req.params;
    Apartment.find().populate("city")
    .populate("categories")
    .populate("advertiser")
        .where({ numBed: { $eq: numBed } })
        .then(Apartment => {
            res.status(200).send(Apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};
// •	שליפת דירות לפי כמות מיטות- גדול מ...
export const getWhere6 = (req, res) => {
    const numBed = parseInt(req.params.numBed);
    Apartment.find({ numBed: { $gt: numBed } })
    .populate("city")
    .populate("categories")
    .populate("advertiser")
        .then(Apartment => {
            res.status(200).send(Apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}
// שליפה לפי מחיר קטן מ_ לדירה
export const getWhere7 = (req, res) => {
    const { price } = req.params;
    Apartment.find()
    .populate("city")
    .populate("categories")
    .populate("advertiser")
        .where({ price: { $lte: price } })
        .then(Apartment => {
            res.status(200).send(Apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};
// שליפה לפי מחיר שווה ל_ לדירה
export const getWhere8 = (req, res) => {
    const { price } = req.params;
    Apartment.find()
    .populate("city")
    .populate("categories")
    .populate("advertiser")
        .where({ price: { $eq: price } })
        .then(Apartment => {
            res.status(200).send(Apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};
// שליפה לפי מחיר גדול_ לדירה
export const getWhere9 = (req, res) => {
    const { price } = req.params;
    Apartment.find()
    .populate("city")
    .populate("categories")
    .populate("advertiser")
        .where({ price: { $gt: price } })
        .then(Apartment => {
            res.status(200).send(Apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};
// •	שליפת דירות לפי קוד מפרסם *
export const getWhere10 = (req, res) => {
    Apartment.find({ advertiser: req.params.advertiser })
    .populate("city")
    .populate("categories")
    .populate("advertiser")
        .then(Apartment => {
            res.status(200).send(Apartment);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}
//הרשמה
export const harshama = (req, res) => {
    const { price } = req.params;

    Apartment.find()
    .populate("city")
    .populate("categories")
    .populate("advertiser")
        .where({ price: { $eq: price } })
        .then(products => {
            res.status(200).send(products);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};