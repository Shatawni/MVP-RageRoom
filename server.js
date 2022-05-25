require("dotenv").config();
const express = require("express");
const pool = require("./database/conn.js");
const database = require("./database/conn.js");
const app = express();


app.use(express.static("public"));
app.use(express.json());

app.get("/api/customers", async (req, res) => {
  try {
    await pool.connect();
    const data = await pool.query("SELECT * FROM customers;");
    res.send(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/customers/:id", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM customers WHERE id = $1;", [
      req.params.id,
    ]);
    res.send(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/api/customers", async (req, res) => {
  try {
    const data = await pool.query(
      "INSERT INTO customers(groupname, partysize, roomcategory, timeslot) VALUES($1, $2, $3, $4)",
      [req.body.groupname, req.body.partysize, req.body.roomcategory, req.body.timeslot]
    );
    res.send(req.body);
  } catch (err) {
    console.error(err.message);
  }
});

app.patch('/api/customers/:id', async (req, res) => {
    try {
        const { groupname, partysize, roomcategory, timeslot } = req.body;
         const data = await pool.query(`SELECT * FROM customers WHERE id = $1`, [req.params.id]);
         console.log(data.rows[0])
        const updateDB = {
            groupname: groupname || data.rows[0].groupname,
            partysize: partysize || data.rows[0].partysize,
            roomcategory: roomcategory || data.rows[0].roomcategory,
            timeslot: timeslot || data.rows[0].timeslot
        }
        const updateCustomers = await pool.query(`UPDATE customers SET groupname = $1, partysize = $2, roomcategory = $3, timeslot = $4 WHERE id = $5 RETURNING *`, [updateDB.groupname, updateDB.partysize, updateDB.roomcategory, updateDB.timeslot, req.params.id])
        res.json(updateCustomers.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})


app.delete("/api/customers/:id", async (req, res) => {
  try {
    const data = await pool.query("DELETE FROM customers WHERE id = $1;", [
      req.params.id,
    ]);
    res.send(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});