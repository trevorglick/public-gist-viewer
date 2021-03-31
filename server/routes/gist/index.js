import express from "express";
import fetch from "node-fetch";

export const gist = express.Router();

/* routes to make
  GET /gist/username { userName: string }
   - get all gists by username and display them

  GET /gist/gistid { gistId: string }
   - get all gists information for specific gistid - comes from the list of gist of a user
*/

gist.get("/gistId/:gistId", async (req, res) => {
  // return a specific gist by a user
  const { gistId } = req.params; // check that username is valid and not something dumb - at least a string with alphanumeric only

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

gist.get("/username/:username", async (req, res) => {
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