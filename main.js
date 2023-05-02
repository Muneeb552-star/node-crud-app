require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

// database connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to database!"));

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(
    session({
    secret: "Muhammad Muneeb",
    saveUninitialized: true,
    resave: false,})
);

app.use((req, res, next) =>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use('/uploads', express.static("uploads"))

//set template engine
app.set("view engine", "ejs");

//app prefix route
app.use("/", require("./routes/routes"));

app.listen(PORT, () =>{
    console.log(`Server Started at http://127.0.0.1:${PORT}`);
});