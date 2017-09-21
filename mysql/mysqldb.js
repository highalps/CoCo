var mysql = require('mysql');

var db = mysql.createConnection({
	host: '220.230.118.120',
	port: 3306,
	user: 'coco',
	password: 'whdtjf123@',
	database: 'coco'
});

db.connect(function(err) {
	if (err) {
		console.error('mysql connection error');
		console.error(err);
		throw err;
	}
});

module.exports = db;