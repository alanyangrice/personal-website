import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 text-neutral-600">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block underline hover:text-[#6F2CFF]">Go back home</Link>
    </section>
  );
}


