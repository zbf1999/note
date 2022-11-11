/*
* 格式化时间
* */
const parseTime = (t, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (!t) return null;
  let date;
  if (typeof t === 'object') {
    date = t;
  } else {
    if (t === '0' || t === 0) return null;
    if (typeof t === 'string' && /^[0-9]+$/.test(t)) {
      t = parseInt(t);
    }
    if (typeof t === 'number' && t.toString().length === 10) {
      t = t * 1000;
    }
    date = new Date(t);
  }

  const formatObj = {
    yyyy: date.getFullYear(),
    MM: date.getMonth() + 1,
    dd: date.getDate(),
    hh: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  };

  return format.replace(/(yyyy|MM|dd|hh|mm|ss)+/g, (result, key) => {
    let value = formatObj[key];
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || '00';
  });
}

module.exports = {
  parseTime
}