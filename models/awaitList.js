const mongoose = require('mongoose');

const schema = mongoose.Schema({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
    },
    movie: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    }
});
class AwaitList{
    constructor(member, movie){
        this._member = member;
        this._movie = movie;
    }

    get member(){ return this._member; }
    set member(v){ this._member = v; }

    get movie(){ return this._movie; }
    set movie(v){ this._movie = v; }
}

schema.loadClass(AwaitList);
module.exports = mongoose.model('AwaitList', awaitListSchema);

