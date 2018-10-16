import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import sourceMaps from "rollup-plugin-sourcemaps";
import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import pkg from "./package.json";

const input = "./compiled/index.js";

const buildUmd = ({ env }) => ({
  input,
  output: {
    name: "Request Light",
    format: "umd",
    sourcemap: true,
    file:
      env === "production"
        ? `./dist/request-network-lw.umd.${env}.js`
        : `./dist/request-network-lw.umd.${env}.js`,
    exports: "named"
  },

  plugins: [
    json(),
    resolve({ preferBuiltins: true }),
    replace({
      exclude: "node_modules/**",
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    commonjs({
      include: /node_modules/,
      exclude: ["node_modules/websocket/**"]
    }),
    sourceMaps(),
    env === "production" && sizeSnapshot(),
    env === "production" &&
      terser({
        output: { comments: false }
      })
  ]
});

const buildCjs = ({ env }) => ({
  input,
  external: Object.keys(pkg.dependencies),
  output: {
    file: `./dist/${pkg.name}.cjs.${env}.js`,
    format: "cjs",
    sourcemap: true
  },
  plugins: [
    json(),
    resolve(),
    replace({
      exclude: "node_modules/**",
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    sourceMaps(),
    sizeSnapshot()
  ]
});

export default [
  buildUmd({ env: "production" }),
  buildUmd({ env: "development" }),
  buildCjs({ env: "production" }),
  buildCjs({ env: "development" }),
  {
    input,
    external: Object.keys(pkg.dependencies),
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: true
      },
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true
      }
    ],
    plugins: [resolve(), babel(), sizeSnapshot(), sourceMaps()]
  }
];
