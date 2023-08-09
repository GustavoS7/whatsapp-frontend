import moment from 'moment'

export const dateHanlder = (date) => {
  const now = moment()
  const momentDate = moment(date)
  const time = momentDate.fromNow(true)
  const dateByHourAndMin = momentDate.format('HH:mm')

  const getDay = () => {
    const days = time.split(' ')[0]
    if (Number(days) < 8) {
      return now.subtract(Number(days), 'days').format('dddd')
    } else {
      return momentDate.format('DD/MM/YYYY')
    }
  }

  if (time === 'a few seconds') {
    return 'Now'
  }

  if (time.search('minute') !== -1) {
    const minutes = time.split(' ')[0]

    if (minutes === 'a') {
      return '1 min'
    } else {
      return `${minutes} min`
    }
  }

  if (time.search('hour') !== -1) {
    return dateByHourAndMin
  }

  if(time === 'a day') {
    return 'Yesterday'
  }

  if (time.search('days') !== -1) {
    return getDay()
  }
  return time
}
