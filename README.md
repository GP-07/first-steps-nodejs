# Proyecto NodeJS - Express

Página tutorial usada para la inicialización del proyecto:
[Iniciar-Proyecto-NodeJS](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial)\
Página tutorial usada para crear la API REST:
[Inicar-API-REST](https://medium.com/@asfo/desarrollando-una-sencilla-api-rest-con-nodejs-y-express-cab0813f7e4b)\
\
Links utiles de MongoDB:\
Post MongoDB interesante sobre validaciones: [Document Validation Rules](https://www.mongodb.com/blog/post/adding-document-validation-rules-using-mongodb-compass-15)\
Post tutorial para encontrar el schema de una Collection: [Schmea of a Collection](https://medium.com/@ahsan.ayaz/how-to-find-schema-of-a-collection-in-mongodb-d9a91839d992)\
Manual de MongoDB - Create Collection: [db.createCollection](https://docs.mongodb.com/manual/reference/method/db.createCollection/)\
Manual de MongoDB - Schema Validation: [Schema Validation](https://docs.mongodb.com/manual/core/schema-validation/)\
Post sobre integración de NodeJS-Express con MongoDB: [Integracion NodeJS-MongoDB](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)\
Otro post sobre integración de NodeJS-Express con MongoDB: [Integracion NodeJS-MongoDB](https://dev.to/beznet/build-a-rest-api-with-node-express-mongodb-4ho4)

## Express
Express es muy usado para buildear y correr aplicaciones nodeJS.
1. Para instalar Express: `npm install -g express-generator`
2. Para iniciar un proyecto con Express: `express myExpressApp --view pug`
3. Seguir las instrucciones que se imprimen por pantalla luego de haber creado el proyecto:
> change directory:\
> $ cd myExpressApp\
> install dependencies:\
> $ npm install\
> run the app:\
> $ DEBUG=myexpressapp:* npm start
4. Para correr el proyecto: `npm start`. En pantalla se imprime lo siguiente:
> myexpressapp@0.0.0 start C:\Users\GP07\Documents\Proyectos_Personales\nodejs\first-steps-nodejs\myExpressApp
> node ./bin/www
5. Abrir el browser para probar que se haya levantado correctamente

## Creación de una API REST
1. Instalar el parser para los request: `npm install body-parser --save`
2. Agregar lo siguiente en la `app.js` para incluir el parser:
```JavaScript
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```
3. Instalar CORS: `npm install cors`. Ver el siguiente [link](https://expressjs.com/en/resources/middleware/cors.html)
4. Agregar lo siguiente en la `app.js` para incluir CORS:
```JavaScript
var cors = require('cors');
app.use(cors());
```
5. Se desarrolla la API. Puede ser dentro de `app.js` o dentro de los routes, por ejemplo, `routes/users.js`, como en este caso.
Ejemplo de código para una API:
```JavaScript
var express = require('express');
var router = express.Router();

// NOTA: Modelo que se usara:
let usuario = {
  nombre: '',
  apellido: ''
};
let respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
};

/* GET */
router.get('/', function (req, res) {
  respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
  };
  if (usuario.nombre === '' || usuario.apellido === '') {
    respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'El usuario no ha sido creado'
    };
  } else {
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'respuesta del usuario',
      respuesta: usuario
    };
  }
  res.send(respuesta);
});
```
Para mas detalle, por favor, remitirse al archivo: [users.js](./myExpressApp/routes/users.js)

### Creación de archivo Environment
1. Para crear un archivo Environment donde se pueda guardar URLs y configuraciones distintas segun el ambiente en donde se este desplegando la app, se siguieron las indicaciones que figuran en esta página:  
https://codeburst.io/how-to-easily-set-up-node-environment-variables-in-your-js-application-d06740f9b9bd  
Se describirá brevemente a continuación.
2. Se agrega lo siguiente en el archivo `.gitignore`:  
```.env```
3. Se crea el archivo `.env.default`, en la raiz del proyecto, con la siguiente estructura (varia dependiendo las necesidades de cada proyecto):  
```JavaScript
NODE_ENV=

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```
4. Se crea el archivo `.env`, en la raiz del proyecto, con la siguiente estructura (varia dependiendo las necesidades de cada proyecto):  
```JavaScript
NODE_ENV=development
PORT=8080
```
5. Se instala la dependencia para poder leer el archivo: `npm install dotenv --save`
6. En el archivo `app.js` se agrega la dependencia para poder leer las configuraciones desde este tipo de archivos:  
```JavaScript
require('dotenv').config();
```
7. Con esto ya se puede leer configuraciones de la siguiente manera (Se muestra el caso que motivo incluir esto :: Cambiar el puerto en el que se levanta la aplicación):  
```JavaScript
console.log("Puerto utilizado: " + process.env.PORT);
app.set('port', process.env.PORT || 8080);
```

## Instalar y correr MongoDB localmente
1. Bajar el binario de instalación de la página de [MongoDB](https://www.mongodb.com/download-center/community)
2. Seguir las instrucciones que figuran en este [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
3. Luego de reiniciar, levantar el servicio "MongoDB Server"
4. Agregar el directorio de instalación (por ejemplo, `C:\Program Files\MongoDB\Server\4.2\bin`) a la variable de entorno `PATH`.
Esto es para poder conectarse a la BD usando la terminal.

### Administración de la BD local - Opción 1 - MongoDB Compass
1. Ingresar a MongoDB Compass. Compass es el IDE o el cliente de base de datos que ofrece Mongo.
2. Setear la conexión siguiendo las instrucciones que figuran en este [link](https://zellwk.com/blog/local-mongodb/)
3. Hacer click en MyCluster en la barra de la izquierda, luego `CREATE DATABASE`
4. Escribir el nombre de la base de datos a crear y un nombre para la primera Collection a crear dentro de la nueva base de datos (es requisito crear al menos una Collection)
5. <<TODO: SEGUIR INVESTIGANDO LAS POSIBILIDADES QUE HAY CON EL IDE>>

### Administración de la BD local - Opción 2 - Terminal/Consola/Bash
1. Ingresar a la terminal y tipear `mongo`
> MongoDB shell version v4.2.1\
> connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb\
> Implicit session: session { "id" : UUID("fd04644b-91b2-4405-b474-ee0ee82f09fe") }\
> MongoDB server version: 4.2.1
2. Correr el comando `show databases` para ver las bases de datos disponibles actualmente:
> admin                   0.000GB\
> config                  0.000GB\
> first-mongodb-database  0.000GB\
> local                   0.000GB
3. Seleccionar la base de datos a la que se desea conectar con el comando `use <dbname>`. Por ejemplo, `use first-mongodb-database`
> switched to db first-mongodb-database
4. Una vez dentro de la base de datos, ya se pueden correr comandos propios de mongodb. Por ejemplo, el siguiente comando sería el apropiado para crear una Collection con validaciones:
```JavaScript
db.createCollection("userWithValidation", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      additionalProperties: false,
      properties: {
        _id: {
          bsonType: "objectId",
          description: "id is required"
        },
        nombre: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        apellido: {
          bsonType: "string",
          description: "must be a string and is required"
        },
      }
    }
  }
});
```
Solo si responde con lo siguiente significa que todo funcionó bien:
```JavaScript
{ "ok" : 1 }
```

## Integración NodeJS - MongoDB :: mongoose
1. Instalar mongoose `npm install mongoose`
2. Agregar la configuración y la conexión en el `app.js` de la siguiente manera:
```JavaScript
// NOTA: Agregar el modulo de mongoose para integrar con MongoDB
var mongoose = require('mongoose');

// NOTA: Agregar la configuración de la BD
const settings = {
  host:     process.env.MONGODB_HOST || '127.0.0.1',
  port:     process.env.MONGODB_PORT || '27017',
  db:       process.env.MONGODB_DB || 'first-mongodb-database'
}

// NOTA: Agregar la conexión con la BD
const mongoUrl = 'mongodb://' + settings.host + ':' + settings.port + '/' + settings.db;
mongoose.connect(mongoUrl, { useNewUrlParser: true });
```
 Aclaración: Probablemente se pueda mejorar y encapsular dentro de una función pero por ahora se lo dejará así ya que de esta forma funciona y se puede continuar avanzando.
3. Definir un esquema. Ejemplo: dentro de la carpeta `models` se creó el archivo `user.model.js` para definir el esquema que se usará para los usuarios:
```JavaScript
'use strict';

const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String, 
        required: true
    }
});
// BeneficiarySchema.swaggerName = 'Beneficiary';
module.exports = mongoose.model('user', UserSchema);
```
 Aclaración: Por favor, desestimar las líneas comentadas que fueron extraídas de otro código y posiblemente no apliquen para este caso.
4. Usar el esquema recién definido en la API. Por ejemplo, dentro de `routes/users.js` se lo usa así:
```JavaScript
/* GET */
router.get('/', async function (req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});
```
5. TODO: Continuar avanzando en la integración de NodeJS y MongoDB...