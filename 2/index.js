const express = require("express");
const path = require("path");
const port =3000;
const sqlite3 = require("sqlite3").verbose();

const app = express();

let db = new sqlite3.Database("questions.db",(err) => {
    if (err) {
        return console.log(err)
    }
    console.log("Connected to the databse.")
})

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res) => {
    let sql = "SELECT * FROM questions"
    db.all(sql,[],(err,rows) => {
        if (err) {
            throw err
        }
        console.log(rows)
        res.render('index',{data:rows})
    })
})





app.listen(port,() => {
    console.log("Server has been connected.")
})
