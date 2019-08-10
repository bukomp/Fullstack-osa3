require('dotenv').config()

const express = require('express')
const Persons = require('./models/persons')
const morgan = require('morgan')
const fs = require('fs')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)


const app = express()

app.use(express.static('build'))

app.use(express.json())

morgan.token('data', req => {
  if(req.method === 'POST')return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.use(cors())



/*const malformattedId = (e, req, res, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
}*/

app.delete('/api/*', (req, res, next) => {
  const url_parts = req.path.split('/');
  //console.log(url_parts);
  switch(url_parts[2]){                                             //I added switches to some calls in case there will be more databases
    case "persons":

      Persons.findByIdAndDelete(url_parts[3]).then(r => {
        console.log(r);
        r?
          Persons.find({}).then(r => {
            console.log(r.map(pers => pers.toJSON()));
            res.status(200).json({
              data: r.map(pers => pers.toJSON()),
              message: `person with id:${url_parts[3]} has been removed`
            })
          })
          :
          res.status(404).json({
            error: `no data by id:${url_parts[3]} found`
          })
      }).catch(e => {
        next(e)
      })

      break;
    default:
      break;
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  }
  Persons.findByIdAndUpdate(req.params.id, person)
    .then(r => {
      Persons.find({}).then(r => {
        const response = {
          data: r.map(pers => pers.toJSON()),
          message: 'successfully updated'
        }
        res.json(response)
      })
    }).catch(e => {
      next(e)
    })
})

app.get('/api/*', (req, res, next) => {
  const url_parts = req.path.split('/');
  //console.log(url_parts);
  switch(url_parts[2]){
    case "persons":
      let response;
      console.log(url_parts);
      (url_parts[3] !== '' && url_parts[3])?
        Persons.findById(url_parts[3]).then(r => {
          console.log(r);
          res.json(r.toJSON())
        }).catch(e => {
          next(e)
        })
        :Persons.find({}).then(r=>{
          console.log(r);
          console.log("here");
          res.json(r.map(prs => prs.toJSON()))
        }).catch(e => {
          next(e)
        })
      break;
    default:
      break;
  }
})

app.get('/info', (req, res) => {
  const info_page = `
      <div>
        Phonebook has info for ${persons.length} people
      </div>
      <div>
        ${new Date()}
      </div> 
    `
    res.send(info_page);
})

app.post('/api/persons', (req, res, next) => {

  const body = req.body;

  if(Object.keys(body).length > 0) {

    Persons.find({
      name: body.name,
      number: body.number
    }).then(r => {

      if (body.name === (undefined||"") || body.number === (undefined||"")) {
        res.status(400).json({
          error: "Request must contain name and number information"
        })
      } else {

        new Persons({
          name: body.name,
          number: body.number
        }).save().then(r => {
          Persons.find().then(r => {
            const response = {
              message: `New contact has been added`,
              data: r
            };
            res.json(response)
          })
        })

      }
    })
      .catch(e => {

      })
  }
  else {
    res.status(400).json({
      error: "Request body is empty"
    })
  }
})




const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (e, req, res, next) => {
  console.error(e.message)

  if (e.name === 'CastError' && e.kind == 'ObjectId')
    return res.status(400).send({ error: 'malformatted id' })

  next(e)
}

app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})