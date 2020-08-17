import React, { useState, useEffect } from "react";
import UnitForm from "./UnitForm.js"
import Unit from "./Unit.js"
import axios from 'axios'


const App = () => {
  
  const [units, setUnits] = useState([])

  const addNewUnit = (newUnit) => {

    axios.post("http://localhost:3001/units", newUnit)
    .then(response => {
      console.log("POST response", response)
      setUnits([...units, response.data])
    })


    
  }

  useEffect(() => {
    axios.get("http://localhost:3001/units")
    .then((response) => {
      console.log("response: ", response)
      setUnits(response.data)
    })
  },[])


  return (
    <div className="App">
      <UnitForm updateFn={addNewUnit}/>

      <ul>
       {units.map((unit) => (<Unit key={unit.id} unit={unit} />))}
      </ul>
    </div>
  );
}

export default App;
