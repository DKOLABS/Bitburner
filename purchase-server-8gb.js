/** @param {NS} ns */
export async function main(ns) {
    var ram = 8;
    var i = 0;

    while (i < ns.getPurchasedServerLimit()) {
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            var hostname = ns.purchaseServer("pserv-" + i, ram);
            ns.scp("base-hack.js", hostname);
            ns.exec("base-hack.js", hostname, 3, "harakiri-sushi");
            ++i;
        } else {
            return;
        }
    }
}
