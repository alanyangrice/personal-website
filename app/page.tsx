import Section from "@/components/Section";
import LinkBtn from "@/components/LinkBtn";
import ProjectsList from "@/components/ProjectsList";
import Image from "next/image";
import AsciiAnimator from "@/components/AsciiAnimator";
import { loadAsciiFrames } from "@/lib/ascii";
import Link from "next/link";

export default async function Page() {
  const frames = await loadAsciiFrames();
  return (
    <>
      {/* Hero/About */}
      <section id="about" className="relative py-24 md:py-24 overflow-hidden min-h-[70vh]">
        {/* Background ASCII */}
        <div id="hero" aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] flex items-center justify-center">
          <Link href="/dna" className="pointer-events-auto inline-block -translate-x-[30%]" aria-label="View rotating DNA helix">
            <AsciiAnimator
              frames={frames}
              fps={6}
              playbackMode="loop"
              className="select-none"
              fitToElementId="hero"
              fitPaddingPx={0}
              lineHeight={0.75}
              minFontPx={4}
              maxFontPx={12}
              ariaLabel=""
            />
          </Link>
        </div>

        <div className="relative z-10 max-w-[720px] mx-auto px-5 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">Alan Yang</h1>
          <Image
            src="/headshot.jpg"
            alt="Headshot"
            className="h-48 w-48 rounded-full mx-auto mt-8 mb-8 object-cover"
            loading="lazy"
            height={192}
            width={192}
          />
          <p className="mt-6 text-base md:text-lg text-neutral-800">
            Hi, I am Alan, a junior at Rice University studying CS & Statistics. I am intersted in robotics, software, and bioinformatics. Recently: shipping BreakIn and co-authoring a paper accepted to Nucleic Acids Research.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <LinkBtn href="/AlanYang_Resume_S25.pdf">Resume</LinkBtn>
            <LinkBtn href="mailto:acy3@rice.edu">Email</LinkBtn>
            <LinkBtn href="https://www.linkedin.com/in/achenyang/" external>
              LinkedIn
            </LinkBtn>
            <LinkBtn href="https://github.com/alanyangrice" external>
              GitHub
            </LinkBtn>
            <LinkBtn href="https://scholar.google.com/citations?user=2AjzQ60AAAAJ&hl=en" external>
              Scholar
            </LinkBtn>
          </div>
        </div>
      </section>

      {/* Experience */}
      <Section id="experience" title="Experience" withTopBorder>
        <div className="space-y-8">
          <div>
            <div className="flex items-start justify-between gap-4">
              <p className="font-semibold">
                <a className="underline hover:text-[#6F2CFF]" href="https://breakin.ai" target="_blank" rel="noopener noreferrer">BreakIn</a> — Co-Founder / Software Engineer
              </p>
              <span className="text-sm text-neutral-500 whitespace-nowrap">Apr 2025 - Present</span>
            </div>
            <p className="text-neutral-700 mt-2">
              Built and scaled an AI-driven finance networking platform to 500+ users. Optimizing database queries and enabling 1,000+ concurrent outreach campaigns.
            </p>
          </div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <p className="font-semibold">Baylor College of Medicine, Waterland Lab — Research</p>
              <span className="text-sm text-neutral-500 whitespace-nowrap">May 2024 - May 2025</span>
            </div>
            <p className="text-neutral-700 mt-2">
              Developed AI pipelines to process 1,700+ research papers and engineered genomic workflows for 2+ TB of WGBS and Illumina array datasets; co-authored a paper accepted to Nucleic Acids Research and presented abstract at DOHaD 2025.
            </p>
          </div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <p className="font-semibold">Nandi Security — Software Development Intern</p>
              <span className="text-sm text-neutral-500 whitespace-nowrap">Aug 2024 - Dec 2024</span>
            </div>
            <p className="text-neutral-700 mt-2">
            Created a Flutter app to visualize privacy and DNS anomalies, built secure Google OAuth2 authentication, and designed a GAN-based detection model with ~97% accuracy.
            </p>
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" withTopBorder>
        <ProjectsList
          projects={[
            {
              title: "Current Project: Deceptive AI - Training LLMs to play Mafia",
              href: "https://github.com/alanyangrice",
              description: "Exploring deception strategies and evaluation by training LLMs to play Mafia.",
            },
            {
              title: "CheckersRL",
              href: "https://github.com/alanyangrice/checkersRL",
              description: "RL agent to play checkers; GPU-accelerated trained self-play; reward/entropy tuning.",
            },
            {
              title: "Research Assistant Extension",
              href: "https://github.com/alanyangrice/research_assistant_extension",
              description:
                "Agentic literature search and summarization across PDFs and web; inline notes and export.",
            },
          ]}
        />
      </Section>

      

      {/* Footer */}
      <footer id="contact" className="py-16 border-t border-neutral-200">
        <div className="max-w-[720px] mx-auto px-5 text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <a className="underline hover:text-[#6F2CFF]" href="mailto:acy3@rice.edu">
              Email
            </a>
            <a
              className="underline hover:text-[#6F2CFF]"
              href="https://www.linkedin.com/in/achenyang/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="underline hover:text-[#6F2CFF]"
              href="https://github.com/alanyangrice"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a className="underline hover:text-[#6F2CFF]" href="/AlanYang_Resume_S25.pdf">
              Resume
            </a>
            <a className="underline hover:text-[#6F2CFF]" href="https://scholar.google.com/citations?user=2AjzQ60AAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
              Scholar
            </a>
          </div>
          <p className="mt-6 text-sm text-neutral-500"> © 2025 Alan Yang</p>
        </div>
      </footer>
    </>
  );
}
