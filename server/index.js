const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express()
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.put('/uberdata', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    console.log(firstname + ' ' + lastname)
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
        db.each(`SELECT firstname,lastname,gender,destination FROM userprofile WHERE firstname is ? AND lastname is ?`, 
        [firstname, lastname],
        (err, row) => {
            if (err) {
                console.error(err.message);
            }
            res.send(row)
        });
    });
});

app.listen(3001, () => {
    console.log('listening on port 3001')
})