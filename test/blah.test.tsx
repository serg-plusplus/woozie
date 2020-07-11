import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, Link } from "../src";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider>
        <Link to="/">Home</Link>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
