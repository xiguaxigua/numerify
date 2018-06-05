import { numIsNaN, numberToFormat, extend } from './utils'
import { DEFAULT_OPTIONS } from './constants'

const options = {}
const formats = {}

extend(options, DEFAULT_OPTIONS)

function format (value, formatType, roundingFunction) {
  let format = formatType || options.defaultFormat
  let output
  let formatFunction

  // make sure we have a roundingFunction
  roundingFunction = roundingFunction || Math.round

  // format based on value
  if (value === 0 && options.zeroFormat !== null) {
    output = options.zeroFormat
  } else if (value === null && options.nullFormat !== null) {
    output = options.nullFormat
  } else {
    for (let kind in formats) {
      if (format.match(formats[kind].regexps.format)) {
        formatFunction = formats[kind].format
        break
      }
    }
    formatFunction = formatFunction || numberToFormat.bind(null, options)
    output = formatFunction(value, format, roundingFunction)
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
    }
  } else {
    value = +input || null
  }

  return format(value, formatType, roundingFunction)
}

numerify.setOptions = function (opts) {
  Object.keys(opts).forEach(key => { options[key] = opts[key] })
}
numerify.register = function (name, format) { formats[name] = format }
numerify.numberToFormat = numberToFormat.bind(null, options)
numerify.options = options
numerify.reset = function () { extend(options, DEFAULT_OPTIONS) }

numerify.register('percentage', {
  regexps: { format: /(%)/ },
  format (value, format, roundingFunction) {
    const space = ~format.indexOf(' %') ? ' ' : ''
    let output

    if (numerify.options.scalePercentBy100) value = value * 100

    // check for space before %
    format = format.replace(/\s?%/, '')

    output = numerify.numberToFormat(value, format, roundingFunction)

    if (~output.indexOf(')')) {
      output = output.split('')
      output.splice(-1, 0, space + '%')
      output = output.join('')
    } else {
      output = output + space + '%'
    }

    return output
  }
})
