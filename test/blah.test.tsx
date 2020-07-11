import * as React from "react";
import * as ReactDOM from "react-dom";
import { LocationProvider, Link } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <LocationProvider>
        <Link to="/">Home</Link>
      </LocationProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
