import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LocationProvider, Link } from "../src";

const App: React.FC = () => (
  <LocationProvider>
    <Link to="/">Home</Link>
  </LocationProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
