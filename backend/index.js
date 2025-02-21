const express = require('express')
const app = express()

const morgan = require('morgan');
app.use(express.json());

app.use(morgan('tiny'));


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    stream: process.stdout
}));

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status - :body'));

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/info', (request, response) => {
    const time = new Date();
    const res_text = `
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${time}</p> 
    `;
    response.send(res_text);
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const new_id = Math.floor(Math.random() * 10000000).toString();  // Corrected random ID generation
    const { name, number } = request.body;

    if (!name || !number) {
        return response.status(400).json({ error: 'Missing name or number' });
    }

    // Check if the name or number already exists
    const nameExists = persons.some(person => person.name === name);
    const numberExists = persons.some(person => person.number === number);

    if (nameExists || numberExists) {
        return response.status(400).json({ error: 'Name or number already exists' });
    }

    // Add the new person
    const person = {
        id: new_id,
        name: name,
        number: number
    };

    persons.push(person);
    response.json(person);
});


const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})