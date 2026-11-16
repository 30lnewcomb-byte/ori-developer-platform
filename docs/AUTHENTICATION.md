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

Production authentication is not yet verified as production-ready.

The current Vercel project uses the `ori-developer-platform.vercel.app` hostname. Its environment-variable metadata lists the Clerk publishable and secret key variables for both Preview and Production. The secret values were not read during this audit, so the actual key types and whether the same Clerk instance is being shared cannot be confirmed from metadata alone.

Clerk's production deployment guidance requires a domain you own and can configure through DNS; a `*.vercel.app` hostname is not sufficient for activating a Clerk production instance. Before real production users are invited:

1. Configure an owned domain for Ori Developer Platform.
2. Create or activate the Clerk production instance for that domain.
3. Configure the production Clerk keys only for Vercel Production.
4. Keep development keys assigned to Preview/local development.
5. Configure the production domain and allowed origins in Clerk.
6. Redeploy and verify the production Frontend API domain and sign-in flow.

Do not swap keys or change the current sign-in configuration until the owned domain and Clerk production instance are ready. For current provider-specific steps, use the official [Clerk production deployment guide](https://clerk.com/docs/guides/development/deployment/production).

## Future API keys

Ori-managed API key issuance, scopes, one-time secret display, rotation, and revocation are not implemented in this repository. Do not send an \`Authorization: Bearer\` token expecting the current Projects API to accept an Ori key.
