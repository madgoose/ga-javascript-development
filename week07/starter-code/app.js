const express        = require('express');
const app            = express();
const port           = process.env.PORT || 3000;  // if first thing is defined use that, if not then port 3000
const router         = require('./config/routes');
const bodyParser     = require('body-parser');
const morgan         = require('morgan'); // logging
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

// Use morgan for logging
app.use(morgan('dev'));

// Set the view directory to /views
app.set("views", `${__dirname}/views`);

// Let's use the Express templating language
app.set("view engine", "ejs");

// Setup public folder to serve static files
app.use(express.static(`${__dirname}/public`)); // css, images

// Setup app to parse req.body
app.use(bodyParser.urlencoded({ extended: true }));

// Use methodOverride to override the GET or POST requests to sent PUT and DELETE
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Use expressLayouts
app.use(expressLayouts);

// Use the config/routes
app.use('/', router);

// listen on port 3000
app.listen(port, () => console.log(`listening on port: ${port}`));
