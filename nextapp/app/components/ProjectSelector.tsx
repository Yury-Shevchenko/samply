"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Project {
  _id: string;
  name: string;
}

export default function ProjectSelector({
  projects,
  selectedId,
  label = "Select study:",
}: {
  projects: Project[];
  selectedId?: string;
  label?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("project", e.target.value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="projectSelect" style={{ marginRight: "0.5rem" }}>
        {label}
      </label>
      <select id="projectSelect" value={selectedId ?? ""} onChange={handleChange}>
        <option value="">— choose —</option>
        {projects.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
