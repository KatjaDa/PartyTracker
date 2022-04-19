const express = require('express');
const mysql = require('mysql');
const util = require('util');
const url = require('url');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:8080'}));

const connection = require('./connection');
const con = mysql.createConnection({
    host: connection.credentials.host,
    user: connection.credentials.user,
    password: connection.credentials.password,
    database: connection.credentials.database
});
const query = util.promisify(con.query).bind(con);

/**
 * Get all parties.
 */
app.get('/api/parties', function(req, res) {
    let sql = "SELECT party.id, name, date, time, location_id, address, city, x, y"
        + " FROM party, location"
        + " WHERE party.location_id = location.id";

    (async function() {
        try {
            const rows = await query(sql);
            res.send(rows);
        } catch (err) {
            console.log("Database error. " + err);
        }
    })()
})

/**
 * Get all parties in a given date range.
 */
app.get('/api/parties/date', function(req, res) {
    let q = url.parse(req.url, true).query;
    let minDate = q.min;
    let maxDate = q.max;
    let sql = "SELECT party.id, name, date, time, location_id, address, city, x, y"
        + " FROM party, location"
        + " WHERE party.location_id = location.id"
        + " AND date >= ? AND date <= ?;";

    (async function() {
        try {
            let rows = await query(sql, [minDate, maxDate]);
            res.send(rows);
        } catch (err) {
            console.log("Database error. " + err);
        }
    })()
})

/**
 * Get all parties in a given city
 */
app.get('/api/parties/city', function(req, res) {
    let q = url.parse(req.url, true).query;
    let city = q.city;
    let sql = "SELECT *"
        + " FROM party, location"
        + " WHERE party.location_id = location.id"
        + " AND location.city = ?";

    (async function() {
        try {
            let rows = await query(sql, [city]);
            res.send(rows);
        } catch (err) {
            console.log("Database error. " + err);
        }
    })()
})

/**
 * Add a new party to the database.
 */
app.post('/api/parties', function(req,res) {
    let response = false;
    let locationId;
    let sql = "SELECT *"
        + " FROM location"
        + " WHERE address = ?";

    (async function() {
        try {
            let matchingLocations = await query(sql, [req.body.address]);

            if (matchingLocations.length == 0) {
                sql = "INSERT INTO location (address, city, x, y)"
                    + " VALUES (?, ?, ?, ?)";
                let newLocation = await query(sql, [req.body.address, req.body.city, req.body.x, req.body.y]);
                locationId = newLocation.insertId;
            } else {
                locationId = matchingLocations[0].id;
            }

            sql = "INSERT INTO party (name, date, time, location_id)"
                + " VALUES (?, ?, ?, ?)";
            let result = await query(sql, [req.body.name, req.body.date, req.body.time, locationId]);
            if (result.affectedRows != 0) {
                response = true;
            }
        } catch (err) {
            console.log("Database error. " + err);
        }
        res.send(response);
    })()
})

/**
 * Delete a party with a given id
 */
app.delete("/api/parties", function(req,res) {
    let response = false;
    let sql = "DELETE FROM party"
        + " WHERE id = ?";

    (async function() {
        try {
            let result = await query(sql, [req.body.id]);
            if (result.affectedRows != 0) {
                response = true;
            }
        } catch (err) {
            console.log("Database error. " + err);
        }
        res.send(response);
    })()
})

const server = app.listen(8081, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Party Tracker API listening at http://%s:%s", host, port);
})
