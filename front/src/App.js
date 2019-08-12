import React, { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import ErrorMessage from './components/ErrorMessage'
import NewPerson from './components/NewPerson'
import {post, get, deleteLine, put} from './components/ServerCall'


const App = () => {

  const [ newFilter, setFilter ] = useState('');
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newMessage, setMessage] = useState({
    error: false,
    show: false,
    message:''
  });
  const [ persons, setPersons] = useState([]);

  useEffect(()=>{
    get().then(r => {
      setPersons(r.data)
    })
  }, []);

  const hideError = () => {
    setMessage({
      error: false,
      show: false,
      message:''
    })
  }

  const showMessage = (error, message) => {
    setMessage({error:error, show:true, message:message})
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setNewName(e.target.value);
        break;
      case "number":
        setNewNumber(e.target.value);
        break;
      case "filter":
        setFilter(e.target.value);
        break;
      default:
        console.log("something went completely wrong")
        break;
    }
  }

  const addNewPerson = () => {
    post({name:newName, number: newNumber})
      .then(r => {
        console.log(r.data.data);
        setPersons(r.data.data);
        setNewName('');
        setNewNumber('');
        showMessage(false, `${newName} successfully has been added`)
      })
      .catch(e => {
        console.log(e.response.data.error);
        showMessage(true, `${newName} can't be added with error: ${e.response.data.error}`)
      })
  }

  const updatePerson = () => {
    persons.forEach(person => {
      if (person.name === newName){
        put(person.id, {name: person.name, number: newNumber})
          .then(r => {
            setPersons(r.data.data)
            showMessage(false, `${newName} successfully has been updated`)
          })
          .catch(e => {
            showMessage(true, `${newName} can't be updated with error: ${e}`)
          })
      }
    })
  }

  const deletePerson = (id) => {
    deleteLine(id).then(r => {
      console.log(r.data);
      setPersons(r.data.data)
      showMessage(false, `${newName} successfully has been removed`)
    })
      .catch(e => {
        showMessage(true, `${newName} can't be removed with error: ${e}`)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!(persons.find((person) => {return person.name === newName})||false)){
      addNewPerson()
    } else if(window.confirm(`${newName} is already added. Replace the old number?`)) {
      updatePerson()
    }
  }

  const handleDelete = (e) => {
    const id = e.target.id

    if(window.confirm("Are you shure you want to delete this object?"))deletePerson(id)
  }

  return (
    <React.Fragment>

      <ErrorMessage
        data={newMessage}
        hideError={hideError}
      />


      <h2>Phonebook</h2>

      <Filter
        name={"filter"}
        value={newFilter}
        onChange={handleChange}
      />

      <h2>add a new</h2>

      <NewPerson
        nameName={"name"}
        nameValue={newName}
        nameOnChange={handleChange}

        numName={"number"}
        numValue={newNumber}
        numOnChange={handleChange}

        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Numbers
        onDelete={handleDelete}
        personData={persons}
        newFilter={newFilter}
      />
    </React.Fragment>
  )

}

export default App