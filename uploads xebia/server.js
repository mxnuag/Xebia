const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up storage directory and naming convention
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve the index.html file when the root URL is requested
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle file upload
app.post('/upload', upload.fields([{ name: 'aadhar' }, { name: 'pan' }]), (req, res) => {
    if (req.files) {
        const aadhar = req.files.aadhar ? req.files.aadhar[0] : null;
        const pan = req.files.pan ? req.files.pan[0] : null;

        if (aadhar && pan) {
            res.json({ message: 'Files uploaded successfully!' });
        } else {
            res.status(400).json({ message: 'Please upload both Aadhar and PAN cards.' });
        }
    } else {
        res.status(400).json({ message: 'No files uploaded.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
