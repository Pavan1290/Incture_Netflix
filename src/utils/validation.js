// Validation utilities for Pavan's Netflix auth forms

export function validateUsername(value) {
  // Letters only, min 5 characters, no numbers/special chars
  const re = /^[A-Za-z]{5,}$/
  return re.test(value)
}

export function validateEmail(value) {
  // Basic email format check
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  return re.test(value)
}

export function validatePassword(value) {
  // Strong password: min 8, at least 1 upper, 1 lower, 1 digit, 1 special
  const lengthOK = value.length >= 8
  const upperOK = /[A-Z]/.test(value)
  const lowerOK = /[a-z]/.test(value)
  const digitOK = /\d/.test(value)
  const specialOK = /[^A-Za-z0-9]/.test(value)
  return lengthOK && upperOK && lowerOK && digitOK && specialOK
}

export function passwordStrengthHints(value) {
  return {
    length: value.length >= 8,
    upper: /[A-Z]/.test(value),
    lower: /[a-z]/.test(value),
    digit: /\d/.test(value),
    special: /[^A-Za-z0-9]/.test(value),
  }
}
