const express = require('express') 
const cors = require('cors')
const fs = require("fs") 

// Load data from JSON file into memory
const rawData = fs.readFileSync("server/units.json")
const data = JSON.parse(rawData)

const app = express() 
app.use(cors())
app.use(express.json()) 


app.get('/api/units', (req, res) => {
    res.json(data.units)
})

app.post('/api/units', (req, res) => {
  const body = req.body
  console.log(body)
  const newUnit = {
      title: body.title,
      code: body.code,
      offering: body.offering,
      id: data.units.length   
  }
  data.units.push(newUnit) 
  res.json(newUnit)
})

app.get('/api/units/:id', (req, res) => {
  const id = Number(req.params.id)
  const unit = data.units.filter(u => u.id === id)[0]
  res.json(unit)
})

app.delete('/api/units/:id', (req, res) => {
  const id = Number(req.params.id)
  data.units = data.units.filter(u => u.id !== id)
  res.json("deleted")
})

app.put('/api/units/:id', (req, res) => {
  const newUnit = req.body
  const id = Number(req.params.id)
  data.units = data.units.map(e => id === e.id ? newUnit : e)
  console.log("updated", newUnit)
  res.json(newUnit)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})