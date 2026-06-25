const express = require("express");

const Bible = require("../bible.json")

const app = express();
const port = 3000;

app.get("/:book/:chapter", (req, res) => {
    const book = req.params.book;
    const chapter = req.params.chapter;

    const BibleBooks = Object.keys(Bible);
    if (!BibleBooks.includes(book)) return res.status(404).send("The provided book name was not found. Make sure the format is 3-letters capitalized: GEN, ROM, 1CO.")
})

app.listen(port)