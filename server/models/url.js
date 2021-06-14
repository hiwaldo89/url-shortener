import { Schema, model } from "mongoose";

import counter from "./counter";

const urlSchema = new Schema({
  _id: { type: Number, index: true },
  long_url: String,
  created_at: Date,
});

urlSchema.pre("save", function (next) {
  const document = this;
  counter.findByIdAndUpdate(
    { _id: "url_count" },
    { $inc: { seq: 1 } },
    function (error, counter) {
      if (error) {
        return next(error);
      }
      document._id = counter.seq;
      document.created_at = new Date();
      next();
    }
  );
});

export default model("Url", urlSchema);
