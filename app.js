
const express = require("express")
const app = express();

const port = process.env.PORT || 3030
const routes = require("./routes/index")
const passport = require("passport")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(passport.initialize());
app.use(passport.session());
// accesing the routes
app.use(routes);

app.listen(port,()=>{
    console.log(`server is on port ${port}`)
})