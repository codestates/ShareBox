const express = require('express');
const indexRouter = require('./route/index');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express();
const port = 4000;

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/', (req,res)=>{
//   res.send("hello")
// })

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
