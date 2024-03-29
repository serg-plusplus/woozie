import regexparam from "regexparam";

export type Path = string;
export type Route = string;
export type Params = { [key: string]: string | null };
export type ResolveResult<C> = (params: Params, ctx: C) => any;
export type Pattern = RegExp;
export type Keys = Array<string> | false;
export type Routes<C> = Array<[Route, ResolveResult<C>]>;
export type RouteMap<C> = Array<{
  route: Route;
  resolveResult: ResolveResult<C>;
  pattern: RegExp;
  keys: Array<string> | false;
}>;

export const SKIP = Symbol("Woozie.Router.Skip");
export const NOT_FOUND = Symbol("Woozie.Router.NotFound");

export function createMap<C>(routes: Routes<C>): RouteMap<C> {
  return routes.map(([route, resolveResult]) => {
    const { pattern, keys } = regexparam(route);
    return {
      route,
      resolveResult,
      pattern,
      keys,
    };
  });
}

export function resolve<C>(preparedRM: RouteMap<C>, path: Path, ctx: C): any {
  for (let i = 0; i < preparedRM.length; i++) {
    const { resolveResult, pattern, keys } = preparedRM[i];
    if (pattern.test(path)) {
      const params = createParams(path, pattern, keys);
      const result = resolveResult(params, ctx);
      if (result !== SKIP) {
        return result;
      }
    }
  }

  return NOT_FOUND;
}

function createParams(path: Path, pattern: Pattern, keys: Keys): Params {
  const params: Params = {};

  if (!keys) {
    return params;
  }

  const matches = pattern.exec(path);
  if (!matches) {
    return params;
  }

  let i = 0;
  while (i < keys.length) {
    params[keys[i]] = matches[++i] || null;
  }
  return params;
}
