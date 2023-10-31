const express = require('express');
const Director = require('../models/director');
const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Actor = require('../models/actor');

async function create(req, res, next) {
    const title = req.body.title;
    const directorId = req.body.directoId;
    const genreId = req.body.genreId; 
    const actorIds = req.body.actorIds;

    let director = await Director.findOne({ "_id": directorId });
    let genre = await Genre.findOne({ "_id": genreId });
    let actors = await Actor.find({ "_id": { $in: actorIds } });

    let movie = new Movie({
        title: title,
        director: director,
        genre: genre,
        actors: actors
    });

    movie.save().then(obj => res.status(200).json({
        msg: "Movie created",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "Error creating movie",
        obj: ex
    }))
}

function list(req, res, next) {
    Movie.find()
        .populate('_director')
        .populate('_genre')
        .populate('_actors')
        .then(objs => res.status(200).json({
            msg: "Movies list",
            obj: objs
        }))
        .catch(ex => res.status(500).json({
            msg: "Error listing movies",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;
    Movie.findOne({ "_id": id })
        .populate('_director _genre _actors')
        .then(movie => {
            if (movie) {
                res.status(200).json({
                    msg: `Detalles de la película con el id ${id}`,
                    obj: movie
                });
            } else {
                res.status(404).json({
                    msg: `Película con el id ${id} no encontrada`,
                    obj: null
                });
            }
        })
        .catch(ex => res.status(500).json({
            msg: "Error al consultar detalles de la película",
            obj: ex
        }));
}

async function replace(req, res, next) {
    try {
        const id = req.params.id;
        const { title, directoId, genreId, actorIds } = req.body;

        const updatedFields = {};

        if (title) {
            updatedFields._title = title;
        }

        if (directoId) {
            updatedFields._director = directoId;
        }

        if (genreId) {
            updatedFields._genre = genreId;
        }

        if (actorIds) {
            updatedFields._actors = actorIds;
        }

        const movie = await Movie.findOne({ "_id": id });
        if (!movie) {
            return res.status(404).json({
                msg: `Película con el ID ${id} no encontrada`,
                obj: null
            });
        }

        const director = await Director.findOne({ _id: updatedFields._director });
        if (!director) {
            return res.status(404).json({
                msg: "Director no encontrado",
                obj: null
            });
        }

        const genre = await Genre.findOne({ "_id": updatedFields._genre });
        if (!genre) {
            return res.status(404).json({
                msg: "Género no encontrado",
                obj: null
            });
        }

        const actors = await Actor.find({ "_id": { $in: updatedFields._actors } });

        if (actors.length !== updatedFields._actors.length) {
            return res.status(404).json({
                msg: "Alguno de los actores no encontrado",
                obj: null
            });
        }

        Object.assign(movie, updatedFields);

        const updatedMovie = await movie.save();

        res.status(200).json({
            msg: `Película reemplazada correctamente, con el ID: ${id}`,
            obj: updatedMovie
        });
    } catch (ex) {
        res.status(500).json({
            msg: "Error al reemplazar la película",
            obj: ex
        });
    }
}




function update(req, res, next) {
    const id = req.params.id;
    const updatedFields = {};

    if (req.body.title) {
        updatedFields.title = req.body.title;
    }

    if (req.body.directoId) {
        updatedFields.director = req.body.directoId;
    }

    if (req.body.genreId) {
        updatedFields.genre = req.body.genreId;
    }

    if (req.body.actorIds) {
        updatedFields.actors = req.body.actorIds;
    }

    Movie.findOne({ "_id": id })
        .then(movie => {
            if (!movie) {
                return res.status(404).json({
                    msg: `Película con el ID ${id} no encontrada`,
                    obj: null
                });
            }

            Director.findOne({ _id: updatedFields.director })
                .then(director => {
                    if (!director) {
                        return res.status(404).json({
                            msg: "Director no encontrado",
                            obj: null
                        });
                    }

                    Genre.findOne({ "_id": updatedFields.genre })
                        .then(genre => {
                            if (!genre) {
                                return res.status(404).json({
                                    msg: "Género no encontrado",
                                    obj: null
                                });
                            }

                            Actor.findOne({ "_id": { $in: updatedFields.actors } })
                                .then(actors => {
                                    if (!actors) {
                                        return res.status(404).json({
                                            msg: "Ninguno de los actores se encontró",
                                            obj: null
                                        });
                                    }
                                    Object.assign(movie, updatedFields);

                                    movie.save()
                                        .then(updatedMovie => {
                                            res.status(200).json({
                                                msg: `Película actualizada correctamente, con el ID: ${id}`,
                                                obj: updatedMovie
                                            });
                                        })
                                        .catch(ex => res.status(500).json({
                                            msg: "Error al actualizar la película",
                                            obj: ex
                                        }));
                                })
                                .catch(ex => res.status(500).json({
                                    msg: "Error al buscar actores",
                                    obj: ex
                                }));
                        })
                        .catch(ex => res.status(500).json({
                            msg: "Error al buscar el género",
                            obj: ex
                        }));
                })
                .catch(ex => res.status(500).json({
                    msg: "Error al buscar el director",
                    obj: ex
                }));
        })
        .catch(ex => res.status(500).json({
            msg: "Error al buscar la película",
            obj: ex
        }));
}




function destroy(req, res, next) {
    const id = req.params.id;
    Movie.findOneAndRemove({ "_id": id })
        .then(movie => {
            if (movie) {
                res.status(200).json({
                    msg: `Película eliminada correctamente, con el id: ${id}`,
                    obj: movie
                });
            } else {
                res.status(404).json({
                    msg: `Película con el id ${id} no encontrada`,
                    obj: null
                });
            }
        })
        .catch(ex => res.status(500).json({
            msg: "Error al eliminar la película",
            obj: ex
        }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
