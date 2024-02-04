const path = require("path");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require('morgan');
const router = require('./formRoutes');
const viewRouter = require('./viewRoute')
const app = express();
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.set('view engine', 'pug');
app.set('views', path.join((__dirname, 'views')));
app.use(express.static(path.join((__dirname,'public'))));
app.use(mongoSanitize());

app.use('/', viewRouter)
app.use('/api/v1',router);

module.exports = app;
