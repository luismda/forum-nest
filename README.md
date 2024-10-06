# Forum 💬

This project is an API in Node.js for a student forum to create questions and receive answers, developed using DDD, SOLID and Clean Architecture principles, in addition to Nest.js, PostgreSQL, Redis and Docker.

> All use cases have unit tests and all HTTP routes have e2e tests. 🔥

## Setup

First of all, you must create a `.env` file in the root following the `.env.example`.

### Data

For PostgreSQL and Redis variables, you can up the Docker container locally.

```sh
docker compose up -d
```

### Auth

> The auth module of this project uses the RS256 algorithm, so you must generate a private and public key, and add them to the JWT environment variables.

To generate the keys, run the commands below in your terminal to create the files containing the two keys. Then copy the contents of the files to the `.env`.

```sh
# Generate private key file
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

# Generate public key file from private key
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

### Storage

Finally, to upload files, Cloudflare R2 is used in this project through the Amazon S3 SDK. Therefore, you will need to create a bucket on Cloudflare R2 and obtain the credentials.

## Running

After preparing the necessary environment variables, you can run the commands below.

```sh
# Install the dependencies
pnpm i

# Run migrations on database
pnpm prisma migrate deploy

# Start project 🚀
pnpm start:dev
```

With the commands below you can also run all tests.

```sh
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e
```