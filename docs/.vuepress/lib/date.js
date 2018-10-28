import moment from 'moment'

export default {
  displayDate (date) {
    let target = moment(date)

    // 現在時刻との差分で表示を切り替える
    let now = moment()
    let diff = now.diff(target, 'hours')

    if (diff >= 24) {
      // 1日以上経過していれば日時を表示
      return target.format('YYYY/MM/DD hh:mm')
    } else if (diff > 1) {
      // 1～23時間前
      return diff + '時間前'
    } else {
      // 1時間以内
      diff = now.diff(target, 'minutes')
      return diff + '分前'
    }
  },
  format (date, format) {
    const m = moment(date)
    return m.format(format)
  }
}
