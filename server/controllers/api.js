const express = require('express')  
const fs = require("fs") 
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Load data from JSON file into memory
const rawData = fs.readFileSync("server/units.json")
const data = JSON.parse(rawData)

const SECRET = process.env.SECRET

const getUser = (username) => {
  return data.users.filter(u => u.username === username)[0]
}

const getTokenFrom = request => {
  const authorization = request.get('authorization') 
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
         return authorization.substring(7)  
      }  
  return null
}

const apiRouter = express.Router()

apiRouter.get('/api/units', (req, res) => {
    res.json(data.units)
})

/**
 * validate a token and return a decoded token or null if invalid
 * @param {express.request} req 
 * @returns {jwt.token} a decoded jwt token
 */
const validateToken = (req) => {
  const token = getTokenFrom(req)
  console.log(token)
  // if no token then we fail
  if (!token) {
    return null
  }

  const decodedToken = jwt.verify(token, SECRET)
   
  if (!decodedToken.id) {
    return null
  } else {
     return decodedToken
  }
}

apiRouter.post('/api/units', (req, res) => {

  const token = validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }

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

  const token = validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }

  const id = Number(req.params.id)
  data.units = data.units.filter(u => u.id !== id)
  res.json("deleted")
})

apiRouter.put('/api/units/:id', (req, res) => {
  const token = validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }

  const newUnit = req.body
  const id = Number(req.params.id)
  newUnit.id = id // ensure that the unit id remains the same after update
  data.units = data.units.map(e => id === e.id ? newUnit : e)
  console.log("updated", newUnit)
  res.json(newUnit)
})


// handle post request for login with {username, password}
apiRouter.post('/api/login', async (req, res) => {

  const {username, password} = req.body

  const user = getUser(username)

  if (!user) {
      return res.status(401).json({error: "invalid username or password"})
  }

  if (await bcrypt.compare(password, user.password)) {
      console.log("Password is good!")
      
      const userForToken = {
          id: user.id,
          username: user.username            
      }
      const token = jwt.sign(userForToken, SECRET)

      return res.status(200).json({token, username: user.username, name: user.name})
      
  } else {
      return res.status(401).json({error: "invalid username or password"})
  }
})


module.exports = apiRouter