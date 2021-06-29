const express = require('express');

const app = express();

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