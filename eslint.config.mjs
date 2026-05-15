import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    rules: {
      // New in eslint-plugin-react-hooks v7; flags many valid sync resets in effects.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];

export default eslintConfig;
