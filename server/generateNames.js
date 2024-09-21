const { faker } = require('@faker-js/faker');
const fs = require('fs');

const generateNames = ({ length }) => {
    const names = [];

    for (let i = 0; i < length; i++) {
        const fullName = faker.person.firstName() + ' ' + faker.person.lastName();
        names.push(fullName);
    }

    return names;
};

const names = generateNames({ length: 10000000 });

// Write to a JSON file
fs.writeFileSync('1-thousand-names.json', JSON.stringify(names, null, 2));
