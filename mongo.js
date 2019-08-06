const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://bukomp:${password}@cluster0-tadam.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

if(process.argv[3] && process.argv[4]) {
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
}