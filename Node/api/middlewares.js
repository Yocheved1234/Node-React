import jwt from "jsonwebtoken"

export const checkEmail = (req, res, next) => {
    const { email } = req.body
    if (email && email.includes('@')) {
        return next()
    }
    res.status(400).send({ error: 'invalid email!' })
}

export const checkName = (req, res, next) => {
    const { name } = req.body;
    const nameRegex = /^[A-Za-zא-ת ]+$/;
    if (name && nameRegex.test(name)) {
        return next();
    }
    res.status(400).send({ error: 'invalid name! Only letters are allowed.' });
}

export const checkPhone = (req, res, next) => {
    const { phone } = req.body;
    const nameRegex = /^[0-9]{7,10}$/;
    if (phone && nameRegex.test(phone)) {
        return next();
    }
    res.status(400).send({ error: 'invalid phone! Only letters are allowed.' });
}

export const checkPrice = (req, res, next) => {
    const { price } = req.body;
    const nameRegex = /^[0-9]{1,4}$/;
    if (price && nameRegex.test(price) && price>0) {
        return next();
    }
    res.status(400).send({ error: 'invalid price! Only pozetiv number are allowed.' });
}

export const checkBed = (req, res, next) => {
    const { numBed } = req.body;
    const nameRegex = /^[0-9]{1,2}$/;
    if (numBed && nameRegex.test(numBed) && numBed>0) {
        return next();
    }
    res.status(400).send({ error: 'invalid numBed! Only pozetiv numbers are allowed.' });
}

// pic
// בדיקה האם נשלח טוקן והאם הוא תקין ותקף
export const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        // אין הרשאה
        return res.status(401).send({ error: 'Authorization failed!111' })
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).send({ error: 'Authorization failed!222' })
    }

    // decoded - פיענוח
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            // האימות נכשל
            return res.status(401).send({ error: 'Authentication failed!333' })
        }
        if (decoded) {
            // האובייקט יכיל את הנתונים של המשתמש לפיהם נוצר הטוקן
            // באם יהיה צורך נוכל לשמור אותם באובייקט הבקשה ואז להשתמש בפונקציות הבאות
            next()
        }
    })

}
