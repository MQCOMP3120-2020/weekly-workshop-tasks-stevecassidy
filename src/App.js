import React, { useState, useEffect } from "react";
import UnitForm from "./components/UnitForm"
import Unit from "./components/Unit"
import LoginForm from "./components/LoginForm"
import unitService from './services/units'



const App = () => {
  
  const [units, setUnits] = useState([])
  const [user, setUser] = useState(null)

  const addNewUnit = (newUnit) => {
    unitService.create(newUnit, user)
      .then(data => {
        setUnits([...units, data])
      })
  }

  useEffect(() => {
    unitService.getAll()
    .then((data) => {
      setUnits(data)
    })
  },[])

  const deleteUnit = (unit) => {
    unitService.delete(unit.id, user)
    .then(data => {
      // delete local copy
      const newUnits = units.filter(u => u.id !== unit.id)
      setUnits(newUnits)
    })
  }

  return (
    <div className="App">
      <LoginForm user={user} setUser={setUser}/>

    
      



      <div className="row">
      <div className="five columns">
        <UnitForm updateFn={addNewUnit}/> 
      </div>
      <div className="seven columns">
      <ul>
       {units.map((unit) => (<Unit key={unit.id} unit={unit} deleteFn={deleteUnit}/>))}
      </ul>
      </div>
    </div>
 
    </div>
  );
}

export default App;
