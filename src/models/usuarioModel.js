const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/biblioteca", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  // ... (otros campos de usuario)
}, { collection: 'usuarios' });

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;