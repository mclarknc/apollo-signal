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

type Product {
    product: String
}

type NetMode {
    netmode: String
}

type WLanOpMode {
    wlanopmode: String
}

type Hostname {
    hostname: String
}

type Ipaddr {
    ipaddr: String
}

type Essid {
    essid: String
}

type Query {
    device(hwaddr: String):Device
    devices(cursor: Int, limit: Int): [Device]
    hostnames: [Hostname]
    signals(hwaddr: String!, cursor: Int, limit: Int): [Device]
    deviceCount: Int
}

schema {
  query: Query
}
`;

export default [typeDefinitions];
