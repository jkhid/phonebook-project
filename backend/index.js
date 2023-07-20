const express= require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())


// Need to create token in order to output POST into log with new object
morgan.token('object', function getObject(req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
})
// Morgan middleware to log endpoint info
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :object'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Endpoint for the root page
app.get('/', (req, res) => {
    res.send('<h1>People App</h1>')
})

// Endpoint to retrieve all people from the phonebook
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// Endpoint to retrieve a single person from the phonebook
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// Endpoint to return information about the amount of people in the phonebook
app.get('/info', (req, res) => {
    const maxPeople = Math.max(...persons.map(p => p.id))
    const date = new Date()

    res.send(`<p>Phonebook has info for ${maxPeople} people <br/> <p>${date}</p> </p>`)
})

// Endpoint to delete a person in the phonebook
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

// Endpoint for adding a new person to the phonebook
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  const isDuplicate = persons.find(person => person.name === body.name)

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
    
  }

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or Number property is missing"
    })
  } else if (isDuplicate) {
    return res.status(400).json({
      error: "This name already exists in the phonebook"
    })
  }

  persons = persons.concat(person)

  res.json(person)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint"})
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}!`)
})