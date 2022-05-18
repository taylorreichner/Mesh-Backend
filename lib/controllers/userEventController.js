const Router = require('express');
const UserEventModel = require('./../models/UserEventModel')

module.exports = Router()
    .post('/new', (req, res, next) => {
        UserEventModel.saveEventsById({
            ...req.body
        })
        .then((newEvent) => res.send(newEvent))
        .catch(next)
    })
        
    .get('/all/:id', (req, res, next) => {
        UserEventModel.selectAllUserEvents(req.params.id)
        .then((events) => res.send(events))
        .catch(next)
    })

    .get('/:id', (req, res, next) => {
        UserEventModel.getUserEventById(req.params.id)
            .then((event) => res.send(event))
            .catch(next)
    })