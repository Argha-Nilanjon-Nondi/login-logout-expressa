const express = require("express");
const path = require("path");
const helmet = require("helmet");
const session = require("express-session");
const Database = require("./database");

const app = express();
const port = process.env.PORT || 3000;
const Rout = require("./routes");

app.use("/static", express.static(path.join(path.resolve(__dirname), "static")));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(__dirname), "templates"));


const middlewares = [
    helmet(),
    express.json(),
    session({
        secret: "12345788765436",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 8 * 24 * 60 * 1000 * 60,
            secure: false
        }
    })
];

app.use(middlewares);

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*")
    next();
});

//we should use router at after using middllewares
app.use("/", Rout);

app.listen(port, () => {
    console.log(`Running pn http://127.0.0.1:${port}/ `);
});