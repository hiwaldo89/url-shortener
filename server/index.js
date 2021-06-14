import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";
import Counter from "./models/counter";

const PORT = 5000;
dotenv.config();

mongoose
  .connect(`${process.env.MONGO_PROD_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    Counter.findById("url_count", (err, counter) => {
      if (!counter) {
        const newCounter = Counter({
          _id: "url_count",
          seq: 1,
        });
        newCounter.save();
      }
    });
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  });
