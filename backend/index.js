const express  = require("express")
const mongoose  = require("mongoose")
const bodyparser = require("body-parser")
const cors = require("cors")
require('dotenv').config();
const app =  express()
const postrouter  = require("./routes/Postroutes.js")
const authRoutes = require("./routes/AuthRoutes.js");
const searchRoutes = require("./routes/Search.js");
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyparser.json())
app.use(cors())

app.use("/post" , postrouter)
app.use('/auth', authRoutes);
app.use("/look",searchRoutes);


//connecting to database//

try {
    mongoose.connect(process.env.DB_URL)
} catch (error) {
    console.log(error)
}

// server //
app.listen(8000 , () => {
    console.log("server is running")
})



