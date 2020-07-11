# Woozie

Tiny router with browser-first API for React apps.

## 🚀 Quick Start

### Install

```bash
yarn add woozie
```

### Usage

```tsx
// App.tsx
import { LocationProvider } from "woozie";
import PageRouter from "./PageRouter";

const App: React.FC = () => (
  <LocationProvider>
    <PageRouter />
  </LocationProvider>
);

// PageRouter.tsx
import { Router, Redirect, Link, useLocation, HistoryAction } from "woozie";

const ROUTE_MAP = Router.createMap([
  ["/", () => <Link to="/kek">To Kek</Link>],
  ["/kek", () => <div>Kek</div>],
  ["*", () => <Redirect to="/" />],
]);

const PageRouter: React.FC = () => {
  const { trigger, pathname } = useLocation();

  // Scroll to top after new location pushed.
  React.useLayoutEffect(() => {
    if (trigger === HistoryAction.Push) {
      window.scrollTo(0, 0);
    }
  }, [trigger, pathname]);

  return React.useMemo(() => Router.resolve(ROUTE_MAP, pathname, null), [
    pathname,
  ]);
};
```

## Local Development

TSDX scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, [we use Parcel's aliasing](https://github.com/palmerhq/tsdx/pull/88/files).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.
