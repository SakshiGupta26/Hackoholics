const mongoose = require('mongoose');
const connect =mongoose.connect("mongodb://localhost:27017/hackthone_1");

connect.then(() => {
    console.log("Database connected successfully");
})
.catch(() => {
    console.log("Database connection failed");
});
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const collection =new mongoose.model("user", LoginSchema);

module.exports = collection;