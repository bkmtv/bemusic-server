const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors(
    { origin: "*" },
));

const db = require("./models");

app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/collection", require("./routes/collection"));

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is OK");
    });
}).catch((err) => {
    console.log(err);
});

// origin: https://collections-ibkmt.vercel.app