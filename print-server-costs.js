 
export async function main(ns) {

    for (let i = 1; i <= ns.getPurchasedServerMaxRam() + 1; i *= 2) {

        let servers = ns.getPurchasedServers();

        let ram = ns.nFormat(i * 1000000000, "000.00b");
        let ramResult = "RAM: ".concat(ram);

        let costs = ns.nFormat(ns.getPurchasedServerCost(i) * ns.getPurchasedServerLimit(), "($000.000a");
        let costResult = "Costs: ".concat(costs);

        let affordable = ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(i) * 25 ? true : false;
        let affordableResult = "Affordable: ".concat(affordable);

        let result = ramResult.concat(" -- ", costResult, " -- ", affordableResult);

        if (i === ns.getServerMaxRam(servers[0])) {
            result = result.concat(" -- current RAM Size");
        }

        ns.tprint(result);
    }

}