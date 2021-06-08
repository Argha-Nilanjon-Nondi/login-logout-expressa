const mysql = require("mysql");

class Database {

    getConnection() {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "argha_nilanjon",
            password: "avunix9143",
            database: "book-store-management"
        });
    }

    runSql(callback) {
        this.con.connect((err) => {
            if (err) {
                return callback([]);
            }

            this.con.query(this.sql, (err, data) => {
                if (err) {
                    return callback([]);
                }
                callback(data);

                this.con.destroy();
            });
        });

    }
}

module.exports = Database;