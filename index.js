const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app     = express();

app.use(session({
    secret  : "mysecret",
    name    : "mysite 2",
    resave  : false,
    saveUninitialized : true
}));

const users = [
    {username : "feroz", password : "123"},
    {username : "muhasin", password : "456"}
]

app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.get("/",(req,res) =>{
    if(req.session.isAuth){
        res.sendFile(__dirname + "/profile.html");
    }else{
        res.sendFile(__dirname + "/login.html");
    }
})
app.post("/login",(req,res) => {

    const {username,password} = req.body;

    const registeredUser = users.find((user) => user.username === username && user.password === password);

    if(!registeredUser){
        
        res.send("Invalid User")
    }else{
        req.session.userId = req.body.username;
        req.session.isAuth = true;
        res.sendFile(__dirname + "/profile.html")
    }
})
app.get("/logout",(req,res) => {
    req.session.destroy();
    res.sendFile(__dirname + "/login.html")
})

app.listen(3001,()=>{
    console.log("server is up");
})