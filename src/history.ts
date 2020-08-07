import * as React from "react";
import useForceUpdate from "use-force-update";

export enum HistoryAction {
  Pop = "popstate",
  Push = "pushstate",
  Replace = "replacestate",
}

export interface PatchedHistory extends History {
  lastAction: HistoryAction;
  position: number;
}

export type HistoryListener = (action: HistoryAction) => void;

const ACTIONS = [HistoryAction.Pop, HistoryAction.Push, HistoryAction.Replace];

export function listen(listener: HistoryListener) {
  const refs: [HistoryAction, () => void][] = ACTIONS.map((action) => [
    action,
    () => listener(action),
  ]);

  refs.forEach(([action, cb]) => window.addEventListener(action, cb));
  return () =>
    refs.forEach(([action, cb]) => window.removeEventListener(action, cb));
}

export function useHistory() {
  const forceUpdate = useForceUpdate();
  React.useLayoutEffect(() => listen(forceUpdate), [forceUpdate]);
}

export function changeState(
  action: HistoryAction.Push | HistoryAction.Replace,
  state: any,
  url: string
) {
  const title = ""; // Deprecated stuff
  const method = action === HistoryAction.Push ? "pushState" : "replaceState";
  window.history[method](state, title, url);
}

export function go(delta: number) {
  window.history.go(delta);
}

export function goBack() {
  go(-1);
}

export function goForward() {
  go(1);
}

export function resetHistoryPosition() {
  (window.history as PatchedHistory).position = 0;
}

patchMethod("pushState", HistoryAction.Push);
patchMethod("replaceState", HistoryAction.Replace);

listen(patchHistory);

function patchHistory(action: HistoryAction) {
  const patchedHistory = window.history as PatchedHistory;
  const position =
    (patchedHistory.position ?? 0) +
    (action === HistoryAction.Push ? 1 : action === HistoryAction.Pop ? -1 : 0);

  Object.assign(patchedHistory, {
    lastAction: action,
    position,
  });
}

function patchMethod(method: string, eventType: HistoryAction) {
  const history = window.history as any;
  const original = history[method];

  history[method] = function(state: any) {
    const result = original.apply(this, arguments);

    const event = new CustomEvent(eventType);
    (event as any).state = state;
    window.dispatchEvent(event);

    return result;
  };
}
