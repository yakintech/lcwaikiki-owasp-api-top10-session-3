const express = require('express');
const app = express();


const users = [
    {
        id: 1,
        name: 'John',
        email: "john@mail.com"
    },
    {
        id: 2,
        name: 'Doe',
        email: "doe@mail.com"
    },
    {
        id: 3,
        name: 'Smith',
        email: "smith@mail.com"
    }
]


function checkRole(){
    return (req, res, next) => {
        if (req.headers['role'] !== 'admin') return res.status(401).send('Unauthorized');
        next();
    }

}

app.get('/users/', (req, res) => {
    res.json(users);
}
)


app.get('/users/:id', checkRole, (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
}
)




app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);