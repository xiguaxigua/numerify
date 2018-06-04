![download](https://img.shields.io/npm/dm/numerify.svg)
![version](https://img.shields.io/npm/v/numerify.svg)
![language](https://img.shields.io/badge/language-javascript-yellow.svg)
![License](https://img.shields.io/badge/license-MIT-000000.svg)

A tool for format number more convient, from a fucking cool project named [Numeral](http://numeraljs.com/) , and smaller than it.

## Install

`npm i numerify -S`

## Start

### npm

```js
import numerify from 'numerify'
// commonjs package is 'numerify/lib/index.cjs.js'
console.log(numerify(1234).format('0,0'))
```

### cdn

```html
<script src="https://unpkg.com/numerify/lib/index.umd.min.js"></script>
<script>
console.log(numerify(1234).format('0,0'))
</script>
```

## Format List

| Number | Format | String |
| --: | --: | --: |
| 10000 | '0,0.0000' | 10,000.0000 |
| 10000.23 | '0,0' | 10,000 |
| 10000.23 | '+0,0' | +10,000 |
| -10000 | '0,0.0' | -10,000.0 |
| 10000.1234 | '0.000' | 10000.123 |
| 100.1234 | '00000' | 00100 |
| 1000.1234 | '000000,0' | 001,000 |
| 10 | '000.00' | 010.00 |
| 10000.1234 | '0[.]00000' | 10000.12340 |
| -10000 | '(0,0.0000)' | (10,000.0000) |
| -0.23 | '.00' | -.23 |
| -0.23 | '(.00)' | (.23) |
| 0.23 | '0.00000' | 0.23000 |
| 0.23 | '0.0[0000]' | 0.23 |
| 1230974 | '0.0a' | 1.2m |
| 1460 | '0 a' | 1 k |
| -104000 | '0a' | -104k |
| 1 | '0%' | 100% |
| 0.974878234 | '0.000%' | 97.488% |
| -0.43 | '0 %' | -43 % |
| 0.43 | '(0.000 %)' | 43.000 % |

## Methods

#### numerify(number).format(formatter, roundFunction)

- formatter default is `'0,0'`
- roundFunction default is `Math.round`

#### numeral.setOptions

this default options is:

```js
{
  zeroFormat: null,
  nullFormat: null,
  defaultFormat: '0,0',
  scalePercentBy100: true,
  abbrLabel: {
    th: 'k',
    mi: 'm',
    bi: 'b',
    tr: 't'
  }
}
```

in order to edit it, you can code such as

```js
numerify.setOptions({
  zeroFormat: 'N/A',
  nullFormat: 'N/A',
  defaultFormat: '0,0',
  scalePercentBy100: true,
  abbrLabel: {
    th: 'k',
    mi: 'm',
    bi: 'B',
    tr: 'T'
  }
})
numeral(0).format('0.0') // N/A
```

#### numeral.register

Adding your own custom formats is as easy as adding a locale.

```js
numerify.register('percentage', {
  regexps: { format: /(%)/ },
  format (value, format, roundingFunction) {
    const space = ~format.indexOf(' %') ? ' ' : ''
    let output

    if (numerify.options.scalePercentBy100) value = value * 100

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
```

## License

MIT
