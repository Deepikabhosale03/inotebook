const connectToMongo=require('./db');
const express = require('express');
var cors=require('cors');
connectToMongo();
const app = express()
const port = 5000

/*app.get('/', (req, res) => {
  res.send('Hello World!')
})*/
app.use(cors())
app.use(express.json())
//Available Routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})