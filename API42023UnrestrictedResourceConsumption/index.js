const express = require('express');
const app = express();
//import express limiter
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const helmet = require('helmet');

app.use(express.json());


const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // 30 seconds
    max: 10 // limit each IP to 100 requests per windowMs
});

const speedLimiter = slowDown({
	windowMs: 1 * 60 * 1000, // 15 minutes
	delayAfter: 5, // Allow 5 requests per 15 minutes.
	delayMs: (hits) => hits * 100,
});

// app.use(limiter);
app.use(speedLimiter);
app.use(helmet());

//MAX 5 KB
app.use(express.json({ limit: '5kb' }));

const orders = [
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

app.get('/orders', (req, res) => {
    res.json(orders);
}
)

app.post('/login',limiter, (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Bad request');
    if (email === "admin@mail.com" && password === "admin") {
        //token generate
        res.json({message: 'Login successful'})
    }
    else {
        res.status(401).send('Unauthorized');
    }

})




app.listen(3000, () => {
    console.log('Server is running on port 3000');
})


//Rate Limiter: Express rate limiter ile saniyede 10 requesti geçmeyecek şekilde sınırlama getirildi.

//İstek yavaşlatma: Express slow down ile 5 istekten sonra her istek 100ms gecikme ile yavaşlatıldı.

//Helmet: Helmet paketi ile bazı başlıklarda ( header ) güvenlik önlemleri alındı.

//Gövde Boyutunu Sınırlama: express.json() fonksiyonu ile gövde boyutu 5kb'a sınırlandırıldı.


