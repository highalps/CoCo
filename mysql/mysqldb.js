var mysql = require('mysql');

var db = mysql.createConnection({
	host    :'localhost',
	user : 'root',
	password : 'root',
	database:'cap'
});

db.connect(function(err) {
	if (err) {
		console.error('mysql connection error');
		console.error(err);
		throw err;
	}
});

module.exports = db;