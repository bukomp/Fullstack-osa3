const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const uniqueValidator = require('mongoose-unique-validator');


const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3},
  number: { type: String, required: true, minlength: 8}
})

personSchema.plugin(uniqueValidator, { message: 'Error, expected name to be unique' })

personSchema.set('toJSON', {
  transform: (document, r) => {
    r.id = r._id.toString()
    delete r._id
    delete r.__v
  }
})


module.exports = mongoose.model('Person', personSchema);