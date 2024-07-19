const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const http = require("http");

const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

require("dotenv").config();

const PORT = 3000;
const app = express();

const CONFIG = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

function isLoggedIn(req, res, next) {
  const isLoggedIn = true; // TODO

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You Must Log In!",
    });
  }
  next();
}

const AUTH_OPTIONS = {
  clientID: CONFIG.CLIENT_ID,
  clientSecret: CONFIG.CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log(`Google Profile ${profile}`);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

app.use(helmet());
app.use(passport.initialize());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/failure",
    session: false,
  }),
  (req, res) => {
    console.log("Google Call us Back!");
  }
);

app.get("/auth/logout", () => {});

app.get("/secret", isLoggedIn, (req, res) => {
  return res.send("Your personal value is 39!");
});

app.get("/failure", (req, res) => {
  return res.send("Failed Google Login!");
});

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create HTTPS server
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"), // Read SSL key
      cert: fs.readFileSync("cert.pem"), // Read SSL certificate
    },
    app
  )
  .listen(PORT, () => {
    // Callback when server starts listening
    console.log(`Listening on PORT ${PORT}`);
  });

// http.createServer(app).listen(PORT, () => {
//         console.log(`Listening on PORT ${PORT}`);
//     })
