import { ordinal } from '../utils'

export default {
  regexps: { format: /(o)/ },
  format (value, formatType, roundingFunction, numerify) {
    let ordinalStr = ~formatType.indexOf(' o') ? ' ' : ''
    formatType = formatType.replace(/\s?o/, '')

    ordinalStr += ordinal(value)

    let output = numerify._numberToFormat(value, formatType, roundingFunction)

    return output + ordinalStr
  }
}
