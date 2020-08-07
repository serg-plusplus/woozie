import * as React from "react";
import { To } from "./location";
import { HistoryAction } from "./history";
import { navigate } from "./navigate";

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
  React.useEffect(
    () => navigate(to, push ? HistoryAction.Push : HistoryAction.Replace),
    [to, push]
  );

  return fallback;
};

export default Redirect;
