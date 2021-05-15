const app = require("../api/app");
const Post = require("../api/models/Post");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/JestDB",
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,
      useFindAndModify: false},
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

test('GET /', async () => {
  const post = await (await Post.create({body:"This is test data"}));

  await supertest(app).get('')
    .expect(200)
    .then((response) => {
      expect(response.body[0].body).toBe(post.body);
    })
});
