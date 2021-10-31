const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const PORT = 3002;
const app = express();
app.use(cors());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fitmymacros",
});

app.get("/api/get", (req, res) => {
    const sqlSELECT = "SELECT * FROM recipes";
    db.query(sqlSELECT, (err, result) => {
        res.send(result);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});