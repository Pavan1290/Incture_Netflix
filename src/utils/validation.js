

export function validateUsername(value) {
  
  const re = /^[A-Za-z]{5,}$/
  return re.test(value)
}

export function validateEmail(value) {
  
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  return re.test(value)
}

export function validatePassword(value) {
  
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
