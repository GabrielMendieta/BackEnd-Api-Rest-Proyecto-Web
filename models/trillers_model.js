const mongoose = require('mongoose');

const trillersSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require: true
    },
    link:{
        type:String,
        require: true
    },
    descripcion:{
        type:String,
        require: true
    },
    image:{
        type:String,
        require: true
    },
    estado:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('Trillers', trillersSchema)

