import React from 'react';
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  const { name, spots, selected, setDay } = props;

  const DayListItemClass = classNames('day-list__item', {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
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
    <li className={DayListItemClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2> 
      {/* <h3 className="text--light">{props.spots}</h3>  for test need to update this: */}
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  )
};