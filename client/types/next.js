/* @flow */

declare module "next" {
  declare type NextApp = {
    prepare(): Promise<void>;
    getRequestHandler(): any;
    render(req: any, res: any, pathname: string, query: any): any;
    renderToHTML(req: any, res: any, pathname: string, query: string): string;
    renderError(err: Error, req: any, res: any, pathname: any, query: any): any;
    renderErrorToHTML(err: Error, req: any, res: any, pathname: string, query: any): string;
  };
  declare module.exports: (...opts: any) => NextApp
}

declare module "next/head" {
  declare module.exports: Class<React$Component<any, any>>;
}

declare module "next/link" {
  declare module.exports: Class<React$Component<{href: string, prefetch?: bool}, any>>;
}

declare module "next/error" {
  declare module.exports: Class<React$Component<{statusCode: number}, any>>;
}

declare module "next/router" {
  declare module.exports: {
    route: string;
    pathname: string;
    query: Object;
    onRouteChangeStart: ?((url: string) => void);
    onRouteChangeComplete: ?((url: string) => void);
    onRouteChangeError: ?((err: Error & {cancelled: boolean}, url: string) => void);
    push(url: string, as: ?string): Promise<boolean>;
    replace(url: string, as: ?string): Promise<boolean>;
  };
}

declare module "next/document" {
  declare export var Head: Class<React$Component<any, any>>;
  declare export var Main: Class<React$Component<any, any>>;
  declare export var NextScript: Class<React$Component<any, any>>;
}
