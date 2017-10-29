# Readable

This is a CRUD app for posts and comments built for Udacity’s React Nanodegree course. The entire app is split into `/api` and `/frontend` directories. This `README` concerns the `/frontend` behavior.

The app fulfills the [requirements for the Readable project](https://review.udacity.com/#!/rubrics/1017/view) of the React/Redux segment of the course.

## Starting the app

### Install and start the API server

* `cd api-server`
* `npm install`
* `npm start`

### In another terminal window, install and start the pre-scaffolded Create React App project

* `cd frontend`
* `npm install`
* `npm start`

## Using the app

If I’ve done a good job, the UI/UX of the app should be self-explanatory ;-)

One behavior which may not be so obvious is sorting the lists. Two table headings – `Created at` and `Current score` – use links instead of plain text. Clicking on the link sorts on that attribute; clicking multiple times toggles the sort direction.

Note that the project requirements don't specify validation, and so this app doesn't use any. The app has been tested assuming values are entered with form fields.
