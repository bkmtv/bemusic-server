const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const connect = (URI) => {
   mongoose
      .connect(URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      .then(() => {
         console.log('Connected to MongoDB')
      })
      .catch((err) => {
         console.log(`Unable to connect to MongoDB\nError: ${err}`)
      })
}

const UserSchema = require('./schemas/UserSchema')

module.exports = {
    connect,
    UserSchema
}