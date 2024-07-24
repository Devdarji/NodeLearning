const fs = require("fs");
const path = require("path");
const https = require("https");
const express = require("express");
const CookieSession = require("cookie-session");
const http = require("http");

const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

require("dotenv").config();

const PORT = 3000;

const CONFIG = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_SECRET_KEY1: process.env.COOKIE_SECRET_KEY1,
  COOKIE_SECRET_KEY2: process.env.COOKIE_SECRET_KEY2,
};

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

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
  done(null, id);
});

const app = express();

app.use(helmet());
app.use(
  CookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [CONFIG.COOKIE_SECRET_KEY1, CONFIG.COOKIE_SECRET_KEY2],
  })
);
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
  console.log("Current user is: ", req.user);
  const isLoggedIn = req.isAuthenticated() && req.user; // TODO

  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You Must Log In!",
    });
  }
  next();
}

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
    session: true,
  }),
  (req, res) => {
    console.log("Google Call us Back!");
  }
);

app.get("/auth/logout", (req, res) => {
  req.logout();

  return res.redirect("/")
});

app.get("/secret", checkLoggedIn, (req, res) => {
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
