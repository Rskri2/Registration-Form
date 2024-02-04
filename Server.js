const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = require('./Apps')
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('Database Working'))
  .catch((err) => console.log('error'));

const port = process.env.PORT || 3000;

const server = app.listen(port, ()=>{
  console.log('Working');
});
