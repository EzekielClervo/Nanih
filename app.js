const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const FB_ENDPOINT = process.env.FB_ENDPOINT || 'your-endpoint';
const ASO_ENDPOINT = process.env.ASO_ENDPOINT || 'your-aso-endpoint';

// Import fetch dynamically
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Add your server routes here (API endpoints)
app.post('/api/execute', require('./routes/execute')(fetch));
app.post('/api/check-cookie', require('./routes/check-cookie')(fetch));
app.post('/api/convert-to-cookie', require('./routes/convert-to-cookie')(fetch));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
