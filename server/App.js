const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const mysql = require('mysql2');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})