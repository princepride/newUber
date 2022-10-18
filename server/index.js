const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express()
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.put('/uberdata', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const db = new sqlite3.Database('./uberdb.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log('Connected to the database.');
        }
    });
    db.serialize(() => {
        //db.each(`SELECT stocktickers,chromosome,max(sharpe) FROM garesults WHERE date='${day}'`, (err, row) => {
        db.each(`SELECT name,gender,destination FROM userprofile WHERE name is ? AND password is ?`, 
        [name, password],
        (err, row) => {
            if (err) {
                console.error(err.message);
            }
            console.log(row)
            res.send(row)
        });
    });
});

app.listen(3001, () => {
    console.log('listening on port 3001')
})