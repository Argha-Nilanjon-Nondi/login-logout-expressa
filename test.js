const { body, validationResult } = require('express-validator');

// const database = require("./database");

// const obj = new database();
// obj.sql = `SHOW tables;`;
// obj.getConnection();
// obj.runSql(function(data) {
//     console.log(data);
//     return 0;
// })

// const mysql = require("mysql");
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "argha_nilanjon",
//     password: "avunix9143",
//     database: "student-management-system"
// });
// con.connect((err) => {
//     if (err) {
//         console.log("hi error");
//     }

//     con.query(`show TABLES ;`, (err, data, fields) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(data.length);

//         con.destroy();
//     });
// });

// async function main(callback) {

//     setTimeout(() => {
//         callback("ki");
//     }, 2000);
// }

// main((data) => {
//     console.debug(data);
// });