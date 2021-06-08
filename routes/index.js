const router = require("express").Router();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const customMid = require("../middlewares");
const Database = require("../database");

const csrfProtection = csurf({ cookie: true });
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/403", (request, response) => {
    response.render("403");
});

router.get("/home", [customMid.checkSession], (request, response) => {
    return response.render("home");
});


router.get("/login", [cookieParser(), csrfProtection], (request, response) => {
    response.render("login", { csurf: request.csrfToken() });
});

router.post("/login", [urlencodedParser,
    cookieParser(),
    csrfProtection,
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
], (request, response) => {
    const errors = validationResult(request);
    if (errors.isEmpty() == true) {
        const email = request.body.email;
        const password = request.body.password;

        const database = new Database();
        database.sql = `SELECT username FROM users WHERE email='${email}' AND password=SHA2('${password}',256) ;`;
        database.getConnection();
        database.runSql(function(data) {
            if (data.length > 0) {
                request.session.authorize = true;
                return response.redirect("/home")
            } //else {
            return response.render("login", {
                csurf: request.csrfToken(),
                credientialserror: errors.array()
            });
            //}

        });

    }

    if (errors.isEmpty() == false) {
        return response.render("login", {
            csurf: request.csrfToken(),
            paramerror: errors.array()
        });
    }

});


router.get("/logout", [customMid.checkSession], (request, response) => {
    request.session.destroy((error) => {
        return response.redirect("/login");
    });
});

router.use((err, request, response, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    response.status(403);
    response.redirect("/403");
});

module.exports = router;