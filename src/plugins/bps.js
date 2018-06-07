export default {
  regexps: { format: /(BPS)/ },
  format (value, formatType, roundingFunction, numerify) {
    const space = ~formatType.indexOf(' BPS') ? ' ' : ''
    value = value * 10000
    formatType = formatType.replace(/\s?BPS/, '')
    let output = numerify._numberToFormat(value, formatType, roundingFunction)

    if (!output.indexOf(')')) {
      output = output.split('')
      output.splice(-1, 0, space + 'BPS')
      output = output.join('')
    } else {
      output = output + space + 'BPS'
    }

    return output
  }
}
