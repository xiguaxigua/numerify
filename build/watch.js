import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  plugins: [babel(), commonjs(), resolve()],
  dest: 'dist/index.js',
  format: 'umd',
  moduleName: 'UtilsLite'
}
