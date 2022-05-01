# Bitburner Scripts

This Repo contains scripts I use while playing the Game [Bitburner](https://store.steampowered.com/app/1812820/Bitburner/).

## Information Scripts
Information scripts profide you with useful information and are meant to be executed manually.

- [map.js](map.js) - Prints a recursive network tree to the console starting at `HOST`, defaults to `home`. Originally written by [Drakmyth](https://github.com/Drakmyth/BitburnerScripts/blob/master/map.js).

    -   ```
        $ run map.js [OPTION] [HOST]
    
        Options:
        -l, --level             Show hacking skill required to hack server
        -m, --money             Show money available on each server
        -o, --organization      Show the organization name of each server
        -r, --root              Show user access level of each server
        ```

- [print-karma.js](print-karma.js) - Prints your karma. Especially useful for BitNode 2.

    -   ```
        $ run print-karma.js
        ```

- [print-server-costs.js](print-server-costs.js) - Prints the cost of the servers with the corresponding RAM. Also shows the RAM of your current servers and which levels of RAM are affordable.

    -   ```
        $ run print-server-costs.js
        ```

## Initialization Scripts
Initialization scripts are intended to be executed manually and start other scripts.

- [init-bot-network.js](init-bot-network.js) - Opens all ports possible on all servers and runs `NUKE.exe` afterwards. Copies `hack.js` on every server and runs it with the highest thread count possible. The server with the most money currently hackable is targeted.

    -   ```
        $ run init-bot-network.js
        ```

- [buy-servers.js](buy-servers.js) - Buys the maximum amount of servers with the highest amount of RAM that  is currently possible. Servers are only bought if the current RAM is lower than what you could afford. Afterwards `hack.js` is run with the highest thread count possible.

    -   ```
        $ run buy-servers.js
        ```

## Utility Scripts
Utility scripts are not meant to be used manually (but partly they can be used manually).

- [lib.js](lib.js) - Provides some useful functions, f. e. `returnAllServers()` which returns all servers as an array. Can not be run manually.

- [hack.js](hack.js) - Basically the script shown [here](https://bitburner.readthedocs.io/en/latest/guidesandtips/gettingstartedguideforbeginnerprogrammers.html#creating-our-first-script). Primarily used in `init-bot-network.js` and `buy-servers.js`, but can also be executed manually. Targets `HOST` with `weaken()`, `grow()` and `hack()` calls. Currently `HOST` is a required option.

    -   ```
        $ run hack.js [HOST]