import express from "express";
import fetch from "node-fetch";

export const gist = express.Router();

/* routes to make
  GET /gist/username/:userName { userName: string }
   - get all gists by username and display them

  GET /gist/gistid { gistId: string }
   - get all gists information for specific gistid - comes from the list of gist of a user

  POST /gist/favorite/gistid { gistid: string, favorited: boolean}
   - favorite / unfavorite feature that needs to be tied to DB

  GET /gist/favorite
   - Returns list of all gists marked as favorites
*/

gist.get("/:username", async (req, res) => {
  const { username } = req.params; // check that username is valid and not something dumb - at least a string with alphanumeric only

  const userGists = await fetch(`https://api.github.com/users/${username}/gists`)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        throw Error(data.message);
      }
      return data;
    })
    .catch((error) => {
      if (error.message === "Not Found") {
        res.status(404).send("Username not found.");
      } else {
        res.status(500).send("Something went wrong with the service.");
      }
    });
  res.send(userGists);
});

gist.get("/:username/:gistId", async (req, res) => {
  // return a specific gist by a user
  const { username, gistId } = req.params; // check that username is valid and not something dumb - at least a string with alphanumeric only

  const singleGist = await fetch(`https://api.github.com/gists/${gistId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        throw Error(data.message);
      }
      return data;
    })
    .catch((error) => {
      if (error.message === "Not Found") {
        res.status(404).send("Gist not found.");
      } else {
        res.status(500).send("Something went wrong with the service.");
      }
    });
  // res.send(`getting a single gist for ${req.params.username} by id: ${req.params.gistId}`);
  res.send(singleGist);
});

gist.post("/favorite", (req, res) => {
  /* needs to write to a database table with:
        username/gistid/favorited?  
  */
  const { username, gistId, favorited } = req.body;
  res.send(
    `posting to set a favorite on user: ${username} - gistId: ${gistId} we're setting it to: ${favorited}`
  );
});

gist.get("/favorite", (req, res) => {
  // read from db and display gists that have been inserted into database
  res.send("getting all favorited gists from the db!");
});
