import { env } from 'node:process';
import type { GeneratorConfig } from 'ng-openapi';
import { OpenApiResponseModels } from './scripts/openapi-response-models.mjs';

const config: GeneratorConfig = {
  input: env['OPENAPI_INPUT'] ?? 'http://localhost:8000/openapi.json',
  output: './src/app/core/api/generated',
  plugins: [OpenApiResponseModels],
  options: {
    dateType: 'string',
    enumStyle: 'union',
    generateServices: false,
    modelFileStructure: 'per-type',
    naming: { models: { prefix: 'I' } }
  }
};

export default config;
