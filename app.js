const express = require("express");
const app = express();
const path = require("path");
const cookiesession = require("cookie-session")
const cors = require('cors')
const hbs = require('hbs')

const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config();
// user-defined
const routes = require("./controller");

app.use(cors());
app.use(express.json());
app.use(
    cookiesession({
      name:'session',
      maxAge: 1000 * 60 * 30,
      secret: process.env.SESSION_KEY,
    }
    )
  )
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
  });
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs')
  hbs.registerPartials(__dirname + '/views/partials');
  app.use(routes);
  app.use(express.static(path.join(__dirname,'views/images'))); 

  app.use(express.static(path.join(__dirname, '/views')))
  app.use("*",(req,res)=>{
    res.send("404 Not Found")
  })
  module.exports = app;