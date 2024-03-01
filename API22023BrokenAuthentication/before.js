const express = require('express');
const app = express();

const token = "asdasd"

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


app.get('/orders/:id', (req, res) => {
    const order = orders.find(order => order.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    res.send(order);
})


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Bad request');
    if (email === "admin@admin.com" && password === "admin") {
        //token generate
        res.json({ token: token + email})
    }
    else {
        res.status(401).send('Unauthorized');
    }

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);