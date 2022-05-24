require("dotenv").config();
const express = require("express");
const pool = require("./database/conn.js");
const database = require("./database/conn.js");
const app = express();


app.use(express.static("public"));
app.use(express.json());

app.get("/api/customers", async (req, res) => {
  try {
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
      "INSERT INTO customers(groupName, partySize, roomCategory, timeSlot) VALUES($1, $2, $3, $4)",
      [req.body.age, req.body.kind, req.body.name]
    );
    res.send(req.body);
  } catch (err) {
    console.error(err.message);
  }
});

// app.patch("/api/customers/:id", async (req, res) => {
//   try {
//     const data = await pool.query("UPDATE customers SET name = $1 WHERE id = $2;", [
//       req.body.name,
//       req.params.id,
//     ]);
//     res.send(req.body);
//   } catch (err) {
//     console.error(err.message);
//   }
// });
app.patch('/api/customers/:id', async (req, res) => {
    try {
        const { groupName, partySize, roomCategory, timeSlot } = req.body;
         const data = await pool.query(`SELECT * FROM customers WHERE id = $1`, [req.params.id]);
        const updateDB = {
            groupName: groupName || data.rows[0].groupName,
            partySize: partySize || data.rows[0].partySize,
            roomCategory: roomCategory || data.rows[0].roomCategory,
            timeSlot: timeSlot || data.rows[0].timeSlot
        }
        const updateCustomers = await pool.query(`UPDATE customers SET groupName = $1, partySize = $2, roomCategory = $3, timeSlot = $4 WHERE id = $5 RETURNING *`, [updateDB.groupName, updateDB.partySize, updateDB.roomCategory, updateDB.timeSlot, req.params.id])
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