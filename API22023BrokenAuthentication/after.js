const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const secretKey = "secretKey";

let refreshTokens = [];

let orders = [
    {
        id: 1,
        name: 'Order 1',
        userId: 1
    },
    {
        id: 2,
        name: 'Order 2',
        userId: 2
    },
    {
        id: 3,
        name: 'Order 3',
        userId: 3
    }
]


app.use((req, res, next) => {

    if (req.path === '/login') return next();
    //Bearer auth
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).send('Unauthorized');
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).send('Unauthorized');
        jwt.verify(token, secretKey, (err, user) => {
            if (err) return res.status(401).send('Unauthorized');
            req.user = user;
            next();
        })
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
});


app.get('/orders', (req, res) => {
    res.json(orders);
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Bad request');
    if (email === "admin@mail.com" && password === "admin") {
        const tokenOptions = {
            expiresIn: '1h'
        }

        const token = jwt.sign({ email: email }, secretKey, tokenOptions);
        const refreshToken = generateRefreshToken();
        refreshTokens.push(refreshToken);
        res.json({ token: token, refreshToken: refreshToken })

    }
    else {
        res.status(401).send('Unauthorized');
    }
});


//refresh token
app.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(401).send('Unauthorized');
    jwt.verify(refreshToken, secretKey, (err, user) => {
        if (err) return res.status(401).send('Unauthorized');
        const tokenOptions = {
            expiresIn: '1h'
        }
        const token = jwt.sign({ email: user.email }, secretKey, tokenOptions);
        res.json({ token: token })
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


//refresh token generate function without jwt
function generateRefreshToken() {
    return crypto.randomBytes(40).toString('hex');
}

