const { Schema, model } = require('mongoose');

const FormatEnum = Object.freeze({
    VHS: 'VHS',
    DVD: 'DVD',
    BLU_RAY: 'BLU_RAY'
});

const StatusEnum = Object.freeze({
    AVAILABLE: 'available',
    RENTED: 'rented'
});

const copySchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    format: {
        type: String,
        enum: Object.values(FormatEnum),
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    status: {
        type: String,
        enum: Object.values(StatusEnum),
        required: true
    }
});

class Copy {
    constructor(number, format, movie, status) {
        this._number = number;
        this._format = format;
        this._movie = movie;
        this._status = status;
    }

    get number() { return this._number; }
    set number(v) { this._number = v; }

    get format() { return this._format; }
    set format(v) { this._format = v; }

    get movie() { return this._movie; }
    set movie(v) { this._movie = v; }

    get status() { return this._status; }
    set status(v) { this._status = v; }
}

copySchema.loadClass(Copy);
module.exports = model('Copy', copySchema);
