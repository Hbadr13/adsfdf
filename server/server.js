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


const handleNamesRoute = (namesArray, req, res, calculateFrequent = true) => {
    const page = parseInt(req.query.page) || 1;
    const character = (req.query.character || 'A')
    const limit = parseInt(req.query.limit) || 5000;
    const start = (page - 1) * limit;
    const end = start + limit;

    namesArray.sort((a, b) => a.localeCompare(b));

    const namesSubset = namesArray.slice(Array.from(namesArray).findIndex((it) => String(it[0]).toUpperCase() == character)).slice(start, end);
    console.log(namesSubset, start, end)


    let mostFrequentNames = [];
    if (calculateFrequent) {
        const nameCounts = namesArray.reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {});
        mostFrequentNames = Object.entries(nameCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 3)
            .map(([name, count]) => ({ name, count }));
    }

    const info = {
        length: namesArray.length,
        mostFrequentNames
    };

    res.status(200).json({ list: namesSubset, info });
};

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
    handleNamesRoute(tenMillionNames, req, res, false);
});

app.listen(3333, () => {
    console.log('Server running on http://localhost:3333');
});
