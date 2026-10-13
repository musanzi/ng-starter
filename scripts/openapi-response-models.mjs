import { getModelTypeName, getTypeScriptType, TYPE_GENERATOR_HEADER_COMMENT } from 'ng-openapi';

/** Generate inline response models containing fixed OpenAPI 3.1 tuples. */
export class OpenApiResponseModels {
  constructor(context) {
    this.context = context;
  }

  async generate(outputRoot) {
    const { spec, project, config } = this.context;
    const responses = spec.operations.flatMap((operation) =>
      Object.entries(operation.responses ?? {}).flatMap(([status, response]) => {
        const schema = response.content?.['application/json']?.schema;
        return status.startsWith('2') && schema && this.hasTuple(schema)
          ? [{ name: `${operation.operationId}Response`, schema }]
          : [];
      })
    );
    if (!responses.length) return;

    const references = new Set();
    const file = project.createSourceFile(`${outputRoot}/models/inline-responses.ts`, '', { overwrite: true });
    for (const { name, schema } of responses) {
      file.addTypeAlias({
        name: getModelTypeName(name, config.options.naming?.models),
        isExported: true,
        type: this.renderSchema(schema, references)
      });
    }
    file.addImportDeclaration({
      moduleSpecifier: './index',
      namedImports: [...references].sort(),
      isTypeOnly: true
    });
    file.formatText();
    file.insertText(0, TYPE_GENERATOR_HEADER_COMMENT);
    project.getSourceFileOrThrow(`${outputRoot}/models/index.ts`).addExportDeclaration({
      moduleSpecifier: './inline-responses'
    });
  }

  hasTuple(schema) {
    return !!schema.prefixItems || Object.values(schema.properties ?? {}).some((property) => this.hasTuple(property));
  }

  renderSchema(schema, references) {
    const { config } = this.context;
    if (schema.$ref) {
      references.add(getModelTypeName(schema.$ref.split('/').pop(), config.options.naming?.models));
      return getTypeScriptType(schema, config);
    }
    if (schema.enum) return schema.enum.map((value) => JSON.stringify(value)).join(' | ');
    if (schema.prefixItems) {
      if (schema.minItems !== schema.prefixItems.length || schema.maxItems !== schema.prefixItems.length) {
        throw new Error('Inline response generation requires fixed-length prefixItems tuples.');
      }
      return `[${schema.prefixItems.map((item) => this.renderSchema(item, references)).join(', ')}]`;
    }
    if (schema.type === 'array' && schema.items && !Array.isArray(schema.items)) {
      return `Array<${this.renderSchema(schema.items, references)}>`;
    }
    if (schema.properties) {
      return `{ ${Object.entries(schema.properties)
        .map(([name, property]) => {
          const optional = schema.required?.includes(name) ? '' : '?';
          return `${JSON.stringify(name)}${optional}: ${this.renderSchema(property, references)};`;
        })
        .join(' ')} }`;
    }
    return getTypeScriptType(schema, config);
  }
}
