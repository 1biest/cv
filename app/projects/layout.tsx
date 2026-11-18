import Link from 'next/link';
import Backdrop from '../Components/Backdrop';

export default function ProjectCaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative text-[var(--text)]">
      <Backdrop />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-page)]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/#systems"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] glass-surface px-3.5 text-xs font-semibold text-[var(--text)] transition hover:border-[#0a2540] hover:text-[#0a2540] shrink-0"
            >
              <span aria-hidden="true">←</span>
              <span>Back to Portfolio</span>
            </Link>
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2.5 truncate font-[family-name:var(--font-display)] text-base font-semibold text-[var(--text)] hover:text-[#0a2540]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a2540] font-mono text-[10px] font-bold text-[#e5c488]">
                LB
              </span>
              <span>Logan Biesterfeldt</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/Logan Biesterfeldt Resume 2026.pdf"
              download
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] glass-surface px-3.5 text-xs font-semibold text-[var(--text)] transition hover:border-[#0a2540]"
            >
              <span>Résumé</span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">PDF</span>
            </a>
            <a
              href="mailto:logan.biesterfeldt@gmail.com?subject=Engineering%20%2F%20Product%20Role%20Inquiry"
              className="inline-flex h-9 items-center rounded-full bg-[#0a2540] px-4 text-xs font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-12">
        <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] glass-surface p-6 sm:p-10 shadow-[var(--shadow-card)]">
          {children}
        </div>
      </main>
    </div>
  );
}
