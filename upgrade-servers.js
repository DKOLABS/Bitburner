/** @param {NS} ns */
const currentRam = 8;
const newRam = 16;

export async function main(ns) {
    var servers = ns.getPurchasedServers();

    for (let i = 0; i < servers.length; i++) {
        if (ns.getServerMaxRam(servers[i]) == currentRam) {
            if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerUpgradeCost(servers[i], newRam)) {
                ns.upgradePurchasedServer(servers[i], newRam);
            }
        }
    }
}
