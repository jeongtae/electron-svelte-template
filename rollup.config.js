import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const dev = !!process.env.ROLLUP_WATCH;

export default {
  input: "src/svelte/index.ts",
  output: {
    sourcemap: dev,
    format: "esm",
    name: "app",
    dir: "dist/svelte",
    chunkFileNames: "[name].mjs",
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev,
      },
      preprocess: sveltePreprocess({
        typescript: {
          tsconfigFile: "src/svelte/tsconfig.json",
          compilerOptions: { sourceMap: dev, inlineSources: dev },
        },
      }),
      emitCss: false,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    nodeResolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    json({ namedExports: true }),
    typescript({
      tsconfig: "src/svelte/tsconfig.json",
      sourceMap: dev,
      inlineSources: dev,
    }),
    !dev && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
