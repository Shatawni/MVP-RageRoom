-- DROP DATABASE IF EXISTS rageroomdb;
-- DROP TABLE IF EXISTS customers;

-- CREATE DATABASE rageroomdb;

-- \c rageroomdb

CREATE TABLE customers(
   id SERIAL PRIMARY KEY,
   groupname TEXT,
   partysize INT,
   roomcategory VARCHAR(50),
   timeslot INT
);