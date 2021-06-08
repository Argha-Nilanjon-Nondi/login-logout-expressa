const { request, response } = require("express");

function checkLoginInfo(request, response, next) {
    console.log("Middleware is working");
    next();
}

function checkSession(request, response, next) {
    if (request.session.authorize != undefined) {
        if (request.session.authorize == true) {
            next();
        }
    } else {

        return response.redirect("/403")
    }
}

exports.checkLoginInfo = checkLoginInfo;
exports.checkSession = checkSession;