import { createContainerWithAutomaticRestart } from '../node_modules/astro/dist/core/dev/restart.js';

(async () => {
  try {
    const restart = await createContainerWithAutomaticRestart({ inlineConfig: {}, fs: undefined });
    console.log('Container created:', !!restart.container);
  } catch (err) {
    console.error('ERROR creating container:', err instanceof Error ? err.stack || err.message : err);
    process.exit(1);
  }
})();
