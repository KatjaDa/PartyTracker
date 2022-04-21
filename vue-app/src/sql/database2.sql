--Creating a database called partyevents
CREATE DATABASE IF NOT EXISTS partyevents;
--Go to the new database
USE partyevents;
--Create tables to database
CREATE TABLE location (
    id INT NOT NULL AUTO_INCREMENT,
    address VARCHAR (50),
    city VARCHAR (25),
    x DOUBLE,
    y DOUBLE,
    PRIMARY KEY(id)
);

CREATE TABLE party (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(5) NOT NULL,
    location_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(location_id) REFERENCES location(id)
);

--Insert baseinformation to database
INSERT INTO location (address, city, x, y)
VALUES ("Suvilahti", "Helsinki", 60.166640739, 24.943536799);
INSERT INTO location (address, city, x, y)
VALUES ("Ruissalo", "Turku", 60.43296293296505, 22.155743924106414);

INSERT INTO party (name, date, time, location_id)
VALUES ("Tuska","220701", "14:00", 1);
INSERT INTO party (name, date, time, location_id)
VALUES ("Flow Festival","220812", "14:00", 1);
INSERT INTO party (name, date, time, location_id)
VALUES ("Ruisrock","220708", "14:00", 2);

--If you want to check data from tables:
SELECT * FROM party;
SELECT * FROM location;
SELECT * FROM party, location WHERE party.location_id = location.id;
