# KGrid Release CLI
[![CircleCI](https://circleci.com/gh/kgrid/kgrid-release-cli.svg?style=svg)](https://circleci.com/gh/kgrid/kgrid-release-cli)
[![GitHub release](https://img.shields.io/github/release/kgrid/kgrid-release-cli.svg)](https://github.com/kgrid/kgrid-release-cli/releases/)
[![npm version](https://img.shields.io/npm/v/@kgrid/release-cli.svg)](https://www.npmjs.com/package/@kgrid/release-cli)

This CLI will help you trigger a Release of the KGrid components.  

## Getting Started

1. Get a Circle CI a [personal api token](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-personal-api-token)
1.  ```npm install -g  @kgrid/release-cli ```
1. Run ```export CIRCLECI_TOKEN=#### && kgrid-release``` 

## Using the CLI
 
1. Choose the component
1. Adapter is sub module so if Adapter you have to say api or javascript otherwise just press enter
1. The release version #.#.# for releases #.#.#-rc# for release candidates. This will used to tag the GitHub repository. For maven projects this sets the version 
1. The development version will be #.#.#-SNAPSHOT, used for maven projects can be innored for KO releases.
1. If it is Pre Release type _Y_ defaults to _N_

Review the additional [#note]

Will kick off Circle CI build.

```text
  _  ______      _     _   ____      _                        ____ _     ___ 
 | |/ / ___|_ __(_) __| | |  _ \ ___| | ___  __ _ ___  ___   / ___| |   |_ _|
 | ' / |  _| '__| |/ _` | | |_) / _ \ |/ _ \/ _` / __|/ _ \ | |   | |    | | 
 | . \ |_| | |  | | (_| | |  _ <  __/ |  __/ (_| \__ \  __/ | |___| |___ | | 
 |_|\_\____|_|  |_|\__,_| |_| \_\___|_|\___|\__,_|___/\___|  \____|_____|___|
                                                                             
? What KGrid Component are you Releasing? (Use arrow keys)
❯ Activator 
  Adapter 
  Library 
  Play 
  Shelf 
```


Here is an example of final screen

```text
  _  ______      _     _   ____      _                        ____ _     ___ 
 | |/ / ___|_ __(_) __| | |  _ \ ___| | ___  __ _ ___  ___   / ___| |   |_ _|
 | ' / |  _| '__| |/ _` | | |_) / _ \ |/ _ \/ _` / __|/ _ \ | |   | |    | | 
 | . \ |_| | |  | | (_| | |  _ <  __/ |  __/ (_| \__ \  __/ | |___| |___ | | 
 |_|\_\____|_|  |_|\__,_| |_| \_\___|_|\___|\__,_|___/\___|  \____|_____|___|
                                                                             
? What KGrid Component are you Releasing? Activator
? What branch (e.g. hotfix, feature or master)? master
? What is the Component Module (e.g. adapter-api or javascript-adapter or blank)? 
? What is the Release Version (e.g. 1.0.3)? 1.0.1-rc3
? What is the Development Version (e.g 1.0.4-SNAPSHOT)? 1.0.1-SNAPSHOT
? Is this PreRelease? Yes
Build has started
~/kgrid-config/release/cli $ 

```

## Issues
- Issues with executing ```kgrid-release``` once installed could be based on a few things
  - make sure it is global ```npm list -g --depth=0```
  - run ```npm bin -g``` to global bin path.

## Notes

- Component Module is only need when releasing Adapters.  The project consists of mmaven submodules 
and thus requires more information

- The Demo components release process consists of updating the the GitHub pages.  When releasing Demos
you really only have to input a Release Version, it will be used to tag the repo.




