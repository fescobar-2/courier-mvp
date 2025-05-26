require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const packageRoutes = require('./routes/package');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerSpec');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
