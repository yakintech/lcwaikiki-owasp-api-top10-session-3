const express = require('express');
const app = express();
const cors = require('cors');


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


app.use(cors());


app.get('/orders', (req, res) => {
    res.json(orders);
}
)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
)