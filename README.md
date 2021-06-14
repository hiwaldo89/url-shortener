# URL Shortener project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The project has a nested `server` project that handles the url shortener and redirects the user the the `long url`
React is used to display the form.

## Requirements

- Node >= 10
- Copy the `.env.example` file to `.env` and add a MongoDB connection string

## API Docs

You can view available endpoints at [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Run the project

### `yarn start`

Runs the app in production mode and starts the server.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser

## Run tests

To run the backend tests, navigate to the `server` folder and run `yarn test`

## About the project

### Why not use a hash function?

The reason I'm not using a hash function is to avoid collisions while saving a url to the database.

### Motivations to use a database

I decided to use mongo to store the urls because they are simple documents. No need to use relationships between entities.
