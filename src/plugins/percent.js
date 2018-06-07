export default {
  regexp: /%/,
  format (value, formatType, roundingFunction, numerify) {
    const space = ~formatType.indexOf(' %') ? ' ' : ''
    let output

    if (numerify.options.scalePercentBy100) value = value * 100

    formatType = formatType.replace(/\s?%/, '')

    output = numerify._numberToFormat(value, formatType, roundingFunction)

    if (~output.indexOf(')')) {
      output = output.split('')
      output.splice(-1, 0, space + '%')
      output = output.join('')
    } else {
      output = output + space + '%'
    }

    return output
  }
}
