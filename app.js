const express = require("express");
const app = express();
const port = 3000;
const urlRoutes = require("./routes/url_routes");
const { checkSync } = require("./database");
var cors = require("cors");
var corsOptions = {
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// app.use(cors());
app.use(express.json());
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
checkSync();

app.use("/", urlRoutes);
