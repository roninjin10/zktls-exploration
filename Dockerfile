FROM node:20

WORKDIR /app

RUN echo "{}" > package.json && npm i tsx @reclaimprotocol/zk-fetch @reclaimprotocol/js-sdk

COPY reclaim.ts ./reclaim.ts

CMD ["npx", "tsx", "reclaim.ts"]
