FROM node:20
WORKDIR /usr/src/app
COPY node-files .
RUN npm ci && npm run build
ENV NODE_ENV=production
CMD ["node", "dist/node-server.js"]
