import moment from 'moment'

export const formatDate = date => {
  const d = moment(date.iso).format('MMMM Do YYYY, h:mm a')
  return d.toLocaleString()
}

export const daysRemaining = iso => {
  const date = moment(iso)
  var end = moment(date)
  var cur = moment(new Date())

  end.diff(cur, 'days')

  return moment((iso || {}).iso).diff(moment(), 'days')
  //console.log(end)
}

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
