import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import advertiserRouter from './api/routers/advertiser.js'
import apartmentRouter from './api/routers/apartment.js'
import categoriesRouter from './api/routers/categories.js'
import cityRouter from './api/routers/city.js'
//import { post } from 'request'

const app = express()

dotenv.config();

app.use(bodyParser.json())
app.use(cors())

mongoose.connect

mongoose.connect(process.env.LOCAL_URI)
    .then(() => {
        console.log('connect to mongoDB! 👍😁');
    })
    .catch(err => {
        console.log({ error: err.message });
    })

app.use('/advertiser', advertiserRouter)
app.use('/apartment',  apartmentRouter)
app.use('/categories', categoriesRouter)
app.use('/city', cityRouter)

const PORT = 3000;

// app.get('/city', (req, res) => {
//     res.send('City data');
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});