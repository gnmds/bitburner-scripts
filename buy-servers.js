import * as lib from "lib.js"

export async function main(ns) {

    let servers = ns.getPurchasedServers();

    let currentRam = 0;

    if (servers[0] != null) {
        currentRam = ns.getServerMaxRam(servers[0]);
    }


    for (let i = 0; i < servers.length; i++) {
        ns.killall(servers[i]);
        ns.deleteServer(servers[i]);
    }

    let ram = 0;

    for (let i = 1; i <= ns.getPurchasedServerMaxRam(); i *= 2) {
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(i) * ns.getPurchasedServerLimit()) {
            ram = i;
        }
    }

    if (currentRam < ram) {
        if (ram > 0) {
            for (let i = 0; i < ns.getPurchasedServerLimit(); i++) {
                let useableThreads = ram / ns.getScriptRam("hack.js", "home");
                let hostname = ns.purchaseServer("pserv" + i, ram);
                await ns.scp("hack.js", hostname);
                ns.exec("hack.js", hostname, useableThreads, lib.getServerWithMostMoney(ns));
            }
        }
    }
}