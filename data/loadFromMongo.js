const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
const sleep = require('sleep');

const logging = false;
const force = false;
var startDate = new Date(process.argv[2]);
var endDate = new Date(process.argv[3]);

const db = new Sequelize('aircontrol', 'aircontrol', 'fib40nam', {
    host: 'localhost',
    dialect: 'postgres',
    logging: logging,
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

const HostnameModel = db.define('hostname', {
    hostname: {
	type: Sequelize.STRING
    },
});

const IPaddrModel = db.define('ipaddr', {
    ipaddr: {
	type: Sequelize.STRING
    },
});

const EssidModel = db.define('essid', {
    essid: {
	type: Sequelize.STRING
    },
});

const VersionModel = db.define('version', {
    shortVersion: {
	type: Sequelize.STRING,
	field: 'shortversion'
    },
    version: {
	type: Sequelize.STRING
    },
});

const ProductModel = db.define('product', {
    product: {
	type: Sequelize.STRING
    },
});

const NetModeModel = db.define('netmode', {
    netmode: {
	type: Sequelize.STRING
    },
});

const WLanOpModeModel = db.define('wlanopmode', {
    wlanopmode: {
	type: Sequelize.STRING
    },
});

DeviceModel.belongsTo(VersionModel);
DeviceModel.belongsTo(ProductModel);
DeviceModel.belongsTo(NetModeModel);
DeviceModel.belongsTo(WLanOpModeModel);
DeviceModel.belongsTo(HostnameModel);
DeviceModel.belongsTo(IPaddrModel);
DeviceModel.belongsTo(EssidModel);

const writeDevice = function(devDict) {
    var addRelations = function(device) {
	ProductModel.findOrCreate({
	    where: { product: devDict.product }
	}).spread((prod, created) => {
	    device.update({ productId: prod.id });
	});

	NetModeModel.findOrCreate({
	    where: { netmode: devDict.netmode }
	}).spread((mode, created) => {
	    device.update({ netmodeId: mode.id });
	});

	WLanOpModeModel.findOrCreate({
	    where: { wlanopmode: devDict.wlanOpMode }
	}).spread((wlanop, created) => {
	    device.update({ wlanopmodeId: wlanop.id });
	});

	VersionModel.findOrCreate({
	    where: {
		version: devDict.version,
		shortVersion: devDict.shortVersion,
	    }
	}).spread((vers, created) => {
	    device.update({ versionId: vers.id });
	});

	HostnameModel.findOrCreate({
	    where: {
		hostname: devDict.hostname
	    }
	}).spread((host, created) => {
	    device.update({ hostnameId: host.id });
	});

	IPaddrModel.findOrCreate({
	    where: {
		ipaddr: devDict.ipaddr
	    }
	}).spread((ip, created) => {
	    device.update({ ipaddrId: ip.id });
	});

	EssidModel.findOrCreate({
	    where: {
		essid: devDict.essid
	    }
	}).spread((essid, created) => {
	    device.update({ essidId: essid.id });
	});
    };
    
    DeviceModel.create({
	hwaddr: devDict.hwaddr,
    	status: devDict.mcStatus,
    	wlanPollingQuality: devDict.wlanPollingQuality,
    	uptime: devDict.uptime,
    	latitude: devDict.latitude,
    	noise: devDict.noise,
    	statDate: new Date(devDict.stat_date),
    	freq: devDict.freq,
    	wlanPollingCapacity: devDict.wlanPollingCapacity,
    	signal: devDict.signal,
    	ccq: devDict.ccq,
    	longitude: devDict.longitude,
    	wlanConnections: devDict.wlanConnections,
    }).then((device) => {
	addRelations(device);
    });
    console.log('--> ' + devDict.hostname);
};

var doMongo = function() {
    mongoose.connect('mongodb://localhost/AirControl');
    const ac = mongoose.connection;
    ac.on('error', console.error.bind(console, 'connection error:'));
    ac.once('open', function() {
	console.log('Connected!');

	const acSchema = new mongoose.Schema({
	    mcStatus: Number,
	    shortVersion: String,
	    wlanPollingQuality: Number,
	    uptime: Number,
	    hostname: String,
	    ipaddr: String,
	    version: String,
	    latitude: Number,
	    product: String,
	    noise: Number,
	    stat_date: Date,
	    hwaddr: String,
	    freq: Number,
	    netmode: String,
	    wlanPollingCapacity: Number,
	    signal: Number,
	    ccq: Number,
	    longitude: Number,
	    wlanConnections: Number,
	    essid: String,
	    wlanOpMode: String},
					     {collection: 'AC'});

	const AC = mongoose.model('AC', acSchema);

	var count = 0;
	var cursor = AC.findOne({'stat_date': {'$gte': startDate, '$lt': endDate}}).cursor().eachAsync(function (doc) {
	    writeDevice(doc);
	    // count += 1;
	    // if (count % 4000 === 0) {
	    // 	sleep.sleep(10);
	    // }
	});
    });
};

db.sync({force: force})
    .then(() => {
	console.log(`Processing readings from ${startDate} to ${endDate}.`);
	doMongo();
    });


