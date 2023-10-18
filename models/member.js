module.exports = (sequelize, type)=>{
    const Member = sequelize.define('members',{
        name: type.STRING,
        lastName: type.STRING,
        address: type.STRING,
        phone: type.STRING,
        status: type.BOOLEAN
    })
    return Member;
};