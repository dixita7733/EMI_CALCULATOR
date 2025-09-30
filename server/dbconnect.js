const sql = require("mysql2");
const sqlconnect = sql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "dishu7733",
    database: "emi_application",
    multipleStatements: true
});

await db.query("CREATE DATABASE emi_application");
console.log("database created Successfully!");

await db.query("USE emi_application");

sqlconnect.connect((err) => {
    if (!err) {
        console.log("Database Connected!");

        const createEmiTable = `
        CREATE TABLE IF NOT EXISTS emi_schedule (
            srNo INT AUTO_INCREMENT PRIMARY KEY,
            emi_date DATE NOT NULL,
            emiAmount DECIMAL(10,2) NOT NULL,
            balanceAmount DECIMAL(10,2) NOT NULL
        );
        `;

        sqlconnect.query(createEmiTable, (err, result) => {
            if (!err) {
                console.log("Table created successfully!");
            } else {
                console.error("Error creating emi_schedule table:", err);
            }
        });

    } else {
        console.error("Database Not Connected!", err);
    }
});

module.exports = sqlconnect;
