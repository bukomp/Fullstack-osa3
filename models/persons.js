const mongoose = require('mongoose')

/*if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}*/

const password = process.argv[2]

const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, r) => {
    r.id = r._id.toString()
    delete r._id
    delete r.__v
  }
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

/*if(process.argv[3] && process.argv[4]) {
  person.save().then(r => {
  console.log(`added ${r.name} number ${r.number} to phonebook`);
  mongoose.connection.close();
})
} else {
  Person.find({}).then(r => {
    console.log("phonebook:");
    r.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}*/

module.exports = mongoose.model('Person', personSchema);