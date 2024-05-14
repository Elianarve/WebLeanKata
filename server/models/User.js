// Importa los módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
require('dotenv').config(); // Importa el paquete dotenv para cargar variables de entorno

// Configura Express
const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(`mongodb://localhost:5174/${process.env.DB_DEV_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Define el esquema del usuario
const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  }
});

// Define el modelo de usuario
const User = mongoose.model('User', userSchema);

// Ruta para el registro de usuarios con validación de datos
app.post(
  '/api/register',
  body('email').isEmail(),
  body('contraseña').isLength({ min: 6 }),
  async (req, res) => {
    try {
      const { nombre, email, contraseña } = req.body;

      // Verifica si hay errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Verificar si el usuario ya está registrado
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya está registrado' });
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(contraseña, 10);

      // Crear un nuevo usuario
      const newUser = new User({ nombre, email, contraseña: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'Registro exitoso' });
    } catch (error) {
      console.error('Error al registrar al usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

// Ruta para la autenticación de usuarios
app.post('/api/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Buscar al usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Puerto del servidor
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));
