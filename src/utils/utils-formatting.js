import numeral from 'numeral'

export const truckPlateFormatter = (number: string) => {
  if (!number) return null
  if (number.length > 3) {
    const rawCode = number.replace('-', '')
    const breakpoint = 3

    return `${rawCode.substring(0, breakpoint)}-${rawCode.substring(breakpoint)}`.toUpperCase()
  }

  return number.toUpperCase()
}

export function formatCurrency (input) {
  if (!input) return ''
  return numeral(input).format('0,0.[00]')
}

export function isValidUnit (str) {
  const num = String(str).replace(',', '.')
  if (isNaN(num)) return false
  return true
}

export function removeAllNonNumeric (str) {
  if (!str) return ''
  let n = String(str)
  n.replace('[^\\d.,]', '')
  const resp = n.replace(/[^0-9.]/g, '')
  return resp
}
