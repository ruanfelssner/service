const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT_API || 4000;

const consign = require('consign');
const db = require('./config/database');
const redoc = require('redoc-express');
const bodyParser = require("body-parser");
const cors = require('cors');
app.use(cors());

const compression = require("compression");
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
    preflightContinue: true,
    optionsSuccessStatus: 200,
  })
);

db();

consign()
  .include('./controllers')
  .then('./middlewares')
  .then('./routes')
  .into(app);


var swaggerJSDoc = require('swagger-jsdoc');
var swaggerDefinition = {
  info: {
    title: 'SERVICE API',
    version: '1.0.0',
    description: 'Documentação da API',
  },
  host: "http://localhost:"+PORT,
  basePath: '/',
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js'],
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function(req, res) { res.setHeader('Content-Type', 'application/json'); res.send(swaggerSpec); }); // Swagger
app.get( '/', redoc({ title: 'API Docs - ' + process.env.PROJECT_NAME, specUrl: '/swagger.json' }) ); // Redoc


app.listen(PORT, () => {
  console.log(`Api rodando em  http://localhost:${PORT}/`);
});