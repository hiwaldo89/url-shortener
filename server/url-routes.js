import express from "express";
import base58 from "base58";

import Url from "./models/url";

const router = express.Router();

/**
 * @swagger
 * /api/shorten:
 *  post:
 *    description: Create a short version of a url
 *    parameters:
 *    - name: url
 *      description: Url to shorten
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      201:
 *        description: Url shortened
 */
router.post("/shorten", (req, res) => {
  const { url } = req.body;
  let shortUrl = "";

  Url.findOne({ long_url: url }, async (_err, doc) => {
    if (doc) {
      shortUrl = base58.int_to_base58(doc._id);
    } else {
      const newUrl = Url({
        long_url: url,
      });
      const savedUrl = await newUrl.save();
      shortUrl = base58.int_to_base58(savedUrl._id);
    }
    res.send({ shortUrl });
  });
});

/**
 * @swagger
 * /api/{id}:
 *  get:
 *    description: Redirects to the long url
 *    parameters:
 *    - name: id
 *      description: The short url id
 *      in: path
 *      required: true
 *      type: string
 *    response:
 *      302:
 *        description: Redirected to long url
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const decodedId = base58.base58_to_int(id);

  Url.findOne({ _id: decodedId }, (_err, url) => {
    if (url) {
      res.redirect(url.long_url);
    } else {
      res.redirect("/");
    }
  });
});

export default router;
