const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
let app = express()
app.use(express.json({ extended: true}))

const router = require('./routes/auth.routes')
app.use('/api/auth', router)
const linkRouter = require('./routes/links.routes')
app.use('/api/link', linkRouter)
const redirectRouter = require('./routes/redirect.routes')
app.use('/t/', redirectRouter)


const PORT = config.get('port') || 5000

async function start(){
  try {
    await mongoose.connect(
      config.get('mongoUri'),{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}.....`)
    })
  }
  catch (e) {
      console.log('Error db: ' + e.message)
  }
}
start()