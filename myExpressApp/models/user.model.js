'use strict';

const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
    nombre: String,
    apellido: String
});
// BeneficiarySchema.swaggerName = 'Beneficiary';
module.exports = mongoose.model('user', UserSchema);
