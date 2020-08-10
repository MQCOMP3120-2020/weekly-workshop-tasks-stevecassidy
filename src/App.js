import React, { useState } from "react";

const Unit = (props) => {

  const [title, setTitle] = useState(props.title)

  return (
    <li>{props.code}: {title}
      <button onClick={()=> setTitle(title.toUpperCase())}>Up</button>
      <button onClick={()=> setTitle(title.toLowerCase())}>Down</button>
    </li>
  )

}


const App = () => {

  const units = [
    {code: 'COMP1010', title:'Fundamentals of Computer Science', offering: ['S1', 'S2']},
    {code: 'COMP1750', title:'Introduction to Business Information Systems', offering: ['S1']},
    {code: 'COMP2110', title:'Web Technology', offering: ['S1', 'S2']},
    {code: 'COMP2750', title:'Applications Modelling and Development', offering: ['S1']},
    {code: 'MMCC2045', title:'Interactive Web Design', offering: ['S2']},
    {code: 'COMP3120', title:'Advanced Web Development', offering: ['S2']},
    {code: 'COMP3130', title:'Mobile Application Development', offering: ['S1']}
  ]
  

  return (
    <div className="App">
      <ul>
       {units.map((unit) => (<Unit key={unit.code} code={unit.code} title={unit.title} />))}
      </ul>
    </div>
  );
}

export default App;
