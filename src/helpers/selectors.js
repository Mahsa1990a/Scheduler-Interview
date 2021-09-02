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

  module.exports = { getAppointmentsForDay };