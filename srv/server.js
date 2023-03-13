const express = require("express");
const app = express();
const passport = require("passport");
const xsenv = require("@sap/xsenv");
const JWTStrategy = require("@sap/xssec").JWTStrategy;
const services = xsenv.getServices({ uaa:"route-xsuaa" });  // XSUAA service

passport.use(new JWTStrategy(services.uaa));
app.use(passport.initialize());
console.log("I M Initialized");
app.use(passport.authenticate("JWT", { session: false }));

console.log("I M IN");
app.get("/", function (req, res, next) {
  res.send("Welcome User: " + req.user.name.givenName);
});

const port = process.env.PORT || 4004;
app.listen(port, function () {
  console.log("Basic NodeJs listening on port " + port);
});