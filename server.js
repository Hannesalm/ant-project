const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

// create the express app
const app = express();

// Import the package
const secure = require("express-force-https");
// Add it as a layer to the middleware
app.use(secure);

app.use("/", serveStatic(path.join(__dirname, "/dist")));

const port = process.env.PORT || 5000;
app.listen(port);
// Log to feedback that this is actually running
console.log("Server started on port " + port);
