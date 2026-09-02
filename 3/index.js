const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require("sqlite3").verbose();

const app = express();

let db = new sqlite3.Database("tracking.db",(err) => {
    if (err) {
        return console.log(err)
    }
    console.log("Connected to the database.")
});

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res) => {
    const sql = "SELECT id,name,product,status FROM tracks"
    db.all(sql,(err,result) => {
        if (err) {
            throw err
        }
        console.log(result)
        res.render("index",{data:result})
    })
})

app.post("/add", (req,res) => {
    const {customer,item,address,tel} = req.body;
    const sql = "INSERT INTO tracks (name,product,status,phone_number,address) VALUES (?,?,'รอดำเนินการ',?,?)"
    db.run(sql,[customer,item,tel,address], (err) => {
        if (err) {
            throw err
        }
        console.log("Customer has been added")
        res.redirect("/")
    })
})

app.post("/update/:id", (req,res) => {
    const cusID = req.params.id
    const {status} = req.body
    const sql = "UPDATE tracks SET status = ? WHERE id = ?"
    db.run(sql,[status,cusID], (err) => {
        if (err) {
            throw err
        }
        console.log("Product status has been change")
        res.redirect("/")
    })
})


app.listen(port,() => {
    console.log("Server has been connected.")
})
