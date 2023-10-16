// const path = require('path');
// require('dotenv').config({path: path.join(__dirname, '.env')});
// // const apiKey = process.env.PGHOST

// console.table(process.env.PGUSER);

// console.log('API Key:', apiKey);

const result = require('dotenv').config();

console.table(result);

if(result.error) {
    console.error(result.error);
}