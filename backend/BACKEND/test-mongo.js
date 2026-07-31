const mongoose = require("mongoose");
const uri = "mongodb+srv://kundrapubhargav_db_user:bu3fc0KHUzYZxhSU@expograph.vp49glf.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000
}).then(() => {
  console.log("Connected successfully");
  process.exit(0);
}).catch(err => {
  console.error("Connection error:", err.message);
  if (err.reason && err.reason.servers) {
    for (let [server, desc] of err.reason.servers.entries()) {
      console.log(`Server: ${server}`);
      console.log(`Error:`, desc.error);
    }
  }
  process.exit(1);
});
