const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db/index');
const { PORT } = require('./conf');
const productRouter = require ('./routes/routesIndex');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const startServer = async () => {
 productRouter(app);
app.listen(PORT, () => {
  console.log(`All yours at port ${PORT}`);
})
};

startServer();



