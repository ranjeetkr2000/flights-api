const db = require("../models");
const Flights = db.flights;
const Op = db.Sequelize.Op;

//create and save new flight
exports.create = (req, res) => {

    const { name, from, to, depTime, arrTime, duration, fare, logo} = req.body;

    if(!(name && from && to && depTime && arrTime && duration && fare && logo)) {
        res.status(400).send({
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
        });
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
        res.status(500).send({
            message: err.message || "Some error occured while creating the flight"
        })
    });
}

//Retrieve all flights from db
exports.findAll = (req, res) => {
    Flights.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving flights"
        });
    });
}

//Find a single flight with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Flights.findByPk(id)
    .then((data) => {
        if(data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Can't find flight with id=${id}`
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: `Error retrieving flight with id=${id}`
        });
    });
}

exports.update = (req, res) => {
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
            res.send({
                message: `Cannot update flight with id=${id}. Maybe flight was not found or req.body is empty!`
              });
        }
    })
    .catch((err) => {
        res.status(500).send({
          message: "Error updating flight with id=" + id
        });
      });
}

exports.delete = (req, res) => {
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
            res.send({
                message: `Cannot delete flight with id=${id}. Maybe flight was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message: "Could not delete flight with id=" + id
        });
    });
}

exports.deleteAll = (req, res) => {
    Flights.destroy({
        where : {},
        truncate: true
    })
    .then((nums) => {
        res.send({
            message: `${nums} Flight were deleted successfully`
        })
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all flights."
        })
    })
}