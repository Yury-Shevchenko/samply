import StudiesPage from "@/app/components/StudiesPage";

export const metadata = { title: "Public Studies — Samply" };

export default async function StudiesPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  return <StudiesPage page={pageNum} />;
}
