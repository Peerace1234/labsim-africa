require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const aiRoutes = require("./routes/ai");
const paymentsRoutes = require("./routes/payments");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/payments", paymentsRoutes);

app.get("/", (req, res) => res.send({ status: "ok" }));

app.listen(port, () => console.log(`Server running on port ${port}`));
