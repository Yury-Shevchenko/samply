/**
 * Seed default forum categories.
 * Run from the nextapp/ directory:
 *   node scripts/seedForumCategories.mjs
 */

import mongoose from "mongoose";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load env ──────────────────────────────────────────────────────────────────

const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dir, "../.env.local");

for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  const val = trimmed.slice(eq + 1).trim();
  if (!process.env[key]) process.env[key] = val;
}

const uri = process.env.DATABASE;
if (!uri) {
  console.error("DATABASE env var not set — check .env.local");
  process.exit(1);
}

// ── Schema (inline so the script has no TS/build dependency) ─────────────────

const categorySchema = new mongoose.Schema({
  name:        { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  order:       { type: Number, default: 0 },
  createdAt:   { type: Date,   default: Date.now },
});

const ForumCategory =
  mongoose.models.ForumCategory ||
  mongoose.model("ForumCategory", categorySchema, "forumcategories");

// ── Categories ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    order: 1,
    name: "Getting Started",
    slug: "getting-started",
    description: "New to Samply? Ask setup questions, learn the basics, and get your first study running.",
  },
  {
    order: 2,
    name: "Study Design",
    slug: "study-design",
    description: "Discuss notification schedules, ESM protocol design, timing strategies, and participant management.",
  },
  {
    order: 3,
    name: "Technical Help",
    slug: "technical-help",
    description: "Bugs, API questions, integrations with Qualtrics / REDCap / LimeSurvey, and other technical issues.",
  },
  {
    order: 4,
    name: "Feature Requests",
    slug: "feature-requests",
    description: "Suggest improvements or new features. Upvote ideas you'd like to see built.",
  },
  {
    order: 5,
    name: "Show & Tell",
    slug: "show-and-tell",
    description: "Share your study, findings, or creative use of Samply. Inspire the community.",
  },
  {
    order: 6,
    name: "General Discussion",
    slug: "general",
    description: "Anything else — research methods, ESM literature, platform news, introductions.",
  },
];

// ── Run ───────────────────────────────────────────────────────────────────────

await mongoose.connect(uri);
console.log("Connected to MongoDB");

let created = 0;
let skipped = 0;

for (const cat of CATEGORIES) {
  const exists = await ForumCategory.findOne({ slug: cat.slug }).lean();
  if (exists) {
    console.log(`  skip  ${cat.slug}`);
    skipped++;
  } else {
    await ForumCategory.create(cat);
    console.log(`  added ${cat.slug}`);
    created++;
  }
}

console.log(`\nDone — ${created} created, ${skipped} already existed.`);
await mongoose.disconnect();
