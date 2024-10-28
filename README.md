# zktls-ai

This repo compares different zktls options and explores how they work, the tradeoffs, and the trust assumptions.

Currently this is a WIP with only one implementation

## [reclaim.ts](./reclaim.ts)

The [reclaim.ts](./reclaim.ts) file implements zktls making an openai request using [zktls fetch]()

### Steps to running:

0. Install docker
1. Set [reclaim zk fetch app keys](https://dev.reclaimprotocol.org/new-application) in a [.env file](./example.env)
2. Set openai keys
3. run docker

```bash
docker build -t reclaim-app .
docker run --env-file .env reclaim-app
```

Note: reclaim sdk does not work on [macos](https://github.com/reclaimprotocol/reclaim-js-sdk/issues/16) which is why a dockerfile is provided. 

These are cutting edge projects so be nice some painpoints are expected.

### How it works

TODO

## [opacity network](https://www.opacity.network/)

TODO

### Steps to running:
### How it works
