require('dotenv').config();
const mongoose = require('mongoose');
const AdminMail = require('./models/AdminMail');

async function insertAdmin() {
  try {
    await mongoose.connect(process.env.DB_NAME, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");

    const email = "it@atorax.in";
    const existing = await AdminMail.findOne({ email });

    if (existing) {
      console.log(`Admin with email ${email} already exists.`);
    } else {
      const newAdmin = new AdminMail({
        email: email,
        fullname: "IT Admin",
        password: "Admin@123"
      });
      await newAdmin.save();
      console.log(`Successfully inserted admin: ${email}`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertAdmin();
