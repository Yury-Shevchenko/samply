import { NextResponse } from "next/server";
import { stat, readFile } from "node:fs/promises";
import path from "node:path";

// Serve user-uploaded images for both apps:
//  1. Next.js upload action writes to <cwd>/public/uploads/  (handled by next's static serving
//     before this route is reached; this is a safety fallback if that ever misses)
//  2. Legacy Express upload writes to <cwd>/../public/uploads/  (Website/public/uploads on disk)
// We check both locations and stream the file directly — no proxy hop, no EXPRESS_URL dependency.

const ALLOWED_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ filename: string }> },
) {
  const { filename } = await ctx.params;

  // Reject anything that isn't a bare safe filename.
  if (!/^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(filename)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const ext = filename.split(".").pop()!.toLowerCase();
  const contentType = ALLOWED_EXT[ext];
  if (!contentType) {
    return new NextResponse("Not found", { status: 404 });
  }

  const candidates = [
    path.join(process.cwd(), "public", "uploads", filename),
    path.join(process.cwd(), "..", "public", "uploads", filename),
  ];

  for (const filePath of candidates) {
    try {
      const s = await stat(filePath);
      if (!s.isFile()) continue;
      const data = await readFile(filePath);
      return new NextResponse(new Uint8Array(data), {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Length": String(s.size),
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch {
      // try next candidate
    }
  }

  return new NextResponse("Not found", { status: 404 });
}
