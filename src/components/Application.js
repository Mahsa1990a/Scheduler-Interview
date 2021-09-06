import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


export default function Application(props) {

  // will be making requests to scheduler-api server from within the Application component
  // When we receive a response, we'll store the JSON data as the Application state.

  // Combined State:
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);     UPDATE this 2:
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);

    //Implementing the Update
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //Update the bookInterview function to call setState with your new state object.
    setState({...state, appointments});
  }

  // Aliasing Actions after adding Combined State:
  const setDay = day => setState({ ...state, day }); // We are using it to update our DayList component.
  // const setDays = days => setState({ ...state, days }); // update: for useEffect doesn't depend on state
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }                                 // Need to remove, because we need to update both parts of the state at the same time

  const interviewers = getInterviewersForDay(state, state.day); //create an interviewers array that will first be passed to the Appointment

  // after removing hardcoded appointments:
  // const dailyAppointments = [];
  // const dailyAppointments = appointmentsss // update to use getAppointmentsForDay, not hard coded
  const dailyAppointments = getAppointmentsForDay(state, state.day); // use getAppointmentsForDay to to return an array of Appointment objects
  
  const scedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment 
        key={appointment.id}
        // id={appointment.id} 
        // time={appointment.time} 
        // interview={appointment.interview}           In 3 ta UPDATE:
        // {...appointment}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    )
  })

  useEffect(() => {
    // axios.get("/api/days").then((response) => {
      // console.log([...response.data]);
      // setDays([...response.data]); UPDATE with Promise.all
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
    // .then(([days, appointments, interviewers]) => {
      // console.log("all", all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      // setState({ ...state, days: days.data, appointments: appointments.data, interviewers: interviewers.data})
    })
    .catch(error => console.log(error));

    // Promise.all will resolve to an array of resolved promises
    // return an obj containing multiple records using the record id as a key
  }, []); // => [] To never rerun this effect
  
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            // days={days} UPDATE After Combined State:
            days={state.days}
            // day={"Monday"} Update after adding state to:
            // day={day} UPDATE After Combined State:
            day={state.day}
            // setDay={day => console.log("day", day)} Update after adding state to:
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {/* {appointments.map(appointment => {   UPDATE After deleting hardcoded appiontments */}
        {/* {dailyAppointments.map(appointment => { // UPDATE at Retrieving Interviewer Data, put it up  */}
        
          {/* return(
            <Appointment 
              key={appointment.id} 
  
              // If we want every key in an object to become a prop for a component
              // we can spread the object into the props definition
              // id={appointment.id} 
              // time={appointment.time} 
              // interview={appointment.interview}           In 3 ta UPDATE:
              {...appointment}
            />
          )
        })} */}
        {scedule}
        <Appointment key="last" time="5pm" bookInterview={bookInterview}/>
      </section>
    </main>
  );
}
