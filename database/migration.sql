DROP DATABASE IF EXISTS rageroomdb;
DROP TABLE IF EXISTS customers;

CREATE DATABASE rageroomdb;

\c rageroomdb

CREATE TABLE customers(
   id SERIAL PRIMARY KEY NOT NULL,
   groupName TEXT NOT NULL,
   partySize INT NOT NULL,
   roomCategory CHAR(50),
   timeSlot INT NOT NULL
);