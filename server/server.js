const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require("./app");

dotenv.config();
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

/* data base connect */
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('connected successfully');
        console.log(`server running on port ${PORT}` )
        app.listen(PORT)
    })
    .catch(err => {
        console.log('failed connection: ');
        console.log(err.message)
    });