# Tambola Ticket Generator

## Project Description

The Tambola Ticket Generator is a secure and scalable RESTful API designed to generate tickets. The application allows users to create and read tambola tickets.

### Technical Stack

- **Framework:** NestJs
- **Database:** Postgres
- **ORM:** Sequelize

## Configuration

1. Create a `.env` file in the project root with the following variables:

### App_env The environment in which the application is running

```
 NODE_ENV=development
```

### Port for the server to run on

```
 PORT=4000
```

### Database connection details

```
DB_DIALECT= # The dialect of the database server
DB_HOST= # The hostname of the database server
DB_PORT= # The port number on which the database server is listening
DB_USERNAME= # The username of the database user
DB_PASSWORD= # The password of the database user
DB_NAME= # The name of the database
```

## Running the Server

Execute the `npm run start:dev` command to run the server. The application will be accessible at `http://localhost:4000`.
