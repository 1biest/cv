import React from 'react';

interface SnapshotGridProps {
  role: string;
  stack: string;
  domain: string;
  scope: string[];
}

export const SnapshotGrid: React.FC<SnapshotGridProps> = ({ role, stack, domain, scope }) => {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-[var(--border)] bg-neutral-50/80 px-6 py-10 md:px-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Role
            </h3>
            <p className="text-[var(--text)]">{role}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Stack
            </h3>
            <p className="text-[var(--text)]">{stack}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Domain
            </h3>
            <p className="text-[var(--text)]">{domain}</p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Scope
          </h3>
          <ul className="space-y-2">
            {scope.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1 shrink-0 text-[var(--text-muted)]">—</span>
                <span className="text-[var(--text-muted)]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
