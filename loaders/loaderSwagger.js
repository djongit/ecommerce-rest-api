// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const swaggerOptions = require('../swagger.json');
// const specs = swaggerJsdoc(swaggerOptions);

// module.exports = (app) => {
//     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// };


const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../swagger.json');
const specs = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  // Log Swagger JSON specs for debugging
//   console.log(JSON.stringify(specs, null, 2));

  // Handle errors in Swagger setup
  swaggerUi.setup(specs, { explorer: true, customCss: '.swagger-ui .topbar { display: none }' });
};