// Imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
require("ejs");
const { sequelize } = require("./src/database/db");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routes
//app.use('/api', require('./routes/reserva.routes'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404

// Starting the server
app.listen(process.env.PORT, function (req, res) {
    console.log("la app esta escuchando en http://localhost: " + process.env.PORT);
  });
  
  //conexion a la base de datos
  sequelize
    .authenticate()
    .then(() => {
      console.log("nos hemos conectado a la base de datos");
    })
    .catch((error) => {
      console.log("se ha producido un error", error);
    });