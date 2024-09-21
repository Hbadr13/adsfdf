const cors = require('cors');
const express = require('express');
const app = express();

const hundredNames = require('./names/1-hundred.json');
const thousandNames = require('./names/1-thousand.json');
const oneHundredThousandNames = require('./names/100-thousand.json');
const millionNames = require('./names/1-million.json');
const tenMillionNames = require('./names/10-million.json');

app.use(express.json());
app.use(cors());

/**
 * Helper function to handle pagination, sorting, and most frequent names
 */
const handleNamesRoute = (namesArray, req, res, calculateFrequent = true) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5000;
    const start = (page - 1) * limit;
    const end = start + limit;

    // Sort names alphabetically
    namesArray.sort((a, b) => a.localeCompare(b));

    // Slice the subset for the requested page
    const namesSubset = namesArray.slice(start, end);

    // Count occurrences of each name


    let mostFrequentNames = [];
    if (calculateFrequent) {
        // Get the top 3 most frequent names
        const nameCounts = namesArray.reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {});
        mostFrequentNames = Object.entries(nameCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 3)
            .map(([name, count]) => ({ name, count })); // Return name and count as an object
    }

    // Prepare info object including the total length and the most frequent names
    const info = {
        length: namesArray.length,
        mostFrequentNames
    };

    // Send the response
    res.status(200).json({ list: namesSubset, info });
};

// Routes
app.get('/1-hundred-names', (req, res) => {
    handleNamesRoute(hundredNames, req, res);
});

app.get('/1-thousand-names', (req, res) => {
    handleNamesRoute(thousandNames, req, res);
});

app.get('/100-thousand-names', (req, res) => {
    handleNamesRoute(oneHundredThousandNames, req, res);
});

app.get('/1-million-names', (req, res) => {
    handleNamesRoute(millionNames, req, res);
});

app.get('/10-million-names', (req, res) => {
    handleNamesRoute(tenMillionNames, req, res, false); // Disable most frequent names calculation
});

app.listen(3333, () => {
    console.log('Server running on http://localhost:3333');
});
