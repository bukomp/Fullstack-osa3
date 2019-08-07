require('dotenv').config()

const express = require('express')
const Persons = require('./models/persons')
const morgan = require('morgan')
const fs = require('fs')
const cors = require('cors')

const app = express()

app.use(express.static('build'))

app.use(express.json())

morgan.token('data', req => {
  if(req.method === 'POST')return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.use(cors())


let persons = [
    {
      name:"Edvard",
      number:"123123",
      id:0
    }
  ];

const genRandNum = (max, min) => {
  return Math.floor(Math.random() * (+max - +min + 1)) + +min;
}

app.delete('/api/*', (req,  res) => {
  const url_parts = req.path.split('/');
  //console.log(url_parts);
  switch(url_parts[2]){                                             //I added switches to some calls in case there will be more databases
    case "persons":
      let response;

      url_parts[3]?


        persons.forEach(person=>{

          if(person.id === +url_parts[3]){

            response = {
              message: `Contact with id:${+url_parts[3]} has been removed`,
              data: persons.filter(i => i.id !== +url_parts[3])
            };
            persons = persons.filter(i => i.id !== +url_parts[3])
            res.json(response);
          }
        }):res.status(404).json({
          error: `no data by id:${url_parts[3]} found`
        });
      break;
    default:
      break;
  }
})

app.get('/api/*', (req, res) => {
  const url_parts = req.path.split('/');
  //console.log(url_parts);
  switch(url_parts[2]){
    case "persons":
      let response;
      console.log(url_parts);
      (url_parts[3] !== '' && url_parts[3])?
        Persons.find({id: url_parts[3]}).then(r => {
        r?
          res.json(r.map(prs => prs.toJSON()))
        :
          res.status(404).json({
            error: `no data by id:${url_parts[3]} found`
          })
        })
        :Persons.find({}).then(r=>{
          r?
            res.json(r.map(prs => prs.toJSON()))
          :
            res.status(404).json({
            error: `no data found`
          })
        })
      break;
    default:
      res.send("<h1>no data</h1>")
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

app.post('/api/persons', (req, res) => {

  if(Object.keys(req.body).length > 0) {

    //console.log(req.body);
    const body = JSON.parse(JSON.stringify(req.body))
    //console.log(body.number);

    if(persons.some(obj => {if(obj.name === body.name)return true})){
      res.status(409).json({
        error: "New contact name should differ from other contacts"
      })
    } else if(body.name === undefined || body.number === undefined){
      res.status(400).json({
        error: "Request must contain name and number information"
      })
    } else {
      //body.id = persons[persons.length-1].id+1;
      body.id = genRandNum("9999", "0000");
      persons.push(body);
      const response = {
        message: `New contact has been added`,
        data: persons
      };
      res.send(response)
      //persons.push()
    }
  }
  else {
    res.status(400).json({
      error: "Request body is empty"
    })
  }
})



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})