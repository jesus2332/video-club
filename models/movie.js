module.exports = (sequelize, type)=>{
    const Movie = sequelize.define('movies0', {
        id: {type:type.INTEGER, primaryKey: true, autoIncrement: true},
        title:type.STRING
    });
    return Movie;
}