# build stage
FROM node:20-alpine as build
WORKDIR /app

COPY pnpm-lock.yaml package.json ./

# install pnpm as defined in package.json
RUN npm i -g $(node -p "require('./package.json').packageManager")

COPY . ./
RUN pnpm install --frozen-lockfile

RUN pnpm build
RUN pnpm generate

# production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
