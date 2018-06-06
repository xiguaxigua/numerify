const watch = require('watch')
const path = require('path')
const rollup = require('rollup')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const pluginList = require('../src/plugin-list')

watch.watchTree(path.resolve(__dirname, '../src'), function () {
  console.log('trigger watch.')
  rollup.rollup({
    input: 'src/index.js',
    plugins: [babel(), commonjs(), resolve()]
  }).then(bundle => {
    return bundle.write({
      file: 'dist/index.js',
      format: 'umd',
      name: 'numerify'
    })
  }).catch(e => {
    console.log(e)
    process.exit(1)
  })
  Object.keys(pluginList).forEach(key => {
    const src = pluginList[key].src
    const dist = pluginList[key].dist.replace('lib', 'dist')
    rollup.rollup({
      input: src,
      plugins: [babel(), commonjs(), resolve()]
    }).then(bundle => {
      return bundle.write({
        file: `${dist}.js`,
        format: 'umd',
        name: `numerify${key}`
      })
    }).catch(e => {
      console.log(e)
      process.exit(1)
    })
  })
})
