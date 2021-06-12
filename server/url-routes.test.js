import supertest from "supertest"

import app from "./app"
import { deleteUrl, saveUrl } from "./services"

afterEach(async () => {
  await deleteUrl("http://testing.com");
})

it("should save the shorten url if not found", async () => {
  const response = await supertest(app).post("/api/shorten").send({
    url: "http://testing.com"
  });
  expect(response.body).toHaveProperty("shortUrl");
  expect(response.body.longUrl).toBe("http://testing.com");
});

it("should retrieve the url if already saved", async () => {
  await saveUrl("http://testing.com");
  const response = await supertest(app).post("/api/shorten").send({
    url: "http://testing.com"
  });
  expect(response.body).toHaveProperty("shortUrl");
  expect(response.body.longUrl).toBe("http://testing.com");
})

it("should return error if no url found", async () => {
  const response = await supertest(app).get(`/api/12345`);
  expect(response.status).toBe(404);
  expect(response.body).toBe("Not a valid url");
});

it("should redirect if url is found", async () => {
  const savedUrl = await supertest(app).post("/api/shorten").send({
    url: "http://testing.com"
  });
  const response = await supertest(app).get(`/api/${savedUrl.body.shortUrl}`);
  expect(response.status).toBe(302);
  expect(response.text).toBe(`Found. Redirecting to ${savedUrl.body.longUrl}`)
})