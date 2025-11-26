import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="bg-parchment text-literary-black min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-gray bg-[rgba(250,249,245,0.95)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-2xl font-semibold tracking-tight">Elivate</Link>
          <nav className="hidden items-center gap-6 font-ui text-sm font-medium text-graphite md:flex">
            <Link className="hover:text-ink-blue" href="/current-selection">Current Selection</Link>
            <Link className="hover:text-ink-blue" href="/membership">Membership</Link>
            <Link className="hover:text-ink-blue" href="/about">About</Link>
            <Link className="hover:text-ink-blue" href="/events">Events</Link>
            <Link className="hover:text-ink-blue" href="/resources">Resources</Link>
            <Link className="hover:text-ink-blue" href="/authors">Authors</Link>
          </nav>
          <Link href="/membership" className="btn btn-primary text-xs">Join the Club</Link>
        </div>
      </header>

      <section className="pt-28 bg-whisper" data-animate>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="font-display text-4xl font-black leading-tight md:text-5xl">A book club for readers who demand substance.</p>
            <p className="max-w-reading text-xl leading-relaxed text-graphite">One carefully selected title each month. Structured reading plans. Live discussions with authors and members who treat literature as culture-building work.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/current-selection" className="btn btn-primary">Explore January Selection</Link>
              <Link href="/about" className="btn btn-secondary">How Elivate Works</Link>
            </div>
            <div className="flex flex-wrap gap-8 text-sm font-ui uppercase tracking-[0.3em] text-graphite">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink-blue"></span>Curated, not crowdsourced</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink-blue"></span>Author honorarium guaranteed</span>
            </div>
          </div>
          <div className="rounded-3xl border border-soft-gray bg-white p-4 shadow-2xl">
            <img src="/Images/Woman Reading a Book.jpg" alt="Woman reading" className="h-full w-full rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      <section className="border-t border-b border-soft-gray bg-white" data-animate>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-display text-3xl font-semibold">How Elivate Works</p>
              <p className="mt-2 max-w-reading text-lg text-graphite">Human-led curation replaces algorithms. Each phase keeps members aligned and authors supported.</p>
            </div>
            <Link href="/about" className="btn btn-secondary">See Editorial Process</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {["Editorial Board","Four-Week Plan","Moderated Forums","Author Sessions"].map((title, idx) => (
              <article key={idx} className="card" data-animate>
                <p className="font-ui text-xs uppercase tracking-[0.3em] text-graphite">{['Selection','Structure','Community','Access'][idx]}</p>
                <h3 className="mt-3 font-display text-2xl">{title}</h3>
                <p className="mt-4 text-graphite">
                  {[
                    '150–250 titles reviewed monthly. Final pick announced on the 25th with a full reading guide.',
                    'Weekly chapters, context briefings, and guided prompts keep every member in sync.',
                    'Daily discussion threads managed by staff moderators to protect thoughtful debate.',
                    'Live Q&As, written interviews, and archival access for members who miss the event.',
                  ][idx]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-16 border-t border-stone-gray bg-whisper">
        <div className="bg-parchment" aria-hidden="true">
          <svg className="h-8 w-full text-parchment" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0 80V0c120 0 120 40 240 40s120-40 240-40 120 40 240 40 120-40 240-40 120 40 240 40 120-40 240-40v80Z" fill="currentColor" />
          </svg>
        </div>
        <div className="mx-auto max-w-6xl px-6 py-12 space-y-8" data-animate>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-2xl font-semibold">Elivate Book Club</p>
              <p className="text-sm text-graphite">Reading as an act of future-building.</p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-graphite">
              <Link className="hover:text-ink-blue" href="/current-selection">Current Selection</Link>
              <Link className="hover:text-ink-blue" href="/membership">Membership</Link>
              <Link className="hover:text-ink-blue" href="/about">About</Link>
              <Link className="hover:text-ink-blue" href="/events">Events</Link>
              <Link className="hover:text-ink-blue" href="/resources">Resources</Link>
              <Link className="hover:text-ink-blue" href="/trust-and-standards">Standards</Link>
              <Link className="hover:text-ink-blue" href="/authors">Authors</Link>
            </nav>
          </div>
          <hr className="border-soft-gray" />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-6 text-sm text-graphite">
              <Link className="hover:text-ink-blue" href="mailto:brand@elivatebookclub.com">Contact us</Link>
              <Link className="hover:text-ink-blue" href="mailto:community@elivatebookclub.com">Give feedback</Link>
            </div>
            <div className="flex items-center gap-3">
              {["Instagram","X","YouTube","LinkedIn"].map((label) => (
                <span key={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-soft-gray text-graphite">
                  <span className="sr-only">{label}</span>
                  •
                </span>
              ))}
            </div>
          </div>
          <hr className="border-soft-gray" />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <span className="inline-flex items-center justify-center rounded-full border border-literary-black px-4 py-1 font-ui text-sm font-semibold">Elivate</span>
              <p className="text-xs text-graphite">© 2025 Elivate Book Club. All rights reserved.</p>
              <div className="flex flex-wrap gap-3 text-xs text-ink-blue">
                <Link className="hover:underline" href="/trust-and-standards">Accessibility</Link>
                <Link className="hover:underline" href="/resources">Resource Hub</Link>
                <Link className="hover:underline" href="/author-support">Author Support</Link>
              </div>
            </div>
            <a href="#top" className="inline-flex items-center justify-end gap-2 text-sm font-semibold text-ink-blue">Back to top<span aria-hidden="true">↑</span></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
