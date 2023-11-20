const express = require('express');
const app = express();
const { PORT } = require('./conf');
const loaders = require ('./loaders');



const startServer = async () => {
  //         -- Start application --
await loaders(app);

 //       --- Start server --
app.listen(PORT, () => {
  console.log(`All yours at port ${PORT}`);
})
};

startServer();



