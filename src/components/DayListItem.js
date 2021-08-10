import React from 'react';
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  const DayListItemClass = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })
  return (
    // The <li> represents the entire day item
    // We are passing setDay, wrapped in anonymous func 
    <li className={DayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  )
};