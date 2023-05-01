module.exports = (sequelize, Sequelize) => {
    const Flights = sequelize.define('flights', {
        name: {
            type:Sequelize.STRING
        },
        from : {
            type: Sequelize.STRING
        },
        to: {
            type: Sequelize.STRING
        },
        depTime: {
            type: Sequelize.STRING
        },
        arrTime: {
            type:Sequelize.STRING
        },
        duration: {
            type: Sequelize.STRING
        },
        fare: {
            type: Sequelize.INTEGER
        },
        logo: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
    });

    return Flights;
}