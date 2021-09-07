// Our useApplicationData Hook will return an object with four keys.

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.

import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) { //custom hook to manage API data

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
  ///////////////////////////////////////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////////////////////////////

  function getUpdateSpots(newAppointments) {
    return state.days.map((day, index) => {
      let freeSpots = 0;

      for (let key of state.days[index].appointments) {
        if (!newAppointments[key].interview) {
          freeSpots++;
        }
      }
      const updatedSpots = {...day, spots: freeSpots}
      return updatedSpots;
    })
  };
  //////////////////////////////////////////////////////////////////////////////////
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // return axios({
    //   method: "DELETE",
    //   url:`/api/appointments/${id}`
    // })
    // .then(response => {
    //   setState({
    //     ...state,
    //     interview: null
    //   })
    // }).catch(error => console.log(error));
    return (
      axios.delete(`/api/appointments/${id}`, appointments[id])
      .then(setState({
        ...state, appointments, days: getUpdateSpots(appointments)
      }))
      // .catch(err => console.log(err))
    );
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  function bookInterview(id, interview) {
    // console.log(id, interview);

    // return axios({
    //   method: "PUT",
    //   url: `/api/appointments/${id}`,
    //   data: { interview }
    // })                              OR:
    // return axios.put(`/api/appointments/${id}`, { interview })
      //Implementing the Update
      const appointment = {    //// appt state obj
        ...state.appointments[id],
        interview: { ...interview }
      };
      // keep moving up and can now make appts state obj
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      // set state on new state obj
      //Update the bookInterview function to call setState with your new state object.
      // setState({...state, 
      //   appointments, 
      //   // interview: response.data // after adding PUT
      // }); // OR: setState(prev => ({...prev, appointments }));

      // return axios.put(`/api/appointments/${id}`, { interview });
      return (
        axios.put(`/api/appointments/${id}`, appointments[id])
        .then(setState({
          ...state, appointments, days: getUpdateSpots(appointments) 
        }))
        // .catch(err => console.log(err))
      );
  }

  // Aliasing Actions after adding Combined State:
  const setDay = day => setState({ ...state, day }); // We are using it to update our DayList component.
  // const setDays = days => setState({ ...state, days }); // update: for useEffect doesn't depend on state
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }                                 // Need to remove, because we need to update both parts of the state at the same time


  return { state, setDay, bookInterview, cancelInterview };
}