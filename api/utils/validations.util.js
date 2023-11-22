/**
 * Valid if a string hex is valid
 *
 * @param {String} string
 * @return {Boolean} True/False
 */
export const validHex = (string) => {
  const regExp = /^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$/
  return typeof string === 'string' && regExp.test(string) && string.length === 32
}
