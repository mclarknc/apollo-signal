import Sequelize from 'sequelize';

const logging = false;
// fetch database login credentials from environment
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const USER_NAME = process.env.USER_NAME;
const PASSWORD = process.env.PASSWORD;

const db = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: logging,
});

const DeviceModel = db.define('device', {
    id: {
	type: Sequelize.INTEGER,
	primaryKey: true
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
    hwaddr: {
	type: Sequelize.STRING
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
    hostname:  {
	type: Sequelize.STRING
    }
});

const IPaddrModel = db.define('ipaddr', {
    ipaddr: {
	type: Sequelize.STRING
    }
});

const EssidModel = db.define('essid', {
    essid: {
	type: Sequelize.STRING
    }
});

const VersionModel = db.define('version', {
    shortVersion: {
	type: Sequelize.STRING,
	field: 'shortversion'
    },
    version: {
	type: Sequelize.STRING
    }
});

const ProductModel = db.define('product', {
    product: {
	type: Sequelize.STRING
    }
});

const NetModeModel = db.define('netmode', {
    netmode: {
	type: Sequelize.STRING
    }
});

const WLanOpModeModel = db.define('wlanopmode', {
    wlanopmode: {
	type: Sequelize.STRING
    }
});

DeviceModel.belongsTo(VersionModel);
DeviceModel.belongsTo(ProductModel);
DeviceModel.belongsTo(NetModeModel);
DeviceModel.belongsTo(WLanOpModeModel);
DeviceModel.belongsTo(HostnameModel);
DeviceModel.belongsTo(IPaddrModel);
DeviceModel.belongsTo(EssidModel);

const Device = db.models.device;
const Version = db.models.version;
const Product = db.models.product;
const NetMode = db.models.netmode;
const WLanOpMode = db.models.wlanopmode;
const Hostname = db.models.hostname;
const IPaddr = db.models.ipaddr;
const Essid = db.models.essid;
export { Device,
	 Version,
	 Product,
	 NetMode,
	 WLanOpMode,
	 Hostname,
	 IPaddr,
	 Essid
       };
