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

# INSERT INTO systemvalues (date, temp, avgload1, avgload5, avgload15) values("2019-01-01 00:00:00", 0, 0, 0, 0);
