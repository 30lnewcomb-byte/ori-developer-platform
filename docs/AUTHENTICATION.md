# Authentication and security

## Sign-in

The application uses Clerk through \`@clerk/nextjs\`.

- The root layout wraps the application in \`ClerkProvider\`.
- \`proxy.ts\` initializes Clerk request context.
- Protected workspace pages call \`auth.protect()\` at the page/resource boundary.
- API route handlers call \`auth()\` themselves and return JSON errors when no user is signed in.
- The public landing page remains accessible without a session.

Initializing authentication context in the proxy is not, by itself, authorization. Every new protected page, Route Handler, and Server Action must enforce its own access policy.

## API authentication behavior

For the current Projects API:

- A signed-in Clerk session is required.
- Missing authentication returns HTTP 401 with a JSON error.
- The API derives the project owner from the verified server-side Clerk session.
- The API does not accept an owner ID from the request body.

The API currently relies on the browser's Clerk session. It does not implement Ori API bearer tokens or service-account credentials.

## Authorization and data isolation

The Projects API scopes reads and writes by the authenticated Clerk user ID. When adding resource endpoints:

1. Authenticate the request on the server.
2. Load the requested resource using an owner or membership-scoped query.
3. Check the requested action against the resource's authorization policy.
4. Return a safe error without revealing whether another user's private resource exists.
5. Add tests that attempt cross-user access by supplying another user's resource ID.

A client-supplied project ID is a selector, not proof of permission.

## Secret handling

- Never commit Clerk secret keys, database URLs, provider credentials, or API secrets.
- Never put private credentials in \`NEXT_PUBLIC_*\` variables.
- Never log full secrets or return them in API responses.
- Do not copy production credentials into development or preview environments.
- Rotate a compromised credential at its provider and redeploy/reconfigure affected services.
- Keep administrative credentials separate from application workload credentials.

## Production authentication readiness

A production deployment must use the Clerk production instance and its production configuration. The inspected deployment previously served a Clerk development key and a \`*.clerk.accounts.dev\` Frontend API domain. Until the production Clerk instance/domain is configured and verified, do not treat production authentication as ready for real users.

For current provider-specific configuration, consult the official [Clerk Next.js documentation](https://clerk.com/docs/quickstarts/nextjs).

## Future API keys

Ori-managed API key issuance, scopes, one-time secret display, rotation, and revocation are not implemented in this repository. Do not send an \`Authorization: Bearer\` token expecting the current Projects API to accept an Ori key.
