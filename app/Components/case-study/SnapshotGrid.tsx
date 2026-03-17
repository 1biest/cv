import React from 'react';

interface SnapshotGridProps {
  role: string;
  stack: string;
  domain: string;
  scope: string[];
}

export const SnapshotGrid: React.FC<SnapshotGridProps> = ({ role, stack, domain, scope }) => {
  return (
    <section className="mx-12 py-12 border rounded-lg border-gray-800 bg-white/[0.02] backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">
              Role
            </h3>
            <p className="text-gray-200">{role}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">
              Stack
            </h3>
            <p className="text-gray-200">{stack}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">
              Domain
            </h3>
            <p className="text-gray-200">{domain}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3">
            Scope
          </h3>
          <ul className="space-y-2">
            {scope.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-500 mr-2 mt-1 shrink-0">—</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
