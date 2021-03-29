import express from "express";

import routes from "./routes";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
