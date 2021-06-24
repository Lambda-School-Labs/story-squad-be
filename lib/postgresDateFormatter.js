const postgresDateFormatter = (jsDateObject) => {
  const date = new Date(jsDateObject);
  const leadingZeroes = (n) => ("0" + n).slice(-2);
  return `${date.getUTCFullYear()}-${leadingZeroes(date.getMonth() + 1)}-${leadingZeroes(date.getDate())} ${leadingZeroes(date.getHours())}:${leadingZeroes(date.getMinutes())}:${leadingZeroes(date.getSeconds())}`;
}
module.exports = postgresDateFormatter;