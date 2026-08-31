const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require("sqlite3").verbose();

const app = express();

let db = new sqlite3.Database('userdata.db', (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log("Connected to the SQlite database.")
})

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res) => {
    let sql = "SELECT * FROM users"
    db.all(sql,[],(err,rows) => {
        if (err){
            throw err;
        }
        console.log(rows)
        res.render("index",{data:rows})
    })
})

app.get("/detailed/:id",(req,res) => {
    const userID = req.params.id
    let sql = "SELECT * FROM users WHERE id = ?"
    db.get(sql,[userID],(err,rows) => {
        if (err) {
            throw err;
        }
        console.log(rows)
        res.render("detailed",{data:rows})
    })
})



app.listen(port, () => {
    console.log("Server has started.")
})