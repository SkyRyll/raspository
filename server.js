const express = require("express");
const app = express();
const session = require("express-session");
const mysql = require("mysql2");

//VARIABLES
const dbHost = "localhost";
const dbUser = "skyryll";
const dbPass = "SkyDbAccess";
const dbDatabase = "systeminfo";
const nodeAppPort = 3000;

// expose static path
app.use(express.static("static"));

// set view engine
app.set("view engine", "ejs");

//initialize session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// host app on port xxxx
app.listen(nodeAppPort, () => {
    console.log(`App listening at port ${nodeAppPort}`);
    console.log("http://localhost:" + nodeAppPort + "/");
});

//connect to local database
const connection = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbDatabase,
});

// connection test
connection.connect(function (error) {
    if (error) throw error;
    else console.log("connection to database successful");
});

// route pages
app.get("/", (req, res) => {
    get_index(req, res);
});

function get_index(req, res) {
    res.render("pages/index", {
        loggedin: req.session.loggedin,
    });
}

app.get("/ticketform", (req, res) => {
    get_ticketform(req, res);
});

function get_ticketform(req, res) {
    res.render("pages/ticketform", {
        loggedin: req.session.loggedin,
    });
}

app.get("/getSystemInfo", (req, res) => {
    const query = "SELECT * FROM systemvalues ORDER BY date ASC";
    connection.query(query, (err, result) => {
        if (err) {
            console.error("Database query error: " + err.message);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
});

app.post("/ticketform", function (req, res) {
    var errorName = req.body.errorName;
    var description = req.body.description;
    const query = "INSERT INTO tickets (errorName, description) VALUES (?,?)";
    connection.query(query, [errorName, description], function (err, result) {
        if (err) throw err;
        res.status(200);
        alert("Successfully saved to database");
    });
});
