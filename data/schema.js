const typeDefinitions = `
type Device {
    id: Int
    hostname: Hostname
    ipaddr: Ipaddr
    essid: Essid
    status: Int
    wlanPollingQuality: Int
    wlanPollingCapacity: Int
    uptime: Int
    version: Version
    latitude: Float
    longitude: Float
    product: Product
    noise: Int
    statDate: String
    hwaddr: String
    freq: Int
    netmode: NetMode
    signal: Int
    ccq: Int
    wlanConnections: Int
    wlanOpMode: WLanOpMode
}

type Version {
    shortVersion: String
    version: String
}

input VersionInput {
    shortVersion: String
    version: String
}

type Product {
    product: String
}

input ProductInput {
    product: String
}

type NetMode {
    netmode: String
}

input NetModeInput {
    netmode: String
}

type WLanOpMode {
    wlanopmode: String
}

input WLanOpModeInput {
    wlanopmode: String
}

type Hostname {
    hostname: String
}

input HostnameInput {
    hostname: String
}

type Ipaddr {
    ipaddr: String
}

input IpaddrInput {
    ipaddr: String
}

type Essid {
    essid: String
}

input EssidInput {
    essid: String
}

type Query {
    device(hwaddr: String, id: Int):Device
    devices(cursor: Int, limit: Int): [Device]
    hostnames: [Hostname]
    signals(hwaddr: String!, cursor: Int, limit: Int): [Device]
    deviceCount: Int
}

type Mutation {
    addDevice(
	id: Int
	hostname: HostnameInput
	ipaddr: IpaddrInput
	essid: EssidInput
	status: Int
	wlanPollingQuality: Int
	wlanPollingCapacity: Int
	uptime: Int
	version: VersionInput
	latitude: Float
	longitude: Float
	product: ProductInput
	noise: Int
	statDate: String
	hwaddr: String
	freq: Int
	netmode: NetModeInput
	signal: Int
	ccq: Int
	wlanConnections: Int
	wlanOpMode: WLanOpModeInput
    ): Device
}

schema {
    query: Query
    mutation: Mutation
}
`;

export default [typeDefinitions];
