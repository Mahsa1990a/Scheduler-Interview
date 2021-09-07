// import React, { useState, useEffect } from "react";
import React from "react";
// import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

import useApplicationData from "../hooks/useApplicationData";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  
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
        cancelInterview={cancelInterview}
      />
    )
  })
  
  
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
