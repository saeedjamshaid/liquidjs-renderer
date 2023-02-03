import { Base64 as base64 } from "js-base64";

// use this instead of default export from liquid because its not compiled to ES5
import liquidjs from "liquidjs";

// @ts-ignore
const lexical = liquidjs.lexical;
const withRE = new RegExp(`with\\s+(${lexical.value.source})`);
const staticFileRE = /[^\s,]+/;

export class LiquidJS {
  liquid: liquidjs.Engine;
  constructor(partialTemplates?: { [key: string]: string }) {
    this.liquid = liquidjs();
    // Monkey-patch file-loading mechanism in LiquidJS to allow loading templates from a map.
    // Newer LiquidJS version already implements this so migrating to that is also an option.
    // FIX: Patching __proto__ affects all liquidjs instances which means we are setting all
    // LiquidJS instances to use our "partialTemplates" map (which is wrong).
    if (partialTemplates) {
      this.liquid.__proto__.lookup = () => Promise.resolve(true);
      this.liquid.__proto__.getTemplate = (filepath: string) => {
        return Promise.resolve(this.liquid.parse(partialTemplates[filepath]));
      };
    }

    this.registerFilters();
    this.registerTags();
  }

  private registerFilters = () => {
    this.registerJsonFileder();
    this.registerGetFileFromDataUrlFilter();
    this.registerBase64EncodeFilter();
  };

  private registerTags = () => {
    this.registerRenderTag();
  };

  private registerJsonFileder = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.liquid.registerFilter("json", (v: any, i: number | undefined) =>
      JSON.stringify(v, null, i ? 2 : undefined)
    );
  };

  private registerGetFileFromDataUrlFilter = () => {
    /**
     * A filter to get file name from data-URI encoded string
     */
    this.liquid.registerFilter("get_file_from_data_url", (v: string) => {
      const reg = /^data:.*;name=(.*);.*$/g;
      const result = reg.exec(v);
      return result ? result[1] : "";
    });
  };

  private registerBase64EncodeFilter = () => {
    /**
     * Base64 encode a string
     */
    this.liquid.registerFilter("base64_encode", (v: string) =>
      base64.encode(v)
    );
  };

  private registerRenderTag = () => {
    const liquid = this.liquid;
    this.liquid.registerTag("render", {
      parse: function (this: LiquidFactory.TagImplThis, token) {
        let match = staticFileRE.exec(token.args);
        if (match) {
          this.staticValue = match[0];
        }

        match = lexical.value.exec(token.args);
        if (match) {
          this.value = match[0];
        }

        match = withRE.exec(token.args);
        if (match) {
          this.with = match[1];
        }
      },
      render: function (this: LiquidFactory.TagImplThis, scope, hash) {
        const filepath: string = scope.opts.dynamicPartials
          ? // @ts-ignore
            liquidjs.evalValue(this.value, scope)
          : this.staticValue;

        if (!filepath) {
          throw new Error("cannot include with empty filename");
        }

        const originBlocks = scope.opts.blocks;
        const originBlockMode = scope.opts.blockMode;
        const originScopes = scope.scopes;
        scope.opts.blocks = {};
        scope.opts.blockMode = "output";

        if (this.with) {
          // @ts-ignore
          hash[filepath] = liquidjs.evalValue(this.with, scope);
        }
        return liquid
          .getTemplate(filepath, scope.opts.root)
          .then((templates) => {
            scope.scopes = [hash];
            return liquid.renderer.renderTemplates(templates, scope);
          })
          .then((html) => {
            scope.pop();
            scope.opts.blocks = originBlocks;
            scope.opts.blockMode = originBlockMode;
            scope.scopes = originScopes;
            return html;
          });
      }
    });
  };

  /**
   * Parsed template
   * @param tpl Template
   */
  parse = (tpl: string) => {
    return this.liquid.parse(tpl);
  };

  /**
   * Render a template with given data context
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render = (tpl: any, ctx: any): Promise<string> => {
    return this.liquid.render(tpl, ctx);
  };
}
