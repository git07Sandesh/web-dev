const express = require("express");
const app = express();
const cors = require('cors')

app.use(cors())

app.use(express.json()); // ✅ This must be at the top

app.use(express.static("dist"));

var morgan = require('morgan')


morgan.token('body', (req) => {
    if (req.method === "POST"){
        return JSON.stringify(req.body);
    }
    return ""
});
app.use(morgan(':method :url :status :response-time ms - :body'));




let notes = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

app.get('/info', (req,res) => {
    const dateId = new Date().toUTCString()
    const length = notes.length;

    res.send(`
        <h4>Phonebook has info for ${length} people</h4>
        <h4>${dateId}</h4>`)
})
app.get('/api/persons',(req,res) => {
    res.json(notes)
} )
//
app.get('/api/persons/:id', (req,res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === id)
    if(note){res.json(note);}
    else res.status(400).end();
})
app.delete('/api/persons/:id', (req,res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})
const generateUserId = () => String(Math.floor(Math.random() * 30000));

app.post('/api/persons', (req, res) => {

    const { name, number } = req.body;

    if (!name || !number) {
        return res.status(400).json({ error: "Missing name/number" });
    }
    
    if (notes.some(note => note.name === name)) {
        return res.status(400).json({ error: "Name already exists" });
    }

    const note = {
        id: generateUserId(),
        name, 
        number
    };

    notes = notes.concat(note);
    res.json(note);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
