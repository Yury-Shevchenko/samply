import { redirect } from "next/navigation";

export default async function ParticipantLoginWithEmail({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const { email } = await params;
  redirect(`/participant/login?email=${encodeURIComponent(email)}`);
}
