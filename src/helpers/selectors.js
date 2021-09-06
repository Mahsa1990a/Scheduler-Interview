// request to /api/appointments we retrieve an object with all of the appointments,
  // but to show the schedule for a particular day,
  // we need to provide it an array of appointments for that day.

const getAppointmentsForDay = function(state, day) { //will return an array of appointments for the given day
    
    // 1. finding the object in our state.days array
    // 2. who's name matches the provided day
    const selectedDay = state.days.filter(d => d.name === day);

    if (!state.days.length || !selectedDay.length){
      return [];
    }
    // 3. Once we have access to the appointment array for the given day
    const appointments = selectedDay[0].appointments;
    let apptArray = [];
    // 4. we'll need to iterate through it
    for (let appt of appointments) {
      apptArray.push(state.appointments[appt]);
    }
    return apptArray;

    // OR:
    //   const found = state.days.find(d => day === d.name);
    // if (state.days.length === 0 || found === undefined) return [];
    // return found.appointments.map(id => state.appointments[id]);

};

const getInterview = function(state, interview) { 
  // return a new object containing the interview data when we pass it an object that contains the interviewer

  //Otherwise, the function should return null
  // if (!interview) {
  //   return null;
  // }

  // let newInterviewObj = {};
  // let interviewerId = interview.interviewer;

  // if (state.interviewers[interviewerId]) {
  //   newInterviewObj.student = interview.student;
  //   newInterviewObj.interviewer = state.interviewers[interviewerId];
  //   return newInterviewObj;
  // }

  // return null;
/////////////////////////////////////////OR
  // if (!interview) {
  //   return null;
  // }
  // const result = {
  //   student: interview.student
  // };
  // let intID = interview.interviewer;
  // result.interviewer = state.interviewers[`${intID}`];
  // return result;
//////////////////////////////////////////OR

  if (interview === null) {
    return null;
  }
  let interviewerId = interview.interviewer;
  const found = state.interviewers[interviewerId]
  const result = {
    student: interview.student, // or ...interview
    interviewer: found
  }

  return (result ? result : null)

}

const getInterviewersForDay = function(state, day) {
  const aDay = state.days.filter(oneDay => oneDay.name === day)[0]; //or find

  if (!aDay) {
    return [];
  }
  const interviewers = aDay.interviewers.map(appointmentId => state.interviewers[appointmentId]);
  //console.log("interviewers", interviewers)
  return interviewers;
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };