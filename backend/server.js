// Decalre required dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// Load environment variables
require('dotenv').config();

app.use(
    // Middlewares
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    cookieParser(),
    // Morgan displays formatted API requests in console
    morgan('dev'),
);

// Cors (Cross Origin Resource Sharing)
// In development mode, set the cors origin key to client's url  
if(process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}

// Handle Request 
app.get("/api", (req,res) => {
    res.json({time: Date().toString()});
});

// Establish Database connection
options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

mongoose.connect(process.env.MONGODB_URL, options)
    .then(() => console.log(`Connection to database established successfully !`))
    .catch(dbErr => console.log(`Unable to establish a database connection : ${dbErr.message}`))


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});