import React, { useState } from 'react';
import InterviewerList from "../../components/InterviewerList";
import Button from "../../components/Button";

export default function Form(props) {

  // Form has 2 states, depends if user is creating or editing
  // For editing form must be pre-filled with the existing interview data, a name and an interviewer(passed down as props)

  // It will evaluate to props.name if it is truthy. If props.name is undefined then it will use the empty string
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // When the user clicks the Cancel button, we clear the form values
  function reset() {
    setName("");
    setInterviewer(null);
  };
  // Along with resetting the form, we also want to call props.onCancel when a user clicks the cancel button:
  function cancel() {
    reset();
    props.onCancel();
  };

  // const save = () => {   OR pass it directly
  //   props.onSave(name, interviewer);
  // }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"

          value={name}
          onChange={(event) => setName(event.target.value)}
          /*
            This must be a controlled component
          */
         //Added this to pass test for : getByTestId("student-name-input")
          data-testid="student-name-input" 
        />
      </form>
      {/* <InterviewerList interviewers={props.interviewers} interviewer={props.interviewer} onChange={props.setInterviewer} /> UPDATE After adding state */}
      <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        {/* <Button danger onClick={props.onCancel}>Cancel</Button> UPDATE after adding reset & cancel func */}
        <Button danger onClick={cancel}>Cancel</Button>
        {/* <Button confirm onClick={props.onSave}>Save</Button> UPDATE: */}
        <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
      </section>
    </section>
  </main>
  )
};
