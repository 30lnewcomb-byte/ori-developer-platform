# Troubleshooting

## I cannot sign in

1. Confirm the Clerk publishable and secret keys belong to the same Clerk application.
2. Confirm the configured Clerk domain and redirect settings match the current local or hosted origin.
3. Check the browser console and server logs for provider configuration errors.
4. Do not use a development Clerk instance as proof that production authentication is ready.

## I am redirected to sign-in

Workspace pages are protected. Sign in through the configured Clerk flow, then return to the requested page.

## Projects says the database is not configured

The Projects API could not find \`DATABASE_URL\` or \`POSTGRES_PRISMA_URL\`. Configure one for the environment serving the application and create a new deployment if changing Vercel environment variables.

## Projects says the migration is required

Apply \`db/migrations/001_create_projects.sql\` to the Neon database used by this Ori Developer Platform environment. Verify the target database before running SQL. The deployment does not apply migrations automatically.

## Project creation returns a conflict

Choose a different project name. Slugs are generated from names and must be unique per owner; different names can normalize to the same slug.

## The Projects page cannot reach the service

Check the network connection and the deployment's server logs. The API intentionally returns a generic database-unavailable response for unexpected database failures. Do not expose raw database errors to the browser.

## Models or Tools says not connected

That is the current product state. The live model and tool integrations have not been implemented in this repository. There is no endpoint to enable them manually.

## A new environment variable does not seem to take effect

Hosted environment changes apply to new deployments. Create a new deployment after updating the variable, then verify the new deployment and the relevant feature.

## Where should I report a documentation mismatch?

Compare the guide with the implementation in this repository. If the behavior has changed, update the corresponding documentation in the same change as the implementation. Never leave examples pointing to endpoints or fields that no longer exist.
