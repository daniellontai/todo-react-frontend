# React-Todo

The application uses React for the front-end UI and Node.js+Express+Prisma for the back-end, serving the front end and the API 'talking to' the PostgreSQL database.

## Keyboard shortcuts while a task row input is focused

`enter` to add task
`ctrl` + `enter` to complete task
`backspace` in empty task row to delete task

## .env

The .env file is used by `docker-compose.yml` and `server/index.js`. The environmental values are ultimately used by PostgreSQL and Prisma.
Copy `samples/.env.sample` to `./.env` and edit the parameters for your use case before docker-composing.

### Parameters
- `POSTGRESDB_HOST`: PG database host. If using docker-compose leave on `postgresdb`
- `POSTGRESDB_USER`: Arbitrary PG database user.
- `POSTGRESDB_PASSWORD`: Arbitrary PG database password.
- `POSTGRESDB_DATABASE`: Arbitrary PG database name. This gets created on first spool up before Prisma attempts to connect to it.
- `POSTGRESDB_LOCAL_PORT`: Localhost port of PostgreSQL database
- `POSTGRESDB_DOCKER_PORT`: Container port of PostgreSQL database
- `DATABASE_URL`: PostgreSQL (and probably other RDBMS's, untested) connection URI. For more info see: [https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris)
- `NODE_PORT`: Port that the Node.js server will run on.

## Available Scripts

In the root directory, you can run:

### `npm run start`

- Builds the app for production to the `build` folder.\
- Runs the Node.js Express backend serving from `build` if available or `server/public/` as a fallback.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run start-client`

- Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run start-server`

- Runs the Node.js Express backend serving from `build` if available or `server/public/` as a fallback.
- Runs `npx prisma migrate` (assumes `npx prisma generate` was ran during build)
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

TODO
- Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

- Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.