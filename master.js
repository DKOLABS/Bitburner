/** @param {NS} ns */
export async function main(ns) {
	const target = ns.args[0];
	const invetory = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym",
		"nectar-net", "zer0", "silver-helix", "phantasy", "pserv-4", "pserv-5", "pserv-2", "pserv-3", "pserv-1-0", "pserv-2-0",
		"pserv-3-0", "pserv-4", "pserv-5", "pserv-6", "pserv-7", "pserv-8", "pserv-9", "pserv-10", "pserv-1-1", "pserv-2-1",
		"pserv-3-1", "pserv-4-0", "pserv-5-0", "pserv-6-0", "pserv-7-0", "pserv-8-0", "pserv-9-0", "pserv-10-0", "pserv-11"];
	const weakenScript = "weaken.js";
	const growScript = "grow.js";
	const weakenScriptSize = ns.getScriptRam(weakenScript);
	const growScriptSize = ns.getScriptRam(growScript);

	while (true) {
		let minSec = ns.getServerMinSecurityLevel(target);
		let curSec = ns.getServerSecurityLevel(target);
		let maxMoney = ns.getServerMaxMoney(target);
		let curMoney = ns.getServerMoneyAvailable(target);

		// Lower security
		if (minSec != curSec) {
			ns.printf("Lowering Security on %s", target)
			let threadsNeeded = Math.ceil(Math.ceil((curSec - minSec) * 1000) / 5);
			// let ramNeeded = weakenScriptSize * threadsNeeded;
			ns.printf("Threads Needed: %s", threadsNeeded)

			while (threadsNeeded != 0) {
				for (let i = 0; i < invetory.length; i++) {
					let server = invetory[i];
					var lastServer = server;
					let availableRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
					let maxThreads = Math.floor(availableRam / weakenScriptSize);
					ns.printf("Available RAM on %s: %s", server, availableRam);
					ns.printf("Max Threads on %s: %s", server, maxThreads);

					if (threadsNeeded <= maxThreads) {
						ns.scp(weakenScript, server);
						ns.exec(weakenScript, server, threadsNeeded, target);
						ns.printf("Copied %s to %s and ran with %s threads", weakenScript, server, threadsNeeded);
						threadsNeeded = 0;
						break;
					} else if (maxThreads > 0) {
						ns.scp(weakenScript, target);
						ns.exec(weakenScript, server, maxThreads, target);
						ns.printf("Copied %s to %s and ran with %s threads", weakenScript, server, maxThreads);
						threadsNeeded -= maxThreads;
					}
				}
				ns.printf("Threads Needed: %s", threadsNeeded)
				while (ns.isRunning(weakenScript, lastServer, target)) {
					await ns.sleep(3000);
				}
			}
		// Grow money
		} else if (curMoney < maxMoney * 0.95) {
			ns.printf("Growing Money on %s", target)
			if (curMoney < maxMoney * 0.30) {
				var threadsNeeded = 3000;
			} else if (curMoney < maxMoney * 0.50) {
				var threadsNeeded = 2000;
			} else if (curMoney < maxMoney * 0.75) {
				var threadsNeeded = 750;
			} else {
				var threadsNeeded = 200;
			}
			// let ramNeeded = growScriptSize * threadsNeeded

			while (threadsNeeded != 0) {
				for (let i = 0; i < invetory.length; i++) {
					let server = invetory[i];
					var lastServer = server;
					let availableRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
					let maxThreads = Math.floor(availableRam / growScriptSize);
					ns.printf("Available RAM on %s: %s", server, availableRam);
					ns.printf("Max Threads on %s: %s", server, maxThreads);

					if (threadsNeeded <= maxThreads) {
						ns.scp(growScript, server);
						ns.exec(growScript, server, threadsNeeded, target);
						ns.printf("Copied %s to %s and ran with %s threads", growScript, server, threadsNeeded);
						threadsNeeded = 0;
						break;
					} else if (maxThreads > 0) {
						ns.scp(growScript, target);
						ns.exec(growScript, server, maxThreads, target);
						ns.printf("Copied %s to %s and ran with %s threads", growScript, server, maxThreads);
						threadsNeeded -= maxThreads;
					}
				}
				ns.printf("Threads Needed: %s", threadsNeeded)
				while (ns.isRunning(growScript, lastServer, target)) {
					await ns.sleep(3000);
				}
			}
		// Hack
		} else {
			ns.printf("Hacking %s", target)
			await ns.hack(target, { threads: 10 })
		}
	}
}
