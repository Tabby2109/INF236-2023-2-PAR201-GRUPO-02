const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require('mongoose');
//prueba
const bodyParser = require('body-parser');
//prueba
const db = require("./Database");

const app = express();

//add usuario
const usuarioSchema = new mongoose.Schema({
  usuario: String,
  contrasena: String,
  tipo: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/crear-usuario', async (req, res) => {
  const { usuario, contrasena, tipo } = req.body;

  try {
    const nuevoUsuario = new Usuario({ usuario, contrasena, tipo });
    await nuevoUsuario.save();

    res.status(200).send('Usuario creado exitosamente');
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).send('Error al crear el usuario');
  }
});

app.post('/api/verificar-credenciales', async (req, res) => {
  const { usuario, contrasena, tipo } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ usuario, contrasena, tipo });

    if (usuarioExistente) {
      res.status(200).send('Credenciales válidas. Redireccionando...');
    } else {
      res.status(401).send('Credenciales inválidas. Inténtalo de nuevo.');
    }
  } catch (error) {
    console.error('Error al verificar las credenciales:', error);
    res.status(500).send('Error al verificar las credenciales');
  }
});
//add usuario

//inicio reservar horas administracion
const reservaSchema = new mongoose.Schema({
  usuario: String,
  dia: String,
  hora: Number,
  minuto: Number
});

const Reserva = mongoose.model('Reserva', reservaSchema);




app.set("port", process.env.PORT || 5000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

db();

// Define una carpeta para archivos estáticos como CSS y JS
app.use(express.static(__dirname + "/public"));

// Define una ruta para la página principal
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/paciente.html', (req, res) => {
  res.sendFile(__dirname + "/paciente.html");
});

app.get('/administracion.html', (req, res) => {
  res.sendFile(__dirname + "/administracion.html");
});

app.get('/medico.html', (req, res) => {
  res.sendFile(__dirname + "/medico.html");
});


app.listen(app.get("port"), () => {
  console.log(`Servidor está corriendo en el puerto: ${app.get("port")}`);
});
