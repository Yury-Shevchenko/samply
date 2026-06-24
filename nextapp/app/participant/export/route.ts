import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { exportParticipantData } from "@/lib/data/dsar";

// GET /participant/export — lets a logged-in data subject download a complete
// machine-readable copy of their personal data (GDPR Arts. 15 & 20). Keyed by
// the authenticated session, so a user can only export their own data.
export async function GET() {
  const session = await auth();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const data = await exportParticipantData(session.user.id);
  if (!data) return new NextResponse("Not found", { status: 404 });

  const json = JSON.stringify(data, null, 2);
  return new NextResponse(json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="samply-my-data.json"',
    },
  });
}
