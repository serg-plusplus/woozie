# Woozie🕴

[![Latest](https://badgen.net/npm/v/woozie)](https://npm.im/woozie) [![Super Tiny](https://badgen.net/bundlephobia/min/woozie)](https://npm.im/woozie) [![Super Tiny](https://badgen.net/bundlephobia/minzip/woozie)](https://npm.im/woozie)

![Woozie](.github/woozie-in-search.jpg)

Tiny router with browser-first API for React apps.

## 🚀 Quick Start

### Install

```bash
yarn add woozie
```

### Usage

```tsx
// App.tsx
import * as React from "react";
import { LocationProvider } from "woozie";
import PageRouter from "./PageRouter";

const App: React.FC = () => (
  <LocationProvider>
    <PageRouter />
  </LocationProvider>
);

export default App;

// PageRouter.tsx
import * as React from "react";
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

export default PageRouter;

// PageRouterWithContext.tsx
import * as React from "react";
import { Router, Redirect, Link, useLocation, HistoryAction } from "woozie";

interface RouteContext {
  authorized: boolean;
}

const ROUTE_MAP = Router.createMap<RouteContext>([
  ["/", () => <Link to="/kek">To Kek</Link>],
  ["/kek", () => (
    <>
      <Link to="/profile">To empty profile</Link>
      <Link to="/profile/123">To known profile</Link>
    </>
  )],
  // All routes below requires authentication
  ["*", (_p, { authorized }) =>
    authorized
    ? Router.SKIP
    : (
      <div>
        Pls, auth.
      </div>
    )
  ],
  ["/profile/:id?", ({ id }) => id ? <div>Profile for "{id}"</div> : Router.SKIP],
  ["*", () => <Redirect to="/" />],
]);

const PageRouterWithContext: React.FC = () => {
  const { trigger, pathname } = useLocation();

  // Scroll to top after new location pushed.
  React.useLayoutEffect(() => {
    if (trigger === HistoryAction.Push) {
      window.scrollTo(0, 0);
    }
  }, [trigger, pathname]);

  const ctx = React.useMemo<RouteContext>(() => ({ authorized: false }), []);

  return React.useMemo(() => Router.resolve(ROUTE_MAP, pathname, ctx), [
    pathname,
    ctx
  ]);
};

export default PageRouterWithContext;
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

## License

Licensed under [MIT license](LICENSE).

## Etymology

From [GTA Wiki](http://gta.wikia.com/wiki/Wu_Zi_Mu):

> **Wu Zi Mu** (Chinese: 吴梓穆, Pinyin: wú zì mù, known to his friends as "**Woozie**") is a character in the [Grand Theft Auto](http://gta.wikia.com/wiki/Grand_Theft_Auto) series who appears as a main character in [Grand Theft Auto: San Andreas](http://gta.wikia.com/wiki/Grand_Theft_Auto:_San_Andreas).
