/* MIT License

Copyright (c) 2022 Shaun Hamman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

function printHost(ns, prefix, host) {
    let label = `${prefix} \\-- ${host}`;

    const flags = ns.flags([
        [`l`, false],
        [`level`, false],
        [`o`, false],
        [`organization`, false],
        [`m`, false],
        [`money`, false],
        [`r`, false],
        [`root`, false]
    ]);

    const SHOW_LEVEL = flags[`l`] || flags[`level`];
    const SHOW_ORGANIZATION = flags[`o`] || flags[`organization`];
    const SHOW_MONEY = flags[`m`] || flags[`money`];
    const SHOW_ROOT = flags[`r`] || flags[`root`];
    const SERVER = ns.getServer(host);

    const TAGS = [];

    if (SHOW_LEVEL) {
        TAGS.push(SERVER.requiredHackingSkill);
    }
    if (SHOW_ORGANIZATION) {
        TAGS.push(SERVER.organizationName);
    }
    if (SHOW_MONEY) {
        TAGS.push(ns.nFormat(SERVER.moneyAvailable, `($0.000a)`));
    }
    if (SHOW_ROOT) {
        TAGS.push(SERVER.hasAdminRights ? `ROOT` : `USER`);
    }

    if (TAGS.length > 0) {
        label += ` (${TAGS.join(` - `)})`;
    }

    ns.tprint(label);

}

function walk(ns, host, prefix = ``) {

    const SERVERS = ns.scan(host);

    if (host != `home`) {
        SERVERS.shift();
    }

    for (let [index, next] of SERVERS.entries()) {
        printHost(ns, prefix, next);
        const NEXT_PREFIX = prefix + (index < SERVERS.length - 1 ? ` | ` : `   `);
        walk(ns, next, NEXT_PREFIX);
    }

}

export async function main(ns) {
    let host = `home`;
    const ARGS = ns.args.filter(a => a[0] != `-`);
    if (ARGS.length > 0) {
        host = ARGS[0];
    }

    ns.tprint(host);
    walk(ns, host);

}