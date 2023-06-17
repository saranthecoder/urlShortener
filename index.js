const express = require('express');
const { connectTOMongoDB } = require("./connect");
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 3000;
const password = "Saran@2002";
const encodedPassword = encodeURIComponent(password);
const url = `mongodb+srv://saranthecodder:${encodedPassword}@cluster0.hz2ibvp.mongodb.net/urlShortener?retryWrites=true&w=majority`;

connectTOMongoDB(url)
    .then(() => console.log("DataBase Connected ..."))
    .catch((err) => console.log("ERROR!!" + err));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


app.use(urlRoute);
//app.use(urlRoute);

app.listen(PORT, () => console.log(`Server is running in PORT:${PORT}`));