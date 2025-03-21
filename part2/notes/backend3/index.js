const express = require("express")

const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
// Customized middleware;

app.use(express.static('dist'))


const PORT = process.env.PORT || 3001

const requestLogger = (req,res,next) =>{
    console.log('method:', req.method)
    console.log('path:', req.path)
    console.log('body:', req.body)
    console.log('----')
    next()
}

app.use(requestLogger)
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]


app.get('/api/notes',(req,res) => {
  res.json(notes)
})
app.get('/api/notes/:id', (req,res) => {
    const id =request.params.id;
    const note = notes.find(note => note.id === id)
    res.json(note)
})
app.delete('/api/notes/:id', (req,res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id )
    res.status(204).end()
})
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
app.post('/api/notes', (req,res) => {
    const body = req.body
    if(!body.content){
        return res.status(400).json({
            error: 'missing content'
        })
    }

    const note = {
        content: body.content, 
        important: body.important || false,
        id: generateId(),
    }
    notes = notes.concat(note)
    response.json(note)

})

const unknownEndpoint = (req,res) => {
    res.status(404).send({error : "unknown endpoint"})
}
app.use(unknownEndpoint)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})