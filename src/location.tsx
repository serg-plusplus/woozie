import * as React from "react";
import { hashRouting } from "./config";
import { HistoryAction, PatchedHistory, useHistory } from "./history";

export interface LocationState {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  // Copy for hash routing
  nativePathname: string;
  nativeSearch: string;
  // History based
  trigger: HistoryAction | null;
  historyLength: number;
  historyPosition: number;
  // Misc
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

export function createURL(
  lctn: LocationState,
  pathname?: string,
  search?: string,
  hash?: string
) {
  let url = toURL(pathname, search, hash);
  if (hashRouting) {
    url = toURL(lctn.nativePathname, lctn.nativeSearch, url);
  }
  return url;
}

export function toURL(
  pathname: string = "/",
  search: string = "",
  hash: string = ""
) {
  if (search && !search.startsWith("?")) {
    search = `?${search}`;
  }
  if (hash && !hash.startsWith("#")) {
    hash = `#${hash}`;
  }
  return `${pathname}${search}${hash}`;
}

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
  const nativePathname = pathname;
  const nativeSearch = search;

  if (hashRouting) {
    const url = new URL(hash.startsWith("#") ? hash.slice(1) : hash, origin);

    pathname = url.pathname;
    search = url.search;
    hash = url.hash;
  }

  return {
    pathname,
    search,
    hash,
    state,
    nativePathname,
    nativeSearch,
    trigger,
    historyLength,
    historyPosition,
    host,
    hostname,
    href,
    origin,
    port,
    protocol,
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
