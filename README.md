# Pavan’s Netflix — Incture Assignment

Assignment project from Incture to clone Netflix. Implemented by Pavan (Sahyadri College of Engineering and Management).

## Project overview (10 points)

- Built with React (Vite) and Bootstrap as a single-page app with client-side routing.
- Loader/splash first, then Sign In/Sign Up flow before entering the app.
- Client-side validation only:
  - Username: letters only, min 5 characters, no numbers/specials.
  - Email: standard format.
  - Password: strong (min 8, upper, lower, digit, special) + Confirm Password on Sign Up.
- Validation hints appear only while typing (focused + non-empty).
- Auth managed via context + localStorage; welcome alert shows the username/email after login.
- Protected pages: Favorites, Search, Details, and Profile.
- Profile page (right-aligned avatar in Navbar): upload/change avatar, view login ID, masked password status, Sign Out inside Profile.
- Sign Out clears auth and returns to the Sign In page.
- Movie/series cards include a “Watch Trailer” action that opens a YouTube trailer search in a new tab.
- Clean structure with separate CSS and utilities; React tests with Vitest + Testing Library (jest-dom, user-event) under jsdom.

## How to run

Prerequisites: Node.js 18+ and npm. No external API keys required.

- Install dependencies:

  ```bash
  npm install
  ```

- Start dev server:

  ```bash
  npm run dev
  ```

- Build for production:

  ```bash
  npm run build
  ```

- Preview production build:

  ```bash
  npm run preview
  ```

- Run tests (React test tools):

  ```bash
  npm run test        # watch mode
  npm run test:run    # single run
  ```
 