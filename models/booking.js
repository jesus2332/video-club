module.exports = (sequelize, type)=>{
    const Booking = sequelize.define('bookings',{
        id: {type: type.INTEGER, autoIncrement: true, primaryKey: true},
        date: type.DATE
    });
    return Booking
}
