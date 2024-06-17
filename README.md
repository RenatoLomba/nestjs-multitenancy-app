# Multi Tenancy App

Multi Tenancy application with NestJS

## Running

- First you will need a postgres database, if you don't have one, you can create and run a docker container with postgres using the command:

```bash
docker run --name multitenancy-db -p 5432:5432 -e POSTGRES_PASSWORD=pg123 -d postgres
```

- Then, with your database running, create a ```.env``` file in the root of the project, with the needed environment variables as shown in the ```.env.example``` file.

- With your database running and the .env file created, run the command to create the tables in the schema file into the database with the command:

```bash
npm run db:push
```

- Now, run the app in development mode:

```bash
npm run start:dev
```

- Examples for using the api are in the api.http file.
