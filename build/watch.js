import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  plugins: [babel(), commonjs(), resolve()],
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'numerify'
  }
}
