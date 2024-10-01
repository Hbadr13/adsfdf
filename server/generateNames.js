const { faker } = require('@faker-js/faker');
const fs = require('fs');

const generateNames = ({ length }) => {
    console.log(`Starting to generate ${length} names...`);
    const names = [];

    for (let i = 0; i < length; i++) {
        const fullName = faker.person.firstName() + ' ' + faker.person.lastName();
        names.push(fullName);
    }

    console.log(`Generated ${length} names successfully.`);
    return names;
};

const length = 10000000;
const names = generateNames({ length });

// Write names to file
console.log(`Writing ${length} names to file...`);
fs.writeFileSync('names/10-million.json', JSON.stringify(names, null, 2));
console.log(`Successfully written names to 'names/10-million.json'.`);
