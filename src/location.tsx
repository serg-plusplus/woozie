import * as React from "react";
import { hashRouting } from "./config";
import { HistoryAction, PatchedHistory, useHistory } from "./history";

export interface LocationState {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  // History based props
  trigger: HistoryAction | null;
  historyLength: number;
  historyPosition: number;
  // Misc props
  host?: string;
  hostname?: string;
  href?: string;
  origin?: string;
  port?: string;
  protocol?: string;
}

export interface LocationUpdates {
  pathname?: string;
  search?: string;
  hash?: string;
  state?: any;
}

export type ModifyLocation = (location: LocationState) => LocationUpdates;
export type To = string | LocationUpdates | ModifyLocation;

export function createLocationState(): LocationState {
  const {
    length: historyLength,
    lastAction: trigger = null,
    position: historyPosition = 0,
    state,
  } = window.history as PatchedHistory;

  let {
    hash,
    host,
    hostname,
    href,
    origin,
    pathname,
    port,
    protocol,
    search,
  } = window.location;

  if (hashRouting) {
    const url = new URL(hash.startsWith("#") ? hash.slice(1) : hash, origin);

    pathname = url.pathname;
    search = url.search;
    hash = url.hash;
  }

  return {
    trigger,
    historyLength,
    historyPosition,
    state,
    hash,
    host,
    hostname,
    href,
    origin,
    pathname,
    port,
    protocol,
    search,
  };
}

export function createLocationUpdates(
  to: To,
  lctn: LocationState
): LocationUpdates {
  switch (typeof to) {
    case "string":
      return { pathname: to };

    case "function":
      return to(lctn);

    case "object":
      return to;
  }
}

export function useLocation() {
  return React.useContext(LocationContext);
}

export const LocationProvider: React.FC = ({ children }) => {
  useHistory();
  const lctn = createLocationState();

  return (
    <LocationContext.Provider value={lctn}>{children}</LocationContext.Provider>
  );
};

export const LocationContext = React.createContext<LocationState>(null as any);

if (process.env.NODE_ENV === "development") {
  LocationContext.displayName = "Woozie.LocationContext";
  LocationProvider.displayName = "Woozie.LocationProvider";
}