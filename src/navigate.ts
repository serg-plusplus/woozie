import { HistoryAction, changeState } from "./history";
import {
  To,
  createLocationState,
  createLocationUpdates,
  createURL,
} from "./location";

export function navigate(
  to: To,
  action?: HistoryAction.Push | HistoryAction.Replace
) {
  const lctn = createLocationState();
  const { pathname, search, hash, state } = createLocationUpdates(to, lctn);
  const url = createURL(lctn, pathname, search, hash);

  if (!action) {
    action =
      url === createURL(lctn, lctn.pathname, lctn.search, lctn.hash)
        ? HistoryAction.Replace
        : HistoryAction.Push;
  }

  changeState(action, state, url);
}
