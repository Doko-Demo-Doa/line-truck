export function isValidEmail (email) {
  if (!email) return false
  const trimmed = email.trim()
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(trimmed)
}

export function isValidIndex (number) {
  const num = parseInt(number)
  if (num === null) return false
  if (num === undefined) return false
  if (isNaN(num)) return false
  return true
}

export function isValidPlate (code: string) {
  const rawCode = code.replace('-', '')
  if (!code) return false
  if (rawCode.length !== 8) return false
  if (!rawCode.charAt(2).match(/^[zA-Z]+$/)) return false
  return (/^[0-9a-zA-Z]+$/.test(rawCode))
}

export function isValidPassword (password) {
  if (!password) return false
  if (password.length < 6) return false
  return true
}
