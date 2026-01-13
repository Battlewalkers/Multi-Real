# Multi-Real
```markdown
# Minimal Website Template (Sign In + Protected Home)

This repository contains a lightweight, self-contained frontend template that demonstrates a working sign-in flow and a protected homepage using client-side storage (localStorage). It's intended for prototyping and learning only — not for production.

Files:
- signin.html — Sign-in / Sign-up UI (default page)
- home.html — Protected homepage which requires a session
- assets/styles.css — Minimal styling
- assets/auth.js — Simple client-side auth logic (register, login, session)

How it works:
1. Sign up or use the demo account:
   - demo@demo.test / password
2. After signing in you are redirected to home.html which shows protected content.
3. Sign out returns you to the sign-in page.

Important security note:
- All authentication and user data are stored in localStorage in plain text. This is insecure and only suitable for demos and prototypes. For a real app, replace the auth implementation with a server-side or third-party provider (e.g., Supabase, Firebase, your own backend) and handle passwords securely.

Customize:
- Replace UI, add server-side integration, or connect to your preferred auth provider.
```
