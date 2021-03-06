const Router = require('express');
const EventModel = require('./../models/EventModel')

module.exports = Router()
    .get('/all', (req, res, next) => {
        EventModel.selectAllEvents()
        .then((events) => res.send(events))
        .catch(next)
    })


    .get('/:id', (req, res, next) => {
        EventModel.getEventsById(req.params.id)
            .then((event) => res.send(event))
            .catch(next)
    }) 
        