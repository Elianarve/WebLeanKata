// Importa los módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

// Configura Express
const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:5174/tu_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Ruta para el registro de usuarios
app.post('/api/register', async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    
    // Verificar si el usuario ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear un nuevo usuario
    const newUser = new User({ email, contraseña: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error al registrar al usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en ejecución en el puerto ${PORT}`));
