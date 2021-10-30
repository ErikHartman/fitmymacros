const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const PORT = 3002;
const app = express();
app.use(cors());


// This should only be in db.js
export default db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "fitmymacros",
});

// Route to get all posts

app.get("/api/get", (req, res) => {
    const sqlSELECT = "SELECT * FROM recipes WHERE id=5";
    db.query(sqlSELECT, (err, result) => {
        res.send(result);
    });
});

// SUBSET FROM MYSQL
//SELECT * FROM tbl
// WHERE myrand > $x
// ORDER BY myrand  LIMIT 200000;

export default function generate_random_recipe() {
    const database_length = 10;
    random = Math.floor(Math.random(database_length)).toString();
    const sqlSELECT = "SELECT * FROM recipes WHERE id=" + random;
    db.query(sqlSELECT, (err, result) => {
        res.send(result);
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});