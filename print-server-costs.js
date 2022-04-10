/** @param {NS} ns **/
export async function main(ns) {

    for (let i = 1; i <= ns.getPurchasedServerMaxRam() + 1; i *= 2) {

        let ram = ns.nFormat(i * 1000000000, "000.00b");
        let ramResult = "RAM: ".concat(ram);

        let costs = ns.nFormat(ns.getPurchasedServerCost(i) * ns.getPurchasedServerLimit(), "($000.000a");
        let costResult = "Costs: ".concat(costs);

        let affordable = ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(i) ? true : false;
        let affordableResult = "Affordable: ".concat(affordable);

        ns.tprint(ramResult.concat(" -- ", costResult, " -- ", affordableResult));
    }

}