var express = require('express');
var router = express.Router();
const User = require('../models/user.model')

/* GET */
router.get('/', async function (req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* POST */
router.post('/', async function (req, res) {
  const user = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* PUT */
// Update one subscriber
router.put('/:id', getUser, async (req, res) => {
  res.user.nombre = req.body.nombre;
  res.user.apellido = req.body.apellido;
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* GET */
// Get one subscriber
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
})

/* DELETE */
// Delete one subscriber
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Deleted this user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cant find user'});
    }
  } catch(err){
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
