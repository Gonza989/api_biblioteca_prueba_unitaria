const express = require("express");
const app = express();
const usuariosRouter = require("./routes/usuarios"); // Importar usuariosRouter

require('dotenv').config();

const { auth } = require("express-oauth2-jwt-bearer");
const errorHandler = require("./middlewares/errorHandler");

// Otros middlewares y configuraciones...

app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes JSON

// Montar el enrutador de usuarios para manejar las solicitudes relacionadas con usuarios
app.use('/api/usuarios', usuariosRouter); // Usar usuariosRouter importado anteriormente

// Importamos el Router de Libros
const librosRouter = require("./routes/libros"); // Definir librosRouter

// Configuracion Middleware con el Servidor de Autorización 
const autenticacion = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_URL,
  tokenSigningAlg: "RS256",
});

//Configuramos el middleware de autenticacion
app.use("/api/libros", autenticacion, librosRouter); // Usar app para agregar middleware

// ... (otras configuraciones y middlewares)

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});

module.exports = app;