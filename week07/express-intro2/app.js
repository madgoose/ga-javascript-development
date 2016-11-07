const express = require("express"); // require.js bundles as part of node.js
const morgan = require("morgan");

let app = express();

app.use(morgan());

// middleware
// manual logging function
/*app.use ( (req, res, next) => { // need to pass "next" as an argument
	console.log(`In comes a ${req.method} to ${req.url}`); // useful to log the routes for dev/debug
	next(); // express method needed for middleware forward request to next middleware
})*/

// next middleware
app.use( (req, res ) => {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.end("Hello world with express !")
});

app.listen(3000);