const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB =
  require("./config/db");

const communityRoutes = require(
  "./routes/communityRoutes"
);
const userRoutes =
  require("./routes/userRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin:
      "https://your-vercel-url.vercel.app",
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send(
    "ClipHub API Running..."
  );
});

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);
app.use(
  "/api/users",
  userRoutes
);
app.use(
  "/api/communities",
  communityRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});