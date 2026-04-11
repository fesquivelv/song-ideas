FROM node:22-alpine3.22

# Install openssl on Alpine and clean up to reduce vulnerabilities
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD  npm run dev