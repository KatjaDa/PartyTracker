--Creating a database called partyevents
CREATE DATABASE IF NOT EXISTS partyevents;
--Go to the new database
USE partyevents;
--Create table to database
CREATE TABLE party (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL, eventDate DATE NOT NULL, eventTime VARCHAR(5) NOT NULL,
address VARCHAR (50), city VARCHAR (25), xcoord DOUBLE, ycoord DOUBLE,
PRIMARY KEY(id));

--Insert baseinformation to database
INSERT INTO party VALUES(1,"Tuska","220701", "14:00", "Suvilahti", "Helsinki", 60.166640739, 24.943536799);
INSERT INTO party VALUES(2,"Flow Festival","220812", "14:00", "Suvilahti", "Helsinki", 60.166640739, 24.943536799);
INSERT INTO party VALUES(1,"Ruisrock","220708", "14:00", "Ruissalo", "Turku", 60.43296293296505, 22.155743924106414);

--If you want to check data from table:
SELECT * FROM party;
