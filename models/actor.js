module.exports = (sequelize, type)=>{
    const Actor = sequelize.define('actors',{
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: type.STRING,
        lastName: type.STRING
    });
    return Actor;
}