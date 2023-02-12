const connectToMongo = require('./db');

connectToMongo();

var cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());


// available Routes
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req,res) => {
    res.send('Welcome to Our Awesome Project');
})

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
})