import React from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Save appointment to db
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING); // Async Status

    props.bookInterview(props.id, interview)
    // transition(SHOW);
    .then(() => transition(SHOW))

    // transition when axios rejects the Promise in our save and destroy functions
    .catch(err => transition(ERROR_SAVE, true));
    
  };

  // function to cancel appt & delete from db
  function cancelAppt(name, interview) {
    transition(DELETING, true);

    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))

    // transition when axios rejects the Promise in our save and destroy functions
    .catch(err => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          // // these are coming from appointment props

          student={props.interview.student}
          // interviewer={props.interview.interviewer.name} update:
          interviewer={props.interview.interviewer}
          // onEdit={transition("onEdit")}
          // onEdit={() => transition("onEdit")}    UPDATE AFTER ADDINF EDIT
          onEdit={() => transition(EDIT)}
          // onDelete={transition("onDelete")}
          // onDelete={() => transition("onDelete")}
          // onDelete={cancelAppt}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form 
          // interviewers={[]} //then passed interviewers down to the Form component.
          interviewers={props.interviewers}
          // onSave={transition("onSave")}
          onSave={save}
          onCancel={() => back("onCancel")}
        />
      )}
      {/* Async Status */}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}

      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure?"
          onCancel={() => back("onCancel")}
          onConfirm={cancelAppt}
        />
      )}

      {mode === EDIT && (
        <Form 
          interviewers = {props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back("onCancel")}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          onClose={() => back("onCancel")}
          message="Could not save appointment"
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={() => back("onCancel")}
          message="Could not cancel appointment"
        />
      )}
    </article>
  )
};
