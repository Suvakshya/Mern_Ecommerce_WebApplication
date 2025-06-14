// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./utils/db.js";
// import cloudinary from "cloudinary";
// import cors from "cors";
// import axios from "axios";

// dotenv.config(); 

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const app = express();

// const url = `https://mern-ecommerce-webapplication-frontend-pl2y.onrender.com`;
// // const url = `http://localhost:5173/`;
// const interval = 30000;

// function reloadWebsite() {
//   axios
//     .get(url)
//     .then((response) => {
//       console.log("website reloded");
//     })
//     .catch((error) => {
//       console.error(`Error : ${error.message}`);
//     });
// }

// setInterval(reloadWebsite, interval);

// app.use(express.json());
// app.use(cors());

// const port = process.env.PORT;

// // importing routes
// import userRoutes from "./routes/user.js";
// import productRoutes from "./routes/product.js";
// import cartRoutes from "./routes/cart.js";
// import addressRoutes from "./routes/address.js";
// import orderRoutes from "./routes/order.js";

// // using routes
// app.use("/api", userRoutes);
// app.use("/api", productRoutes);
// app.use("/api", cartRoutes);
// app.use("/api", addressRoutes);
// app.use("/api", orderRoutes);

// app.listen(port, () => {
//   console.log(`server is running on http://localhost:${port}`);
//   connectDb();
// });
import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import cloudinary from "cloudinary";
import cors from "cors";

// Load environment variables
dotenv.config(); 

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define port
const port = process.env.PORT;

// Importing routes
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import addressRoutes from "./routes/address.js";
import orderRoutes from "./routes/order.js";

// Using routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);

// Start server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
  connectDb();
});
