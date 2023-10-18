const Sequelize = require('sequelize');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');
const bookingModel = require('./models/booking');
const copyModel = require('./models/copy');


const sequelize = new sequelize('video-club', 'root', 'holamundo',{
    host: '127.0.0.1',
    dialect: 'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);


// un genero tiene muchas peliculas y una peli tiene un genero

Genre.hasMany(Movie, {as: 'movies'});
Movie.belongsTo(Genre, {as: 'genre'});
// Un director puede tener muchas peliculas y una pelicula tiene un director
Director.hasMAny(Movie, {as: 'movies'});
Movie.belongsTo(Director, {as: 'director'});

// un actor aprticipa en muchas peliculas
MovieActor.belongsTo(Movie, {foreingKey: 'movieId'});
MovieActor.belongsTo(Actor, {foreingKey: 'actorId'});

Movie.belongsToMany(Actor, {foreingKey: 'actorId', as: 'actors', trough: 'movies_actors'});
Actor.belongsToMany(Movie, {foreingKey: 'movieId', as: 'movies', trough: 'movies_actors'});

// Un miembro puede tener muchos bookings
Member.hasMany(Booking, {foreignKey: 'memberId',as: 'bookings'});
// Un booking puede tener solo un member
Booking.belongsTo(Member, {as: 'member'});

//Una copia puede tener muchos bookings
Copy.hasMany(Booking, {as: 'bookings'});
// Un booking puede tener una copia
Booking.belongsTo(Copy, {as: 'copy'});

//Una copia puede tener solo una pelicula
Copy.belongsTo(Movie, {as: 'movie'});
// Una pelicula puede tener muchas copias
Movie.hasMany(Copy, {as: 'copies'});


sequelize.sync({
    force: true,
}).then(()=>{
    console.log('Base de datos sincronizada')
});

module.exports = {Director, Genre, Movie};