const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

app.use(express.json());
app.use(cors({ origin: "*" }));

const db = require("./models");

app.use('/auth', require("./routes/auth"));
app.use('/user', require("./routes/user"));

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server started");
    });
}).catch((err) => {
    console.log(err);
});