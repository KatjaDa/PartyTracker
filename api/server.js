const express = require('express');
const mysql = require('mysql');
const util = require('util');
const url = require('url');
const app = express();

const connection = require('./connection');
const con = mysql.createConnection({
    host: connection.credentials.host,
    user: connection.credentials.user,
    password: connection.credentials.password,
    database: connection.credentials.database
});
const query = util.promisify(con.query).bind(con);

app.get('/api/parties', function(req, res) {
    (async function() {
        try {
            const rows = await query("SELECT * FROM party");
            res.send(rows);
        } catch (err) {
            console.log("Database error: " + err);
        }
    })()
})

app.get('/api/parties/date', function(req, res0) {
    let query = url.parse(req.url, true).query;
    let minDate = query.min;
    let maxDate = query.max;
    let sql = "SELECT id, name, time, address, city" +
        "FROM party, location" +
        "WHERE party.location_id = location.id AND date >= ? AND date <= ?;";

    (async function() {
        try {
            let rows = await query(sql, [minDate, maxDate]);
            res.send(rows);
        } catch (err) {
            console.log("Database error: " + err);
        }
    })()
})

const server = app.listen(8081, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Party Tracker API listening at http://%s:%s", host, port);
})
