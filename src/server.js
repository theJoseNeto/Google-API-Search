require('dotenv');
const app = require('express')()
const {json, urlencoded} = require('express')
const cors = require('cors');

const HOST = process.env.HOST

const routes = require("./routes/index.routes");

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(routes);

app.listen(HOST);
