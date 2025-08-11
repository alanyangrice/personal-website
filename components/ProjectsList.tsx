"use client";

import { useState } from "react";

type Project = {
  title: string;
  href: string;
  description: string;
};

type ProjectsListProps = {
  projects: Project[];
};

export default function ProjectsList({ projects }: ProjectsListProps) {
  const initialVisibleCount = 4;
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, initialVisibleCount);
  const hasMore = projects.length > initialVisibleCount;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 items-stretch">
        {visibleProjects.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target={p.href.startsWith("http") ? "_blank" : undefined}
            rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rounded-2xl border border-neutral-200 p-6 hover:shadow-sm transition block h-full flex flex-col"
          >
            <p className="font-semibold leading-snug">{p.title}</p>
            <p className="text-neutral-700 mt-2 leading-relaxed">{p.description}</p>
          </a>
        ))}
      </div>
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            type="button"
            className="underline underline-offset-4 hover:text-[#6F2CFF] focus-visible:text-[#6F2CFF]"
            onClick={() => setShowAll((s) => !s)}
            aria-expanded={showAll}
          >
            {showAll ? "See less" : "See more projects"}
          </button>
        </div>
      )}
    </>
  );
}


