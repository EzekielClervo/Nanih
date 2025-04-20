const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { setTimeout } = require('timers/promises');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const FB_ENDPOINT = process.env.FB_ENDPOINT || 'your-endpoint';
const ASO_ENDPOINT = process.env.ASO_ENDPOINT || 'your-aso-endpoint';

// Add your server routes here (API endpoints)
app.post('/api/execute', require('./routes/execute'));
app.post('/api/check-cookie', require('./routes/check-cookie'));
app.post('/api/convert-to-cookie', require('./routes/convert-to-cookie'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
