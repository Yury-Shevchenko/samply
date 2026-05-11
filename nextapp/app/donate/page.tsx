import DonatePage from "./DonatePage";

export const metadata = { title: "Donate — Samply" };

export default async function DonatePageRoute({
  searchParams,
}: {
  searchParams: Promise<{ cancelled?: string; error?: string }>;
}) {
  const { cancelled } = await searchParams;
  return <DonatePage cancelled={cancelled === "1"} />;
}
