import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const port = 3000;

// Connect to the database
connectDB();

app.listen(port, () => {
  console.log("Backend listening on 3000");
});
