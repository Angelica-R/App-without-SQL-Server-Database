const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const filePath = './data/data.json';

// Get all data
app.get('/users', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data');
        res.json(JSON.parse(data));
    });
});

// Add a new user
app.post('/users', (req, res) => {
    const newUser = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data');

        const users = JSON.parse(data);
        users.push({ id: users.length + 1, ...newUser });

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving data');
            res.status(201).send('User added successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});