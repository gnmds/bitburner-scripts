 
export async function main(ns) {
    
    let servers = ns.getPurchasedServers();

    let currentRam = 0;

    if (servers[0] != null) {
        currentRam = ns.getServerMaxRam(servers[0]);
    }

    for (let i = 1; i <= ns.getPurchasedServerMaxRam() + 1; i *= 2) {

        let servers = ns.getPurchasedServers();

        let ram = ns.nFormat(i * 1000000000, "000.00b");
        let ramResult = "RAM: ".concat(ram);

        let costs = ns.nFormat(ns.getPurchasedServerCost(i) * ns.getPurchasedServerLimit(), "($000.000a");
        let costResult = "Costs: ".concat(costs);

        let affordable = ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(i) * 25 ? true : false;
        let affordableResult = "Affordable: ".concat(affordable);

        let result = ramResult.concat(" -- ", costResult, " -- ", affordableResult);

        if (i === currentRam) {
            result = result.concat(" -- current RAM Size");
        }

        ns.tprint(result);
    }

}