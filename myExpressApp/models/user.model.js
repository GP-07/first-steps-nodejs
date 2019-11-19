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
