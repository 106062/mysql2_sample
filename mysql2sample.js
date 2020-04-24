"use strict";
const mysql = require("mysql2/promise");
const sqlstring = require("mysql").format;
const fs = require('fs');

const pool = mysql.createPool({
});

async function main(){
	try {
		const path = "/data/test.csv"
		const sqlcmd = (`LOAD DATA LOCAL INFILE '${path}' ` +
						"INTO TABLE `test` " +
						"FIELDS TERMINATED BY ',' " +
						"LINES TERMINATED BY '\n'");
		await pool.query({
			sql:sqlcmd,
			infileStreamFactory: () => fs.createReadStream(path)
			}, path);
		console.log(sqlcmd);
	} catch(err) {
		console.log(err);
	} finally {
		pool.end();
	}
}

main();
