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

export function isValidValidationCode (code) {
  if (!code) return false
  if (code.length !== 6) return false
  return (/^\d+$/.test(code))
}

export function isValidPassword (password) {
  if (!password) return false
  if (password.length < 6) return false
  return true
}
