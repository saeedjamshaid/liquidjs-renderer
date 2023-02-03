declare module 'liquidjs' {
  export default LiquidFactory;
}

declare function LiquidFactory(): LiquidFactory.Engine;

declare namespace LiquidFactory {
  export interface Engine {
    __proto__: any;
    parse(templateString: string): Template;
    render(tpl: Template, ctx: any): Promise<string>;
    registerFilter(name: string, filter: Function): void;
    registerTag(name: string, tag: TagImpl): void;
    getTemplate(filepath: string, root: string): Promise<string>;
    renderer: LiquidRenderer;
  }

  export interface LiquidRenderer {
    renderTemplates(template: string, scope: Scope): Promise<string>;
  }

  export interface TagImpl {
    parse(token: Token): void;
    render(scope: Scope, hash: Hash): Promise<string>;
  }

  export interface TagImplThis {
    staticValue: string;
    value: string;
    with: string;
  }

  export interface Token {
    args: string;
  }

  export interface Hash {
    [key: string]: any;
  }

  export interface Scope {
    scopes: Hash[];
    opts: ScopeOptions;
    pop(): void;
  }

  export interface ScopeOptions {
    dynamicPartials: boolean;
    blocks: any;
    blockMode: any;
    root: string;
  }

  export type Template = any;
}
