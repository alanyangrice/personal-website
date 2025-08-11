import { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title?: string;
  children: ReactNode;
  withTopBorder?: boolean;
};

export default function Section({ id, title, children, withTopBorder }: SectionProps) {
  return (
    <section id={id} className={`${withTopBorder ? "border-t border-neutral-200" : ""} py-16 md:py-24`}>
      <div className="max-w-[720px] mx-auto px-5">
        {title ? (
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
        ) : null}
        <div className={title ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}


