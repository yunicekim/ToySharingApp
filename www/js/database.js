// File name : YKdatabase.js
// Program : PROG2430 Assignment 2
// Purpose : to make a DB connection
// Revision History :
//     Abel Olayyan & Yunice Kim, Apr 20, 2020 : Created

var db;
function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + " (" + error.code + ") -- " + error.message);
}

var DB = {
    createDatabase: function(){
        var shortName = "Toys Sharing App DB";
        var version = "1.0";
        var displayName = "DB for Toys Sharing App";
        var dbSize = 2 * 1024 * 1024; //2MB

        function dbCreateSuccess(){
            console.info("Success: Database creation successful");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function () {
        function txFunction(tx) {
            var sqlTableFamily = "CREATE TABLE IF NOT EXISTS family(" +
                "familyId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "email VARCHAR(20) NOT NULL, " +
                "name VARCHAR(20) NOT NULL," +
                "address VARCHAR(30), " +
                "city VARCHAR(20), " +
                "province VARCHAR(2), " +
                "postalCode VARCHAR(7), " +
                "phone VARCHAR(12), " +
                "joinDate DATE); ";

            var sqlTableToys = "CREATE TABLE IF NOT EXISTS toys(" +
                "toyId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "toyName VARCHAR(20) NOT NULL, " +
                "description VARCHAR(100), " +
                "picture VARCHAR(100000), " +
                "conditionLevel VARCHAR(6), " +
                "registerDate DATE, " +
                "registerEmail VARCHAR(20) NOT NULL, " +
                "FOREIGN KEY(registerEmail) REFERENCES family(email));";

            var sqlTableSharing = "CREATE TABLE IF NOT EXISTS sharing(" +
                "sharingId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "renterEmail VARCHAR(20) NOT NULL," +
                "toyId INTEGER NOT NULL," +
                "rentDate DATE, " +
                "returnDate DATE, " +
                "actualReturnDate DATE, " +
                "isRent INTEGER NOT NULL, " +
                "FOREIGN KEY (renterEmail) REFERENCES family(email)," +
                "FOREIGN KEY (toyId) REFERENCES toys(toyId)); ";

            var options = [];

            function successCallback(){
                console.info("Success: Table creation successful");
            }

            tx.executeSql(sqlTableFamily, options, successCallback, errorHandler);
            tx.executeSql(sqlTableToys, options, successCallback, errorHandler);
            tx.executeSql(sqlTableSharing, options, successCallback, errorHandler);
        }

        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function txFunction(tx){
            var sqlDropSharing = "DROP TABLE IF EXISTS sharing;";
            var sqlDropToys = "DROP TABLE IF EXISTS toys;";
            var sqlDropFamily = "DROP TABLE IF EXISTS family;";
            var options = [];
            function successCallback(){
                console.info("Success: Table dropped successfully");
            }

            tx.executeSql(sqlDropSharing, options, successCallback, errorHandler);
            tx.executeSql(sqlDropToys, options, successCallback, errorHandler);
            tx.executeSql(sqlDropFamily, options, successCallback, errorHandler);
        }

        function successTransaction(){
            console.info("Success: Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
