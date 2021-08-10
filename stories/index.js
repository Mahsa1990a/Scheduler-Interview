import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>) //confirm -> prop
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
