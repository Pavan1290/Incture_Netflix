import { describe, it, expect } from 'vitest'
import { validateUsername, validateEmail, validatePassword, passwordStrengthHints } from '../utils/validation'

describe('validation utils', () => {
  it('validateUsername', () => {
    expect(validateUsername('Pavan')).toBe(true)
    expect(validateUsername('Pa')).toBe(false)
    expect(validateUsername('user1')).toBe(false)
  })

  it('validateEmail', () => {
    expect(validateEmail('user@example.com')).toBe(true)
    expect(validateEmail('user@ex')).toBe(false)
  })

  it('validatePassword and hints', () => {
    expect(validatePassword('Aa1!aaaa')).toBe(true)
    expect(validatePassword('aaaaaaa')).toBe(false)
    const hints = passwordStrengthHints('Aa1!aaaa')
    expect(hints.length && hints.upper && hints.lower && hints.digit && hints.special).toBe(true)
  })
})
