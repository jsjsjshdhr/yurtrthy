const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

// Function to generate a key based on the current UTC minute
function generateKey() {
    const now = new Date();
    const utcMinutes = Math.floor(now.getTime() / 60000); // Current minute in UTC
    const seed = utcMinutes.toString();
    return crypto.createHash('sha256').update(seed).digest('hex').slice(0, 8);
}

app.get('/api/key', (req, res) => {
    res.json({ key: generateKey() });
});

app.use(express.static('.'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
