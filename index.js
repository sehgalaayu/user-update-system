const express = require("express");
const app = express();
const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "enter-ur-pwd",
});

// Helper to generate fake users
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// Home route (displays count)
app.get("/", (req, res) => {
  let q = `SELECT count(*) from user`;
  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Some error in database");
    }
    let count = result[0]["count(*)"];
    res.render("home.ejs", { count });
  });
});

// List all users
app.get("/users", (req, res) => {
  let q = `SELECT * from user`;
  connection.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Some error in database");
    }
    res.render("users.ejs", { users: result });
  });
});

// Route to render edit form
app.get("/users/:id/edit", (req, res) => {
  const { id } = req.params;
  const q = `SELECT * FROM user WHERE id = ?`;
  connection.query(q, [id], (err, result) => {
    if (err || result.length === 0) {
      console.log(err || "User not found");
      return res.send("User not found or DB error");
    }
    res.render("edit.ejs", { user: result[0] });
  });
});

// PATCH route to update username after password check
app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { newUsername, password } = req.body;

  const getUserQuery = `SELECT * FROM user WHERE id = ?`;
  connection.query(getUserQuery, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    if (result.length === 0) {
      return res.send("User not found");
    }

    const user = result[0];
    if (user.password !== password) {
      return res.send("Incorrect password. Username not updated.");
    }

    const updateQuery = `UPDATE user SET username = ? WHERE id = ?`;
    connection.query(updateQuery, [newUsername, id], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Error updating username");
      }

      res.redirect("/users");
    });
  });
});

app.listen("8080", () => {
  console.log("Listening on port 8080");
});
