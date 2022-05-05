const mysql = require('mysql2/promise');

connect();

async function connect() {

    try {
        const con = await mysql.createConnection({
            "host": "localhost",
            "port": "3306",
            "user": "root",
            "password": "password",
            "database": "test"
        });

        // iNSERT INTO EMPLOYEES
        const resultInsert = await con.query(`INSERT INTO EMPLOYEES (NAME, SSN) VALUES (?, ?)`, ["REENA", "777"])
        console.log("resultInsert", resultInsert[0])

        // DELETE EMPLOYEE
        const resultDelete = await con.query(`DELETE FROM EMPLOYEES WHERE SSN = ?`, ['777'])
        console.log("resultDelete", resultDelete[0])

        // UPDATE EMPLOYEE
        const resultUpdate = await con.query(`UPDATE EMPLOYEES SET NAME = CONCAT('Mr. ', NAME) WHERE NAME IN (?, ?, ?)`, ['KARTHIK', 'YASH', 'ADHEERA'])
        console.log("resultUpdate", resultUpdate[0])

        // Display All Employee
        const resultAll = await con.query(`SELECT * FROM EMPLOYEES`)
        console.table(resultAll[0])

        // Display particular employee
        const name = 'ROCKY'
        // const result = await con.query(`SELECT * FROM EMPLOYEES WHERE NAME = '${name}' `);
        const result = await con.query(`SELECT * FROM EMPLOYEES WHERE NAME = ? `, name);
        console.log("result", result[0])


    } catch (e) {
        console.log("Error", e)
    }
}