import React, { useState, useEffect } from "react";
import UnitForm from "./UnitForm.js"
import Unit from "./Unit.js"
import unitService from './services/units'


const App = () => {
  
  const [units, setUnits] = useState([])

  const addNewUnit = (newUnit) => {

  unitService.create(newUnit)
    .then(data => {
      console.log("POST response", data)
      setUnits([...units, data])
    })
  }

  useEffect(() => {
    unitService.getAll()
    .then((data) => {
      console.log("response: ", data)
      setUnits(data)
    })
  },[])

  const deleteUnit = (unit) => {
    unitService.delete(unit.id)
    .then(data => {
      console.log("delete succeeded")
      // delete local copy
      const newUnits = units.filter(u => u.id !== unit.id)
      setUnits(newUnits)
    })
  }

  return (
    <div className="App">
      <UnitForm updateFn={addNewUnit}/>

      <ul>
       {units.map((unit) => (<Unit key={unit.id} unit={unit} deleteFn={deleteUnit}/>))}
      </ul>
    </div>
  );
}

export default App;
