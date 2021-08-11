import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {

  const interviewerss = props.interviewers && props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        // id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        // based on second .add for InterviewerList Test
        // selected={interviewer.id === props.interviewer} UPDATE(Controlled form):
        selected={interviewer.id === props.interviewer}
        // setInterviewer={props.setInterviewer} after deleting id, update to:
        // setInterviewer = {(event) => props.setInterviewer(interviewer.id)} UPDATE(Controlled form):
        setInterviewer = {(event) => props.onChange(interviewer.id)}

      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerss}</ul>
    </section>
  )
};
