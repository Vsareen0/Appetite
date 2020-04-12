// Decalre required dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// Load environment variables
require('dotenv').config();

app.use(
    // Middlewares
    bodyParser.json(),
    bodyParser.urlencoded({extended: true}),
    cookieParser(),
    // Morgan displays formatted API requests in console
    morgan('combined'),
    // Cors (Cross Origin Resource Sharing)
    cors()
);

// Handle Request 
app.get("/api", (req,res) => {
    res.json({time: Date().toString()});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});