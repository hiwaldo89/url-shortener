import mongoose from "mongoose";

import app from "./app";
import Counter from "./models/counter";

const PORT = 5000;

mongoose
  .connect(
    "mongodb+srv://hiwaldo89:aIoGUiU5rsfS7gmW@cluster0.5ouxi.mongodb.net/urlShortener?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
