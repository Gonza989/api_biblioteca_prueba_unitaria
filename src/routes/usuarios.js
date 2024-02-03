const express = require('express');
const router = express.Router();

// Manejador de ruta para la solicitud GET a /api/usuarios
//router.get('/', (req, res) => {
//  // Lógica para manejar la solicitud GET a /api/usuarios
//  res.send('Responder con la lista de usuarios');
//});

router.get('/', (req, res) => {
    res.json(usuarios);
  });

// Array de ejemplo de usuarios
const usuarios = [
  { id: 1, nombre: 'Usuario 1' },
  { id: 2, nombre: 'Usuario 2' },
  { id: 3, nombre: 'Usuario 3' }
];

// Definir la ruta GET /usuarios
router.get('/', (req, res) => {
  res.json(usuarios);
});

// Definir la ruta GET /usuarios/:id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const usuario = usuarios.find(u => u.id === parseInt(id));
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Definir la ruta POST /usuarios
router.post('/', (req, res) => {
  // Lógica para crear un nuevo usuario
  const nuevoUsuario = req.body;
  // Generar un nuevo ID para el usuario
  const nuevoID = usuarios.length + 1;
  const usuarioConID = { id: nuevoID, ...nuevoUsuario };
  // Agregar el nuevo usuario al array usuarios
  usuarios.push(usuarioConID);
  // Devolver el nuevo usuario en formato JSON
  res.json(usuarioConID);
});

// Definir la ruta PUT /usuarios/:id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const usuarioActualizado = req.body;
  
  // Encontrar el índice del usuario con el ID especificado en el array usuarios
  const index = usuarios.findIndex(u => u.id === parseInt(id));
  
  if (index !== -1) {
    // Actualizar los datos del usuario en el array usuarios
    usuarios[index] = { ...usuarios[index], ...usuarioActualizado };
    res.json(usuarios[index]); // Devolver el usuario actualizado en formato JSON
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Definir la ruta DELETE /usuarios/:id
router.delete('/:id', (req, res) => {
  // Lógica para eliminar un usuario por su ID
  const id = req.params.id;
  // Aquí puedes agregar lógica para buscar y eliminar el usuario con el ID especificado en tu base de datos o almacenamiento de usuarios
  // Por ahora, vamos a devolver un mensaje indicando que el usuario ha sido eliminado
  res.json({ mensaje: `Usuario con ID ${id} ha sido eliminado` });
});

module.exports = router; // Exportar el enrutador