/** @param {NS} ns */
export async function main(ns) {
    const script = ns.args[0];
    const uniqServers = new Array();
    const scriptMem = ns.getScriptRam(script)
    
    // Function to recuseivly scan for servers
    function recurse(server) {
        ns.printf("Scanning: %s", server);
        var newServers = ns.scan(server);
        ns.printf("%s results", newServers.length);

        for (let i = 0; i < newServers.length; i++) {
            if (uniqServers.includes(newServers[i])) {
                ns.printf("%s already in the list", newServers[i]);
            } else {
                ns.printf("%s added to the list", newServers[i]);
                uniqServers.push(newServers[i]);
                recurse(newServers[i]);
            }
        }
    }

    // Get list of all servers
    recurse("home")

    // Deploy if rooted and has RAM
    for (let i = 0; i < uniqServers.length; i++) {;
        let server = uniqServers[i];
        if (ns.hasRootAccess(server) && ns.getServerMaxRam(server) > 1) {
            var maxMem = ns.getServerMaxRam(server);
            var threads = Math.floor(maxMem / scriptMem);

            ns.killall(server);
            ns.scp(script, server);
            ns.exec(script, server, threads);
            ns.tprintf("Deployed on %s with %s threads", server, threads);
        } else {
            ns.tprintf("Skipping %s", server);
        }
    }
}
