const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs"); // Add bcrypt for password hashing

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

// 🔹 LOGIN ROUTE
app.post("/", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    connection.query(
        "SELECT * FROM usersDetails WHERE username = ?", 
        [username], 
        async (error, result) => {
            if (result.length > 0) {
                const match = await bcrypt.compare(password, result[0].password);
                if (match) {
                    res.redirect("/home");
                } else {
                    res.send(`<script>alert("❌ Incorrect Password! Please try again."); window.location.href = "/";</script>`);
                }
            } else {
                res.send(`<script>alert("⚠️ User does not exist! Please sign up."); window.location.href = "/";</script>`);
            }
            res.end();
        }
    );
});

// 🔹 SIGNUP ROUTE
app.post("/Signup", async (req, res) => {
    const { newUsername, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the password

    connection.query(
        "INSERT INTO usersDetails (username, password) VALUES (?, ?)", 
        [newUsername, hashedPassword], 
        (error, result) => {
            if (error) {
                console.error(error);
                res.send(`<script>alert("❌ Username already exists! Try a different one."); window.location.href = "/Signup.html";</script>`);
            } else {
                res.send(`<script>alert("✅ User registered successfully! Please login."); window.location.href = "/";</script>`);
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
