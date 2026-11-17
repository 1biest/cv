import React from 'react';

interface SnapshotGridProps {
  role: string;
  stack: string;
  domain: string;
  scope: string[];
}

export const SnapshotGrid: React.FC<SnapshotGridProps> = ({ role, stack, domain, scope }) => {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] glass-surface px-6 py-8 md:px-10 shadow-[var(--shadow-sm)]">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-warm)]">
              Role
            </h3>
            <p className="text-[var(--text)] font-medium">{role}</p>
          </div>
          <div>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-warm)]">
              Stack
            </h3>
            <p className="text-[var(--text)]">{stack}</p>
          </div>
          <div>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-warm)]">
              Domain
            </h3>
            <p className="text-[var(--text)]">{domain}</p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-warm)]">
            Scope
          </h3>
          <ul className="space-y-2">
            {scope.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1 shrink-0 text-[var(--text-muted)]">-</span>
                <span className="text-[var(--text-muted)]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
