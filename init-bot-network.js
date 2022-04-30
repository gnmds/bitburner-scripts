import * as lib from "lib.js"


export async function main(ns) {

    let servers = lib.returnAllServers(ns);
    let bots = [];
    let ports = 0;

    if (ns.fileExists("brutessh.exe", "home")) {
        ports++;
    }
    if (ns.fileExists("ftpcrack.exe", "home")) {
        ports++;
    }
    if (ns.fileExists("relaysmtp.exe", "home")) {
        ports++;
    }
    if (ns.fileExists("httpworm.exe", "home")) {
        ports++;
    }
    if (ns.fileExists("sqlinject.exe", "home")) {
        ports++;
    }

    for (let i = 0; i < servers.length; i++) {
        // checks if the server really exits
        if (ns.serverExists(servers[i])) {
            if (!ns.hasRootAccess(servers[i]) && ns.getServerNumPortsRequired(servers[i]) <= ports) {
                if (ns.fileExists("brutessh.exe", "home")) {
                    ns.brutessh(servers[i]);
                }
                if (ns.fileExists("ftpcrack.exe", "home")) {
                    ns.ftpcrack(servers[i]);
                }
                if (ns.fileExists("relaysmtp.exe", "home")) {
                    ns.relaysmtp(servers[i]);
                }
                if (ns.fileExists("httpworm.exe", "home")) {
                    ns.httpworm(servers[i]);
                }
                if (ns.fileExists("sqlinject.exe", "home")) {
                    ns.sqlinject(servers[i]);
                }
                ns.nuke(servers[i]);
            } else if (!ns.hasRootAccess(servers[i])) {
                continue;
            }
            if (ns.getServerMaxRam(servers[i]) > ns.getScriptRam("hack.js", "home")) {
                bots.push(servers[i]);
            }
        }
    }

    let allBots = bots.concat(ns.getPurchasedServers());
    ns.tprint

    for (let i = 0; i < allBots.length; i++) {
        // calculates the usable threads for the hack.script
        let usableThreads = ns.getServerMaxRam(allBots[i]) / ns.getScriptRam("hack.js", "home");
        ns.killall(allBots[i]);
        await ns.scp("hack.js", allBots[i]);
        ns.exec("hack.js", allBots[i], usableThreads, lib.getServerWithMostMoney(ns));
    }
}