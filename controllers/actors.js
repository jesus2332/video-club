const express = require('express');
const Actor = require('../models/actor');

function create(req, res, next) {    
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Actor({
        name: name,
        lastName: lastName
    });
    actor.save().then(obj => res.status(200).json({
        message: 'Actor creado correctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        message: 'Error al crear Actor',
        obj: ex
    }));

}

function list(req, res, next) {
    Actor.find().then(objs=> {
        res.status(200).json({
            message: 'Actor obtenidos correctamente',
            obj: objs
        })
    }).catch(ex => res.status(500).json({
        message: 'Error al obtener Actores',
        obj: ex
    }));

}

function index(req, res, next) {    
    const id=req.params.id;
    Actor.findOne({"_id":id}).then(obj => {
        res.status(200).json({
            message: `Actor con id ${id} obtenido correctamente`,
            obj: obj
        })
    }
    ).catch(ex => res.status(500).json({
        message: `Error al obtener Actor con id ${id}`,
        obj: ex
    }));
}

function replace(req, res, next) {    
    const id = req.params.id;
    let name = req.body.name ? req.body.name : '';
    let lastName = req.body.lastName ? req.body.lastName : '';
    let actor = new Object({
        _name: name,
        _lastName: lastName
    });

    Actor.findOneAndUpdate({"_id":id}, actor, {new:true})
    .then(obj => {res.status(200).json({
            message: `actor con id ${id} reemplazad0 correctamente`,
            obj: obj
        }).catch(ex => res.status(500).json({
            message: `Error al reemplazar actor con id ${id}`,
            obj: ex
        }));
    });
}



function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let actor = new Object();
    if(name) actor._name = name;
    if(lastName) actor._lastName = lastName;

    Actor.findOneAndUpdate({"_id":id}, actor)
    .then(obj => {res.status(200).json({
            message: `actor con id ${id} actualizado correctamente`,
            obj: obj
        }).catch(ex => res.status(500).json({
            message: `Error al actualizar actor con id ${id}`,
            obj: ex
        }));
    });

}

function destroy(req, res, next) {
    const id = req.params.id;
    Actor.findByIdAndRemove(id).then(obj => {
        res.status(200).json({
            message: `actor con id ${id} eliminado correctamente`,
            obj: obj
        })
    }
    ).catch(ex => res.status(500).json({
        message: `Error al eliminar actor con id ${id}`,
        obj: ex
    }));
}

module.exports={
    list,
    index,
    create,
    replace,
    update,
    destroy
}