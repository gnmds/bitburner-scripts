/** @param {NS} ns **/
export async function main(ns) {
    
    let target = ns.args[0];

    while (true) {
        if  (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target) + 5) {
            await ns.weaken(target);
        } else if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) * 0.75) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }

}