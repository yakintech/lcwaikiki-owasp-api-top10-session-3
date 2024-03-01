const express = require('express');
const app = express();
//express file upload
const fileUpload = require('express-fileupload');




//upload file
app.use(fileUpload());

//upload file endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    //file extension controlr. just jpeg, jpg, png and webp files are allowed
    const ext = req.files.file.name.split('.').pop();
    if (ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png' && ext !== 'webp') {
        return res.status(400).json({ msg: 'Only jpeg, jpg, png and webp files are allowed' });
    }

    //size control. max file size is 1MB
    if (req.files.file.size > 1000000) {
        return res.status(400).json({ msg: 'File size cannot exceed 1MB' });
    }


    const file = req.files.file;
    file.mv(`${__dirname}/files/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
