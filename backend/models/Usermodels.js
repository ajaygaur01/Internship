const mongoose = require('mongoose');

const UsermodelSchema = mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },

}, { timestamps: true });
const Userschema = mongoose.model('Userschema', UsermodelSchema);
module.exports = Userschema;