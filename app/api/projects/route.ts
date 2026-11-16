import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ProjectInput = {
  name?: unknown;
  description?: unknown;
};

function getDatabase() {
  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;

  if (!connectionString) {
    throw new Error("DATABASE_NOT_CONFIGURED");
  }

  return neon(connectionString);
}

function makeSlug(name: string) {
  const slug = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  return slug || "project";
}

function databaseError(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String(error.code)
      : "";

  if (error instanceof Error && error.message === "DATABASE_NOT_CONFIGURED") {
    return Response.json(
      { error: "The project database connection is not configured.", code: "DATABASE_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  if (code === "42P01") {
    return Response.json(
      { error: "The Projects database migration has not been applied yet.", code: "PROJECTS_MIGRATION_REQUIRED" },
      { status: 503 },
    );
  }

  if (code === "23505") {
    return Response.json(
      { error: "You already have a project with that name. Choose a different name.", code: "PROJECT_NAME_EXISTS" },
      { status: 409 },
    );
  }

  console.error("Projects database request failed", { code: code || "unknown" });
  return Response.json(
    { error: "The project database is temporarily unavailable.", code: "DATABASE_UNAVAILABLE" },
    { status: 503 },
  );
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Authentication required." }, { status: 401 });
  }

  try {
    const sql = getDatabase();
    const projects = await sql`
      SELECT
        id::text AS id,
        name,
        slug,
        description,
        created_at AS "createdAt"
      FROM ori_dev_projects
      WHERE owner_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 100
    `;

    return Response.json({ projects });
  } catch (error) {
    return databaseError(error);
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Authentication required." }, { status: 401 });
  }

  let parsedBody: unknown;

  try {
    parsedBody = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (
    typeof parsedBody !== "object" ||
    parsedBody === null ||
    Array.isArray(parsedBody)
  ) {
    return Response.json(
      { error: "Request body must be a JSON object." },
      { status: 400 },
    );
  }

  const body = parsedBody as ProjectInput;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (body.description !== undefined && typeof body.description !== "string") {
    return Response.json(
      { error: "Description must be a string." },
      { status: 400 },
    );
  }
  const description = typeof body.description === "string" ? body.description.trim() : "";

  if (name.length < 2 || name.length > 60) {
    return Response.json(
      { error: "Project name must be between 2 and 60 characters." },
      { status: 400 },
    );
  }

  if (description.length > 240) {
    return Response.json(
      { error: "Description must be 240 characters or fewer." },
      { status: 400 },
    );
  }

  try {
    const sql = getDatabase();
    const projects = await sql`
      INSERT INTO ori_dev_projects (owner_id, name, slug, description)
      VALUES (${userId}, ${name}, ${makeSlug(name)}, ${description})
      RETURNING
        id::text AS id,
        name,
        slug,
        description,
        created_at AS "createdAt"
    `;

    return Response.json({ project: projects[0] }, { status: 201 });
  } catch (error) {
    return databaseError(error);
  }
}
