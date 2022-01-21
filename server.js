require('dotenv');
const app = require('express')()
const {json, urlencoded} = require('express')
const cors = require('cors');

const PORT = process.env.PORT || 3333;
const routes = require("./src/routes/index.routes");

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(routes);
app.listen(PORT, ()=> console.log('App is running.'));
