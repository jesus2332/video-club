const express = require('express');

//la jerarquia importa
function create(req, res, next) {    
    res.send('Users create');
}

function list(req, res, next) {
    res.send('Users list');
}

function index(req, res, next) {    
    res.send('Users index');
}

function replace(req, res, next) {    
    res.send('Users replace');
}

function update(req, res, next) {
    res.send('Users update');
}

function destroy(req, res, next) {
    res.send('Users destroy');
}
module.exports = {
    list,
    index,
    create,
    replace,
    update,
    destroy
};

