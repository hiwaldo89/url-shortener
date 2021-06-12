import express from "express";

import { getUrls, saveUrl, getUrlById } from "./services"

const router = express.Router();

router.post('/shorten', async (req, res) => {
  const { url } = req.body;

  try {
    const storedUrls = await getUrls();
    const existingUrl = storedUrls[url];
    if (existingUrl) {
      res.send(existingUrl);
    } else {
      const savedUrl = await saveUrl(url);
      res.send(savedUrl);
    }
  } catch (err) {
    throw err
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const foundUrl = await getUrlById(id);
    if (foundUrl) {
      res.redirect(foundUrl.longUrl);
    } else {
      res.status(404).json("Not a valid url");
    }
  } catch (err) {
    throw err;
  }
});

export default router;