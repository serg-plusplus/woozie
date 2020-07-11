import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, Link } from "../src";

const App: React.FC = () => (
  <Provider>
    <Link to="/">Home</Link>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
