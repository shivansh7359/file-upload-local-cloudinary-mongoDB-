//app create
const express = require("express");
const app = express();

//add middlewares 
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//mounting
const Upload = require("./routes/fileUpload");
app.use("/api/v1/upload", Upload);

//find PORT 
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//home route
app.get("/", (req, res) => {
    res.send(`<h1>This is home page</h1>`)
})

//Connect to DB
const dbConnect = require("./config/database");
dbConnect();

//Connect TO Cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();
