const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Courier API',
      version: '1.0.0',
      description: 'API documentation for Courier MVP',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./routes/*.js'], // 👈 path to your route files
};

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Courier Tracking API',
    version: '1.0.0',
  },
  servers: [{ url: 'http://localhost:3000' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};


const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
