const { Sequelize } = require('sequelize');

const db = new Sequelize('aircontrol', 'aircontrol', 'fib40nam', {
    host: 'localhost',
    dialect: 'postgres',
});
const LatestModel = db.define('latest', {
    latest: {
	type: Sequelize.DATE
    },
});

const DeviceModel = db.define('device', {
    hwaddr: {
	type: Sequelize.STRING,
	allowNull: false,
    },
    status: {
	type: Sequelize.INTEGER
    },
    wlanPollingQuality: {
	type: Sequelize.INTEGER,
	field: 'wlanpollingquality'
    },
    wlanPollingCapacity: {
	type: Sequelize.INTEGER,
	field: 'wlanpollingcapacity'
    },
    uptime: {
	type: Sequelize.INTEGER
    },
    latitude: {
	type: Sequelize.FLOAT
    },
    longitude: {
	type: Sequelize.FLOAT
    },
    noise: {
	type: Sequelize.INTEGER
    },
    statDate: {
	type: Sequelize.DATE,
	field: 'stat_date'
    },
    freq: {
	type: Sequelize.INTEGER
    },
    signal: {
	type: Sequelize.INTEGER
    },
    ccq: {
	type: Sequelize.INTEGER
    },
    wlanConnections: {
	type: Sequelize.INTEGER,
	field: 'wlanconnections'
    },
});

const writeLatest = function(latest) {
    LatestModel.create({
	latest: latest
    });
    console.log('--> ' + latest);
};

var doLatest = function() {
    DeviceModel.findAll({attributes: ['stat_date'],
			 order: 'stat_date DESC',
			 limit: 1})
	.then((result) => {writeLatest(result[0].dataValues.stat_date)});
};

db.sync({force: false})
    .then(() => {
	doLatest();
    });
