const express = require("express");
const bodyParser = require('body-parser');
const connect = require('./database/db');
const app = express();
const PORT = 3001;
const routes = require("./routes/index");

app.use(bodyParser.json());
app.use(routes);
connect().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    })
})
