var express = require('express');
var router = express.Router();
const User = require('../models/user.model')

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
router.get('/', async function (req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

/* POST */
router.post('/', function (req, res) {
  if (!req.body.nombre || !req.body.apellido) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: 'El campo nombre y apellido son requeridos'
    };
  } else {
    if (usuario.nombre !== '' || usuario.apellido !== '') {
      respuesta = {
        error: true,
        codigo: 503,
        mensaje: 'El usuario ya fue creado previamente'
      };
    } else {
      usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
      };
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario creado',
        respuesta: usuario
      };
    }
  }
  res.send(respuesta);
});

/* PUT */
router.put('/', function (req, res) {
  if (!req.body.nombre || !req.body.apellido) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: 'El campo nombre y apellido son requeridos'
    };
  } else {
    if (usuario.nombre === '' || usuario.apellido === '') {
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'El usuario no ha sido creado'
      };
    } else {
      usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
      };
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario actualizado',
        respuesta: usuario
      };
    }
  }
  res.send(respuesta);
});

/* DELETE */
router.delete('/', function (req, res) {
  if (usuario.nombre === '' || usuario.apellido === '') {
    respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'El usuario no ha sido creado'
    };
  } else {
    usuario = {
      nombre: '',
      apellido: ''
    };
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Usuario eliminado'
    }
  }
  res.send(respuesta);
});

module.exports = router;
