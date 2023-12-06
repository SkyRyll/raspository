CREATE DATABASE IF NOT EXISTS systeminfo;
USE systeminfo;

DROP TABLE IF EXISTS systemvalues;
CREATE TABLE IF NOT EXISTS systemvalues(
    date datetime NOT NULL,
    temp varchar(15),
    avgload1 float,
    avgload5 float,
    avgload15 float,
    PRIMARY KEY (date)
);

DROP TABLE IF EXISTS tickets;
CREATE TABLE IF NOT EXISTS tickets(
    id INT NOT NULL AUTO_INCREMENT,
    errorName varchar(50),
    description varchar(512),
    PRIMARY KEY (id)
);
