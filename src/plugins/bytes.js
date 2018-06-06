import { DECIMAL, BINARY } from '../constants'

export default {
  regexps: { format: /([0\s]i?b)/ },
  format (value, formatType, roundingFunction, numerify) {
    let output
    const bytes = ~formatType.indexOf('ib') ? BINARY : DECIMAL
    let suffix = ~formatType.indexOf(' b') || ~formatType.indexOf(' ib') ? ' ' : ''

    formatType = formatType.replace(/\s?i?b/, '')

    for (let power = 0; power <= bytes.suffixes.length; power++) {
      let min = Math.pow(bytes.base, power)
      let max = Math.pow(bytes.base, power + 1)

      if (value === null || value === 0 || value >= min && value < max) {
        suffix += bytes.suffixes[power]

        if (min > 0) value = value / min

        break
      }
    }

    output = numerify.numberToFormat(value, formatType, roundingFunction)

    return output + suffix
  }
}
