import type { IPluginGenerator, PluginGeneratorContext } from 'ng-openapi';

export declare class OpenApiResponseModels implements IPluginGenerator {
  constructor(context: PluginGeneratorContext);
  generate(outputRoot: string): Promise<void>;
}
