# Github Gist Searchario

This program is a simple application to search for gists based on a username. If gists exist for that user you will see a list of them.

You can also click the star button next to each list item to favorite or unfavorite.

Favorited items will show up under the favorites header on the left.

## Prereqs

This application was built using node 12.13.1 - hopefully it works for you!

This application requires a postgres database in order to connect and create the DB.
Inside of the `server/constants/index.js` file you will find all of the DB settings I used and you can change them as you like to connect to a postgres DB instance of your own.

This application will connect to a DB and create the table `favorites` if it doesn't exist.

## To install

From the root of the project run `yarn install` - this will kick off yarn install for client and then yarn install for server.

## To Run

From the client directory run `yarn start` in one terminal tab, then in another terminal tab open up the server directory and run `yarn start`.

Everything should look fine :crossed_fingers:
