// app.js
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const mediaRoutes = require("./routes/mediaRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const cartRoutes = require("./routes/cartRoutes");
const app = express();
const inquiryRoutes = require("./routes/inquiryRoutes");
const { initializeFirebaseAdmin } = require("./config/firebase");
const cors = require("cors");
initializeFirebaseAdmin();
connectDB();
app.use(bodyParser.json());

const admin = require("firebase-admin");

// admin.initializeApp({
//   credential: admin.credential.cert(
//     require("./path/to/firebase-service-account.json")
//   ),
//   storageBucket: process.env.STORAGE_BUCKET, // Ensure this is set in your .env file
// });

const corsOptions = {
  // origin: ['http://localhost:5400/','http://localhost:62389'],
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true,
  origin: "*",
};

app.use(cors(corsOptions));
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/media", mediaRoutes);
const morgan = require("morgan");

app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app._router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
