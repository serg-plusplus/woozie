import * as React from "react";
import { useHistory } from "./history";
import { createLocationState, LocationState } from "./location";

export function useLocation() {
  return React.useContext(Context);
}

export const Provider: React.FC = ({ children }) => {
  useHistory();
  const lctn = createLocationState();

  return <Context.Provider value={lctn}>{children}</Context.Provider>;
};

export const Context = React.createContext<LocationState>(null as any);

if (process.env.NODE_ENV === "development") {
  Context.displayName = "Woozie.Context";
  Provider.displayName = "Woozie.Provider";
}
