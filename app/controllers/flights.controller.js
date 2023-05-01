const express = require('express');
const createError = require('http-errors');
const db = require("../models");

const Flights = db.flights;

//create and save new flight
exports.create = (req, res, next) => {

    const { name, from, to, depTime, arrTime, duration, fare, logo} = req.body;

    if(!(name && from && to && depTime && arrTime && duration && fare && logo)) {
        
        next(createError(400, {
            message: "Content can't be empty",
            requiredData : {
                "name": "string",
                "from": "string",
                "to" : "string",
                "depTime" : "string",
                "arrTime": "string",
                "duration": "string",
                "fare": "number",
                "logo": "url (string)"
            }
        }))
        return;
    }

    //create flight
    const flight = {
        name,
        from,
        to,
        depTime,
        arrTime,
        duration,
        fare,
        logo,
    };

    Flights.create(flight)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        next(createError(500, {
            message: err.message || "Some error occured while creating the flight"
        }));
    });
}

//Retrieve all flights from db
exports.findAll = (req, res, next) => {
    Flights.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        next(createError(500, {
            message: err.message || "Some error occured while retrieving flights"
        }))
    });
}

//Find a single flight with an id
exports.findOne = (req, res, next) => {
    const id = req.params.id;

    Flights.findByPk(id)
    .then((data) => {
        if(data) {
            res.send(data);
        }
        else {
            next(createError(404, `Can't find flight with id=${id}`))
        }
    })
    .catch((err) => {
        next(createError(500, `Error retrieving flight with id=${id}`));
    });
}

exports.update = (req, res, next) => {
    const id = req.params.id;

    Flights.update(req.body, {
        where: { id : id}
    })
    .then((num) => {
        if(num == 1) {
            res.send({
                message: "Flight was updated successfully."
            });
        }
        else {
            next(createError(400, `Cannot update flight with id=${id}. Maybe flight was not found or req.body is empty!`));
        }
    })
    .catch((err) => {
        next(createError(500, "Error updating flight with id=" + id));
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Flights.destroy({
        where : { id : id}
    })
    .then((num) => {
        if(num == 1){
            res.send({
                message: "Flight was deleted successfully!"
            });
        } else {
            next(createError(404, `Cannot delete flight with id=${id}. Maybe flight was not found!`));
        }
    })
    .catch(err => {
        next(createError(500, "Could not delete flight with id=" + id));
    });
}

exports.deleteAll = (req, res) => {
    Flights.destroy({
        where : {},
        truncate: false
    })
    .then((nums) => {
        res.send({
            message: `${nums} Flight were deleted successfully`
        })
    })
    .catch((err) => {
        next(createError(500, {
            message: err.message || "Some error occurred while removing all flights."
        }));
    })
}