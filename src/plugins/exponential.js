import { numIsNaN } from '../utils'

export default {
  regexps: { format: /(e\+|e-)/ },
  format (value, formatType, roundingFunction, numerify) {
    const exponential = typeof value === 'number' && !numIsNaN(value)
      ? value.toExponential()
      : '0e+0'
    const parts = exponential.split('e')
    formatType = formatType.replace(/e[+|-]{1}0/, '')
    const output = numerify._numberToFormat(+(parts[0]), formatType, roundingFunction)

    return `${output}e${parts[1]}`
  }
}
