import React from "react";

const Unit = ({unit}) => {

    console.log(unit)

  return (
    <li>{unit.code}: 
    {unit.title} 
    {unit.offering.map(o => <span key={o}> {o} </span>)}
    </li>
  )

}

export default Unit