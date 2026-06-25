const express = require("express");

const Bible = require("../bible.json")

const app = express();
const port = 3000;

app.get("/:book/:chapter", (req, res) => {
    const book = req.params.book;
    let chapter = req.params.chapter;

    if (!chapter || chapter < 1 || chapter > 150) chapter = 1;

    const BibleBooks = Object.keys(Bible);
    if (!BibleBooks.includes(book)) return res.status(404).send("The provided book name was not found. Make sure the format is 3-letters capitalized: GEN, ROM, 1CO.")

    const result = Bible[book][chapter];

    return res.status(200).send(result);
})

app.listen(port)