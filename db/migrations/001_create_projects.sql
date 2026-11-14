-- Ori Developer Platform: project registry
-- Safe to apply more than once. This migration creates a new, isolated table.

CREATE TABLE IF NOT EXISTS ori_dev_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id TEXT NOT NULL,
  name VARCHAR(60) NOT NULL,
  slug VARCHAR(48) NOT NULL,
  description VARCHAR(240) NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT ori_dev_projects_owner_slug_unique UNIQUE (owner_id, slug),
  CONSTRAINT ori_dev_projects_name_length CHECK (char_length(name) >= 2)
);

CREATE INDEX IF NOT EXISTS ori_dev_projects_owner_created_idx
  ON ori_dev_projects (owner_id, created_at DESC);
