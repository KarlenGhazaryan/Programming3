var express = require("express")
var app = express()

app.use(express.static("."))

app.get("/ ", function(req, res){
    res.redirect("index.html")
})

app.listen(3000, function(){
    console.log("express is run 3000 port");
})