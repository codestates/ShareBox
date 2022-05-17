const express = require('express');
const indexRouter = require('./route/index');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express();
const port = 4000;

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS','PUT', 'PATCH']
  })
)
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/images", express.static("public/images"));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS']
  })
);


app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
