const express = require('express');
const path = require('path');
const bycrypt = require('bcrypt');
const collection = require('./config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get('/', (req, res) => {
    res.render("login");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data ={
        name: req.body.username,
        password: req.body.password
    }
    const existingUser = await collection.findOne({ name: data.name });
   if(existingUser) {
   res.send("User already exists. Please login.");
} else{
    const userdata = await collection.insertMany(data);
    console.log(userdata);}
});
app.post("/login", async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
    if(!check) {
        res.send("User name cannot be found");
    }
    const isPasswordMatch = await bycrypt.compare(req.body.password, check.password); 
    if(isPasswordMatch) {
        res.render("home");
    }else {
        res.send("Invalid password");
    }
}catch{
    res.send("wrong details");
}
const port= 5500;
app.listen(port, () => {
    console.log(`Server is running on port no. ${port}`);
})