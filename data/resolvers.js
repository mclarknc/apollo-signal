import { Device, Hostname } from './connectors';

const resolvers = {
    Query: {
	devices(root, args) {
	    return Device.findAll({order: ['id'],
				   limit: args.limit || 5,
				   where: {
				       'id': {
					   $gt:  args.cursor || 0
				       }
				   }
				  });
	},
	device(root, args) {
	    return Device.find({where: args})
	},
	hostnames(root, args) {
	    return Hostname.findAll({order: ['id'],
				   limit: args.limit || 5,
				   where: {
				       'id': {
					   $gt:  args.cursor || 0
				       }
				   }
				  });
	},
	signals(root, args) {
	    return Device.findAll({order: ['statDate'],
				   limit: args.limit || 720,
				   where: {
				       'hwaddr': args.hwaddr,
				       'id': {
					   $gt: args.cursor || 0
				       }
				   }
				  });
	},
    },
    Device: {
	version(device) {
	    return device.getVersion();
	},
	product(device) {
	    return device.getProduct();
	},
	netmode(device) {
	    return device.getNetmode();
	},
	wlanOpMode(device) {
	    return device.getWlanopmode();
	},
	uptime(device) {
	    return device.uptime / 60000;
	},
	hostname(device) {
	    return device.getHostname();
	},
	ipaddr(device) {
	    return device.getIpaddr();
	},
	essid(device) {
	    return device.getEssid();
	},
    },
};


export default resolvers;
