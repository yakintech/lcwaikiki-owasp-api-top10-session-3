const express = require('express');
const app = express();

const users = [
    {
        id: 1,
        name: 'John',
        email:"john@mail.com"
    },
    {
        id: 2,
        name: 'Doe',
        email:"doe@mail.com"
    },
    {
        id: 3,
        name: 'Smith',
        email:"smith@mail.com"
    }
]

function authenticate(req, res, next) {
    
    const userId = req.headers['user-id'];
    if (!userId) return res.status(401).send('Unauthorized');
    if (userId !== req.params.id) return res.status(401).send('Unauthorized');
    next();
}

app.get('/users/:id', authenticate, (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
})





app.listen(3000, () => {
    console.log('Server is running on port 3000');
});