# Use Node.js as the base image
FROM node:20

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

RUN echo "{}" > package.json && npm i @reclaimprotocol/zk-fetch @reclaimprotocol/js-sdk

# Copy zktls folder
COPY reclaim.ts ./reclaim.ts

# Run the typescript file using tsx
CMD ["npx", "tsx", "reclaim.ts"]
