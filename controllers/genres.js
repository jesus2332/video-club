const express = require('express');
const Genre = require('../models/genre');

function create(req, res, next) {    
    const description = req.body.description;

    let genre = new Genre({
     description:description
    });
    genre.save().then(obj => res.status(200).json({
        message: 'Genre creado correctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        message: 'Error al crear genre',
        obj: ex
    }));

}

function list(req, res, next) {
    Genre.find().then(objs=> {
        res.status(200).json({
            message: 'genre obtenidos correctamente',
            obj: objs
        })
    }).catch(ex => res.status(500).json({
        message: 'Error al obtener genrees',
        obj: ex
    }));

}

function index(req, res, next) {    
    const id=req.params.id;
    Genre.findOne({"_id":id}).then(obj => {
        res.status(200).json({
            message: `genre con id ${id} obtenido correctamente`,
            obj: obj
        })
    }
    ).catch(ex => res.status(500).json({
        message: `Error al obtener genre con id ${id}`,
        obj: ex
    }));
}

function replace(req, res, next) {    
    const id = req.params.id;
    let description = req.body.description ? req.body.description : '';
  
    let genre = new Object({

        _description:description
    });

    Genre.findOneAndUpdate({"_id":id}, genre, {new:true})
    .then(obj => {res.status(200).json({
            message: `genre con id ${id} reemplazad0 correctamente`,
            obj: obj
        }).catch(ex => res.status(500).json({
            message: `Error al reemplazar genre con id ${id}`,
            obj: ex
        }));
    });
}



function update(req, res, next) {
    const id = req.params.id;
    let description = req.body.description;
   
    let genre = new Object();
    if(description) genre._description = description;

    Genre.findOneAndUpdate({"_id":id}, genre)
    .then(obj => {res.status(200).json({
            message: `genre con id ${id} actualizado correctamente`,
            obj: obj
        }).catch(ex => res.status(500).json({
            message: `Error al actualizar genre con id ${id}`,
            obj: ex
        }));
    });

}

function destroy(req, res, next) {
    const id = req.params.id;
    Genre.findByIdAndRemove(id).then(obj => {
        res.status(200).json({
            message: `genre con id ${id} eliminado correctamente`,
            obj: obj
        })
    }
    ).catch(ex => res.status(500).json({
        message: `Error al eliminar genre con id ${id}`,
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