// This is where the routes are defined and how they are handled
// TODO: A step further to take would be to attatch a database but we'll use a fake db for now ln:12
const express = require("express");

const app = express();
const PORT = 3000;

// *** SERVE FILES FROM:  ***
app.use(express.static("public"));
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
    storedText ||= "________";
    console.log({ expressGET: storedText });

    res.send({ storedText });
  } catch (error) {
    console.log({ error });
  }
});

app.post("/post-text", async (req, res) => {
  try {
    storedText = req.body.inputValue;
    console.log({ expressPOST: { storedText } });

    res.send(`Input received: ${storedText}`);
  } catch (error) {
    console.log({ error });
    res.status(500).send("External server error");
  }
});

app.patch("/patch-text", async (req, res) => {
  try {
    storedText = req.body.inputValue;
    console.log({ expressPATCH: { storedText } });

    res.send(`Input received: ${storedText}`);
  } catch (error) {
    console.log({ error });
    res.status(500).send("External server error");
  }
});

app.delete("/delete-text", async (req, res) => {
  try {
    storedText = "________";
    console.log({ expressDELETE: { storedText } });

    res.send("Stored text deleted");
  } catch (error) {
    console.log({ error });
    res.status(500).send("External server error");
  }
});
// *** *** *** ***

// *** PORT ***
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
// *** *** *** ***
