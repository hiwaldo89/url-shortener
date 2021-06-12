import fs from "fs"
import shortid from "shortid";

const dataPath = './data/urls.json';

export const getUrls = async () => {
  try {
    const result = await fs.promises.readFile(dataPath);
    return JSON.parse(result.toString());
  } catch (err) {
    throw err;
  }
}

export const saveUrl = async (url) => {
  try {
    const storedUrls = await getUrls();
    storedUrls[url] = {
      shortUrl: shortid(url),
      longUrl: url
    }
    await fs.promises.writeFile(dataPath, JSON.stringify(storedUrls));
    return storedUrls[url];
  } catch (err) {
    throw err;
  }
}

export const getUrlById = async (id) => {
  try {
    const storedUrls = await getUrls();
    return Object.values(storedUrls).find(url => url.shortUrl === id)
  } catch (err) {
    throw err;
  }
}

export const deleteUrl = async (url) => {
  try {
    const storedUrls = await getUrls();
    if (storedUrls[url]) {
      delete storedUrls[url];
    }
    await fs.promises.writeFile(dataPath, JSON.stringify(storedUrls));
  } catch(err) {
    throw err;
  }
}