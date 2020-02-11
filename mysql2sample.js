"use strict";
const mysql = require("mysql2/promise");
const sqlstring = require("mysql").format;
const fs = require('fs');

const pool = mysql.createPool({
});

async function main(){
	try {
		const path = "/database/coboldata/preTrade/O40/O40V.DAT.01090211"
		const sqlcmd = (`LOAD DATA LOCAL INFILE '${path}' ` +
						"INTO TABLE `SO40_OLD` " +
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
