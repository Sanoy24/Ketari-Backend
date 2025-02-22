const express = require("express");
const mongoose = require("mongoose");
// const multer = require("multer");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("uploads")); //image upload
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(`${process.env.MONGO_URI}`, {
    dbName: "talentRecruiterDBByEagleLion",
  })
  .then(() => console.log("connection success"))
  .catch((err) => console.log("error", err));

app.get("/", (req, res) => {
  res.json({ success: "server is running" });
});

const userRoute = require("./routes/userRoute");
const adminUsers = require("./routes/adminUsers");
const searchRoute = require("./routes/searchRoute");
const roleAuthCheck = require("./Middleware/roleAuthCheck"); //role checking middleware
const emailCampaign = require("./routes/emailCampaignRoute"); //email campaign imported
const category = require("./routes/categoryRoute");
const jobRoute = require("./routes/jobRoute");
const applicantRoute = require("./routes/applicantRouter");
const recruiterRoute = require("./routes/recruiterRouter");

app.use("/api/admin", roleAuthCheck, adminUsers); //admin user route
app.use("/api/email-campaign", emailCampaign); //for email campaign
app.use("/api/user", userRoute); //for login and register
app.use("/api/search", searchRoute); //for search result
app.use("/api/jobs/", jobRoute);
app.use("/api/category/", category);
app.use("/api/applicant/", applicantRoute);
app.use("/api/recruiter/", recruiterRoute);

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  } else {
    res.status(500).json({ error: err });
  }
}
app.use(errorHandler);
app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
