import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';
import json from 'rollup-plugin-json';

const input = './compiled/index.js';
const external = ['react', 'react-native'];

const buildUmd = ({ env }) => ({
  input,
  external,
  output: {
    name: 'React Request Network',
    format: 'umd',
    sourcemap: true,
    file:
      env === 'production'
        ? `./dist/react-request-network.umd.${env}.js`
        : `./dist/react-request-network.umd.${env}.js`,
    exports: 'named',
    globals: {
      react: 'React',
    },
  },

  plugins: [
    json(),
    resolve(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs({
      strict: false,
      include: /node_modules/,
      exclude: [ 'node_modules/stream-to-pull-stream/**' ],
      namedExports: {
        'node_modules/prop-types/index.js': [
          'object',
          'oneOfType',
          'string',
          'node',
          'func',
          'bool',
          'element',
        ],
      },
    }),
    sourceMaps(),
    env === 'production' && filesize(),
    env === 'production' &&
      uglify({
        output: { comments: false, strict: false },
        compress: {
          keep_infinity: true,
          pure_getters: true,
        },
        warnings: true,
        ecma: 5,
        toplevel: false,
      }),
  ],
});

const buildCjs = ({ env }) => ({
  input,
  external: external.concat(Object.keys(pkg.dependencies)),
  output: [
    {
      file: `./dist/${pkg.name}.cjs.${env}.js`,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    sourceMaps(),
    filesize(),
  ],
})

export default [
  buildUmd({ env: 'production' }),
  buildUmd({ env: 'development' }),
  buildCjs({ env: 'production' }),
  buildCjs({ env: 'development' }),
  {
    input,
    external: external.concat(Object.keys(pkg.dependencies)),
    output: [
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      
      sourceMaps(),
      filesize(),
    ],
  },
];
