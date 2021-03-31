import express from "express";

import { gist } from "./gist";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.status(200).json({ message: "connected" });
});

routes.use("/gist", gist);

export default routes;
