//Server variables
const port = process.env.PORT || 3000;
var express = require('express'),
    app = express(),
    todoRoutes = require('./routes/todos'),
    bodyParser = require('body-parser');
    
    app.use(express.static(__dirname +'/public'));
    app.use(express.static(__dirname + '/views'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    
//Root Route
    app.get("/", function(req,res){
        res.sendFile("index.html");
    });

    app.use("/api/todos", todoRoutes);


//Server Port
    app.listen(port, process.env.IP, function(){
        console.log("Server has started!");
    });