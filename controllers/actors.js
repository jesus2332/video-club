const express = require('express');
const {Actor} = require('../db');


function create(req,res,next){
    const name =req.body.name;
    const lastName = req.body.lastName;

    Actor.create({
        name:name,
        lastName:lastName    
    })
    .then(object => res.json(object))
    .catch(err => res.send(err))

}

function list(req,res,next){
    Actor.findAll()
    .then(objects => res.json(objects))
    .catch(err => res.send(err))
}
//buscar
function index(req,res,next){
    const id = req.params.id;
    Actor.findByPk(id)
    .then(object => res.json(object))
    .catch(err => res.send(err))
}

function replace(req,res,next){
    const id = req.params.id;
    Actor.findByPk(id)
    .then(object =>{
        const name = req.body.name ? req.body.name: "";
        const lastName = req.body.lastName ? req.body.lastName : "";
        object.update({
            name : name,
            lastName:lastName
        }).then(obj => res.json(obj))
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
    

}
function update(req,res,next){
    const id = req.params.id;
    Actor.findByPk(id).then(object => {
        const name = req.body.name ? req.body.name: object.name;
        const lastName = req.body.lastName ? req.body.lastName : objectlastName;
        object.update({name:name,lastName:lastName})
        .then(obj => res.json(obj))
        .catch(err => res.send(err))


    })
    .catch(err => res.send(err));
}

function destroy(req,res,next){
    const id = req.params.id;
    Actor.destroy({where: {id:id}})
    .then(object => res.json(object))
    .catch(err => res.send(err));
}


module.exports ={
    list,
    index,
    create,
    replace,
    update,
    destroy
};