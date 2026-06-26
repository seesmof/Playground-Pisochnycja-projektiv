const express = require("express");
const cors = require("cors");

const Bible = require("../bible.json")

const app = express();
app.use(cors());
const port = 8080;

let todos = [];

app.get("/", (req, res) => {
    return res.status(200).send("Jesus is LORD")
})

app.get("/:book/", (req, res) => {
    const book = req.params.book;

    const BibleBooks = Object.keys(Bible);
    if (!BibleBooks.includes(book)) return res.status(404).json("The given Book was not found. Please check the input to make sure it is in a valid format: GEN, ROM, 1CO.")

    const data = Bible[book];
    console.log(data);

    return res.status(200).json(data);
})

app.listen(port)