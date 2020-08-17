import React, { useState } from "react";
import UnitForm from "./UnitForm.js"
import Unit from "./Unit.js"

const App = () => {

  const initialUnits = [
    {code: 'COMP1010', title:'Fundamentals of Computer Science', offering: ['S1', 'S2']},
    {code: 'COMP1750', title:'Introduction to Business Information Systems', offering: ['S1']},
    {code: 'COMP2110', title:'Web Technology', offering: ['S1', 'S2']},
    {code: 'COMP2750', title:'Applications Modelling and Development', offering: ['S1']},
    {code: 'MMCC2045', title:'Interactive Web Design', offering: ['S2']},
    {code: 'COMP3120', title:'Advanced Web Development', offering: ['S2']},
    {code: 'COMP3130', title:'Mobile Application Development', offering: ['S1']}
  ]
  
  const [units, setUnits] = useState(initialUnits)

  const addNewUnit = (newUnit) => {
    setUnits([...units, newUnit])
  }

  return (
    <div className="App">
      <UnitForm updateFn={addNewUnit}/>

      <ul>
       {units.map((unit) => (<Unit key={unit.code} code={unit.code} title={unit.title} />))}
      </ul>
    </div>
  );
}

export default App;
