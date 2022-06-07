const PORT = 8000;
const axios  = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/solve", (req, res) => {
  const options = {
    method: "POST",
    url: "https://solve-sudoku.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "solve-sudoku.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
    date: {
      puzzle: req.body.numbers,
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
      populateValues(response.data.solvable, response.data.solution);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
