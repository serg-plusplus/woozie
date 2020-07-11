import * as React from "react";
import { To, createLocationState, createLocationUpdates } from "./location";
import { HistoryAction, createUrl, changeState } from "./history";

type RedirectProps = {
  to: To;
  push?: boolean;
  fallback?: React.ReactElement;
};

const Redirect: React.FC<RedirectProps> = ({
  to,
  push = false,
  fallback = null,
}) => {
  React.useEffect(() => {
    const lctn = createLocationState();
    const { pathname, search, hash, state } = createLocationUpdates(to, lctn);
    const url = createUrl(pathname, search, hash);
    changeState(push ? HistoryAction.Push : HistoryAction.Replace, state, url);
  }, [to, push]);

  return fallback;
};

export default Redirect;
