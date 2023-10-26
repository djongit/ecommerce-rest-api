
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')}); // explicitly attach .env file. 

module.exports = {
    PORT: process.env.PORT,
    DB: {
      PGHOST: process.env.PGHOST || 'localhost',
      PGUSER: process.env.PGUSER,
      PGDATABASE: process.env.PGDATABASE,
      PGPASSWORD: process.env.PGPASSWORD,
      PGPORT: process.env.PGPORT
    },
    SESSION_SECRET: process.env.SESSION_SECRET
  };

//   console.table(module.exports);
// console.table(process.env.PGUSER);