import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

module.exports = {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),

    commonjs({
      sourceMap: false
    })
  ]
};