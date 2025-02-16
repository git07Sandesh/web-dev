
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import DisplayPerson from './components/DisplayPerson'
import backService from './services/Server'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  useEffect(() => {
    backService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (duplicate(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName);
        const changedPerson = { ...person, number: newNumber };
        backService.update(person.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
          })
      }
    }
    else
      backService.create(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(personObject));
          setNewName('');
          setNewNumber('');
        })




  }
  const duplicate = (p_name) => {
    return persons.some(person => person.name === p_name);
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    console.log(event.target.value);
  }
  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  }
  const deletePerson = (id) => {
    backService.deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const displayFiltered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmitChange={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <DisplayPerson persons={persons} filter={filter} displayFiltered={displayFiltered} deletePerson={deletePerson} />
    </div>
  )
}

export default App