import * as lib from "lib.js"

let servers = ["n00dles", "nectar-net", "CSEC", "foodnstuff", "sigma-cosmetics",
    "joesguns", "hong-fang-tea", "max-hardware", "omega-net", "harakiri-sushi",
    "zer0", "neo-net", "silver-helix", "the-hub", "computek", "zb-institute",
    "crush-fitness", "rothman-uni", "summit-uni", "I.I.I.I", "avmnite-02h",
    "catalyst", "aevum-police", "snap-fitness", "unitalife", "univ-energy",
    "phantasy", "netlink", "johnson-ortho", "syscore", "lexo-corp",
    "aerocorp", "rho-construction", "alpha-ent", "galactic-cyber", "deltaone",
    "solaris", "zb-def", "zeus-med", "global-pharm", "omnia", "defcomm",
    "taiyang-digital", "titan-labs", "vitalife", "4sigma", "b-and-a",
    "ecorp", "fulcrumassets", "nova-med", "icarus", "infocomm",
    "microdyne", "fulcrumtech", "omnitek", "blade", "The-Cave",
    "nwo", "clarkinc", "megacorp", "kuai-gong", "powerhouse-fitness",
    "applied-energetics", "stormtech", ".", "helios", "run4theh111z", "millenium-fitness",
    "iron-gym", "darkweb", "w0r1d_d43m0n"];


export async function main(ns) {

    let bots = [];

    let ports = 0;
    
    let serverWithMostMoney = "n00dles";

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