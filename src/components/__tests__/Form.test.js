import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "../Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    // getByPlaceholderText("Enter Student Name") => to find the same element in the DOM
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    // getByTestId("student-name-input") => to find the same element in the DOM ===> SO: there are different ways to query elements.
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  // Queries and Matchers

  it("validates that the student name is not blank", () => {

    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));

    /* 1.1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2.1. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {

    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        name="Lydia Miller-Jones"
      />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"))


    /* 3.1. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    /* 4.1. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
  
    /* 5.1. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});