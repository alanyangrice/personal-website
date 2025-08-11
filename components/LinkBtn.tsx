import Link from "next/link";
import { ReactNode } from "react";

type LinkBtnProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

export default function LinkBtn({ href, children, external = false }: LinkBtnProps) {
  const className = "underline underline-offset-4 hover:text-[#6F2CFF] focus-visible:text-[#6F2CFF] transition-colors";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}


