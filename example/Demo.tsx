import * as React from "react";

import { Consumer } from "./Context";

export const Demo = () => (
  <Consumer>
    {(v) => v}
  </Consumer>
);
