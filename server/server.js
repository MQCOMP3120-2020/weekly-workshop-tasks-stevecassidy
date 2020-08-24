const express = require('express') 
const cors = require('cors')


const app = express() 
app.use(cors())

let units = [
    {code: 'COMP1010', title:'Fundamentals of Computer Science', offering: ['S1', 'S2']},
    {code: 'COMP1750', title:'Introduction to Business Information Systems', offering: ['S1']},
    {code: 'COMP2110', title:'Web Technology', offering: ['S1', 'S2']},
    {code: 'COMP2750', title:'Applications Modelling and Development', offering: ['S1']},
    {code: 'MMCC2045', title:'Interactive Web Design', offering: ['S2']},
    {code: 'COMP3120', title:'Advanced Web Development', offering: ['S2']},
    {code: 'COMP3130', title:'Mobile Application Development', offering: ['S1']}
  ]

app.get('/api/units', (req, res) => {
    res.json(units)
})

app.post('/api/units', (req, res) => {
  const body = req.body
  const newUnit = {
      title: body.title,
      code: body.code,
      offering: body.offering,
      id: units.length   
  }
  units.push(newUnit) 
  res.json(newUnit)
})

app.put('/api/units/:id', (req, res) => {
  const newUnit = req.body
  const id = Number(req.params.id)
  units = units.map(e => id === e.id ? newUnit : e)
  console.log("updated", newUnit)
  res.json(newUnit)
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})