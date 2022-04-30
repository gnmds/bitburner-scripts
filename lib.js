let allServers = [];
let alreadyVisitedServers = [];

function walk(ns, host = `home`) {
    let servers = ns.scan(host);
    alreadyVisitedServers.push(host);

    for (let i = 0; i < servers.length; i++) {
        if (!alreadyVisitedServers.includes(servers[i])) {
            allServers.push(servers[i]);
            walk(ns, servers[i]);
        }
    }
}

export function returnAllServers(ns) {
    walk(ns);
    return allServers;
}

export function getServerWithMostMoney(ns) {
    let servers = returnAllServers(ns);
    let serverWithMostMoney = servers[0];

    for (let i = 1; i < servers.length; i++) {
        if (ns.getServerMaxMoney(servers[i]) > ns.getServerMaxMoney(serverWithMostMoney) && ns.getHackingLevel() > ns.getServerRequiredHackingLevel(servers[i])) {
            serverWithMostMoney = servers[i];
        }
    }

    return serverWithMostMoney;
}