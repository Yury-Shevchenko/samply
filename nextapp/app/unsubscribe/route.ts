import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";

function page(message: string, status = 200): NextResponse {
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Samply</title></head><body style="font-family:sans-serif;max-width:32rem;margin:6rem auto;padding:0 1.5rem;color:#23201a;line-height:1.6"><h1 style="font-size:1.4rem">Samply</h1><p>${message}</p></body></html>`;
  return new NextResponse(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

// GET /unsubscribe?u=<userId>&sig=<token> — opt a user out of marketing email
// (GDPR Art. 21 right to object). The signature prevents unsubscribing others.
export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get("u") ?? "";
  const sig = req.nextUrl.searchParams.get("sig") ?? "";

  if (!verifyUnsubscribeToken(u, sig)) {
    return page("This unsubscribe link is invalid or has expired.", 400);
  }

  await connectDB();
  await User.updateOne({ _id: u }, { $set: { emailUnsubscribed: true } });

  return page("You have been unsubscribed from Samply newsletters. You will still receive essential account emails (for example password resets).");
}
