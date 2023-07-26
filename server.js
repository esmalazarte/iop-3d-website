const express = require('express')
const https = require('https')
const fs = require('fs')

const app = express()
app.use(express.static('static', {index: 'index.html'}))

// HTTPS (for VR mode)
var options = {
  key: fs.readFileSync('keys/client-key.pem'),
  cert: fs.readFileSync('keys/client-cert.pem')
};

https.createServer(options, app).listen(3000, () => console.log("Server started at https://localhost:3000"))

// app.listen(3000, () => console.log("Server started at http://localhost:3000"))