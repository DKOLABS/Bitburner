/** @param {NS} ns */
const uniqServers = new Array()

export async function main(ns) {

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

    recurse("home")

    for (let i = 0; i < uniqServers.length; i++) {
        if (ns.hasRootAccess(uniqServers[i])) {
            ns.tprintf("%s already rooted", uniqServers[i]);
        } else {
            try {
                ns.brutessh(uniqServers[i]);
                ns.ftpcrack(uniqServers[i]);
                ns.relaysmtp(uniqServers[i]);
                ns.httpworm(uniqServers[i]);
                ns.sqlinject(uniqServers[i]);
            } catch(err) {
                ns.printf("Missing port opener")
            }
            
            try {
                ns.nuke(uniqServers[i]);
                ns.tprintf("%s rooted", uniqServers[i]);
            } catch(err) {
                ns.tprintf("Failed to root %s", uniqServers[i])
            }
        }
    }
}
