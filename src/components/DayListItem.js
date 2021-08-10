import React from 'react';
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  const DayListItemClass = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  const formatSpots = function(spots) {
    // if (spots === 0) {
    //   return "no spots remaining";
    // } else if (spots === 1) {
    //   return `${spots} spot remaining`;
    // } else {
    //   return `${spots} spots remaining`;
    // }
    // OR:
    return (
      spots === 0 ? "no spots remaining" : `${spots} spot${spots === 1 ? '' : 's'} remaining`
    )
  }

  return (
    // The <li> represents the entire day item
    // We are passing setDay, wrapped in anonymous func 
    <li className={DayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      {/* <h3 className="text--light">{props.spots}</h3>  for test need to update this: */}
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  )
};