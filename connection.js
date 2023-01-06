var mysql=require("mysql");
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"delivery"
});
module.exports=con;
