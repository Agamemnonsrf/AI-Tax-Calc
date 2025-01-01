# Stage 1: Install dependencies
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

# Stage 2: Build the application
FROM node:20-alpine AS build
WORKDIR /app
COPY . /app/
COPY --from=dependencies /app/node_modules /app/node_modules
RUN npm run build

# Stage 3: Final image
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
COPY --from=dependencies /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
RUN npm install -g cross-env @react-router/serve
EXPOSE 3000
CMD ["cross-env", "NODE_ENV=production", "react-router-serve", "./build/server/index.js"]