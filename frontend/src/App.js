import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './filter'
import Form from './contactForm'
import Persons from './persons'
import peopleService from './services/people'
import Notification from './notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [addNotification, setAddNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

  //This retrieves the contacts from the DB for the initial render 
  const hook = () => {
    console.log('effect');
    peopleService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }
  useEffect(hook, [])

  //This controls the add button functionality 
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    //This checks for duplicates 
    let isDuplicate = persons.map((person) => person.name && person.number).includes(newName && newNumber)
    if(isDuplicate) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }


    // adds a new object to the DB 
    peopleService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setAddNotification(`${newName} was successfully added!`)
        setTimeout(() => {
          setAddNotification(null)
        }, 5000)
      })
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const filterContacts = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const deleteContact = id => {
    const person = persons.find(p => p.id === id) 

    if(window.confirm(`Delete ${person.name}?`)) {
      if (true) {
        peopleService
          .deletePerson(id)
          .then(() => {
            const updatedPersons = persons.filter(person => person.id !== id)
            setPersons(updatedPersons)
            setAddNotification(`${person.name} was successfully deleted!`)
            setTimeout(() => {
              setAddNotification(null)
            }, 5000)
            })
          .catch(error => {
            console.log("Error deleting contact:", error)
            setErrorNotification(`${person.name} was already deleted from the server; Refresh the page`)
            setTimeout(() => {
              setErrorNotification(null)
            }, 5000)
          })
          alert(`${person.name} has been successfuly deleted`)
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addNotification} type="success"/>
      <Notification message={errorNotification} type="error" />
      <Filter value={searchQuery} onChange={filterContacts}/>
      <h2>Add Contact</h2>
      <Form 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deleteContact={deleteContact}/>
    </div>
  )
}

export default App