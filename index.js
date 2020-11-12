const express = require('express');
require('dotenv').config();                    // configracion variables de entorno
const cors = require('cors');                 
const {dbConnection} = require('./db/config');  // configuracion de conexion a db
// importacion de rutas
const authRoutes = require('./routes/auth');


// Crear el servidor de express
const app = express();

// Base de Datos conexion
dbConnection();
// CORS
app.use(cors());
// Directorio publico use es un middleware que se ejecuta cuando hay una solicitud
app.use(express.static('public'));
// Lectura y parseo del body no necesitamos bodyParser.json()
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});




// Notas: en package.json configure dos comando npm start para produccion
// y npm dev para desarrollo con nodemon pero se llama npm run dev solo start
// se llama sin run
// nodemon los instalamos global ejecutamos la consola como admin 
// npm install nodemon -g 