 // require.js bundles as part of node.js
const http = require("http"); // alternative syntax: import http from "http"

const app = http.createServer((request, response) => { // ES6 syntax: "=>" === "function()"

	response.writeHead( 200, { // server response code 200
		// Content-Type == Text Sensitive !
		"Content-Type" : "text/plain" // "text/html", "text/json"
	});

/*	let answer = `Request: ${request.url}
	Request type: ${request.method}
	Request headers: ${JSON.stringify(request.headers)}
	`

	response.end(answer);*/

	if (request.url === "/") {
		response.end("Homepage !");
	} else if (request.url === "/about") {
		response.end("this is the about page")
	} else {
		response.end("404 ! dunno about that");
	}
});

app.listen(3000, "localhost");