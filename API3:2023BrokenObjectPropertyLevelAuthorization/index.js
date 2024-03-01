const express = require('express');
const app = express();



const users = [
    {
        id: 1,
        name: 'John',
        salary: 1000,
        email: "john@mail.com"
    },
    {
        id: 2,
        name: 'Doe',
        salary: 2000,
        email: "Doe@mail.com"

    },
    {
        id: 3,
        name: 'Smith',
        salary: 3000,
        email: "Smith@mail.com"

    }
]

//bu endpoint sadece kullanıcı email güncellemek için kullanılabilir
app.put('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    if (req.body.email) {
        user.email = req.body.email;
    }
    //user = req.body.user
    res.send(user);
}
)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});