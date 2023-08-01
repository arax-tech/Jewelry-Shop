require("dotenv").config();

const express = require("express")
const cors = require("cors")
const cookie = require("cookie-parser")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan("dev"));
app.use(cookie());

app.use(express.static('public'))


// Database
require("./database/config")

// Auth Routes
app.use("/api/auth", require("./routes/auth"))

// Admin
app.use("/api/admin", require("./routes/Admin/profile"))
app.use("/api/admin/password", require("./routes/Admin/password"))
app.use("/api/admin/category", require("./routes/Admin/category"))
app.use("/api/admin/product", require("./routes/Admin/product"))
app.use("/api/admin/slider", require("./routes/Admin/slider"))
app.use("/api/admin/banner", require("./routes/Admin/banner"))
app.use("/api/admin/user", require("./routes/Admin/user"))
app.use("/api/admin/review", require("./routes/Admin/review.js"))
app.use("/api/admin/order", require("./routes/Admin/order"))


// User
app.use("/api/user", require("./routes/User/profile"));
app.use("/api/user/password", require("./routes/User/password.js"))
app.use("/api/user/review", require("./routes/User/review"))
app.use("/api/user/order", require("./routes/User/order"))


// Website
app.use("/api", require("./routes/website"))





// Server Listing At
app.listen(PORT, () => {
    // console.log(`Server is Running at http://localhost:8000/`);

});
