import {
  ABBR,
  TRILLION,
  BILLION,
  MILLION,
  THOUSAND
} from './constants'

export function numIsNaN (value) {
  return typeof value === 'number' && isNaN(value)
}

export function toFixed (value, maxDecimals, roundingFunction, optionals) {
  const splitValue = value.toString().split('.')
  const minDecimals = maxDecimals - (optionals || 0)
  // Use the smallest precision value possible to avoid errors from
  // floating point representation
  const boundedPrecision = splitValue.length === 2
    ? Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals)
    : minDecimals
  const power = Math.pow(10, boundedPrecision)
  // Multiply up by precision, round accurately, then divide and use native toFixed():
  let output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision)

  if (optionals > maxDecimals - boundedPrecision) {
    let optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$')
    output = output.replace(optionalsRegExp, '')
  }

  return output
}

export function numberToFormat (options, value, format, roundingFunction) {
  const abs = Math.abs(value)
  let negP = false
  let optDec = false
  let leadingCount = 0
  let abbr = ''
  let decimal = ''
  let neg = false
  let abbrForce
  let int
  let precision
  let signed
  let thousands
  let output

  value = value || 0

  // see if we should use parentheses for negative number or
  // if we should prefix with a sign
  // if both are present we default to parentheses
  if (~format.indexOf('(')) {
    negP = true
    format = format.replace(/[(|)]/g, '')
  } else if (~format.indexOf('+') || ~format.indexOf('-')) {
    signed = ~format.indexOf('+')
      ? format.indexOf('+')
      : value < 0 ? format.indexOf('-') : -1
    format = format.replace(/[+|-]/g, '')
  }
  // see if abbreviation is wanted
  if (~format.indexOf('a')) {
    abbrForce = format.match(/a(k|m|b|t)?/)

    abbrForce = abbrForce ? abbrForce[1] : false

    // check for space before abbreviation
    if (~format.indexOf(' a')) abbr = ' '
    format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '')

    if (abs >= TRILLION && !abbrForce || abbrForce === 't') {
      abbr += options.abbrLabel.tr
      value = value / TRILLION
    } else if (abs < TRILLION && abs >= BILLION && !abbrForce || abbrForce === 'b') {
      abbr += options.abbrLabel.bi
      value = value / BILLION
    } else if (abs < BILLION && abs >= MILLION && !abbrForce || abbrForce === 'm') {
      abbr += options.abbrLabel.mi
      value = value / MILLION
    } else if (abs < MILLION && abs >= THOUSAND && !abbrForce || abbrForce === 'k') {
      abbr += options.abbrLabel.th
      value = value / THOUSAND
    }
  }
  // check for optional decimals
  if (~format.indexOf('[.]')) {
    optDec = true
    format = format.replace('[.]', '.')
  }
  // break number and format
  int = value.toString().split('.')[0]
  precision = format.split('.')[1]
  thousands = format.indexOf(',')
  leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length

  if (precision) {
    if (~precision.indexOf('[')) {
      precision = precision.replace(']', '')
      precision = precision.split('[')
      decimal = toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length)
    } else {
      decimal = toFixed(value, precision.length, roundingFunction)
    }

    int = decimal.split('.')[0]
    decimal = ~decimal.indexOf('.')
      ? '.' + decimal.split('.')[1]
      : ''
    if (optDec && Number(decimal.slice(1)) === 0) decimal = ''
  } else {
    int = toFixed(value, 0, roundingFunction)
  }
  // check abbreviation again after rounding
  if (abbr && !abbrForce && Number(int) >= 1000 && abbr !== ABBR.trillion) {
    int = String(Number(int) / 1000)
    abbr = ABBR.million
  }
  // format number
  if (~int.indexOf('-')) {
    int = int.slice(1)
    neg = true
  }
  if (int.length < leadingCount) {
    for (var i = leadingCount - int.length; i > 0; i--) {
      int = '0' + int
    }
  }

  if (thousands > -1) {
    int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + ',')
  }

  if (!format.indexOf('.')) int = ''

  output = int + decimal + (abbr || '')

  if (negP) {
    output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '')
  } else {
    if (signed >= 0) {
      output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+')
    } else if (neg) {
      output = '-' + output
    }
  }

  return output
}
