// index.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const sequelize = require('./src/config/database');

const app = express();

// Configurar sesión
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Configurar Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
});
