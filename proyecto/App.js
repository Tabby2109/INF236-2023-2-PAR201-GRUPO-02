const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const db = require("./Database");

const app = express();

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
  res.sendFile(__dirname + "/pagina.html");
});


app.listen(app.get("port"), () => {
  console.log(`Servidor está corriendo en el puerto: ${app.get("port")}`);
});
