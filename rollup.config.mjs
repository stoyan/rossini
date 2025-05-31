import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import packageJson from './package.json' assert {type: 'json'};

export default {
  input: 'rossini.js',
  output: [
    // CommonJS
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    // ES Module
    {
      file: packageJson.module,
      format: 'es',
      sourcemap: true,
    },
    // UMD for browser global or AMD/CommonJS environments
    {
      file: packageJson.browser,
      format: 'umd',
      name: 'rossini',
      sourcemap: true,
      plugins: [terser()],
      globals: {}
    },
  ],
  plugins: [
    nodeResolve(),
  ],
};