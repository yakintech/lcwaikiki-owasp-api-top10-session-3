const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');


//Max 5 KB
app.use(express.json({ limit: '5kb' }));
//url encoded limit 5kb
app.use(express.urlencoded({ limit: '5kb', extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(helmet());




app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

//Gövde limiti sınırlı, cors ayarları yapılmış, helmet kullanılmış.