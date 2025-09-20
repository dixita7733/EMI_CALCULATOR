const sql = require("mysql2");
const sqlconnect = sql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "dishu7733",
    database : "emi_application",
    multipleStatements : true
})

sqlconnect.connect((err) => {
    if(!err){
        console.log("Database Connected!");
    }
   else {
    console.error("Database Not Connected!", err);
   }

})

module.exports = sqlconnect;