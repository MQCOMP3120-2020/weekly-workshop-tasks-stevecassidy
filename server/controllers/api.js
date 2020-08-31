const express = require('express')  
const fs = require("fs") 

// Load data from JSON file into memory
const rawData = fs.readFileSync("server/units.json")
const data = JSON.parse(rawData)

const apiRouter = express.Router()

apiRouter.get('/api/units', (req, res) => {
    res.json(data.units)
})

apiRouter.post('/api/units', (req, res) => {
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

apiRouter.get('/api/units/:id', (req, res) => {
  const id = Number(req.params.id)
  const unit = data.units.filter(u => u.id === id)[0]
  res.json(unit)
})

apiRouter.delete('/api/units/:id', (req, res) => {
  const id = Number(req.params.id)
  data.units = data.units.filter(u => u.id !== id)
  res.json("deleted")
})

apiRouter.put('/api/units/:id', (req, res) => {
  const newUnit = req.body
  const id = Number(req.params.id)
  newUnit.id = id // ensure that the unit id remains the same after update
  data.units = data.units.map(e => id === e.id ? newUnit : e)
  console.log("updated", newUnit)
  res.json(newUnit)
})


module.exports = apiRouter