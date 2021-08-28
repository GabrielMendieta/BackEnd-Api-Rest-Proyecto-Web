const express = require('express')
const Triller = require('../models/trillers_model')
const Joi = require('@hapi/joi');
const ruta = express.Router();

ruta.get('/', (req,res)=>{
    let resultado = listarTrillerActivos();
    resultado.then(triller =>{
        res.json(triller)
    }).catch(err =>{
        res.status(400).json({
            error: err
        });
    });
    
});

ruta.post('/', (req,res)=>{
    let body = req.body;
    let resultado = crearTriller(body);

    resultado.then( trill => {
        res.json({
            valor: trill
        })
    }).catch( err => {
        res.status(400).json({
            error: err
        });
    });
})

ruta.put('/nombre', (req,res)=>{
    let resultado = actualizarTriller(req.params.nombre, req.body);
    resultado.then(valor => {
        res.json({
            valor: valor
        })
    }).catch(err =>{
        res.status(400).json({
            error: err
        });
    });
});

ruta.delete('/:nombre', (req, res)=>{
    let resultado = desactivarTriller(req.params.nombre);
    resultado.then(valor => {
        res.json({
            triller: valor
        })
    }).catch(err =>{
        res.status(400).json({
            error: err
        })
    })

})

async function crearTriller(body){
    let triller = new Triller({
        nombre      :body.nombre,
        link        :body.link,
        descripcion :body.descripcion,
        image       :body.image
    })
    return await triller.save();
}

async function listarTrillerActivos(){
    let triller = await Triller.find({"estado":true})
    return triller;
}

async function actualizarTriller(nombre, body){
    let triller = await Triller.findOneAndUpdate({"nombre":nombre}, {
        $set: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            link: body.link
        }

    }, {new: true});
    return triller;
}

async function desactivarTriller(nombre){
    let triller = await Triller.findOneAndUpdate({"nombre":nombre}, {
        estado: false
    }, {new: true});
    return triller;
}


module.exports = ruta;