module.exports = (sequelize, type) =>{
    const Copy = sequelize.define('copies',{
        id: {type: type.INTEGER, autoIncrement: true, primaryKey: true},
        number: type.INTEGER,
        format: {type: type.ENUM, values: ['digital', 'fisico']},
        status: {type: type.ENUM, values: ['activo', 'inactivo', 'pendiente'], defaultValue: 'pendiente'}
    });
    return Copy;
}