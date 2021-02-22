const formate = function (time) {
  return time < 10 ? '0' + time : time
}
const utils = {
  formateDate (date) {
    let time = new Date(date);
    let y = formate(time.getFullYear()),
      m = formate(time.getMonth() + 1),
      d = formate(time.getDate()),
      h = formate(time.getHours()),
      M = formate(time.getMinutes()),
      s = formate(time.getSeconds());
    return `${y}-${m}-${d} ${h}:${M}:${s}`;
  },
  pagination (res, callback) {
    return {
      pageSize: res.result.pageSize,
      total: res.result.total,
      current: res.result.page,
      onChange: current => {
        callback(current)
      }
    }
  }
}
export default utils