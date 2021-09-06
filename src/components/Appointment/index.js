import React from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  // const BACK = "BACK";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          // onEdit={transition("onEdit")}
          onEdit={() => transition("onEdit")}
          // onDelete={transition("onDelete")}
          onDelete={() => transition("onDelete")}
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
    </article>
  )
};
