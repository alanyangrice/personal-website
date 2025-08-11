import AsciiAnimator from "@/components/AsciiAnimator";
import LinkBtn from "@/components/LinkBtn";
import { loadAsciiFrames } from "@/lib/ascii";

export default async function DnaPage() {
  const frames = await loadAsciiFrames();
  return (
    <section className="py-16">
      <div className="max-w-[920px] mx-auto px-5">
        <div className="mb-10 md:mb-12">
          <LinkBtn href="/">← Back to home</LinkBtn>
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-center">Rotating DNA Helix</h1>
        <p className="mt-4 text-center text-neutral-700">
          ASCII animation generated from 26 frames. Credit to Zane Corn for the original animation;{' '}
          <a
            className="underline hover:text-[#6F2CFF]"
            href="https://dribbble.com/shots/2330834-Double-Helix-Animation"
            target="_blank"
            rel="noopener noreferrer"
          >
            link to gif
          </a>
        </p>
        <div className="mt-8 flex justify-center">
          <AsciiAnimator
            frames={frames}
            fps={2}
            playbackMode="loop"
            className="w-full overflow-auto"
            ariaLabel="Rotating DNA helix in ASCII"
          />
        </div>
      </div>
    </section>
  );
}


