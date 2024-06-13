# Multi Tenancy App

Multi Tenancy application with NestJS

## Running

- First you will need a postgres database, if you don't have one, you can create and run a docker container with postgres using the command:

```bash
docker run --name multitenancy-db -p 5432:5432 -e POSTGRES_PASSWORD=pg123 -d postgres
```

- Then, with your database running, create a ```.env``` file in the root of the project, with the needed environment variables as shown in the ```.env.example``` file.

- Now, install the dependencies and run the app in development mode:

```bash
npm install
npm run start:dev
```
