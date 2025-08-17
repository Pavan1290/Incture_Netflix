# Incture_Netflix

## Testing

This project uses React testing tools with Vitest and Testing Library.

- Test runner: Vitest (jsdom environment)
- DOM matchers: @testing-library/jest-dom
- React testing: @testing-library/react and @testing-library/user-event

Run tests:

```bash
npm run test        # watch mode
npm run test:run    # single run for CI
```

Config:

- vite.config.js -> test configuration
- vitest.setup.js -> jest-dom setup

Sample tests live under `src/__tests__/`.

