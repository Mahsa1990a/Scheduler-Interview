import React from 'react';
import InterviewerList from "../../components/InterviewerList";
import Button from "../../components/Button";

export default function Form(props) {

  // Form has 2 states, depends if user is creating or editing
  // For editing form must be pre-filled with the existing interview data, a name and an interviewer(passed down as props)

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
        />
      </form>
      <InterviewerList interviewers={props.interviewers} interviewer={props.interviewer} onChange={props.setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button confirm onClick={props.onSave}>Save</Button>
      </section>
    </section>
  </main>
  )
};
