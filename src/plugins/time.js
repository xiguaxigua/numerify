export default {
  regexps: { format: /(:)/ },
  format (value, formatType, roundingFunction) {
    const hours = Math.floor(value / 60 / 60)
    const minutes = Math.floor((value - (hours * 60 * 60)) / 60)
    const seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60))

    return [
      hours,
      minutes < 10 ? `0${minutes}` : minutes,
      seconds < 10 ? `0${seconds}` : seconds
    ].join(':')
  }
}
