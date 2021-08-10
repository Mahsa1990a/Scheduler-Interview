import React from 'react';

export default function DayListItem(props) {
  return (
    // The <li> represents the entire day item
    // We are passing setDay, wrapped in anonymous func 
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  )
};