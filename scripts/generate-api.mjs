import { log, warn } from 'node:console';
import { cp, mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { generateFromConfig, loadConfigFile } from 'ng-openapi';

const config = await loadConfigFile(resolve('openapi.config.ts'));
const output = resolve(config.output);
const temporaryOutput = await mkdtemp(join(tmpdir(), 'starter-api-'));

try {
  // Generate first so a failed download leaves the current client intact.
  await generateFromConfig({ ...config, output: temporaryOutput }, { onWarning: (warning) => warn(warning) });

  // ng-openapi also emits client infrastructure when plugins are configured.
  // Keep this project's output restricted to models and their entrypoint.
  for (const entry of await readdir(temporaryOutput)) {
    if (entry !== 'models' && entry !== 'index.ts') {
      await rm(join(temporaryOutput, entry), { recursive: true, force: true });
    }
  }

  // Replace the generated directory to remove obsolete models and previously generated client infrastructure.
  await rm(output, { recursive: true, force: true });
  await cp(temporaryOutput, output, { recursive: true });
  log(`API models generated from ${config.input}`);
} finally {
  await rm(temporaryOutput, { recursive: true, force: true });
}
