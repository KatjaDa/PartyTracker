const express = require('express');
const mysql = require('mysql');
const util = require('util');
const app = express();

const connection = require('./connection');
const con = mysql.createConnection({
    host: connection.credentials.host,
    user: connection.credentials.user,
    password: connection.credentials.password,
    database: connection.credentials.database
});
const query = util.promisify(con.query).bind(con);

app.get('/', function(req, res) {
    (async function() {
        const rows = await query("SELECT * FROM party");
        res.send(rows);
    })()
})

const server = app.listen(8081, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Party Tracker API listening at http://%s:%s", host, port);
})
