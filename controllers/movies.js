const express = require('express');
const {Movie,Actor} = require('../db');


function create(req,res,next){
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    Movie.create({
        title: title,
        genreId:genreId,
        directorId:directorId
    }).then(object  => res.json(object))
    .catch(err => res.send(err));
}

function list(req,res,next){
    Movies.findAll({include: ['genre','director','actors']})
        .then(object  => res.json(object))
        .catch(err => res.send(err))
}

function index(req,res,next){
    res.send('Movies index');
}

function replace(req,res,next){
    res.send('Movies replace');
}
function update(req,res,next){
    res.send('Movies update');
}

function destroy(req,res,next){
    res.send('Movies destroy');
}

function addActor(req,response,next){
    const idMovie = req.body.idMovie;
    const idActor = req.body.idActor;

    Movie.findByPk(idMovie).then(movie =>{
        Actor.findByPk(idActor).then(actor =>{
            movie.addActor(actor);
            res.json(movie);
        }).catch(err => res.send(err));
    }).catch(err => res.send(err));
}

module.exports ={
    list,
    index,
    create,
    replace,
    update,
    destroy,
    addActor
};


