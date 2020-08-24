import React from "react";

const Unit = ({unit, deleteFn}) => {

    console.log(unit)

  return (
    <li>{unit.code}: 
    {unit.title} 
    {unit.offering.map(o => <span key={o}> {o} </span>)}
    <button onClick={() => deleteFn(unit)}>Delete</button>
    </li>
  )

}

export default Unit