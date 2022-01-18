const app = require('express')()
const {json, urlencoded} = require('express')
const localHost = 3333

const routes = require("./routes/index.routes")
app.use(json());
app.use(urlencoded({extended: true}));
app.use(routes)

app.listen(localHost)
