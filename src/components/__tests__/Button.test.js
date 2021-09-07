import React from "react";

//we will refer to react-testing-library and @testing-library/react.
import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "components/Button";

afterEach(cleanup);

//The most basic test we will do for any React component is a test render. 
//This test verifies that we can render the component to the DOM without throwing an error.
it("renders without crashing", () => { //it function provided by Jest. //first argument is a descriptive name for the test.
  render(<Button />); //The second argument is a function that contains the test code.
});

it("renders its `children` prop as text", () => {
  // The getByText query function is returned by the render function but is a part of the the dom-testing-library.
  const { getByText } = render(<Button>Default</Button>);
  //The expect function is injected into the global scope by Jest.
  expect(getByText("Default")).toBeInTheDocument(); //The toBeInTheDocument function is a matcher provided through Jest by the jest-dom library.
});

it("renders a default button style", () => {
  const { getByText } = render(<Button>Default</Button>);
  expect(getByText("Default")).toHaveClass("button");
});

it("renders a confirm button", () => {
  const { getByText } = render(<Button confirm>Confirm</Button>);
  expect(getByText("Confirm")).toHaveClass("button--confirm");
});

it("renders a danger button", () => {
  const { getByText } = render(<Button danger>Danger</Button>);
  expect(getByText("Danger")).toHaveClass("button--danger");
});

it("renders a clickable button", () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button onClick={handleClick}>Clickable</Button>
  );

  const button = getByText("Clickable");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("renders a disabled button", () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <Button disabled onClick={handleClick}>
      Disabled
    </Button>
  );

  const button = getByText("Disabled");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(0);
});
