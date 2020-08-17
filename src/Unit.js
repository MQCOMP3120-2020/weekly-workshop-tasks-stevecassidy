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

export default Unit