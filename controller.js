/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    const scriptMem = ns.getScriptRam("base-hack.js", "home");
    const clients = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "nectar-net", "max-hardware", "CSEC", "neo-net", "zer0", "iron-gym"];
    const servers = ns.getPurchasedServers();
    const mergedDevices = [...clients, ...servers];

    for (let i = 0; i < mergedDevices.length; i++) {
        var maxMem = ns.getServerMaxRam(mergedDevices[i]);
        var threads = Math.floor(maxMem / scriptMem);

        ns.brutessh(mergedDevices[i]);
        ns.nuke(mergedDevices[i]);
        ns.killall(mergedDevices[i]);
        ns.scp("base-hack.js", mergedDevices[i])
        ns.exec("base-hack.js", mergedDevices[i], threads, target);

    }
}
