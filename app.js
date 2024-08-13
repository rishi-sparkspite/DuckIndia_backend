// app.js
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const cartRoutes = require("./routes/cartRoutes");
const app = express();
const inquiryRoutes = require("./routes/inquiryRoutes");
const cors = require('cors');
connectDB();
app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:5400/','http://localhost:62389'],
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true, 
};

app.use(cors(corsOptions));
app.use("/projects/duckindia/api/categories", categoryRoutes);
app.use("/projects/duckindia/api/products", productRoutes);
app.use("/projects/duckindia/api/banners", bannerRoutes);
app.use("/projects/duckindia/api/cart", cartRoutes);
app.use("/projects/duckindia/api/inquiries", inquiryRoutes);
const morgan = require('morgan');

app.use(morgan('dev')); 

const PORT = process.env.PORT || 3040;

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
