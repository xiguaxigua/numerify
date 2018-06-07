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
  const boundedPrecision = splitValue.length === 2
    ? Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals)
    : minDecimals
  const power = Math.pow(10, boundedPrecision)
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
  let abbr = ''
  let decimal = ''
  let neg = false
  let abbrForce
  let signed

  value = value || 0

  if (~format.indexOf('(')) {
    negP = true
    format = format.replace(/[(|)]/g, '')
  } else if (~format.indexOf('+') || ~format.indexOf('-')) {
    signed = ~format.indexOf('+')
      ? format.indexOf('+')
      : value < 0 ? format.indexOf('-') : -1
    format = format.replace(/[+|-]/g, '')
  }
  if (~format.indexOf('a')) {
    abbrForce = format.match(/a(k|m|b|t)?/)

    abbrForce = abbrForce ? abbrForce[1] : false

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
  if (~format.indexOf('[.]')) {
    optDec = true
    format = format.replace('[.]', '.')
  }
  let int = value.toString().split('.')[0]
  let precision = format.split('.')[1]
  let thousands = format.indexOf(',')
  let leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length

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
    if (optDec && +(decimal.slice(1)) === 0) decimal = ''
  } else {
    int = toFixed(value, 0, roundingFunction)
  }
  if (abbr && !abbrForce && +int >= 1000 && abbr !== ABBR.trillion) {
    int = '' + (+int / 1000)
    abbr = ABBR.million
  }
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

  let output = int + decimal + (abbr || '')

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

export function extend (target, sub) {
  Object.keys(sub).forEach(key => { target[key] = sub[key] })
}

export function ordinal (number) {
  const b = number % 10
  return (~~(number % 100 / 10) === 1)
    ? 'th'
    : (b === 1)
      ? 'st'
      : (b === 2)
        ? 'nd'
        : (b === 3)
          ? 'rd'
          : 'th'
}

export function insert (string, subString, start) {
  return string.slice(0, start) + subString + string.slice(start)
}
