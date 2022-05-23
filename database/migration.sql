DROP DATABASE IF EXISTS rageRoomdb;

CREATE DATABASE rageRoomdb;

DROP TABLE IF EXISTS customers;

CREATE TABLE customers(
   id SERIAL PRIMARY KEY NOT NULL,
   groupName TEXT NOT NULL,
   partySize INT NOT NULL,
   roomCategory CHAR(50),
   timeSlot INT NOT NULL
);