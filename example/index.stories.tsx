import * as React from "react";
import { storiesOf } from "@storybook/react";

import { Demo } from "./Demo";

storiesOf("Examples", module)
  .add("default", () => <Demo />)
  .add("test persistance", () => <Demo />);
