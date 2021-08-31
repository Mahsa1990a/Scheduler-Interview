import React from 'react';
import "components/InterviewerListItem.scss";

const classNames = require('classnames');

export default function InterviewerListItem(props) {
  
  const { name, avatar, selected, setInterviewer } = props;

  const interviewClass = classNames({
    interviewers__item: true,
    // "interviewers__item--selected": props.selected
    "interviewers__item--selected": selected
  });

  return (
    // <li className={interviewClass} onClick={() => props.setInterviewer(props.id)}> Update:
    <li className={interviewClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}
