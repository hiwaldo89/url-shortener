import supertest from "supertest";
import mongoose from "mongoose";

import app from "./app";
import Counter from "./models/counter";
import Url from "./models/url";

beforeAll((done) => {
  mongoose
    .connect(`${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      await Counter.findById("url_count", async (_err, counter) => {
        if (!counter) {
          const newCounter = Counter({
            _id: "url_count",
            seq: 1,
          });
          await newCounter.save();
          done();
        }
      });
    });
});

// afterEach(async () => {
//   await Counter.deleteMany().exec();
//   await Url.deleteMany().exec();
// });

afterAll(async () => {
  await mongoose.connection.close();
});

// beforeEach((done) => {
//   mongoose.connect(
//     "mongodb+srv://hiwaldo89:aIoGUiU5rsfS7gmW@cluster0.5ouxi.mongodb.net/urlShortenerTest?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     () => {
//       Counter.findById("url_count", (err, counter) => {
//         if (!counter) {
//           const newCounter = Counter({
//             _id: "url_count",
//             seq: 1,
//           });
//           newCounter.save();
//         }
//       });
//       done();
//     }
//   );
// });

// afterEach((done) => {
//   mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(() => done());
//   });
// });

it("should save the shorten url if not found", async () => {
  const response = await supertest(app).post("/api/shorten").send({
    url: "http://testing.com",
  });
  expect(response.body).toHaveProperty("shortUrl");
});

it("should retrieve the url if already saved", async () => {
  const response = await supertest(app).post("/api/shorten").send({
    url: "http://testing.com",
  });
  expect(response.body).toHaveProperty("shortUrl");
});

it("should return error if no url found", async () => {
  const response = await supertest(app).get(`/api/12345`);
  expect(response.status).toBe(302);
  expect(response.text).toBe(`Found. Redirecting to /`);
});

it("should redirect if url is found", async () => {
  const savedUrl = await supertest(app).post("/api/shorten").send({
    url: "http://testing.com",
  });
  const response = await supertest(app).get(`/api/${savedUrl.body.shortUrl}`);
  expect(response.status).toBe(302);
  expect(response.text).toBe(`Found. Redirecting to http://testing.com`);
});
