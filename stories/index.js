import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

// Button Test
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>) //confirm -> is a prop to apply the .button--confirm modifier class
  //<Button danger={true}>Cancel</Button> we use shortened version:
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
  //The @storybook/addon-actions addon is used to display the data received by event handlers.
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    //When we create a new Button component we will pass it the onClick and disabled props. This is how it is declared in the "Button" story.
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));
/////////////////////////////////////////////////////
storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));
//////////////////////////////////////////////////////
// DayList Test
const days = [ // an arr of days objs
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));
////////////////////////////////////////////////////////////
// InterviewerListItem Test
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      // setInterviewer={action("setInterviewer")} UPDATE:
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ));
////////////////////////////////////////////////////////////
// InterviewerList Test
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
      setInterviewer={action("setInterviewer")}
    />
  ));
////////////////////////////////////////////////////////////////////
// Appointment Tset
storiesOf("Appointment", module)
.addParameters({
  backgrounds: [{ name: "white", value: "#fff", default: true }]
})
.add("Appointment", () => <Appointment />)
.add("Appointment with time", () => <Appointment time="12pm" />)
// Header Test (it's a child of Appointment)
.add("Header", () => <Header time="12pm"/>)
// Empty
.add("Empty", () => <Empty onAdd={action("onAdd")} />)
//Show
.add("Show", () => 
  <Show 
    student="Lydia Miller-Jones" 
    interviewer={interviewer}
    onEdit={action("onEdit")}
    onDelete={action("onDelete")}
  />)
// Confirm
.add("Confirm", () => 
  <Confirm 
    message="Delete the appointment?"
    onConfirm={action("onConfirm")}
    onCancel={action("onCancel")}
  />)
// Status
.add("Status", () => 
  <Status 
    message="Deleting"
  />)
// Error
.add("Error", () => 
  <Error 
    message="Could not delete appointment."
    onClose={action("onClose")}
  />)
// Form (Edit)
.add("Form Edit", () => 
  <Form 
    name="Lydia Miller-Jones"
    interviewers={interviewers}
    interviewer={3}
    onSave={action("onSave")}
    onCancel={action("onCancel")}
  />)
// Create (Edit)
.add("Form Create", () => 
  <Form 
    interviewers={interviewers}
    onSave={action("onSave")}
    onCancel={action("onCancel")}
  />)
// Appointment Empty
.add("Appointment Empty", () => (
  <Fragment>
    {/* The first appointment shows the entire component in full */}
    <Appointment id={1} time="12pm" />
    {/* second one is only a header with a time to finish our list off */}
    <Appointment id="last" time="1pm" />
  </Fragment>
))
// Appointment Booked
.add("Appointment Booked", () => (
  <Fragment>
    <Appointment
      id={1}
      time="12pm"
      interview={{ student: "Lydia Miller-Jones", interviewer }}
    />
    <Appointment id="last" time="1pm" />
  </Fragment>
))