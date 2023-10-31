const mongoose = require('mongoose');


const schema = mongoose.Schema({
    _description:String,
});

class Genre{
    constructor(_description){
        this._description = description;
    }

    get description(){
        return this._description;
    }
    set description(v){
        this._description=v;
    }

}

schema.loadClass(Genre);
module.exports = mongoose.model('Genre', schema);