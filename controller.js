/** @param {NS} ns */
export async function main(ns) {
    var target = ns.args[0];
    var scriptMem = ns.getScriptRam("base-hack.js", "home");
    var clients = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "nectar-net"];

    for (let i = 0; i < clients.length; i++) {
        var maxMem = ns.getServerMaxRam(clients[i]);
        var threads = Math.floor(maxMem / scriptMem);

        // ns.exec("NUKE.exe", clients[i]);
        ns.killall(clients[i]);
        ns.exec("base-hack.js", clients[i], threads, target);

    }
}
