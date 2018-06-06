import { insert } from '../utils'

export default {
  regexps: { format: /(\$)/ },
  format (value, formatType, roundingFunction, numerify) {
    const symbols = {
      before: formatType.match(/^([+|\-|(|\s|$]*)/)[0],
      after: formatType.match(/([+|\-|)|\s|$]*)$/)[0]
    }
    let symbol
    formatType = formatType.replace(/\s?\$\s?/, '')
    let output = numerify.numberToFormat(value, formatType, roundingFunction)

    if (value >= 0) {
      symbols.before = symbols.before.replace(/[-(]/, '')
      symbols.after = symbols.after.replace(/[-)]/, '')
    } else if (value < 0 &&
      (!~symbols.before.indexOf('-') && !~symbols.before.indexOf('('))) {
      symbols.before = '-' + symbols.before
    }

    for (let i = 0; i < symbols.before.length; i++) {
      symbol = symbols.before[i]

      switch (symbol) {
        case '$':
          output = insert(output, '$', i)
          break
        case ' ':
          output = insert(output, ' ')
          break
      }
    }

    for (let i = symbols.after.length - 1; i >= 0; i--) {
      symbol = symbols.after[i]

      switch (symbol) {
        case '$':
          output = i === symbols.after.length - 1
            ? output + '$'
            : insert(output, '$', -(symbols.after.length - (1 + i)))
          break
        case ' ':
          output = i === symbols.after.length - 1
            ? output + ' '
            : insert(output, ' ', -(symbols.after.length - (1 + i)))
          break
      }
    }
    return output
  }
}
