// This is where the routes are defined and how they are handled
// TODO: A step further to take would be to attatch a database but we'll use a fake db for now ln:12
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// *** FAVICON ***
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
// *** *** *** ***

// *** SERVE FILES FROM:  ***
app.use(express.static(path.join(__dirname, "public")));
// *** *** *** ***

// *** BODY PARSER ***
app.use(express.json());
// *** *** *** ***

// *** FAKE DB ***
// This will act as the single item in a fictional database
let storedText = null;
// *** *** *** ***

// *** ROUTES ***
app.get("/", async (req, res) => {
  res.sendFile(__dirname, "public", "index.html");
});

app.get("/get-text", async (req, res) => {
  try {
    if (storedText) {
      res.send({ storedText });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(500).send("External server error");
  }
});

app.post("/post-text", async (req, res) => {
  try {
    if (req.body.inputValue) {
      storedText = req.body.inputValue;
      res.send(`Input received: ${storedText}`);
    } else {
      throw error;
    }
  } catch (error) {
    res.status(500).send("External server error");
  }
});

app.patch("/patch-text", async (req, res) => {
  try {
    if (req.body.inputValue) {
      storedText = req.body.inputValue;
      res.send(`Input received: ${storedText}`);
    } else {
      throw error;
    }
  } catch (error) {
    res.status(500).send("External server error");
  }
});

app.delete("/delete-text", async (req, res) => {
  try {
    if (storedText) {
      storedText = null;
      res.send({ storedText });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(500).send("External server error");
  }
});
// *** *** *** ***

// *** PORT ***
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
// *** *** *** ***
