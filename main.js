const express = require("express");
var app = express();

var admin = require("firebase-admin");

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

var serviceAccount = require("./firebase/usuarios-2d9c2-firebase-adminsdk-p3al3-4172f06334.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://usuarios-2d9c2.firebaseio.com"
});

var database = admin.database();

app.post("/form", function(req, res){
    var email = req.body.email.split("@")[0].toLowerCase()
    var user = database.ref().child(email);
    user.on("value", function(snapshot){
        if(snapshot.exists()){
            res.redirect("https://forms.office.com/Pages/ResponsePage.aspx?id=r4yvt9iDREaFrjF8VFIjwVxjzJwlpORGsVUoNUhFX-pUMFdUUlVRV0pBS1RLUkZURUpGVlUzSFVHWC4u")
        }else{
            res.send("Usiario no autorizado!!!");
        }
    });

});

var port = process.env.PORT || 3001

app.listen(port, () => {
  console.log("JsonServer starting...");
  console.log("Listen in port " + port);
});