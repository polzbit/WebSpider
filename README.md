# Web-Spider

## Overview

a simple web crawling service created using nodejs and react. 

when the form is submited, api start to crawl domain pages. extracting page by page.
UI updates on every page crawl that finished, then send POST for next page until pages equals to max page value.
stop condition raised when no more pages are found or num of pages equals to max pages value.

## Dependencies

- [axsios](https://axios-http.com/docs/intro)
- [cheerio](https://cheerio.js.org/)

## How To Build And Run Project

In the project Backend directory, run the following to install project dependencies:

### `npm install`

to start the api server you can run:

### `node server.js`

In the project Frontend directory, run the following to install project dependencies:

### `npm install`

to start the project run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

