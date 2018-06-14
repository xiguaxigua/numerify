import { numIsNaN, numberToFormat, extend } from './utils'
import { DEFAULT_OPTIONS } from './constants'
import numerifyPercent from './plugins/percent'

const options = {}
const formats = {}

extend(options, DEFAULT_OPTIONS)

function format (value, formatType, roundingFunction) {
  formatType = formatType || options.defaultFormat
  roundingFunction = roundingFunction || Math.round
  let output
  let formatFunction

  if (value === 0 && options.zeroFormat !== null) {
    output = options.zeroFormat
  } else if (value === null && options.nullFormat !== null) {
    output = options.nullFormat
  } else {
    for (let kind in formats) {
      if (formats[kind] && formatType.match(formats[kind].regexp)) {
        formatFunction = formats[kind].format
        break
      }
    }
    formatFunction = formatFunction || numberToFormat.bind(null, options)
    output = formatFunction(value, formatType, roundingFunction, numerify)
  }

  return output
}

export default function numerify (input, formatType, roundingFunction) {
  let value

  if (input === 0 || typeof input === 'undefined') {
    value = 0
  } else if (input === null || numIsNaN(input)) {
    value = null
  } else if (typeof input === 'string') {
    if (options.zeroFormat && input === options.zeroFormat) {
      value = 0
    } else if (options.nullFormat &&
      input === options.nullFormat ||
      !input.replace(/[^0-9]+/g, '').length) {
      value = null
    } else {
      value = +input
    }
  } else {
    value = +input || null
  }

  return format(value, formatType, roundingFunction)
}

numerify.options = options
numerify._numberToFormat = numberToFormat.bind(null, options)
numerify.register = function (name, format) { formats[name] = format }
numerify.unregister = function (name) { formats[name] = null }
numerify.setOptions = function (opts) { extend(options, opts) }
numerify.reset = function () { extend(options, DEFAULT_OPTIONS) }

numerify.register('percentage', numerifyPercent)
