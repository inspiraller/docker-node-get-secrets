FROM node:20
WORKDIR /usr/src/app
COPY node-files .
RUN npm ci && npm run build
ENV NODE_ENV=production
RUN --mount=type=secret,id=THEPASSWORD1,target=./run/secrets/THEPASSWORD1
CMD ["node", "dist/get-secrets.js"]
