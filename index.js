// const express = require('express'); // commonjs version
import express from 'express'; // ES6 version
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// conectar a la base de datos
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Todos estos son middlewares
// "next" es una función que permite que siga el flujo de la petición

// Defino el puerto
const port = process.env.PORT || 3000;

// Defino el motor de plantillas
app.set('view engine', 'pug');

// Obtengo el año actual
app.use((req, res, next) => {
    // locals es un objeto que permite tener variables globales
    res.locals.CurrentYear = new Date().getFullYear();
    res.locals.CurrentSite = "Agencia de viajes";
    next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Defino las carpetas publica y las views
app.use(express.static('public'));
app.set('views', './views');

// Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})