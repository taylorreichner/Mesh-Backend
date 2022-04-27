const { Router } = require('express');
const User = require('../models/User.js');

module.exports = Router()
    .post('/new', (req, res, next) => {
        User.createUser({
            ...req.body,
        })
        .then((newUser) => res.send(newUser))
        .catch(next);
    })

    .get('/:id', (req, res, next) => {
        User.getUserById(req.params.userId)
        .then(user => res.send(user))
        .catch(next)
    }) 
