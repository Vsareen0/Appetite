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


// Bring in routes
const blogRoute = require('./routes/blog');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const tagRoute = require('./routes/tag');
const formRoute = require('./routes/form');

// Setup Routes
app.use('/api', blogRoute);
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoute);
app.use('/api', tagRoute);
app.use('/api', formRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});