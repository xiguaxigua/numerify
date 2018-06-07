import { ordinal } from '../utils'

export default {
  regexp: /o/,
  format (value, formatType, roundingFunction, numerify) {
    let ordinalStr = ~formatType.indexOf(' o') ? ' ' : ''
    formatType = formatType.replace(/\s?o/, '')

    ordinalStr += ordinal(value)

    let output = numerify._numberToFormat(value, formatType, roundingFunction)

    return output + ordinalStr
  }
}
