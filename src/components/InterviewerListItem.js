import React from 'react';
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {

  const interviewClass = classNames({
    interviewers__item: true,
    "interviewers__item--selected": props.selected
  });

  return (
    <li className={interviewClass} onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}