const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const path = require('path');
const delegateRoutes = require('./routes/delegateRoutes');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use(passport.initialize());

require('./middleware/Authentication')(passport);

delegateRoutes(app);

//Serve Static Assets
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.port || 8080;

app.listen(PORT, () => console.log(`Server is working and listening on port ${PORT}`));