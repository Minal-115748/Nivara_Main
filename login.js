const mysql = require("mysql2");
const express = require("express");
const path = require("path");

const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root@11",
    database: "LOGIN"
});

connection.connect((error) => {
    if (error) {
        console.error("Database connection failed:", error);
    } else {
        console.log("Connected to DB successfully");
    }
});

app.use(express.static(__dirname)); // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse form data

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Login.html"));
});



app.post("/", (req, res) => {
    console.log("Received Data:", req.body);  // Debugging

    var username = req.body.username;
    var password = req.body.password;

    console.log("Username:", username, "Password:", password); // Debugging
    console.log(
        `SELECT * FROM usersDetails WHERE username = '${username}' AND password = '${password}'`
    );
    connection.query(
        "SELECT * FROM usersDetails WHERE username = ? AND password = ?", 
        [username, password], 
        function(error, result, fields) {
            console.log("Query Result:", result); // Debugging

            if (result.length > 0) {
                res.redirect("/index.html");
            } else {
                res.redirect("/");
            }
            res.end();
        }
    );
});

app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

