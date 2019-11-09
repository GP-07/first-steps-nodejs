# Proyecto NodeJS - Express

Página tutorial usada para la inicialización del proyecto:
[Iniciar-Proyecto-NodeJS](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial)
Página tutorial usada para crear la API REST:
[Inicar-API-REST](https://medium.com/@asfo/desarrollando-una-sencilla-api-rest-con-nodejs-y-express-cab0813f7e4b)

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

## Para hacer una API REST
1. Instalar el parser para los request: `npm install body-parser --save`
2. Agregar lo siguiente en la app.js para incluir el parser:
> const bodyParser = require('body-parser');\
> app.use(bodyParser.urlencoded({ extended: false }));\
> app.use(bodyParser.json());\
3. Se desarrolla la API. Puede ser dentro de `app.js` o dentro de los routes, por ejemplo, `routes/users.js`, como en este caso.
Para mas detalle, por favor, remitirse al codigo del archivo `routes/users.js`.